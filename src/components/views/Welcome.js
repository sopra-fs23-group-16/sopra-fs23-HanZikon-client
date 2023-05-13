import {PrimaryButton} from 'components/ui/PrimaryButton';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Welcome.scss";

const Welcome = () => {

	return (
		<BaseContainer>
			<div className="welcome container">
				<div className="welcome label">Welcome to Hanzikon!</div>
					<div className="welcome form">
						<div className="welcome button-container">
							<PrimaryButton
								width="70%"
								onClick={() => window.location.href = `/register`}
							>
								Register
							</PrimaryButton>
						</div>
						<div className="welcome button-container">
							<PrimaryButton
								width="70%"
								onClick={() => window.location.href = `/login`}
							>
								Login
							</PrimaryButton>
						</div>
				</div>
			</div>
		</BaseContainer>
	);
}

export default Welcome;