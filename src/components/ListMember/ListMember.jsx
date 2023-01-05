import axios from "axios";
import React, { useEffect, useState } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRoleOfMember, getAllGroup } from "../../actions/group";
import { getUsers } from "../../actions/user";
import { deleteMemberFromGroup } from "../../api";
import "../../assets/scss/components/ListMember.scss";

function ListMember(props) {
  const { members, groupItem } = props;
  // Lấy tất cả users
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const getUserById = (userId) => {
    return users.find((user) => user._id === userId);
  };
  const newMembers = members.map((member) => {
    const userFind = getUserById(member.id);
    return { ...member, name: userFind?.name };
  });
  // Change role of members
  const user = JSON.parse(localStorage.getItem("user"));
  const handleChangeRole = ({ groupId, memberId, newRole }) => {
    if (groupItem.owner !== user._id) {
      alert("You must be owner of the group to change role of this member");
      return;
    }
    // if (memberId === user._id) {
    //   alert("You cannot delete yourself from the group");
    //   return;
    // }
    const data = { groupId: groupId, memberId: memberId, newRole: newRole };
    console.log("data ", data);
    dispatch(changeRoleOfMember(data));
  };

  const handleDeleteMember = ({ groupId, memberId }) => {
    console.log("Nothing");
  };
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <div>
      {newMembers.map((member) => (
        <div className="leaderboard__profile my-1">
          <span className="leaderboard__name me-5">{member.name}</span>
          <span className="leaderboard__value">{member.role}</span>
          <div>
            <select
              class="form-select form-select-lg"
              onChange={(e) => {
                const data = {
                  groupId: groupItem._id,
                  memberId: member.id,
                  newRole: e.target.value,
                };

                handleChangeRole(data);
              }}
            >
              <option value="owner">Owner</option>
              <option value="co-owner">Co-owner</option>
              <option value="member">Member</option>
            </select>
          </div>
          <span>
            <button
              className="btn btn-danger ms-3"
              onChange={(e) => handleDeleteMember()}
            >
              Delete
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}

export default memo(ListMember);
