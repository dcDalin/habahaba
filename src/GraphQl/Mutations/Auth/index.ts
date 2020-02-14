import gql from 'graphql-tag';

const SIGN_UP = gql`
  mutation SignUpUser($username: String!, $email: String!, $password: String!) {
    userSignUp(userSignUpInput: { username: $username, email: $email, password: $password }) {
      token
    }
  }
`;

const SIGN_IN = gql`
  mutation SignInUser($email: String!, $password: String!) {
    userSignIn(userSignInInput: { email: $email, password: $password }) {
      token
    }
  }
`;

const UPDATE_PROFILE_PIC = gql`
  mutation UserUpdateProfilePicture($file: Upload!) {
    userUpdateProfilePicture(file: $file) {
      id
      username
      displayName
      email {
        emailAddress
        isVerified
      }
      profile {
        picture {
          public_id
          url
        }
        phone {
          phoneNumber
          isVerified
        }
        accountType
      }
    }
  }
`;

export { SIGN_UP, SIGN_IN, UPDATE_PROFILE_PIC };
