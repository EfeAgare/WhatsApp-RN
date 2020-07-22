import gql from 'graphql-tag';


export default gql`
  subscription messageAdded {
    messageAdded {
      id
      createdAt
      content
      isMine
    }
  }
`;
