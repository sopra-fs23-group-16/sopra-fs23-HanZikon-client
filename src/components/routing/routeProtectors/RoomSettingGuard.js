import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";


export const RoomSettingGuard = props => {
  if (localStorage.getItem("token")) {
    return props.children;
  }
  return <Redirect to="/login"/>;
};

RoomSettingGuard.propTypes = {
  children: PropTypes.node
};