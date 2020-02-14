import gql from 'graphql-tag';

const WHO_IS_ME = gql`
  query whoIsMe {
    me {
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

const LOAD_USER = gql`
  query whoIsMe {
    me {
      id
      username
      displayName
      profile {
        accountType
      }
    }
  }
`;

export { WHO_IS_ME, LOAD_USER };
