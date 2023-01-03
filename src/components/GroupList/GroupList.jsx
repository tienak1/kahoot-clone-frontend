import React from "react";
import { useEffect } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroup, getAllGroup } from "../../actions/group";
import "../../assets/scss/components/GroupList.scss";

function GroupList(props) {
  const { group } = useSelector((state) => state.group);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllGroup());
  }, []);
  return (
    <div>
      <div className="cards">
        {group.map((item) => {
          return (
            <div className="card-group card-group-1">
              <h3>{item.groupName}</h3>
              <p
                className="card-group__exit"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  dispatch(deleteGroup({ groupId: item._id, userId: user._id }))
                }
              >
                <i class="fa-solid fa-trash"></i>
              </p>
              <h2 className="card-group__title">{item.description}</h2>
              <p className="card-group__apply">
                <a className="card-group__link bg-dark p-2" href="">
                  View Detail <i className="fas fa-arrow-right" />
                </a>
              </p>
            </div>
          );
        })}
        {/* <div className="card-group card-group-2">
          <div className="card-group__icon">
            <i className="fas fa-bolt" />
          </div>
          <p className="card-group__exit">
            <i class="fa-solid fa-trash"></i>
          </p>
          <h2 className="card-group__title">
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </h2>
          <p className="card-group__apply">
            <a className="card-group__link" href="#">
              Apply Now <i className="fas fa-arrow-right" />
            </a>
          </p>
        </div>
        <div className="card-group card-group-3">
          <div className="card-group__icon">
            <i className="fas fa-bolt" />
          </div>
          <p className="card-group__exit">
            <i class="fa-solid fa-trash"></i>
          </p>
          <h2 className="card-group__title">Ut enim ad minim veniam.</h2>
          <p className="card-group__apply">
            <a className="card-group__link" href="#">
              Apply Now <i className="fas fa-arrow-right" />
            </a>
          </p>
        </div>
        <div className="card-group card-group-4">
          <div className="card-group__icon">
            <i className="fas fa-bolt" />
          </div>
          <p className="card-group__exit">
            <i class="fa-solid fa-trash"></i>
          </p>
          <h2 className="card-group__title">
            Quis nostrud exercitation ullamco laboris nisi.
          </h2>
          <p className="card-group__apply">
            <a className="card-group__link" href="#">
              Apply Now <i className="fas fa-arrow-right" />
            </a>
          </p>
        </div>
        <div className="card-group card-group-5">
          <div className="card-group__icon">
            <i className="fas fa-bolt" />
          </div>
          <p className="card-group__exit">
            <i class="fa-solid fa-trash"></i>
          </p>
          <h2 className="card-group__title">
            Ut aliquip ex ea commodo consequat. Duis aute irure dolor.
          </h2>
          <p className="card-group__apply">
            <a className="card-group__link" href="#">
              Apply Now <i className="fas fa-arrow-right" />
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default memo(GroupList);
