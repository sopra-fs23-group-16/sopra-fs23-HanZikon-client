import {useHistory} from 'react-router-dom';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/GameRule.scss";

const GameRule = () => {
    const history = useHistory();

	return (
		<BaseContainer>
        <center>
				<h1>Game Rule</h1>
				<div className="gamerule form">

                <div className="gamerule label-title-big">
                Game Modes:<br /><br />
				</div>

				<div className="gamerule label-title">
				A. Hanzi Drawing
				</div>

				<br />
				<div className="gamerule label-text">
					1. Learn to write Chinese characters from Live Demo and a guided imitation.<br />
					2. Browse the evolution of Chinese characters dating back to 2nd millennium BC.<br />
					3. "Draw" the Chinese character from your memory.<br />
					4. Peer review all your teammates' works and take a vote!
					</div>
					<br />
					<div className="gamerule label-title"><b>B. Oracle Guessing</b></div>
					<br />
					<div className="gamerule label-text">
					1. An Oracle bone script, together with the English meaning of the word, will be displayed.<br />
					2. Four choices of modern Chinese characters will be displayed.<br />
					3. Only one answer is correct.<br /><br />
					</div>
					<div className="gamerule label-text"><b>Note: Empirical evidence suggests, a prior knowledge in Chinese isn't going to help. Just trust your gut and have fun!</b></div><br />
					<div className="gamerule label-title"><b>C. A bit of Both</b></div>
					<br />
					<div className="gamerule label-text">1. Just like its name, a bit of both modes coming in random order.
                    </div>
					<br />
					<br />
					<div className="lobby button-container">
						<PrimaryButton
							width="12%"
							onClick={() => history.push(`/room/lobby`)}
						>
						Back to Lobby
						</PrimaryButton>
					</div>
				</div>
        </center>
		</BaseContainer>
	);
}

export default GameRule;