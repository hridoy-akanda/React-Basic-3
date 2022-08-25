import React, { useState, useEffect } from "react";

import "./UserForm.css";

const UserForm = ({ btnText, selectedUser, handleAddUser }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const { username, email } = user;

  useEffect(() => {
    setUser({
      username: selectedUser.username,
      email: selectedUser.email,
    });
  }, [selectedUser]);

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddUser(user);
    setUser({ username: "", email: "" });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="formSection">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleChange}
          placeholder="username"
          required
        />
      </div>
      <div className="formSection">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
          placeholder="email"
          required
        />
      </div>
      <button type="submit">{btnText}</button>
    </form>
  );
};

UserForm.defaultProps = {
  selectedUser: {
    username: "",
    email: "",
  },
};

export default UserForm;
