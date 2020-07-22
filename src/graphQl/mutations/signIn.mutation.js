import gql from 'graphql-tag';

export default gql`
  mutation signIn($username: String!, $aboutMe: String!, $phoneNumber: String!) {
    signIn(username: $username, aboutMe: $aboutMe, phoneNumber: $phoneNumber) {
      ok
      token
      user {
        id
        phonenumber
      }
    }
  }
`;
