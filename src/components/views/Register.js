import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Register.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormFieldUsername = props => {
	return (
		<div className="register field">
			<label className="register label">
				{props.label}
			</label>
			<input
				className="register input"
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
		<div className="register field">
			<label className="register label">
				{props.label}
			</label>
			<input
				type = "password"
				className="register input"
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

const Register = props => {
	const history = useHistory();
	const [username, setUsername] = useState(null);  
	const [password, setPassword] = useState(null);

	const doRegister = async () => {
		try {
			const requestBody = JSON.stringify({username, password: password});
			const response = await api.post('/users', requestBody);

			const user = new User(response.data);

			localStorage.setItem('token', user.token);
			localStorage.setItem('loggedInUser', user.id);

			history.push(`/lobby`);
			} catch (error) {
				alert(`Register failed: \n${handleError(error)}`);
			}
	};
  
	const doLogin = async () => {
		try {
			history.push(`/login`);
			} catch (error) {
				alert(`Login failed: \n${handleError(error)}`);
			}
	};

	return (
		<BaseContainer>
		<div className="register container">
			<h1>No account? Please register here!</h1>
			<div className="register form">
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
				<div className="register button-container">
					<Button 
						width="70%"
						disabled={!username || !password}
						onClick={() => doRegister()}
					>
					Register
					</Button>
				</div>
				<div className="register button-container">
					<Button
						width="70%"
						onClick={() => doLogin()}
					>
					Back to Login
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
export default Register;
