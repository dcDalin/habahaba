import React, { useEffect, useContext } from 'react';
import { Divider, Button, Form, Icon, Modal } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import axios from 'axios';
import { SIGN_UP } from '../../../GraphQl/Mutations/Auth';
import AuthContext from '../../../context/AuthContext/authContext';
import AuthModalContext from '../../../context/AuthModalContext/authModalContext';
import styles from './SignUp.module.scss';

type FormData = {
  username: string;
  email: string;
  password: string;
};

const SignUpFormModal: React.FC = () => {
  // Get context stuff
  const { setToken } = useContext(AuthContext);
  const { closeSignUpModal, isSignUpOpen, openLoginModal } = useContext(AuthModalContext);

  const { register, handleSubmit, errors, setValue, triggerValidation } = useForm<FormData>();

  useEffect(() => {
    register(
      { name: 'username' },
      {
        required: true,
        minLength: 3,
        pattern: /^[\w-_.]*$/,
        maxLength: 10,
        validate: async (value: string): Promise<boolean> => {
          const response = await axios.post(`${process.env.REACT_APP_FIKLIN_URL}/auth/username-exists`, {
            username: value,
          });
          if (response.data.message === 'ok') {
            return true;
          }
          return false;
        },
      },
    );

    register(
      { name: 'email' },
      {
        required: true,
        pattern: /\S+@\S+\.\S+/,
        validate: async (value: string): Promise<boolean> => {
          const response = await axios.post(`${process.env.REACT_APP_FIKLIN_URL}/auth/email-exists`, { email: value });
          if (response.data.message === 'ok') {
            return true;
          }
          return false;
        },
      },
    );
    register(
      { name: 'password' },
      {
        pattern: /^\S+$/,
        required: true,
        minLength: 6,
        maxLength: 15,
      },
    );
  }, [register]);

  const [addUser, { loading }] = useMutation(SIGN_UP, {
    update(_, { data }) {
      setToken(data.userSignUp.token);
    },
    onError(err) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      console.log(err.graphQLErrors[0].extensions!.exception.errors);
    },
  });

  const onSubmit = handleSubmit(({ username, email, password }) => {
    addUser({
      variables: {
        username,
        email,
        password,
      },
    });
  });
  return (
    <>
      <Modal
        size="mini"
        open={isSignUpOpen}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        onClose={closeSignUpModal}
        closeIcon
        className={styles.customCard}
      >
        <Modal.Content>
          <h3 className={styles.customFormTitle}>Create a new Fiklin account</h3>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Button
              onClick={(): any => window.open(`${process.env.REACT_APP_FIKLIN_URL}/auth/facebook`, '_self')}
              className={styles.customLinkButton}
              style={{ margin: '0.4em' }}
            >
              <Icon name="facebook" className={styles.facebookFontColor} />
              &nbsp;Sign up with Facebook
            </Button>
            <Button
              onClick={(): any => window.open(`${process.env.REACT_APP_FIKLIN_URL}/auth/google`, '_self')}
              className={styles.customLinkButton}
              style={{ margin: '0.4em' }}
            >
              <Icon name="google" className={styles.googleFontColor} />
              &nbsp;Sign up with Google
            </Button>
          </div>
        </Modal.Content>
        <Modal.Content style={{ textAlign: 'center' }}>
          <Form className={styles.customForm} noValidate onSubmit={onSubmit} loading={loading}>
            <Form.Input
              className={styles.customFormInput}
              type="text"
              label="Username"
              fluid
              placeholder="Username"
              name="username"
              onChange={async (e, { name, value }): Promise<void> => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.username}
            />
            {errors.username && errors.username.type === 'required' && <p>Username is required</p>}
            {errors.username && errors.username.type === 'pattern' && <p>Username is invalid</p>}
            {errors.username && errors.username.type === 'minLength' && (
              <p>Username should be at least 3 characters long</p>
            )}
            {errors.username && errors.username.type === 'maxLength' && <p>Username is too long</p>}
            {errors.username && errors.username.type === 'validate' && <p>Username already exists</p>}
            <Form.Input
              className={styles.customFormInput}
              type="email"
              label="Email"
              fluid
              placeholder="Email"
              name="email"
              onChange={async (e, { name, value }): Promise<void> => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.email}
            />
            {errors.email && errors.email.type === 'required' && <p>Email is required</p>}
            {errors.email && errors.email.type === 'pattern' && <p>Your email is invalid</p>}
            {errors.email && errors.email.type === 'validate' && <p>Email already exists</p>}
            <Form.Input
              className={styles.customFormInput}
              type="password"
              label="Password"
              fluid
              placeholder="Password"
              name="password"
              onChange={async (e, { name, value }): Promise<void> => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.password}
            />
            {errors.password && errors.password.type === 'pattern' && <p>No spaces allowed</p>}
            {errors.password && errors.password.type === 'required' && <p>Password is required</p>}
            {errors.password && errors.password.type === 'minLength' && (
              <p>Password should have at least 6 characters</p>
            )}
            {errors.password && errors.password.type === 'maxLength' && <p>Password is too long</p>}
            <Button
              type="submit"
              className={`${styles.customSuccessButton} ${styles.customAuthBtn}`}
              style={{ marginTop: '16px' }}
            >
              Sign Up
            </Button>
          </Form>
          <Divider />
          <p className={styles.customBottomText}>By signing up, you agree to Fiklins Terms of Service.</p>
          <p>
            <Button onClick={openLoginModal} className={styles.customLinkButton}>
              Login instead.
            </Button>
          </p>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default withRouter(SignUpFormModal);
