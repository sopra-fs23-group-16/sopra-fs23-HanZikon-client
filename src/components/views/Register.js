import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import {SecondaryButton} from 'components/ui/SecondaryButton';
import 'styles/views/Register.scss';
import BaseContainer from "components/ui/BaseContainer";
import {FormField} from "../../helpers/formField";
import Alert from '@mui/material/Alert';

const Register = props => {
	const history = useHistory();
	const [username, setUsername] = useState("");  
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const handleClose = () => {
		setError(null);
	};

	const doRegister = async () => {
		try {
			const requestBody = JSON.stringify({username, password: password});
			const response = await api.post('/users', requestBody);

			const user = new User(response.data);

			await localStorage.setItem('token', user.token);
			await localStorage.setItem('loggedInUser', user.id);

			history.push(`/room/lobby`);
			} catch (error) {
				// alert(`Register failed: \n${handleError(error)}`);
				setError(error);
			}
	};

	return (
		<BaseContainer>
		<div className="register container">
		<div  style={{ position: "absolute", top: 10, left: 10, right: 0, zIndex: 999 }}>
			{error &&
            <Alert severity="error" sx={{ width: 1/3, ml: 76}} onClose={handleClose}>
              <b>Register failed!</b> <br />
			  {/* Error message: <br /> */}
			  {handleError(error)}
            </Alert>
          	}
			</div>
			<h1>No account? Please register here!</h1>
			<div className="register form">
				<FormField
					className="register"
					label="Username"
					value={username}
					placeholder="Enter your username here"
					onChange={un => setUsername(un)}
				/>
				<FormField
					className="register"
					label="Password"
					value={password}
					type="password"
					placeholder="Enter your password here"
					onChange={n => setPassword(n)}
				/>
				<div className="register button-container">
					<PrimaryButton
						width="70%"
						disabled={!username || !password}
						onClick={() => doRegister()}
					>
					Register
					</PrimaryButton>
				</div>
				<div className="register button-container">
					<SecondaryButton
						width="70%"
						onClick={() => history.push(`/login`)}
					>
					Go to Login
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
export default Register;
