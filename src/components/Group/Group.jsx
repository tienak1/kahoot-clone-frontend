import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";

export default function Group() {
  const accessToken = JSON.parse(localStorage.getItem("user"))["accessToken"];
  const username = JSON.parse(localStorage.getItem("user"))["username"];
  const [listUser, setListUser] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [listNewUser, setListNewUser] = useState([]);
  const [nameOfGroup, setNameOfGroup] = useState("");
  const [listGroup, setListGroup] = useState([]);
  const [role, setRole] = useState("");
  const [usernameChange, setUsernameChange] = useState("");

  useEffect(() => {
    // GET ALL USERS
    axios({
      url: "http://localhost:8000/api/getuser",
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((res) => setListUser(res.data))
      .catch((err) => console.err(err));

    // GET ALL GROUP
    axios({
      url: "http://localhost:8000/api/getgroup",
      method: "PUT",
      data: {
        username: username,
      },
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((res) => setListGroup(res.data.content))
      .catch((err) => console.err(err));

    // CHANGE ROLE OF USER
    axios({
      url: "http://localhost:8000/api/changerole",
      method: "PUT",
      data: {
        usernameChange: usernameChange,
        role: role,
      },
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((res) => {
        // setRole(res.data.content.role);
        return <Navigate to="/creategroup" />;
      })
      .catch((err) => console.log(err));
  }, [role]);

  const renderListUser = () => {
    return listUser.map((item) => (
      <li
        className="list-group-item d-flex justify-content-between align-items-start"
        key={item.id}
      >
        <div className="ms-3 me-auto">
          <div className="fw-bold">{item.name}</div>
          <p>
            username: <span>{item.username}</span>
          </p>
        </div>
        <button className="btn btn-create align-items-center">Add</button>
      </li>
    ));
  };

  const renderListNewUser = () => {
    return listNewUser.map((item, index) => {
      return (
        <div className="col-3" key={index}>
          <input
            className="form-control mb-3"
            type="text"
            placeholder={item}
            id={index}
            name={item}
            disabled
            style={{
              backgroundColor: "#FFDFD3",
              color: "#white",
              fontWeight: "bold",
            }}
          />
        </div>
      );
    });
  };

  const handleCreateNewGroup = () => {
    axios({
      url: "http://localhost:8000/api/creategroup",
      method: "PUT",
      data: {
        username: username,
        listNewUser: listNewUser,
        nameofgroup: nameOfGroup,
      },
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const renderListGroup = () => {
    let listGroupArray = Object.entries(listGroup);
    return listGroupArray.map((item) => {
      return (
        <button
          className="btn ms-2"
          style={{
            backgroundColor: "#20c997",
            color: "#fff",
            fontWeight: "bold",
          }}
          data-bs-toggle="collapse"
          data-bs-target={`#${item[1].name}`}
          aria-expanded="false"
          aria-controls={item[1].name}
          key={item[1].id}
        >
          {item[1].name}
        </button>
      );
    });
  };

  console.log(listUser);
  const renderGroupDetail = () => {
    let listGroupArray = Object.entries(listGroup);
    return listGroupArray.map((item) => {
      return (
        <div
          className={`collapse mt-2 ${item[1].name}`}
          id={item[1].name}
          key={item[1].id}
        >
          <div className="card ">
            <div
              className="card-header bg-danger text-white display-6"
              style={{
                fontWeight: "bold",
              }}
            >
              Group: {item[1].name}
            </div>
            <div className="card-body">
              <h3 className="mb-4">owner: {item[1].owner}</h3>
              <p
                className="text-warning"
                style={{
                  fontWeight: "bold",
                  fontSize: "30px",
                }}
              >
                Member
              </p>
              {item[1].listUser.map((user) => (
                <li
                  className="list-group-item d-flex justify-content-start align-items-start"
                  key={item.id}
                >
                  <div className="ms-3 me-auto">
                    <div className="fw-bold">{user}</div>
                    <p>
                      role:{" "}
                      <span>
                        {listUser.map((item) => {
                          if (item.username === user) return item.role;
                        }) || "student"}
                      </span>
                    </p>
                  </div>
                  <select
                    className="btn btn-create align-items-center py-2"
                    onChange={(e) => {
                      setRole(e.target.value);
                      setUsernameChange(user);
                    }}
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="assistant">Assistant</option>
                  </select>
                </li>
              ))}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-6">
          <h4>List User</h4>
          <ul className="list-group list-group-numbered">{renderListUser()}</ul>
        </div>
        <div className="col-6">
          <h4>My Group</h4>
          {/* Create a new group */}
          <button
            className="btn"
            style={{
              backgroundColor: "#26890C",
              color: "#fff",
            }}
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            New Group
            <i className="fa fa-plus ms-2"></i>
          </button>
          {/* Create a new group */}

          {/* Display all group of user  */}
          {renderListGroup()}
          {/* Display all group of user  */}

          {/* Create a new group FORM  */}
          <div className="collapse mt-2" id="collapseExample">
            <div className="card ">
              <div className="card-header">Create New Group</div>
              <div className="card-body">
                <form onSubmit={handleCreateNewGroup}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="nameofgroup"
                    name="nameofgroup"
                    placeholder="name of group"
                    onChange={(e) => setNameOfGroup(e.target.value)}
                  />
                  <input
                    className="form-control mb-3"
                    type="text"
                    placeholder="Group Owner"
                    aria-label="Disabled input example"
                    disabled
                  />
                  <div className="row">
                    <div className="col-10">
                      <input
                        className="form-control mb-3"
                        type="text"
                        placeholder="add user"
                        id="adduser"
                        name="adduser"
                        aria-label="Disabled input example"
                        list="listuser"
                        onChange={(e) => {
                          setNewUsername(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-2">
                      <input
                        type="button"
                        className="btn btn-danger w-100"
                        value="add"
                        onClick={() => {
                          setListNewUser([...listNewUser, newUsername]);
                          document.querySelector("#adduser").value = null;
                        }}
                      />
                    </div>

                    <div className="row">{renderListNewUser()}</div>
                  </div>

                  <datalist id="listuser">
                    <option value="username1" />
                    <option value="username2" />
                    <option value="username3" />
                  </datalist>

                  <button
                    type="button"
                    className="btn"
                    style={{
                      color: "#fff",
                      backgroundColor: "#ffc107",
                    }}
                    onClick={() => handleCreateNewGroup()}
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* Create a new group FORM  */}

          <div className="collapse mt-2" id="collapseGroupName1">
            <div className="card ">
              <div className="card-header">Group Name 1</div>
              <div className="card-body"></div>
            </div>
          </div>
          {renderGroupDetail()}
        </div>
      </div>
    </div>
  );
}
