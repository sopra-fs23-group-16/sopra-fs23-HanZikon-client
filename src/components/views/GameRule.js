import {useHistory} from 'react-router-dom';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/GameRule.scss";
import {useState} from "react";
import {SecondaryButton} from "../ui/SecondaryButton";

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
				{/*<h1>Game Rule</h1>*/}
				<div className="gamerule form">

                <div className="gamerule label-title-big">
                	Introduction by Modes
				</div>

				<br />
					<div className="gamerule module" onClick={toggle1}>
						<div className="gamerule label-title">
							Riddle of Oracle Script
						</div>
						{isExpanded1 && (
							<div className="gamerule label-text">
								1. An Oracle bone script from Bronze Age China (c.1500 BC) is displayed.<br />
								2. Four modern Chinese characters are the choices, only one is the correct answer.<br />
								3. Choose the correct answer in your mind.<br />
								<div className="gamerule label-text-note"> Trust your gut and choose the one that looks alike. Prior knowledge in Chinese won't help.</div>
							</div>
							)}
					</div>
					<div className="module" onClick={toggle2}>
						<div className="gamerule label-title">
							Hanzi Imitation
						</div>
						{isExpanded2 && (
							<div className="gamerule label-text">
								1. Learn to write Hanzi (Chinese character) from Live Demo and a guided Quiz.<br />
								2.  Browse the evolution of Hanzi dating back to 2nd millennium BC.<br />
								3. "Draw" the Hanzi from your memory.<br />
								4. Peer review and take a vote!
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
					{!isExpanded && (
					<div className="lobby button-container">
						<SecondaryButton
							width="22%"
							onClick={() => toggleModule()}
						>
							Unfold ALL
						</SecondaryButton>
					</div>)}
						<PrimaryButton
							width="22%"
							onClick={() => history.push(`/room/lobby`)}
						>
							Back
						</PrimaryButton>
				</div>
				{/*<div className="gamerule label-text">*/}
				{/*	1. An Oracle bone script, together with the English meaning of the word, will be displayed.<br />*/}
				{/*	2. Four choices of modern Chinese characters will be displayed.<br />*/}
				{/*	3. Only one answer is correct.<br /><br />*/}
				{/*	</div>*/}
				{/*	<br />*/}
				{/*	<div className="gamerule label-title"><b>B. Oracle Guessing</b></div>*/}
				{/*	<br />*/}
				{/*	<div className="gamerule label-text">*/}
				{/*	1. An Oracle bone script, together with the English meaning of the word, will be displayed.<br />*/}
				{/*	2. Four choices of modern Chinese characters will be displayed.<br />*/}
				{/*	3. Only one answer is correct.<br /><br />*/}
				{/*	</div>*/}
				{/*	<div className="gamerule label-text"><b>Note: Empirical evidence suggests, a prior knowledge in Chinese isn't going to help. Just trust your gut and have fun!</b></div><br />*/}
				{/*	<div className="gamerule label-title"><b>C. A bit of Both</b></div>*/}
				{/*	<br />*/}
				{/*	<div className="gamerule label-text">1. Just like its name, a bit of both modes coming in random order.*/}
                {/*    </div>*/}
				{/*	<br />*/}
				{/*	<br />*/}
				{/*	<div className="lobby button-container">*/}
				{/*		<PrimaryButton*/}
				{/*			width="12%"*/}
				{/*			onClick={() => history.push(`/room/lobby`)}*/}
				{/*		>*/}
				{/*		Back to Lobby*/}
				{/*		</PrimaryButton>*/}
				{/*	</div>*/}
				</div>
        </center>
		</BaseContainer>
	);
}

export default GameRule;