import gql from 'graphql-tag';
 
export const FRAGMENT_MESSAGE =  gql`
  fragment Message on Message {
    id
    createdAt
    content
    isMine
    chat {
      id
    }
  }
`;