import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

export const ImitationVoteGuard = props => {
  if (localStorage.getItem("token")) {
    return props.children;
  }
  return <Redirect to="/login"/>;
};

ImitationVoteGuard.propTypes = {
  children: PropTypes.node
};