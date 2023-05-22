import {PrimaryButton} from 'components/ui/PrimaryButton';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Welcome.scss";
import Logo from "image/logo_book.png";

const Welcome = () => {

	return (
		<BaseContainer>

			<div className="welcome container">
				<img src={Logo} style={{ width: '50%', height: 'auto', display: 'block', marginLeft: "15%" }}/>
				<div className="welcome label-motivation">
					<br />
			As the second most spoken language in the world, Chinese characters have a distinctive form from Latin letters.
			For people from other cultural backgrounds, they merely look like a sketch of random lines and dots.
					Despite the complexity, they actually contain meanings in the form.<br /><br />

			As a group of five native Chinese speakers, we know how tedious and hard it could be to learn to write Chinese characters,
			that's what inspired us to create this highly recreational and intuitive game, enabliing those curious minds to explore
			the structural beauty of Chinese characters and have a glimpse into Chinese culture. <br /><br />

			Learning alone could be boring and discouraging. Invite your friends and have a try of the 3 games ,odes we offer.	
			<br /><br />
				</div>
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
