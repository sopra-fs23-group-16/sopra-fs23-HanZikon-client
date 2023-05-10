import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import {faker} from "@faker-js/faker";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormFieldUsername = props => {
	return (
		<div className="login field">
			<label className="login label">
				{props.label}
			</label>
			<input
				className="login input"
				placeholder="Enter your username here"
				value={props.value}
				onChange={e => props.onChange(e.target.value)}
			/>
		</div>
	);
};

FormFieldUsername.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func
};

const FormFieldPassword = props => {
	return (
		<div className="login field">
			<label className="login label">
				{props.label}
			</label>
			<input
				type = "password"
				className="login input"
				placeholder="Enter your password here"
				value={props.value}
				onChange={e => props.onChange(e.target.value)}
			/>
		</div>
	);
};

FormFieldPassword.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func
};

const Login = props => {
	const history = useHistory();  
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const doLogin = async () => {
		try {
			const requestBody = JSON.stringify({username, password: password});
			const response = await api.post('/login', requestBody);

			const user = new User(response.data);

			await localStorage.setItem('token', user.token);
			await localStorage.setItem('loggedInUser', user.id);

			history.push(`/lobby`);
		} catch (error) {
			alert(`Login failed: \n${handleError(error)}`);
			history.push(`/register`);
		}
	};

	return (
		<BaseContainer>
			<div className="login container">
				<h1>Please log into your account!</h1>
				<div className="login form">
					<FormFieldUsername
						label="Username"
						value={username}
						onChange={un => setUsername(un)}
					/>
					<FormFieldPassword
						label="Password"
						value={password}
						onChange={n => setPassword(n)}
					/>
					<div className="login button-container">
						<Button
							disabled={!username || !password}
							width="80%"
							onClick={() => doLogin()}
						>
							Log in
						</Button>
					</div>
					<div className="login button-container">
						<Button
							width="80%"
							onClick={() => history.push(`/register`)}
						>
							Go to Register
						</Button>
					</div>
				</div>
			</div>
		</BaseContainer>
	);
};


/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Login;