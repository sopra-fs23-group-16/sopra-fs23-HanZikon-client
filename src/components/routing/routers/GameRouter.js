import {Redirect, Route} from "react-router-dom";
import Lobby from "components/views/Lobby";
import Game from "components/views/Game";
import CreateRoom from "components/views/CreateRoom";
import PropTypes from 'prop-types';
import RoomCreation from "components/views/RoomCreation";

const GameRouter = props => {
  /**
   * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
   */
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Route exact path={`${props.base}/dashboard`}>
        <Lobby/>
      </Route>
      {/* <Route exact path={`${props.base}/rooms/create`}>
        <CreateRoom/>
      </Route> */}
      <Route exact path={`${props.base}/roomcreation`}>
        <RoomCreation/>
        {/* <CreateRoom/> */}
      </Route>
      <Route exact path={`${props.base}`}>
        <Redirect to={`${props.base}/dashboard`}/>
      </Route>
    </div>
  );
};
/*
* Don't forget to export your component!
 */

GameRouter.propTypes = {
  base: PropTypes.string
}

export default GameRouter;
