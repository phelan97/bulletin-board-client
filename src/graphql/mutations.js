import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    signup(email: $email, password: $password)
  }
`;

export const LOGIN = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const CREATE_BOARD = gql`
  mutation CreateBoardMutation($title: String!) {
    addBoard(title: $title) {
      id
      title
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation DeleteBoardMutation($boardId: ID!) {
    removeBoard(boardId: $boardId)
  }
`;

export const CREATE_LIST = gql`
  mutation CreateListMutation($boardId: ID!, $title: String!) {
    addList(boardId: $boardId, title: $title) {
      id
      title
    }
  }
`;

export const CREATE_CARD = gql`
  mutation CreateCardMutation($listId: ID!, $content: String!) {
    addCard(listId: $listId, content: $content) {
      id
      content
    }
  }
`