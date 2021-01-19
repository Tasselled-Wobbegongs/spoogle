import React from 'react';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const LoginModal = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button className="button" onClick={() => setOpen(true)}>
        Open modal
      </button>

      <Modal 
        open={open} 
        onClose={() => setOpen(false)}
        center
        classNames={{
          overlayAnimationIn: 'customEnterOverlayAnimation',
          overlayAnimationOut: 'customLeaveOverlayAnimation',
          modalAnimationIn: 'customEnterModalAnimation',
          modalAnimationOut: 'customLeaveModalAnimation',
          overlay: 'customOverlay',
          modal: 'customModal',
        }}
        animationDuration={800}
        >
        <div id="modalbox">
          <button className="login">I just want to Spoogle some songs.</button>
          <button className="login">I'd like to connect via Spotify to access your premium features!</button>
        </div>
      </Modal>
    </>
  );
};

{/* <h2>Try tabbing/shift-tabbing thru elements</h2>
<form action="">
  <p>
    <label htmlFor="firstName">
      First name
      <input type="text" />
    </label>
  </p>
  <p>
    <label htmlFor="lastName">
      Last name
      <input type="text" />
    </label>
  </p>
  <button className="login">I just want to search for songs.</button>
  <input type="submit" value="Submit" />
</form> */}


export default LoginModal;