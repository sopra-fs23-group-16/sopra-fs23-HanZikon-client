import {Route} from "react-router-dom";
import PropTypes from 'prop-types';
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

UserRouter.propTypes = {
    base: PropTypes.string
}

export default UserRouter;
