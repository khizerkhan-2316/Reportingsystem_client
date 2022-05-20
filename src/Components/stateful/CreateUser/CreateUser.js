import ModalCard from '../ModalCard/ModalCard';
import Button from '../../stateless/Button/Button.js';
import { useState } from 'react';
import validator from 'validator';
import Modal from '../Modal/Modal.js';
import { createUser } from '../../../utils/UserRequests.js';

const CreateUser = ({ isCreatedUserModalOpen, setIsCreatedUserModalOpen }) => {
  const [dealerId, setDealerId] = useState('');
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

  const dealerIdHandler = (e) => {
    setDealerId(e.target.value);
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
    if (isCreatedUserModalOpen) {
      setIsCreatedUserModalOpen(false);
    }
  };

  const validateFields = (
    dealerInput,
    nameInput,
    usernameInput,
    emailInput,
    passwordInput
  ) => {
    const emailIsValid = validator.isEmail(emailInput);

    return nameInput !== '' &&
      usernameInput !== '' &&
      emailIsValid &&
      passwordInput !== '' &&
      dealerInput !== ''
      ? true
      : false;
  };

  const submitHandler = async () => {
    if (
      !validateFields(
        dealerId,
        nameInput,
        usernameInput,
        emailInput,
        passwordInput
      )
    ) {
      setMessage('Invalid Inputs', 'Check fields!');
      return;
    }

    try {
      const body = {
        dealerId: dealerId,
        name: nameInput,
        username: usernameInput,
        email: emailInput,
        password: passwordInput,
      };

      const request = await createUser(body);
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
      setMessage('Succesfully Created', 'User Created!');
      setTimeout(() => {
        dialogHandler();
      }, 1000);
    }
  };
  return (
    <>
      <ModalCard heading="Create User">
        <div className="input-container">
          <label htmlFor="dealerId">Dealer ID:</label>
          <input
            name="dealerId"
            type="text"
            required
            onChange={dealerIdHandler}
          />

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

export default CreateUser;
