import {Redirect, Route} from "react-router-dom";
import PropTypes from "prop-types";
import Inspect from "../../views/Inspect";

export const InspectGuard = props => {
	return (
		<div style={{display: 'flex', flexDirection: 'column'}}>
            <Route exact path={`${props.base}/${this.props.user.id}`}>
                <Inspect/>
            </Route>
            <Route exact path={`${props.base}`}>
                <Redirect to={`${props.base}/${this.props.user.id}`}/>
            </Route>
        </div>
	);
};

InspectGuard.propTypes = {
  children: PropTypes.node
};