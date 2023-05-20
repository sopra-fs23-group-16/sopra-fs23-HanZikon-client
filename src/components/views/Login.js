import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import {SecondaryButton} from 'components/ui/SecondaryButton';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import {FormField} from "../../helpers/formField";
import Alert from '@mui/material/Alert';

const Login = props => {
	const history = useHistory();  
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const handleClose = () => {
		setError(null);
		history.push(`/register`);
	};

	const doLogin = async () => {
		try {
			const requestBody = JSON.stringify({username, password: password});
			const response = await api.post('/login', requestBody);

			const user = new User(response.data);

			await localStorage.setItem('token', user.token);
			await localStorage.setItem('loggedInUser', user.id);

			history.push(`/room/lobby`);
		} catch (error) {
			setError(error);
			// alert(`Login failed: \n${handleError(error)}`);
			// history.push(`/register`);
		}
	};

	return (
		<BaseContainer>
			<div className="login container">
			<div  style={{ position: "absolute", top: 10, left: 10, right: 0, zIndex: 999 }}>
			{error &&
            <Alert severity="error" sx={{ width: 1/3, ml: 76}} onClose={handleClose}>
              <b>Login failed!</b> <br />
			  {/* Error message: <br /> */}
			  {handleError(error)}
            </Alert>
          	}
			</div>
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