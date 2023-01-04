import { useFormik } from "formik";
import React from "react";
import { memo } from "react";
import "../../assets/scss/components/GroupCreate.scss";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { createNewGroup } from "../../actions/group";

function GroupCreate() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const form = useFormik({
    initialValues: {
      groupName: "",
      description: "",
    },

    validationSchema: yup.object().shape({
      groupName: yup.string().required("groupName cannot be empty"),
      description: yup
        .string()
        .max(255, "description does not more than 255 characters"),
    }),
    onSubmit: (values) => {
      const data = { ...values, owner: user._id };
      dispatch(createNewGroup(data));
      window.location.reload();
    },
  });
  return (
    <form className="form-group my-5" onSubmit={form.handleSubmit}>
      <div className="input-container ic1">
        <input
          id="groupName"
          className="input"
          type="text"
          placeholder="groupName"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        />
        {form.errors.groupName && <small>{form.errors.groupName}</small>}
      </div>
      <div className="input-container ic2">
        <input
          id="description"
          className="input"
          type="text"
          placeholder="description"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        />
        {form.errors.description && <small>{form.errors.description}</small>}
      </div>
      <button type="submit" className="submit">
        create group
      </button>
    </form>
  );
}

export default memo(GroupCreate);
