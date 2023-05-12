import React, { useRef, useEffect, useState } from 'react';
import {api, handleError, client } from 'helpers/api';
import { useHistory, useParams } from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import dog from 'image/dog.png';
// import recognizeHandwriting from "../../helpers/recognizeHandwriting";
import 'styles/views/ImitationVote.scss';
// import User from 'models/User';
// import {fetchLocalUser} from "../../helpers/confirmLocalUser";
import {PrimaryButton} from 'components/ui/PrimaryButton';

const ImitationVote = props => {

	const { roomID } = useParams();
	const [players, setPlayers] = useState([]);
	const playerNames = players.map(player => player.playerName)
	const [buttonClicked, setButtonClicked] = useState(false);
	const [playerImitationNames, setPlayerImitationNames] = useState([]);
	const round = parseInt(localStorage.getItem("round"));

	const history = useHistory();

	const requestBody = JSON.stringify({ roomID });

	useEffect(() => {

		// fetchLocalUser();
		
		async function stompConnect() {
			try {
				if (!client['connected']) {
					client.connect({}, function () {
						console.log('connected to stomp');
						client.subscribe("/topic/multi/rooms/" + roomID + "/info", function (response) {
							const room = response.body;
							const roomparse = JSON.parse(room);
							const players = roomparse["players"]
							console.log(players);
							console.log(roomparse);
							setPlayers(players);
						});
						setTimeout(function () {
							client.send("/app/multi/rooms/" + roomID + "/info", {}, requestBody)
						}, 500);

						client.subscribe('/topic/multi/rooms/' + roomID + '/imitations', function (response) {
							const playersImitations = response.body;
							const playersImitationsParse = JSON.parse(playersImitations);
							const playersImitationsArray = Array.from(playersImitationsParse);
							const playerImitationNames = Array.from(playersImitationsParse);


							for (var i=0; i<playersImitationsParse.length; i++){
								playersImitationsArray[i] = "data:image/png;base64," + playersImitationsParse[i].imitationBytes;
								const string = "playerImitation" + i;
								playerImitationNames[i] = playersImitationsParse[i].username;

								document.getElementById(string).src = playersImitationsArray[i];
							}
							// setPlayers(playersImitationsArray);
							setPlayerImitationNames(playerImitationNames);
						});
						setTimeout(function () {
							const requestBody = {
								round: round
							};
							client.send("/app/multi/rooms/" + roomID + "/players/records",{}, JSON.stringify(requestBody))
						}, 500);

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
	
	console.log(players);
	console.log(players.length);
	console.log(players[0]);

	const submitScore = (userOrder) => {
		var votedScore = 10;
		const userID = players[userOrder][0];
		const requestBody = {userID,scoreBoard: {votedScore}};
		client.send("/app/multi/rooms/" + roomID + "/players/scoreBoard", {}, JSON.stringify(requestBody))
	}

	window.addEventListener("load", function() {

		var countdown = 20;
		var countdownElement = document.getElementById("countdown");

		var timer = setInterval(function() {
			countdown--;
			countdownElement.innerHTML = countdown + "s";

			if (countdown <= 0) {
				clearInterval(timer);
				//setTimeout(submitScore(), 50);
				setTimeout(function () {
					window.location.href = `/game/${roomID}/result`;
				}, 500);
			}
		}, 1000);
	});

	return (
		<BaseContainer>
			<div className="imitationvote container">
				<div className="imitationvote col">

					{players.length > 0 ? (
						<div className="imitationvote card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 0 ? (
						<div className="imitationvote label"> {playerNames[0]}</div>
					) : null}
					{players.length > 1 ? (
						<div className="imitationvote card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 1 ? (
						<div className="imitationvote label"> {playerNames[1]}</div>
					) : null}

					{players.length > 2 ? (
						<div className="imitationvote card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 2 ? (
						<div className="imitationvote label"> {playerNames[2]}</div>
					) : null}

					{players.length > 3 ? (
						<div className="imitationvote card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 3 ? (
						<div className="imitationvote label"> {playerNames[3]}</div>
					) : null}

					{players.length > 4 ? (
						<div className="imitationvote card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 4 ? (
						<div className="imitationvote label"> {playerNames[4]}</div>
					) : null}

					{players.length > 5 ? (
						<div className="imitationvote card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 5 ? (
						<div className="imitationvote label"> {playerNames[5]}</div>
					) : null}

					{players.length > 6 ? (
						<div className="imitationvote card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 6 ? (
						<div className="imitationvote label"> {playerNames[6]}</div>
					) : null}

				</div>

				<div className="imitationvote form">
					<center>
						<div id="countdown" className="imitationvote timer">
						</div>
						<div>
							<img id="playerImitation0" src="" alt="" style={{ width: '15%', height: 'auto', margin: 'auto' }}/>
							<img id="playerImitation1" src="" alt="" style={{ width: '15%', height: 'auto', margin: 'auto' }}/>
							<img id="playerImitation2" src="" alt="" style={{ width: '15%', height: 'auto', margin: 'auto' }}/>
						</div>
						<div className="imitationvote votevater">
							{players.length > 0 ? (
								<PrimaryButton
									disabled={buttonClicked}
									width="10%"
									id="playerImitationDiv0"
									padding-right = "5%"
									onClick={() => {
										if (!buttonClicked) {
											setButtonClicked(true);
											submitScore(0);
										}
									}}
								>
									{"Like "}{playerImitationNames[0]}
								</PrimaryButton>
							):null}
							{players.length > 1 ? (
								<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
							):null}
							{players.length > 1 ? (
								<PrimaryButton
									disabled={buttonClicked}
									width="10%"
									padding-right = "5%"
									onClick={() => {
										if (!buttonClicked) {
											setButtonClicked(true);
											submitScore(1);
										}
									}}
								>
									{"Like "}{playerImitationNames[1]}
								</PrimaryButton>
							):null}
							{players.length > 2 ? (
								<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
							):null}
							{players.length > 2 ? (
								<PrimaryButton
									disabled={buttonClicked}
									width="10%"
									padding-right = "5%"
									onClick={() => {
										if (!buttonClicked) {
											setButtonClicked(true);
											submitScore(2);
										}
									}}
								>
									{"Like "}{playerImitationNames[2]}
								</PrimaryButton>
							):null}
						</div>
						<br/>
						<div>
							<img id="playerImitation3" src="" alt="" style={{ width: '15%', height: 'auto', margin: 'auto' }}/>
							<img id="playerImitation4" src="" alt="" style={{ width: '15%', height: 'auto', margin: 'auto' }}/>
							<img id="playerImitation5" src="" alt="" style={{ width: '15%', height: 'auto', margin: 'auto' }}/>
						</div>
						<div className="imitationvote votevater">	
							{players.length > 3 ? (
								<PrimaryButton
									disabled={buttonClicked}
									width="10%"
									padding-right = "5%"
									onClick={() => {
										if (!buttonClicked) {
											setButtonClicked(true);
											submitScore(3);
										}
									}}
								>
									{"Like "}{playerImitationNames[3]}
								</PrimaryButton>
							):null}
							{players.length > 4 ? (
								<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
							):null}
							{players.length > 4 ? (
								<PrimaryButton
									disabled={buttonClicked}
									width="10%"
									padding-right = "5%"
									onClick={() => {
										if (!buttonClicked) {
											setButtonClicked(true);
											submitScore(4);
										}
									}}
								>
									{"Like "}{playerImitationNames[4]}
								</PrimaryButton>
							):null}
							{players.length > 5 ? (
								<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
							):null}
							{players.length > 5 ? (
								<PrimaryButton
									disabled={buttonClicked}
									width="10%"
									padding-right = "5%"
									onClick={() => {
										if (!buttonClicked) {
											setButtonClicked(true);
											submitScore(5);
										}
									}}
								>
									{"Like "}{playerImitationNames[5]}
								</PrimaryButton>
							):null}
						</div>
					</center>
				</div>

			</div>
		</BaseContainer>
	);
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default ImitationVote;