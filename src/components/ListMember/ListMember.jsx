import axios from "axios";
import React, { useEffect } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../actions/user";
import "../../assets/scss/components/ListMember.scss";

function ListMember(props) {
  const { members } = props;
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
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <div>
      {newMembers.map((member) => (
        <div className="leaderboard__profile my-1">
          <span className="leaderboard__name me-5">{member.name}</span>
          <span className="leaderboard__value">{member.role}</span>
        </div>
      ))}
    </div>
  );
}

export default memo(ListMember);
