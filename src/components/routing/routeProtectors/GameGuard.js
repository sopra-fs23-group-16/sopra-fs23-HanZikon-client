import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import {fetchLocalUser} from "../../../helpers/confirmLocalUser";
import {useEffect} from "react";
// import {Spinner} from "../../ui/Spinner";
// import BaseContainer from "../../ui/BaseContainer";

/**
 * routeProtectors interfaces can tell the router whether or not it should allow navigation to a requested route.
 * They are functional components. Based on the props passed, a route gets rendered.
 * In this case, if the user is authenticated (i.e., a token is stored in the local storage)
 * {props.children} are rendered --> The content inside the <GameGuard> in the App.js file, i.e. the user is able to access the main app.
 * If the user isn't authenticated, the components redirects to the /login screen
 * @Guard
 * @param props
 */

export const GameGuard = props => {
  const history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      await fetchLocalUser();
      if (!localStorage.getItem('token')) {
        history.push('/welcome');
      }
    };
    fetchData();
  }, [history]);
  return props.children;
};

GameGuard.propTypes = {
  children: PropTypes.node
};