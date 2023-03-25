import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = props => {
  return (
    <div className="login field">
      <label className="login label">
        {props.label}
      </label>
      <input
        className="login input"
        placeholder="Please enter here:"
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

const Login = props => {
  const history = useHistory();  
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({username, password: password});
      const response = await api.post('/login', requestBody);

      const user = new User(response.data);

      localStorage.setItem('token', user.token);
	  localStorage.setItem('loggedInUser', user.id);

      history.push(`/game`);
    } catch (error) {
      alert(`Login failed: \n${handleError(error)}`);
	  history.push(`/register`);
    }
  };
  
  const doRegister = async () => {
    try {
      history.push(`/register`);
    } catch (error) {
      alert(`Register failed: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
		  <h2>Login</h2>
          <FormField
            label="Username"
            value={username}
            onChange={un => setUsername(un)}
          />
          <FormField
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
              Login
            </Button>
	      </div>
		  <div className="login button-container">
            <Button
              width="80%"
              onClick={() => doRegister()}
            >
              Register
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
