import React from "react";
import "./NotFound404.scss";

const NotFound404 = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <h1 className="error-heading">404 Not Found</h1>
        <p className="error-message">
          The page you are looking for could not be found.
        </p>
        <a href="/" className="back-link">
          Go back to the homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound404;
