import {PrimaryButton} from 'components/ui/PrimaryButton';
import {SecondaryButton} from 'components/ui/SecondaryButton';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Lobby.scss";

const Lobby = () => {
	const history = useHistory();
	return (
		<BaseContainer>
			<div className="lobby container">
				<div className="lobby label">Lobby</div>
					<div className="lobby form">
						<div className="lobby button-container">
							<PrimaryButton
								width="70%"
								onClick={() => window.location.href = `/room/creation`}
							>
								New Room
							</PrimaryButton>
						</div>
						<div className="lobby button-container">
							<PrimaryButton
								width="70%"
								onClick={() => window.location.href = `/room/joining`}
							>
								Join Room
							</PrimaryButton>
						</div>
						<div className="lobby button-container">
							<SecondaryButton
								width="70%"
								onClick={() => history.push(`/game/rule`)}
							>
							Game Rule
							</SecondaryButton>
						</div>
						<div className="lobby button-container">
							<SecondaryButton
								width="70%"
								onClick={() => history.push(`/users/${localStorage.getItem("loggedInUser")}`)}
							>
							Your Profile
							</SecondaryButton>
						</div>
				</div>
			</div>
		</BaseContainer>
	);
}

export default Lobby;