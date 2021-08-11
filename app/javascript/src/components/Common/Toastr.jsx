import React from "react";
import { toast, Slide } from "react-toastify";

const ToastrComponent = ({ type, message }) => {
  let icon;
  switch (type) {
    case "success":
      icon = "ri-checkbox-circle-fill";
      break;
    case "error":
      icon = "ri-alert-fill";
      break;
    default:
      icon = "ri-information-fill";
      break;
  }

  return (
    <div className="flex flex-row items-start justify-start">
      <i className={icon}></i>
    </div>
  );
};

const showToastrMessage = message => {
  toast.success(<ToastrComponent type="success" message={message} />, {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: Slide
  });
};

const isError = e => e && e.stack && e.message;

const showErrorToastr = error => {
  const errorMessage = isError(error) ? error.message : error;
  toast.error(<ToastrComponent type="error" message={errorMessage} />, {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: Slide
  });
};

export const Toastr = {
  success: showToastrMessage,
  error: showErrorToastr
};

export default Toastr;
