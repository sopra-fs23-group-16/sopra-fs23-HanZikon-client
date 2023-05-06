import {Redirect, Route} from "react-router-dom";
import Lobby from "components/views/Lobby";
import Game from "components/views/Game";
import RoomSetting from "components/views/RoomSetting";
import PropTypes from 'prop-types';
import RoomCreation from "components/views/RoomCreation";
import RoomEntrance from "components/views/RoomEntrance";
import OwnerWaitingRoom from "components/views/OwnerWaitingRoom";
import NormalWaitingRoom from "components/views/NormalWaitingRoom";
import ChoiceRecord from "components/views/ChoiceResult";
import ImitationInspect from "components/views/ImitationInspect";
import ImitationVote from "components/views/ImitationVote";
import GameRule from "components/views/GameRule";

const GameRouter = props => {
  /**
   * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
   */
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Route exact path={`${props.base}/lobby`}>
        <GameRule/>
      </Route>
      <Route exact path={`${props.base}/gamerule`}>
        <Lobby/>
      </Route>
      <Route exact path={`${props.base}/roomsetting`}>
        <RoomSetting/>
      </Route>
      <Route exact path={`${props.base}/roomcreation`}>
        <RoomCreation/>
      </Route>
	  <Route exact path={`${props.base}/games/record/:roomID`}>
        <ChoiceRecord/>
      </Route>
      <Route exact path={`${props.base}/room/:roomID/owner`}>
        <OwnerWaitingRoom/>
      </Route>
      <Route exact path={`${props.base}/roomentrance`}>
        <RoomEntrance/>
      </Route>
      <Route exact path={`${props.base}/room/:roomID/participants`}>
        <NormalWaitingRoom/>
      </Route>
	  <Route exact path={`${props.base}/games/imitationinspect/:roomID`}>
        <ImitationInspect/>
      </Route>
      <Route exact path={`${props.base}/games/imitationvote/:roomID`}>
        <ImitationVote/>
      </Route>
      <Route exact path={`${props.base}`}>
        <Redirect to={`${props.base}/login`}/>
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
