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
            <Route exact path={`${props.base}/create`}>
                <RoomSetting/>
            </Route>
            <Route exact path={`${props.base}/join`}>
                <RoomEntrance/>
            </Route>
            <Route exact path={`${props.base}/:roomID/waitingRoom/owner`}>
                <OwnerWaitingRoom/>
            </Route>
            <Route exact path={`${props.base}/:roomID/waitingRoom/participate`}>
                <NormalWaitingRoom/>
            </Route>
            <Route exact path={`${props.base}`}>
                <Redirect to={`${props.base}/lobby`}/>
            </Route>
        </div>
    );
};
/*
* Don't forget to export your component!
 */

RoomRouter.propTypes = {
    base: PropTypes.string
}

export default RoomRouter;
