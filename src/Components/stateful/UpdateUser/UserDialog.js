import './UserDialog.css';
import Button from '../../stateless/Button/Button.js';
import { useState } from 'react';
import { UpdateUser } from '../../../utils/UserRequests.js';
import Modal from '../Modal/Modal.js';
import validator from 'validator';
const UserDialog = ({ user, dialogHandler }) => {
  const { name, username, email, state, dealerId } = user;

  const [nameInput, setNameInput] = useState(name);
  const [usernameInput, setUsernameInput] = useState(username);
  const [emailInput, setEmailInput] = useState(email);
  const [stateInput, setStateInput] = useState(state);
  const [text, setText] = useState('');
  const [heading, setHeading] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [modalActive, setModalActive] = useState(false);

  const nameHandler = (e) => {
    setNameInput(e.target.value);
  };

  const usernameHandler = (e) => {
    setUsernameInput(e.target.value);
  };

  const emailHandler = (e) => {
    setEmailInput(e.target.value);
  };

  const selectOptionHandler = (e) => {
    setStateInput(e.target.value);
  };

  const passwordHandler = (e) => {
    setPasswordInput(e.target.value);
  };

  const setError = (message, heading) => {
    setText(message);
    setHeading(heading);
    setModalActive(true);
  };

  const submitHandler = async () => {
    if (!validateFields(nameInput, usernameInput, emailInput, passwordInput)) {
      setError('Invalid Inputs', 'Check fields!');
      return;
    }
    try {
      const body = {
        name: nameInput,
        username: usernameInput,
        email: emailInput,
        state: stateInput,
        password: passwordInput,
      };

      const request = await UpdateUser(
        body,
        dealerId,
        localStorage.getItem(process.env.REACT_APP_ADMIN_ACCESS_TOKEN_KEY)
      );
      await checkRequest(request);
    } catch (e) {
      setError(e, 'Error');
    }
  };

  const validateFields = (
    nameInput,
    usernameInput,
    emailInput,
    passwordInput
  ) => {
    const emailIsValid = validator.isEmail(emailInput);

    return nameInput !== '' &&
      usernameInput !== '' &&
      emailIsValid &&
      passwordInput !== ''
      ? true
      : false;
  };

  const checkRequest = async (request) => {
    if (!request.ok) {
      const response = await request.json();
      setError(response.message, 'Error');
    } else if (request.ok) {
      setError('Succesfully Updated', 'Updated!');
      setTimeout(() => {
        dialogHandler();
      }, 1000);
    }
  };

  return (
    <>
      <div className="user-dialog">
        <div className="user-dialog-card">
          <div className="heading-container">
            <h2>Update user</h2>
          </div>
          <div className="input-container">
            <label htmlFor="name">Name:</label>
            <input
              name="name"
              type="text"
              value={nameInput}
              onChange={nameHandler}
            />

            <label htmlFor="username">Username:</label>
            <input
              name="username"
              type="text"
              value={usernameInput}
              onChange={usernameHandler}
            />

            <label htmlFor="email">Email:</label>
            <input
              name="email"
              type="text"
              value={emailInput}
              onChange={emailHandler}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              name="password"
              type="password"
              onChange={passwordHandler}
              required
            />

            <label htmlFor="state">State:</label>
            <select
              name="state"
              required
              onChange={selectOptionHandler}
              defaultValue={stateInput === 'active' ? 'active' : 'inactive'}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="button-container-update">
            <Button onClick={submitHandler}>Submit</Button>
            <Button onClick={dialogHandler}>Cancel</Button>
          </div>
        </div>
      </div>
      )
      {modalActive && (
        <Modal
          modalActive={modalActive}
          setModalActive={setModalActive}
          text={text}
          heading={heading}
        />
      )}
    </>
  );
};

export default UserDialog;
