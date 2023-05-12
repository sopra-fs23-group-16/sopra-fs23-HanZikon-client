import React, { useRef, useEffect, useState } from 'react';
import {api, handleError, client } from 'helpers/api';
import { useHistory, useParams } from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import dog from 'image/dog.png';
import 'styles/views/ImitationInspect.scss';
// import User from 'models/User';
import HanziWriter from "hanzi-writer";
import {Spinner} from "../ui/Spinner";
// import {fetchLocalUser} from "../../helpers/confirmLocalUser";

const ImitationInspect = props => {

	const history = useHistory();
	const { roomID } = useParams();
	const [players, setPlayers] = useState([]);
	const playerNames = players.map(player => player.playerName)
	const [imgLoaded, setImgLoaded] = useState(false);
	const [countdown, setCountdown] = useState(15);

	const horizontalStyles = {
		display: 'flex',
		flexDirection: 'row', // align children horizontally
		justifyContent: 'center', // distribute children evenly
		alignItems: 'center', // vertically align children
	};

	const questionList = JSON.parse(localStorage.getItem('questionList'));
	if (questionList === null) {
		alert("Game crashed! Retrieve questions failed!")
	}
	const round = localStorage.getItem('round');
	if (round === null) {
		alert("Game crashed! Round is null!")
	}
	const currentQuestion = questionList[round - 1];

	const evolutions = currentQuestion.evolution;
	const meaning = currentQuestion.meaning;
	//console.log(url);

	const requestBody = JSON.stringify({ roomID });

	useEffect(() => {
		

		// fetchLocalUser();
		
		startCountdown();
		// effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
		async function stompConnect() {
			try {
				if (!client['connected']) {
					client.connect({}, function () {
						console.log('connected to stomp');
						client.subscribe("/topic/multi/rooms/" + roomID + "/info", function (response) {
							const room = response.body;
							const roomparse = JSON.parse(room);
							const players = roomparse["players"]
							setPlayers(players);
						});
						setTimeout(function () {
							client.send("/app/multi/rooms/" + roomID + "/info", {}, requestBody)
						}, 500);
						client.subscribe('/topic/multi/rooms/' + roomID + '/join', function (response) {
							const room = response.body;
							const roomparse = JSON.parse(room);
							console.log(roomparse);
						});
					});
				}
			} catch (error) {
				console.error(`Something went wrong: \n${handleError(error)}`);
				console.error("Details:", error);
				alert("Something went wrong! See the console for details.");
			}
		}
		stompConnect();

		const writer = HanziWriter.create('character-demo-div', currentQuestion.character, {
			width: 100,
			height: 100,
			padding: 5,
			strokeAnimationSpeed: 2,
			delayBetweenLoops: 500
		});
		writer.loopCharacterAnimation();

		var imitator = HanziWriter.create('character-quiz-div', currentQuestion.character, {
			width: 100,
			height: 100,
			showCharacter: false,
			showHintAfterMisses: 1,
			padding: 5
		});
		imitator.quiz();

		// return a function to disconnect on unmount
		return function cleanup() {
			if (client && client['connected']) {
				client.disconnect(function () {
					console.log('disconnected from stomp');
				});
			}
		};

	}, []);

	const startCountdown = () => {
		
		const timer = setInterval(() => {
			setCountdown(countdown => countdown - 1);
		}, 1000);

		setTimeout(() => {
			clearInterval(timer);
			window.location.href = `/game/${roomID}/imitationwriting/`;
		}, 15000);
		
		return () => clearInterval(timer);
	};

	let loadedImg = 0;

	const handleImgLoad = (num) => {
		loadedImg++;
		if(loadedImg==num){
			setImgLoaded(true);
		}
	}

	return (
		<BaseContainer>
			<div className="imitationinspect container">
				
				<div className="imitationinspect col">

					{players.length > 0 ? (
						<div className="imitationinspect card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 0 ? (
						<div className="imitationinspect label"> {playerNames[0]}</div>
					) : null}
					{players.length > 1 ? (
						<div className="imitationinspect card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 1 ? (
						<div className="imitationinspect label"> {playerNames[1]}</div>
					) : null}

					{players.length > 2 ? (
						<div className="imitationinspect card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 2 ? (
						<div className="imitationinspect label"> {playerNames[2]}</div>
					) : null}

					{players.length > 3 ? (
						<div className="imitationinspect card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 3 ? (
						<div className="imitationinspect label"> {playerNames[3]}</div>
					) : null}

					{players.length > 4 ? (
						<div className="imitationinspect card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 4 ? (
						<div className="imitationinspect label"> {playerNames[4]}</div>
					) : null}

					{players.length > 5 ? (
						<div className="imitationinspect card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 5 ? (
						<div className="imitationinspect label"> {playerNames[5]}</div>
					) : null}

					{players.length > 6 ? (
						<div className="imitationinspect card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 6 ? (
						<div className="imitationinspect label"> {playerNames[6]}</div>
					) : null}

				</div>
				
				<div className="imitationinspect col">
					<div className="imitationinspect form">
						{!imgLoaded && <center><Spinner /></center>}
						<div className={imgLoaded ? "content" : "content hidden"}>
							<center>
								<p className="imitationinspect timer">{countdown}s</p>
								<div >
									<text>
										Demo
									</text>
									<div id="character-demo-div"></div>
								</div>
								<div>
									<text>
										Quiz Yourself
									</text>
									<div id="character-quiz-div"></div>
								</div>
								<br />
								<div>
									{evolutions.map((evolution, index) => (
										(evolution !== "n.a.") && (
											<img
												key={index}
												src={evolution}
												alt="player1"
												onLoad={() => handleImgLoad(evolutions.length)}
												style={{ width: '10%', height: 'auto', margin: 'auto' }}
											/>
										)
									))}
								</div>
								<br />
								<br />
								<div className="imitationinspect meaninglabel"> {meaning}</div>
							</center>
						</div>
					</div>

				</div>
			</div>
		</BaseContainer>
	);
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default ImitationInspect;