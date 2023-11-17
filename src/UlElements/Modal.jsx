import React from 'react'
import "./modal.css";

const Modal = (props) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Share Modal</h2>
          <span className="close-button" onClick={props.onClose}>
            &times;
          </span>
        </div>

        <hr />
        <p>Share on social media:</p>
        <div className="social-icons">
          <i class="bx bxl-instagram-alt"></i>
          <i class="bx bxl-whatsapp"></i>
          <i class="bx bxl-telegram"></i>
        </div>
        <button
          onClick={props.onClose}
          className="button main-color-button footer-close-btn"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal