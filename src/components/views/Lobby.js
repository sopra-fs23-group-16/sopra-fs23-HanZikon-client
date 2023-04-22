import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Button} from 'components/ui/Button';
import {Link, useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Lobby.scss";
import User from 'models/User';

const Lobby = () => {

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
		const response = api.get('/logout/'+id);
		history.push('/login');
	}
  
	//const params = new URLSearchParams(window.location.search);

	return (
		<BaseContainer>
			<div className="lobby container">
				<h1>Game Overview</h1>
				<div className="lobby form">
					{/* <div className="lobby button-container">
						<Button 
							width="70%"
							//onClick={() => }
						>
						Single Mode
						</Button>
					</div> */}
					<div className="lobby button-container">
						<Button
							width="70%"
							onClick={() => history.push(`/roomcreation`)}
						>
						Competition Mode
						</Button>
					</div>
					<div className="lobby button-container">
						<Button
							width="70%"
							onClick={() => history.push(`/users/${id}`)}
						>
						Your Profile
						</Button>
					</div>
					<div className="lobby button-container">
						<Button
							width="70%"
							onClick={() => logout()}
						>
						Exit
						</Button>
					</div>
				</div>
			</div>
		</BaseContainer>
	);
}

export default Lobby;