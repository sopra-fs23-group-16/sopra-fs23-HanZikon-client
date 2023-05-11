import {Redirect, Route} from "react-router-dom";
import PropTypes from 'prop-types';
import ImitationInspect from "components/views/ImitationInspect";
import ImitationVote from "components/views/ImitationVote";
import GameRule from "components/views/GameRule";
import ChoiceResult from "components/views/ChoiceResult";
import ChoiceGame from "../../views/ChoiceGame";
import ImitationGame from "../../views/ImitationGame";

const GameRouter = props => {
  /**
   * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
   */
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Route exact path={`${props.base}/rule`}>
          <GameRule/>
      </Route>
      <Route exact path={`${props.base}/:roomID/multiChoice`}>
          <ChoiceGame/>
      </Route>
	  <Route exact path={`${props.base}/:roomID/imitatePrep`}>
          <ImitationInspect/>
      </Route>
      <Route exact path={`${props.base}/:roomID/imitateWrite`}>
          <ImitationGame/>
      </Route>
      <Route exact path={`${props.base}/:roomID/imitateVote`}>
          <ImitationVote/>
      </Route>
      <Route exact path={`${props.base}/:roomID/result/`}>
          <ChoiceResult/>
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