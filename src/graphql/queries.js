import gql from 'graphql-tag';

export const ALL_BOARDS = gql`
{
  boards {
    id
    title
  }
}
`;

export const BOARD = gql`
  query BoardQuery($boardId: ID!) {
    board(boardId: $boardId) {
      id
      title
    }
  }
`;

export const BOARD_LISTS = gql`
  query ListsByBoard($boardId: ID!) {
    lists(boardId: $boardId) {
      id
      title
    }
  }
`;

export const LIST_CARDS = gql`
  query CardsByList($listId: ID!) {
    cards(listId: $listId) {
      id
      listId
      content
    }
  }
`;

export const DEMO_LOGIN = gql`
  {
    demoAccount
  }
`;