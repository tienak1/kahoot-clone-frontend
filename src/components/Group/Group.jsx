import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Group() {
  const [listUser, setListUser] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem("email"))["accessToken"];

  const getAllUsers = () => {
    axios({
      url: "http://localhost:8000/api/getuser",
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((res) => setListUser(res.data))
      .catch((err) => console.err(err));
  };

  useEffect(getAllUsers, []);

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
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-6">
          <h4>List User</h4>
          <ul className="list-group list-group-numbered">{renderListUser()}</ul>
        </div>
        <div className="col-6">
          <h4>My Group</h4>
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

          <button
            className="btn ms-2"
            style={{
              backgroundColor: "#20c997",
              color: "#fff",
              fontWeight: "bold",
            }}
            data-bs-toggle="collapse"
            data-bs-target="#collapseGroupName1"
            aria-expanded="false"
            aria-controls="collapseGroupName1"
          >
            Group Name 1
          </button>

          <div className="collapse mt-2" id="collapseExample">
            <div className="card ">
              <div className="card-header">Create New Group</div>
              <div className="card-body">
                <form>
                  <input
                    type="email"
                    className="form-control mb-3"
                    id="exampleFormControlInput1"
                    placeholder="name of group"
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
                        aria-label="Disabled input example"
                        list="listuser"
                      />
                    </div>
                    <div className="col-2">
                      <input
                        type="submit"
                        className="btn btn-danger w-100"
                        value="add"
                      />
                    </div>
                  </div>

                  <datalist id="listuser">
                    <option value="username1" />
                    <option value="username2" />
                    <option value="username3" />
                  </datalist>

                  <button
                    type="submit"
                    className="btn"
                    style={{
                      color: "#fff",
                      backgroundColor: "#ffc107",
                    }}
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="collapse mt-2" id="collapseGroupName1">
            <div className="card ">
              <div className="card-header">Group Name 1</div>
              <div className="card-body">{renderListUser()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
