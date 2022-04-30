import ReactDOM from 'react-dom';
import './ModalCard.css';
import Button from '../../stateless/Button/Button.js';

const Information = (props) => {
  const buttonHandler = () => {
    if (props.modalActive) {
      props.setModalActive(false);
    }
  };

  return (
    <div onClick={buttonHandler} className="modal-main-container">
      <div className="modalContainer">
        <div className="modalHeading">
          <h2>{props.heading}</h2>
        </div>
        <p>{props.text}</p>
        <div className="button-container">
          <Button
            onClick={buttonHandler}
            className="button"
            style={{ width: '40%' }}
          >
            {''}
            Okay
          </Button>
        </div>
      </div>
    </div>
  );
};

const ModalCard = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Information
          modalActive={props.modalActive}
          text={props.text}
          heading={props.heading}
          setModalActive={props.setModalActive}
        />,
        document.getElementById('information-root')
      )}
    </>
  );
};
