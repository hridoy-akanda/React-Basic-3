import React, { useState, useEffect } from "react";

import "./App.css";
import UserForm from "./Components/UserForm";

const url = "https://rest-api-without-db.herokuapp.com/users/";
const App = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // for update
  const [selectedUser, setSelectedUser] = useState({ username: "", email: "" });
  const [updateFlag, setUpdateFlag] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  const getAllUsers = () => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("Couldn't fetch");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setUsers(data.users);
        setError(null);
        // console.log(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setIsLoading(false);
        // setError(null);
      });
  };

  const handleDelete = (id) => {
    fetch(url + `/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Couldn't delete");
        } else {
          getAllUsers();
        }
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const addUser = (user) => {
    // console.log(user);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Couldn't Create");
        } else {
          getAllUsers();
        }
      })
      .catch((err) => setError(err.message));
  };

  const handleEdit = (id, username, email) => {
    setUpdateFlag(true);
    setSelectedUserId(id);
    setSelectedUser({ username: username, email: email });
  };
  const handleUpdate = (user) => {
    fetch(url + `/${selectedUserId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Couldn't Update");
        } else {
          getAllUsers();
          setUpdateFlag(false);
        }
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>User Manager</h1>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}

      {updateFlag ? (
        <UserForm
          btnText="Update User"
          selectedUser={selectedUser}
          handleAddUser={handleUpdate}
        />
      ) : (
        <UserForm btnText="Add User" handleAddUser={addUser} />
      )}

      <section>
        {users &&
          users.map((user) => {
            const { id, username, email } = user;
            return (
              <article key={id}>
                <p>{username}</p>
                <p>{email}</p>
                <button onClick={() => handleEdit(id, username, email)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(id)}>delete</button>
              </article>
            );
          })}
      </section>
    </div>
  );
};

export default App;
