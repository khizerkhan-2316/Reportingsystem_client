import validator from 'validator';
import { useState } from 'react';
import ModalCard from '../ModalCard/ModalCard';
import Modal from '../Modal/Modal.js';
import Button from '../../stateless/Button/Button.js';

const CreateAdmin = ({
  isCreatedAdminModalOpen,
  setIsCreatedAdminModalOpen,
}) => {
  const [nameInput, setNameInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [text, setText] = useState('');
  const [heading, setHeading] = useState('');
  const [modalActive, setModalActive] = useState(false);

  const setMessage = (message, heading) => {
    setText(message);
    setHeading(heading);
    setModalActive(true);
  };

  const nameHandler = (e) => {
    setNameInput(e.target.value);
  };

  const usernameHandler = (e) => {
    setUsernameInput(e.target.value);
  };

  const emailHandler = (e) => {
    setEmailInput(e.target.value);
  };

  const passwordHandler = (e) => {
    setPasswordInput(e.target.value);
  };

  const dialogHandler = () => {
    if (isCreatedAdminModalOpen) {
      setIsCreatedAdminModalOpen(false);
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

  const createAdmin = async (body) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_SERVER_ENDPOINT}/api/users/register-admin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem(
              process.env.REACT_APP_ADMIN_ACCESS_TOKEN_KEY
            ),
          },
          body: JSON.stringify(body),
        }
      );

      return response;
    } catch (e) {
      return e;
    }
  };

  const submitHandler = async () => {
    if (!validateFields(nameInput, usernameInput, emailInput, passwordInput)) {
      setMessage('Invalid Inputs', 'Check fields!');
      return;
    }

    try {
      const body = {
        name: nameInput,
        username: usernameInput,
        email: emailInput,
        password: passwordInput,
      };

      const request = await createAdmin(body);
      await checkRequest(request);
    } catch (e) {
      setMessage(e, 'Error');
    }
  };

  const checkRequest = async (request) => {
    if (!request.ok) {
      const response = await request.json();
      setMessage(response.message, 'Error');
    } else if (request.ok) {
      setMessage('Succesfully Created', 'Admin Created!');
      setTimeout(() => {
        dialogHandler();
      }, 1000);
    }
  };
  return (
    <>
      <ModalCard heading="Create Admin">
        <div className="input-container">
          <label htmlFor="name">Name:</label>
          <input name="name" type="text" required onChange={nameHandler} />

          <label htmlFor="username">Username:</label>
          <input
            name="username"
            type="text"
            required
            onChange={usernameHandler}
          />

          <label htmlFor="email">Email:</label>
          <input name="email" type="text" required onChange={emailHandler} />

          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="text"
            required
            onChange={passwordHandler}
          />
        </div>

        <div className="button-container-update">
          <Button onClick={submitHandler}>Submit</Button>
          <Button onClick={dialogHandler}>Cancel</Button>
        </div>
      </ModalCard>
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

export default CreateAdmin;
