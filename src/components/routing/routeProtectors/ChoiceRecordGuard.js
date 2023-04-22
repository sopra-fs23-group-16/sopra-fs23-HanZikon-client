import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

export const ChoiceRecordGuard = props => {
  if (localStorage.getItem("token")) {
    return props.children;
  }
  return <Redirect to="/login"/>;
};

ChoiceRecordGuard.propTypes = {
  children: PropTypes.node
};