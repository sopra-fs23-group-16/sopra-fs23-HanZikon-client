import React from "react";
import "styles/views/NavigationBar.scss";
import { useHistory } from "react-router-dom";
import Logo from "image/logo.jpg";
import {api} from 'helpers/api';
import {useState} from 'react';

const NavigationBar = () => {


	const history = useHistory();
	const [users, setUsers] = useState(null);
	let id = localStorage.getItem("loggedInUser");

	const logout = () => {
		// localStorage.removeItem('token');
		// localStorage.removeItem("loggedInUser");
    localStorage.clear();
		const response = api.get('/logout/'+ id);
		window.location.href = '/login';
	}
    

  return (
    <div className="navbar container">
      <div className="logo-container">
        <img className="navbar logo" src={Logo} alt="logo" />
      </div>

      <div className="navbar button-container">
            <div className="navbar button" onClick={() => window.location.href = "/lobby"}><i class="material-icons md-36 text-red">home</i></div>
            <div className="navbar button" onClick={() => window.location.href = "/users/" + id}><i class="material-icons md-36 text-red">person</i></div>
            <div className="navbar button" onClick={() => logout()}><i class="material-icons md-36 text-red">logout</i></div>
      </div>
    </div>
  );
};


export default NavigationBar;