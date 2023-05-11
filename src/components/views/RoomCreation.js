import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import {SecondaryButton} from 'components/ui/SecondaryButton';
import Room from 'models/Room';
import {Link, useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/RoomCreation.scss";
import User from 'models/User';
import {fetchLocalUser} from "../../helpers/confirmLocalUser";


const RoomCreation = () => {
	
	useEffect(() => {
		// fetch localuser's information by token
		fetchLocalUser();
	}, []);

	const history = useHistory();
	const [users, setUsers] = useState(null);
	let id = localStorage.getItem("loggedInUser");

	// const logout = () => {
	// 	localStorage.removeItem('token');
	// 	localStorage.removeItem("loggedInUser");
	// 	const response = api.get('/logout/'+id);
	// 	history.push('/login');
	// }

	const handleButtonClick = () => {
		// Load a new page from scratch
		window.location.href = '/roomsetting/';
	};

	return (
		<BaseContainer>
			<div className="creation container">
				{/* <h1>Competition Mode</h1> */}
				<div className="lobby label">Competition Mode</div>
				<div className="creation form">
					<div className="creation button-container">
						<PrimaryButton
							width="70%"
							onClick={
							//() => history.push(`/roomsetting/`)
								handleButtonClick
						}
						>
						Create A New Room
						</PrimaryButton>
					</div>
					<div className="creation button-container">
						<PrimaryButton
							width="70%"
							onClick={() => window.location.href =`/roomentrance`}
						>
						Join An Existing Room
						</PrimaryButton>
					</div>
					<div className="creation button-container">
						<SecondaryButton
							width="70%"
							onClick={() => window.location.href = `/lobby`}
						>
						Back to Lobby
						</SecondaryButton>
					</div>
					{/* <div className="creation button-container">
						<PrimaryButton
							width="70%"
							onClick={() => logout()}
						>
						Exit
						</PrimaryButton>
					</div> */}
				</div>
			</div>
		</BaseContainer>
	);
}

export default RoomCreation;