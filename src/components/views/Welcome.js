import {PrimaryButton} from 'components/ui/PrimaryButton';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Welcome.scss";
import Logo from "image/logo_book.png";

const Welcome = () => {

	return (
		<BaseContainer>
		<br />
		<br />
		<br />
			<div className="welcome container">
				{/* <div className="welcome label">Welcome to </div> */}
				<img src={Logo} style={{ width: '60%', height: 'auto', display: 'block', marginLeft: "15%" }}/>
				<div className="welcome label-motivation">
					<center>
			We are living in a world that is more connected than ever before, and it has become inevitable to
			encounter things from other cultures, amongst which Chinese is a prominent part. <br /><br />
			As the second most spoken language in the world, Chinese characters have a distinctive form from Latin letters.
			That may explain that for people from other cultural backgrounds, they merely look like a sketch
			of random lines and dots. <br /><br />
			As a group of five native Chinese speakers, we know how tedious and hard it could be to learn to write Chinese characters, 
			and that's what inspires us to create this highly recreational, intuitive while educational web app, to enable those curious minds to explore
			the structural beauty of Chinese characters and learn a little bit about the logographic properties
			of them. <br /><br />
			We firmly believe that learning alone is boring and discouraging, so our primary mode
			consists of several players competing together, thus utilizing the potential of a web application.
			</center>
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
