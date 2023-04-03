import {Redirect, Route} from "react-router-dom";
import Lobby from "components/views/Lobby";
import Game from "components/views/Game";
import RoomSetting from "components/views/RoomSetting";
import PropTypes from 'prop-types';
import RoomCreation from "components/views/RoomCreation";
import RoomEntrance from "components/views/RoomEntrance";

const GameRouter = props => {
  /**
   * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
   */
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Route exact path={`${props.base}/lobby`}>
        <Lobby/>
      </Route>
      <Route exact path={`${props.base}/roomsetting`}>
        <RoomSetting/>
      </Route>
      <Route exact path={`${props.base}/roomcreation`}>
        <RoomCreation/>
      </Route>
      <Route exact path={`${props.base}/roomentrance`}>
        <RoomEntrance/>
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
