import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="container">
      <h1 className="display-4 text-center">Profile Not Found</h1>
      <p className="text-center">The profile you requested does not exist</p>
      <Link className="btn btn-light" to="/profiles">
        Back To Profiles
      </Link>
    </div>
  );
};
