import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import {SecondaryButton} from 'components/ui/SecondaryButton';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import {FormField} from "../../helpers/formField";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
// const FormFieldUsername = props => {
// 	return (
// 		<div className="login field">
// 			<label className="login label">
// 				{props.label}
// 			</label>
// 			<input
// 				className="login input"
// 				placeholder="Enter your username here"
// 				value={props.value}
// 				onChange={e => props.onChange(e.target.value)}
// 			/>
// 		</div>
// 	);
// };
//
// FormFieldUsername.propTypes = {
// 	label: PropTypes.string,
// 	value: PropTypes.string,
// 	onChange: PropTypes.func
// };
//
// const FormFieldPassword = props => {
// 	return (
// 		<div className="login field">
// 			<label className="login label">
// 				{props.label}
// 			</label>
// 			<input
// 				type = "password"
// 				className="login input"
// 				placeholder="Enter your password here"
// 				value={props.value}
// 				onChange={e => props.onChange(e.target.value)}
// 			/>
// 		</div>
// 	);
// };
//
// FormFieldPassword.propTypes = {
// 	label: PropTypes.string,
// 	value: PropTypes.string,
// 	onChange: PropTypes.func
// };

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

			history.push(`/room/lobby`);
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
					<FormField
						className="login"
						label="Username"
						value={username}
						placeholder="Enter your username here"
						onChange={un => setUsername(un)}
					/>
					<FormField
						className="login"
						label="Password"
						value={password}
						type="password"
						placeholder="Enter your password here"
						onChange={n => setPassword(n)}
					/>
					<div className="login button-container">
						<PrimaryButton
							disabled={!username || !password}
							width="80%"
							onClick={() => doLogin()}
						>
							Log in
						</PrimaryButton>
					</div>
					<div className="login button-container">
						<SecondaryButton
							width="80%"
							onClick={() => history.push(`/register`)}
						>
							Go to Register
						</SecondaryButton>
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