import {PrimaryButton} from 'components/ui/PrimaryButton';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Welcome.scss";
import Logo from "image/logo_book.png";

const Welcome = () => {

	return (
		<BaseContainer>
			<div className="welcome container">
				<div className="welcome label">Welcome to Hanzikon!</div>
				<img src={Logo} style={{ width: '50%', height: 'auto', display: 'block', marginLeft: "8%" }}/>
					<div className="welcome form">
						<div className="welcome button-container">
							<PrimaryButton
								width="70%"
								onClick={() => window.location.href = `/register`}
							>
								Explore
							</PrimaryButton>
						</div>
				</div>
			</div>
		</BaseContainer>
	);
}

export default Welcome;
