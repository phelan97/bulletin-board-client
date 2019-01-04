import gql from 'graphql-tag';

export const ALL_BOARDS = gql`
  boards {
    id
    title
  }
`;

export const ALL_LISTS = gql`
  ListsByBoard($boardId: ID!) {
    lists(boardId: $boardId) {
      id
      title
    }
  }
`;

export const ALL_CARDS = gql`
  CardsByList($listId: ID!) {
    cards(listId: $listId) {
      listId
      content
    }
  }
`;