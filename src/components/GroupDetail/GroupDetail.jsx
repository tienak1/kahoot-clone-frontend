import React from "react";
import { useEffect } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroup } from "../../actions/group";
import ListMember from "../ListMember/ListMember";
import ListUser from "../ListUser/ListUser";
import { Modal } from "antd";
import { useState } from "react";
import history from "../../App";
import { NavLink } from "react-router-dom";

const GroupDetail = () => {
  const dispatch = useDispatch();
  const { group } = useSelector((state) => state.group);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllGroup());
  }, []);

  // Modal Invite Link
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // Modal Invite Link END

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div className="cards">
            {group.map((item, index) => {
              return (
                <React.Fragment>
                  <div className={`card-group card-group-${index + 1} my-2`}>
                    <h3 className="text-white">
                      {item.groupName}
                      <span className="ms-3">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={showModal}
                        >
                          Invite Link
                        </button>
                        <NavLink
                          to={`join/${item._id}`}
                          className="btn btn-warning btn-sm"
                        >
                          Join Group
                        </NavLink>
                      </span>
                    </h3>
                    <p className="card-group__exit mb-0">
                      <i class="fa-solid fa-trash text-danger fs-2"></i>
                    </p>
                    <small className="card-group__title text-warning">
                      {item.description}
                    </small>
                    <p>
                      <ListMember members={item.members} groupItem={item} />
                    </p>
                    <p>{"   "}</p>
                    <p>{"   "}</p>
                    <p>{"   "}</p>
                    <p>{"   "}</p>
                    <p>{"   "}</p>
                    <p>{"   "}</p>
                    <p>{"   "}</p>
                  </div>
                  <Modal
                    title="Basic Modal"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <p>{`http:localhost:8000/api/group/${item._id}/invite`}</p>
                  </Modal>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className="col-6">
          <ListUser listGroup={group} />
        </div>
      </div>
    </div>
  );
};

export default memo(GroupDetail);
