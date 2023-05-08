import React, {useEffect, useState} from 'react';
import {api, handleError, client} from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/ChoiceGame.scss';
import BaseContainer from "components/ui/BaseContainer";
import dog from 'image/dog.png';
import User from 'models/User';
import {Spinner} from 'components/ui/Spinner';
import Countdown from "react-countdown-now";
import {nextRound} from "../../helpers/nextRound";
import {fetchLocalUser} from "../../helpers/confirmLocalUser";

const ChoiceGame = props => {
	const history = useHistory();
	const [loaded, setLoaded] = useState(false);
	const { roomID } = useParams();
	const [players, setPlayers] = useState([]);
	const playerNames = players.map(player => player.playerName)

	const [isDisabled, setDisabled] = useState(false);
	const colorRight = "green";
	const colorWrong = "red";
	let systemScore = 0;

	const [countdownSeconds, setCountdownSeconds] = useState(10);

	const questionList = JSON.parse(localStorage.getItem('questionList'));
	if (questionList === null) {
		alert("Game crashed! Retrieve questions failed!")
	}
	const round = localStorage.getItem('round');
	if (round === null) {
		alert("Game crashed! Round is null!")
	}
	console.log("round",round);
	const currentQuestion = questionList[round - 1];
	const choices = currentQuestion.choices

	useEffect(() => {

		fetchLocalUser();
		
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function stompConnect() {
            try {
                if (!client['connected']) {
                    client.connect({}, function () {
						console.log('connected to stomp');
						client.subscribe("/topic/multi/rooms/"+ roomID +"/info", function (response) {
							const room = response.body;
							const roomparse = JSON.parse(room);
							const players = roomparse["players"]
							setPlayers(players);					
						});
						setTimeout(function () {
							const requestBody = JSON.stringify({ roomID });
							client.send("/app/multi/rooms/"+ roomID + "/info",{}, requestBody)
						},500);
					});
                }
            } catch (error) {
                console.error(`Something went wrong: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong! See the console for details.");
            }
        }
		stompConnect();

		// return a function to disconnect on unmount
		return function cleanup() {
			if (client && client['connected']) {
				client.disconnect(function () {
					console.log('disconnected from stomp');
				});
			}
		};
	}, []);

	const handleClick = (idx) => {
		const optionIDs = "ABCD"
		const userID = localStorage.getItem('loggedInUser')
		if (currentQuestion.answerIndex === idx) {
			document.getElementById(optionIDs[idx]).style.backgroundColor = colorRight;
			systemScore = 10;
			const requestBody = {userID,scoreBoard: {systemScore}};
			client.send("/app/multi/rooms/" + roomID + "/players/scoreBoard", {}, JSON.stringify(requestBody))
		} else {
			document.getElementById(optionIDs[idx]).style.backgroundColor = colorWrong
			const requestBody = {userID,scoreBoard: {systemScore}};
			client.send("/app/multi/rooms/" + roomID + "/players/scoreBoard", {}, JSON.stringify(requestBody))
		};
		setDisabled(true);
	};

	const submitScore = () => {
		const userID = localStorage.getItem('loggedInUser')
		if (!isDisabled){
			const requestBody = {userID,scoreBoard: {systemScore}};
			client.send("/app/multi/rooms/" + roomID + "/players/scoreBoard", {}, JSON.stringify(requestBody));
		}
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setCountdownSeconds((prevSeconds) => prevSeconds - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const goNext = () => {
		// setTimeout(submitScore(), 50);
		submitScore();
		setTimeout(function () {
		window.location.href = "/games/record/" + roomID;
		}, 50);
	}

	let loadedCmp = 0;

	const handleCmpLoad = (num) => {
		loadedCmp++;
		if(loadedCmp==num){
			setLoaded(true);
		}
	}

	return (
		<BaseContainer>
			<div  className="choicegame container">
				<div className="choicegame col">
					{players.map((player, index) => (
						<div key={index} className="choicegame card">
							<img src={dog} alt={`player${index+1}`} style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
							{index < playerNames.length && <div className="choicegame label"><center>{playerNames[index]}</center></div>}
						</div>
					))}
				</div>
				<div className="choicegame col">
					<div className="choicegame form">
						{!loaded && <center><Spinner /></center>}
						<div className={loaded ? "content" : "content hidden"}>
						<center>
							<div>
								<Countdown
									date={Date.now() + countdownSeconds * 1000} // 10s
									intervalDelay={1000}
									style={{ fontSize: '20px' }}
									renderer={({ seconds }) => <span>{`${seconds}s`}</span>}
									onComplete={() => goNext()}
								/>
							</div>
							<br /><br />
							<img src={currentQuestion.oracleURL} alt="player1" onLoad={()=>handleCmpLoad(1)}
								 style={{ width: '20%', height: 'auto', display: 'block', margin: 'auto' }} />
							<br /><br /><br />
							{choices.map((choice, index) => (
								<button key={index} id={String.fromCharCode(65+index)} className="choicegame option" disabled={isDisabled} onClick={() => handleClick(index)}>
									{choice}
								</button>
							))}
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
export default ChoiceGame;