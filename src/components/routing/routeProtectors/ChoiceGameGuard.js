import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

export const ChoiceGameGuard = props => {
  if (localStorage.getItem("token")) {
    return props.children;
  }
  return <Redirect to="/login"/>;
};

ChoiceGameGuard.propTypes = {
  children: PropTypes.node
};