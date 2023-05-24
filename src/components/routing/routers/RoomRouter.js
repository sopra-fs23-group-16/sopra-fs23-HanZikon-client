import {Redirect, Route} from "react-router-dom";
import Lobby from "components/views/Lobby";
import RoomSetting from "components/views/RoomSetting";
import PropTypes from 'prop-types';
import RoomEntrance from "components/views/RoomEntrance";
import OwnerWaitingRoom from "components/views/OwnerWaitingRoom";
import NormalWaitingRoom from "components/views/NormalWaitingRoom";

const RoomRouter = props => {
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Route exact path={`${props.base}/lobby`}>
                <Lobby/>
            </Route>
            <Route exact path={`${props.base}/creation`}>
                <RoomSetting/>
            </Route>
            <Route exact path={`${props.base}/joining`}>
                <RoomEntrance/>
            </Route>
            <Route exact path={`${props.base}/:roomID/waitingroom/owner`}>
                <OwnerWaitingRoom/>
            </Route>
            <Route exact path={`${props.base}/:roomID/waitingroom/participant`}>
                <NormalWaitingRoom/>
            </Route>
            <Route exact path={`${props.base}`}>
                <Redirect to={`${props.base}/lobby`}/>
            </Route>
        </div>
    );
};

RoomRouter.propTypes = {
    base: PropTypes.string
}

export default RoomRouter;
