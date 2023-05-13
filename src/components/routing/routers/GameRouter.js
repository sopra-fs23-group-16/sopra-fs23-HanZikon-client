import {Route} from "react-router-dom";
import PropTypes from 'prop-types';
import ImitationInspect from "components/views/ImitationInspect";
import ImitationVote from "components/views/ImitationVote";
import GameRule from "components/views/GameRule";
import GameResult from "components/views/GameResult";
import ChoiceGame from "components/views/ChoiceGame";
import ImitationGame from "components/views/ImitationGame";

const GameRouter = props => {
  /**
   * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
   */
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Route exact path={`${props.base}/rule`}>
          <GameRule/>
      </Route>
      <Route exact path={`${props.base}/:roomID/oracleguessing`}>
          <ChoiceGame/>
      </Route>
	  <Route exact path={`${props.base}/:roomID/imitationlearning`}>
          <ImitationInspect/>
      </Route>
      <Route exact path={`${props.base}/:roomID/imitationwriting`}>
          <ImitationGame/>
      </Route>
      <Route exact path={`${props.base}/:roomID/imitationvoting`}>
          <ImitationVote/>
      </Route>
      <Route exact path={`${props.base}/:roomID/result/`}>
          <GameResult/>
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