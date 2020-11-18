const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid');

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

const MONGODB_URI = 'mongodb+srv://mongoman:m0ng0m4n@cluster0-yjapj.mongodb.net/graphql-app?retryWrites=true&w=majority'


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
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
    id: ID!
  }

  type Query {
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
  }
`;

const resolvers = {
  Query: {
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
      return Book.find(searchFilters);
    },
    allAuthors: () => {
      return Author.find({});
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        let newBook;
        let authorExist = await Author.exists({name: args.author});
        let bookExist = await Book.exists({name: args.title});
        if (bookExist) {
          throw new UserInputError(`Book ${args.title} exist!`);
        }

        if(authorExist) {
          let author = await Author.findOne({name: args.author});
          newBook = new Book({
            ...args,
            author
          });
        } else {
          let newAuthor = new Author({ name: args.author });
          await newAuthor.save();
          newBook = new Book({
            ...args,
            author: newAuthor
          });
        }
        return await newBook.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args) => {
      let author = await Author.findOne({name: args.name});
      if (author) {
        author.born = args.born;
        return await author.save();
      } else {
        return null;
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
