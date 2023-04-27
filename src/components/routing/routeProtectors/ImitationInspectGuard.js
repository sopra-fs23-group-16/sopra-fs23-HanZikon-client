import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

export const ImitationInspectGuard = props => {
  if (localStorage.getItem("token")) {
    return props.children;
  }
  return <Redirect to="/login"/>;
};

ImitationInspectGuard.propTypes = {
  children: PropTypes.node
};