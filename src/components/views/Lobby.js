import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import {SecondaryButton} from 'components/ui/SecondaryButton';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Lobby.scss";
import User from 'models/User';
import {fetchLocalUser} from "../../helpers/confirmLocalUser";

const Lobby = () => {

	useEffect(() => {
		fetchLocalUser();
	}, []);

	const history = useHistory();
	const [users, setUsers] = useState(null);
	let id = localStorage.getItem("loggedInUser");

	// const logout = async () => {
	// 	await localStorage.removeItem('token');
	// 	await localStorage.removeItem("loggedInUser");
	// 	const response = await api.get('/logout/'+id);
	// 	history.push('/login');
	// }
  
	//const params = new URLSearchParams(window.location.search);

	return (
		<BaseContainer>
			<div className="lobby container">
				{/* <h1>Lobby</h1> */}
				<div className="lobby label">Lobby</div>
				<div className="lobby form">
				<div className="lobby button-container">
						<PrimaryButton
							width="70%"
							onClick={() => window.location.href = `/rooms/create`}
						>
							New Room
						</PrimaryButton>
					</div>
					<div className="lobby button-container">
						<PrimaryButton
							width="70%"
							onClick={() => window.location.href = `/rooms/join`}
						>
							Join Room
						</PrimaryButton>
					</div>
					<div className="lobby button-container">
						<SecondaryButton
							width="70%"
							onClick={() => history.push(`/games/rule`)}
						>
						Game Rule
						</SecondaryButton>
					</div>
					<div className="lobby button-container">
						<SecondaryButton
							width="70%"
							onClick={() => history.push(`/users/${id}`)}
						>
						Your Profile
						</SecondaryButton>
					</div>
					{/* <div className="lobby button-container">
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

export default Lobby;