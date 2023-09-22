import React from 'react';
import './newspopup.css'
function NewsPopup({ title, description }) {
  return (
    <div id="popup2" className="popup-container popup-style-2">
      <div className="popup-content">
        <a href="#" className="close">&times;</a>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default NewsPopup;
