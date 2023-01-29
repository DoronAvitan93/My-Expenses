
// import classes from './MessageModal.module.css';
import ReactDOM from 'react-dom';
import './MessageModal.css'


//popup message for actions
const MessageModal = (props) => {
  return (
    <div>
      {
        ReactDOM.createPortal(
          <div className='backdrop' onClick={props.onConfirm} />,
          document.getElementById("backdrop-root")
        )
      }
      {
        ReactDOM.createPortal(
          <div className='modal'>
            <header className='header'>
              <h2>{props.title}</h2>
            </header>
            <div className='content'>
              <h3 className='messageBody'>{props.message}</h3>
            </div>
            <footer className='actions'>
              <button className='Modal__button' onClick={props.onConfirm}>Ok</button>
            </footer>
          </div>,
          document.getElementById("overlay-root")
        )
      }
    </div>
  );
};

export default MessageModal;
