import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory, useParams} from 'react-router-dom';
import 'styles/views/Inspect.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

const FormField = props => {
	return (
		<div className="inspect field">
			<label className="inspect label">
				{props.label}
			</label>
			<input
				className="inspect input"
				placeholder="Not defined"
				value={props.value}
				onChange={e => props.onChange(e.target.value)}
			/>
		</div>
	);
};

FormField.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func
};

const Inspect = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    let {userId} = useParams();

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/users/'+userId);

                // delays continuous execution of an async operation for 1 second.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Get the returned users and update the state.
                setUser(response.data);

                // This is just some data for you to see what is available.
                // Feel free to remove it.
                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, []);
	
	return user && (
		<BaseContainer>
		<div className="inspect container">
			<h1>My Profile</h1>
			<div className="inspect form">
                    <div className="user overview">
                        <FormField
                            label="username"
                            value={user.username}
                            onChange={un => setUsername(un)}
                        />
                    </div>
				<div className="inspect button-container">
					<Button
						width="70%"
						onClick={() => history.push(`/Setting/${userId}`)}>
						Edit
					</Button>
				</div>
				<div className="inspect button-container">
					<Button
						width="70%"
						onClick={() => history.push('/lobby')}>
						Back to game overview
					</Button>
				</div>
			</div>
		</div>
		</BaseContainer>
	);
}


export default Inspect;
