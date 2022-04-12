import '../../../root.css';
import './LoginCard.css';
import Button from '../../stateless/Button/Button.js';
import Modal from '../Modal/Modal.js';
import { useState } from 'react';
import {
  submitHandler,
  validatedCredentials,
  addAccessToken,
} from '../../../utils/Auth.js';

const LoginCard = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [text, setText] = useState('');
  const [heading, setHeading] = useState('');
  const [modalActive, setModalActive] = useState(false);

  const emailHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submit = async () => {
    const validate = validatedCredentials(username, password);

    if (!validate) {
      setText('Check your username and password and try again!');
      setHeading('Check Credentials!');
      setModalActive(true);
      return;
    }

    const response = await submitHandler(username, password, props.url);
    if (!response.success) {
      setText(response.message);
      setHeading('Error');
      setModalActive(true);
    }

    if (response.success) {
      localStorage.setItem(props.storageKey, true);
      props.setAuthentication(true);
      addAccessToken(response);
    }
  };

  return (
    <div className="login__main__container">
      <div className="sidebar__login__container">
        <form className="login-form">
          <div className="login-form-content">
            <h1>{props.heading}</h1>

            <input
              type="text"
              className="input-field username"
              placeholder="Username"
              onChange={emailHandler}
            />
            <input
              type="password"
              className="input-field password"
              placeholder="Password"
              onChange={passwordHandler}
            />

            <Button
              type="button"
              style={{ width: '80%', marginTop: '10px' }}
              onClick={submit}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
      <div className="login-hero-image"></div>
      {modalActive ? (
        <Modal
          modalActive={modalActive}
          setModalActive={setModalActive}
          text={text}
          heading={heading}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default LoginCard;
