import {Route} from "react-router-dom";
// import Lobby from "components/views/Lobby";
// import RoomSetting from "components/views/RoomSetting";
import PropTypes from 'prop-types';
// import RoomEntrance from "components/views/RoomEntrance";
// import OwnerWaitingRoom from "components/views/OwnerWaitingRoom";
// import NormalWaitingRoom from "components/views/NormalWaitingRoom";
import Inspect from "../../views/Inspect";
import Setting from "../../views/Setting";

const UserRouter = props => {
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Route exact path={`${props.base}/:userID`}>
                <Inspect/>
            </Route>
            <Route exact path={`${props.base}/:userID/edit`}>
                <Setting/>
            </Route>
        </div>
    );
};
/*
* Don't forget to export your component!
 */

UserRouter.propTypes = {
    base: PropTypes.string
}

export default UserRouter;
