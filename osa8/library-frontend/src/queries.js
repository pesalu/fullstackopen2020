import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
query {
  allBooks { 
    title 
    author {
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
    title
    author
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`