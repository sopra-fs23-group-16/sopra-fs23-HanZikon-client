import React from "react";
import "styles/views/NavigationBar.scss";
import { useHistory } from "react-router-dom";
import Logo from "image/logo.jpg";
import {api} from 'helpers/api';
import User from 'models/User';
import {useEffect, useState} from 'react';

const NavigationBar = () => {
    useEffect(() => {
		// fetch localuser's information by token
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
	}, []);

	const history = useHistory();
	const [users, setUsers] = useState(null);
	let id = localStorage.getItem("loggedInUser");

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem("loggedInUser");
		const response = api.get('/logout/'+ id);
		history.push('/login');
	}


  return (
    <div className="navbar container">
      <div className="logo-container">
        <img className="navbar logo" src={Logo} alt="logo" />
      </div>

      <div className="navbar button-container">
            <div className="navbar button" onClick={() => history.push(`/lobby`)}><i class="material-icons md-36 text-red">home</i></div>
            <div className="navbar button" onClick={() => history.push(`/users/${id}`)}><i class="material-icons md-36 text-red">person</i></div>
            <div className="navbar button" onClick={() => logout()}><i class="material-icons md-36 text-red">logout</i></div>
      </div>
    </div>
  );
};


export default NavigationBar;