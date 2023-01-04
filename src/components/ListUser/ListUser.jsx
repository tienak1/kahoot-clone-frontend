import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMember, getAllGroup } from "../../actions/group";
import { getUsers } from "../../actions/user";

function ListUser(props) {
  const { listGroup } = props;
  const user = JSON.parse(localStorage.getItem("user"));
  const [userId, setUserId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [role, setRole] = useState("");
  const users = useSelector((state) => state.user);
  console.log(users);
  const newListUser = users.filter((item) => item._id !== user._id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className="container">
      {newListUser?.map((user) => (
        <article
          className="leaderboard__profile my-4"
          style={{
            backgroundColor: "#B1AFFF",
          }}
        >
          <div className="col-3">
            <span
              className="leaderboard__name text-white"
              value={user._id}
              onClick={(e) => setUserId(user._id)}
            >
              {user.name}
            </span>
          </div>
          {/* <div className="col-2">
            <span className="leaderboard__value text-black">
              {user.role || "member"}
            </span>
          </div> */}
          <div className="col-3">
            <span>
              <select
                class="form-select form-select-lg "
                style={{
                  width: "90%",
                }}
                onChange={(e) => setGroupName(e.target.value)}
              >
                <option selected>Select Group</option>
                {listGroup.map((item) => (
                  <option>{item.groupName}</option>
                ))}
              </select>
            </span>
          </div>
          <div className="col-2">
            <span>
              <select
                class="form-select form-select-lg"
                style={{
                  width: "90%",
                }}
                onChange={(e) => setRole(e.target.value)}
              >
                <option selected>Select Role</option>
                <option value="owner">Owner</option>
                <option value="co-owner">Co-owner</option>
                <option value="member">Member</option>
              </select>
            </span>
          </div>

          <div className="col-2">
            <span>
              <button
                className="btn btn-primary"
                onClick={() => {
                  const data = { userId, groupName, role };
                  dispatch(addMember(data));
                }}
              >
                ADD
              </button>
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ListUser;
