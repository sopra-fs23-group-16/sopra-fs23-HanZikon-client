import {useHistory} from 'react-router-dom';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/GameRule.scss";
import {useState} from "react";

const GameRule = () => {
    const history = useHistory();
	const [isExpanded, setIsExpanded] = useState(false);

	const [isExpanded1, setIsExpanded1] = useState(false);
	const [isExpanded2, setIsExpanded2] = useState(false);
	const [isExpanded3, setIsExpanded3] = useState(false);

	const toggleModule = () => {
		setIsExpanded1(true);
		setIsExpanded2(true);
		setIsExpanded3(true);
		setIsExpanded(true);
	};

	const toggle1 = () => {
		setIsExpanded1(!isExpanded1);
	};

	const toggle2 = () => {
		setIsExpanded2(!isExpanded2);
	};

	const toggle3 = () => {
		setIsExpanded3(!isExpanded3);
	};

	return (
		<BaseContainer>
        <center>
				<div className="gamerule form">
                <div className="gamerule label-title-big">
                	Game Modes Intro
				</div>
				<br />
					<div className="gamerule module" onClick={toggle1}>
						<div className="gamerule label-title">
							Riddle of Oracle Script
						</div>
						{isExpanded1 && (
							<div className="gamerule label-text">
								Similar to old Egyptian letters, Oracle bone script look like the objects they represent.<br />
								As the direct descendent, modern Chinese contains traces of them. <br /><br />
								1. Question: An Oracle bone script from Bronze Age China (c.1500 BC) <br />
								2. Choices:  Four modern Chinese characters.<br />
								3. Take a guess based on similarities.<br />
								<div className="gamerule label-text-note"> Trust your gut. Prior knowledge in Chinese won't help.</div>
							</div>
						)}
					</div>
					<div className="module" onClick={toggle2}>
						<div className="gamerule label-title">
							Hanzi Imitation
						</div>
						{isExpanded2 && (
							<div className="gamerule label-text">
								1a. Learn to write Hanzi (Chinese character) from Demo and a guided Quiz.<br />
								1b. Browse the evolution of Hanzi dating back to 2000 BC.<br />
								2. "Draw" the Hanzi from your memory.<br />
								3. Peer review and take a vote!
							</div>
						)}
					</div>
					<div className="module" onClick={toggle3}>
						<div className="gamerule label-title">
							Bit of Both
						</div>
						{isExpanded3 && (
							<div className="gamerule label-text">
								We are grown-ups. Why not Have a bit of BOTH?
							</div>
						)}
					</div>
					<div>
						<PrimaryButton
							width="22%"
							onClick={() => history.push(`/room/lobby`)}
						>
							Back
						</PrimaryButton>
				</div>
				</div>
        </center>
		</BaseContainer>
	);
}

export default GameRule;