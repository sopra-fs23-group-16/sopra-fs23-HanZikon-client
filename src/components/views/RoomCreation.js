import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Button} from 'components/ui/Button';
import Room from 'models/Room';
import {Link, useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/RoomCreation.scss";


const RoomCreation = () => {

	const history = useHistory();
	const [users, setUsers] = useState(null);
	let id = localStorage.getItem("loggedInUser");

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem("loggedInUser");
		const response = api.get('/logout/'+id);
		history.push('/login');
	}

	const handleButtonClick = () => {
		// Load a new page from scratch
		window.location.href = '/roomsetting/';
	};

	return (
		<BaseContainer>
			<div className="creation container">
				<h1>Competition Mode</h1>
				<div className="creation form">
					<div className="creation button-container">
						<Button 
							width="70%"
							onClick={
							//() => history.push(`/roomsetting/`)
								handleButtonClick
						}
						>
						Create A New Room
						</Button>
					</div>
					<div className="creation button-container">
						<Button
							width="70%"
							onClick={() => history.push(`/roomentrance`)}
						>
						Join An Existing Room
						</Button>
					</div>
					<div className="creation button-container">
						<Button
							width="70%"
							onClick={() => history.push(`/lobby`)}
						>
						Back to Lobby
						</Button>
					</div>
					<div className="creation button-container">
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

export default RoomCreation;