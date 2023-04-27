import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory, useParams} from 'react-router-dom';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import 'styles/views/Setting.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

const FormField = props => {
	return (
		<div className="setting field">
		<label className="setting label">
			{props.label}
		</label>
		<input
			className="setting input"
			placeholder="Change your information:"
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

const Setting = props => {
	const history = useHistory();
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);
	let {userId} = useParams();
  
	const confirm = async () => {
        let item = {username, password}
        console.warn("item", item)
        try {
            const requestBody = JSON.stringify({username, password});
            const response = await api.put('/users/' + userId, requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);
            history.push(`/users/${userId}`);

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

    useEffect(() => {
		
		async function fetchLocalUser() {
			try {
				const requestBody = JSON.stringify({ token: localStorage.getItem("token") });
				const response = await api.post(`/users/localUser`, requestBody);

				const user = new User(response.data);
				console.log("Confirm local user:",user);
				localStorage.setItem('loggedInUser', user.id);

			} catch (error) {
				alert("You are not logged in!");
				localStorage.removeItem('token');
				history.push('/login');
			}
		}
		fetchLocalUser();
		
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
                console.error(`Something went wrong: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong! See the console for details.");
            }
        }
        fetchData();
    }, []);

    let content = <Spinner/>;

    if (user) {
        content = (
            <div className="user overview">

				<FormField
                    label="picture"
                    //value={username}
                    //onChange={un => setUsername(un)}
                />
                <FormField
                    label="username"
                    value={username}
                    onChange={un => setUsername(un)}
                />
                <FormField
                    label="password"
                    value={password}
                    onChange={p => setPassword(p)}
                />
				&nbsp;
                <Button
					disabled={!username && !password}
                    width="100%"
                    onClick={() => confirm()}
                >
                    Confirm
                </Button>
                &nbsp;
                <Button
                    width="100%"
                    onClick={() => history.push(`/users/${userId}`)}
                >
                    Cancel
                </Button>
            </div>
        );
    }

    return (
        <BaseContainer>
			<div className="setting container">
				<div className="">
					<p className="setting text">
						You could change your username and password here. (Optional)
					</p>
					{content}
				</div>
			</div>
        </BaseContainer>
    );

};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Setting;
