const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server');
const { v1: uuid } = require('uuid');

const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const jwt = require('jsonwebtoken');
const author = require('./models/author');
const JWT_SECRET = 'SALAISUUS';

const MONGODB_URI = 'mongodb+srv://mongoman:m0ng0m4n@cluster0-yjapj.mongodb.net/graphql-app?retryWrites=true&w=majority'

const pubsub = new PubSub();

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
  type Author {
    name: String!
    id: String!
    born: Int
    books: [Book!]!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      born: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    me: async (root, args, context) => {
      return context.currentUser;
    },
    bookCount: async () => { return Book.count({}) },
    authorCount: () => {return Author.count({})},
    allBooks: async (root, args) => {
      let searchFilters = {};
      if (args.genre) {
        searchFilters.genres = {$in: [args.genre]};
      }
      if (args.author) {
        let author = await Author.findOne({name: args.author});
        searchFilters.author = {$in: [author.id]};
      }
      return Book.find(searchFilters).populate('author', { name: 1});
    },
    allAuthors: async (root, args, context, info) => {
      if (
        info.fieldNodes[0].selectionSet.selections.find(selection => selection.name.value === 'books') ||
        info.fieldNodes[0].selectionSet.selections.find(selection => selection.name.value === 'bookCount')) {
        authors = await Author.find({}).populate('books');
        authors.forEach(author => author.bookCount = author.books.length);
      } else {
        authors = await Author.find({})
      }
      return authors;
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      getCurrentUser(context);

      let author;
      try {
        let newBook;
        let authorExist = await Author.exists({name: args.author});

        if(authorExist) {
          author = await Author.findOne({name: args.author});
          newBook = new Book({
            ...args,
            author
          });
        } else {
          author = new Author({ name: args.author });
          author = await author.save();
          newBook = new Book({
            ...args,
            author: author,
            books: []
          });
        }
        let book = await newBook.save();

        author.books = author.books.concat(book._id);
        await author.save();

        pubsub.publish('BOOK_ADDED', {bookAdded: book})
        return book;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, context) => {
      getCurrentUser(context);

      let author = await Author.findOne({name: args.name});
      if (author) {
        author.born = args.born;
        return await author.save();
      } else {
        return null;
      }
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id);
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});

function getCurrentUser(context) {
  const currentUser = context.currentUser;

  if (!currentUser) {
    throw new AuthenticationError("not authenticated");
  }

  return currentUser;
}

