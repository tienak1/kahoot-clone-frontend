import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { inviteMember } from "../../actions/group";

function JoinGroup() {
  const [inviteLink, setInviteLink] = useState("");
  const params = useParams();
  const { groupId } = params;
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const handleInviteMember = ({ groupId, memberId }) => {
    dispatch(inviteMember({ groupId, memberId }));
  };
  return (
    <div className="text-center">
      <h1 className="text-white pt-5" style={{ fontWeight: "bold" }}>
        Join Group
      </h1>
      <div className="d-flex justify-content-center">
        <input
          type="text"
          placeholder="Invite Link"
          className="fs-3 p-2"
          onChange={(e) => {
            setInviteLink(e.target.value);
            handleInviteMember();
          }}
        />
        <button
          className="bg-dark text-white"
          onClick={() => {
            const data = {
              groupId: groupId,
              memberId: user._id,
            };
            handleInviteMember(data);
          }}
        >
          Join
        </button>
      </div>
    </div>
  );
}

export default JoinGroup;
