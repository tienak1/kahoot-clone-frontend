import { useSelect } from "@mui/base";
import React from "react";
import { useEffect } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroup, deleteGroup } from "../../actions/group";
import { getUsers } from "../../actions/user";
import ListMember from "../ListMember/ListMember";
import ListUser from "../ListUser/ListUser";

const GroupDetail = () => {
  const dispatch = useDispatch();
  const { group } = useSelector((state) => state.group);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllGroup());
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div className="cards">
            {group.map((item, index) => {
              return (
                <React.Fragment>
                  <div className={`card-group card-group-${index + 1} my-2`}>
                    <h3 className="text-white">{item.groupName}</h3>
                    <p className="card-group__exit mb-0">
                      <i class="fa-solid fa-trash text-danger fs-2"></i>
                    </p>
                    <small className="card-group__title text-warning">
                      {item.description}
                    </small>
                    <p>
                      <ListMember members={item.members} />
                    </p>
                    <p>{"   "}</p>
                    <p>{"   "}</p>
                    <p>{"   "}</p>
                    <p>{"   "}</p>
                    <p>{"   "}</p>
                    <p>{"   "}</p>
                    <p>{"   "}</p>
                  </div>
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
