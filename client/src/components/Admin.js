import React from "react";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <div className="bg-black">
      <Link to="/editor">
        <button>New Problem:</button>
      </Link>
    </div>
  );
}

export default Admin;
