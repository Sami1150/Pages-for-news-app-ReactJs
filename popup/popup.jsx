import React, { useState } from 'react';
import './popup.css';

function Popup({ title, description }) {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <div className="popup-link">
        <a href="#popup2" onClick={togglePopup}>Click Me (Style 2)</a>
      </div>

      {showPopup && (
        <div id="popup2" className="popup-container popup-style-2">
          <div className="popup-content">
            <a href="#" className="close" onClick={togglePopup}>&times;</a>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;