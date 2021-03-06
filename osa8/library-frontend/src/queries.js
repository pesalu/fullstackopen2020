import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
query {
  allBooks { 
    id
    title 
    author {
      id
      name
    }
    published 
    genres
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    id
    name
    born
    bookCount
  }
}
`

export const UPDATE_BIRTHYEAR = gql`mutation updateBirthyear($name: String!, $birthyear: Int!) {
  editAuthor(
    name: $name
    born: $birthyear
  ) {
    name
    born
  }
}
`;

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    id
    title
    author
  }
}
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title 
    author {
      id
      name
      born 
    }
    published 
    genres
  }`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CURRENT_USER = gql`query {
  me {
    username
    favoriteGenre
  }
}`