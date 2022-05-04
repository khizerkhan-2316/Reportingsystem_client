import ReactDOM from 'react-dom';
import './ModalCard.css';

const ModalCard = ({ buttonHandler, heading, children }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div onClick={buttonHandler} className="modalcard-main-container">
          <div className="modalcardContainer">
            <div className="modalcardHeading">
              <h2>{heading}</h2>
            </div>
            {children}
          </div>
        </div>,
        document.getElementById('information-root')
      )}
    </>
  );
};

export default ModalCard;
