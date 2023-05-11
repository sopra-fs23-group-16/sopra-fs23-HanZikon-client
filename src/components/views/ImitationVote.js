import React, { useRef, useEffect, useState } from 'react';
import {api, handleError, client } from 'helpers/api';
import { useHistory, useParams } from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import dog from 'image/dog.png';
import recognizeHandwriting from "../../helpers/recognizeHandwriting";
import 'styles/views/ImitationVote.scss';
import User from 'models/User';
import {fetchLocalUser} from "../../helpers/confirmLocalUser";
import {PrimaryButton} from 'components/ui/PrimaryButton';

const ImitationVote = props => {

	const { roomID } = useParams();
	const [players, setPlayers] = useState([]);
	const playerNames = players.map(player => player.playerName)
	const playerImitations = [[],[]];
	const [buttonClicked, setButtonClicked] = useState(false);

	const history = useHistory();

	const requestBody = JSON.stringify({ roomID });

	useEffect(() => {

		fetchLocalUser();
		
		async function stompConnect() {
			try {
				if (!client['connected']) {
					client.connect({}, function () {
						console.log('connected to stomp');

						client.subscribe('/topic/multi/rooms/' + roomID + '/imitations', function (response) {
							const playersImitations = response.body;
							const playersImitationsParse = JSON.parse(playersImitations);
							const playersImitationsArray = Object.entries(playersImitationsParse)
							console.log(playersImitationsArray);
							for (var i=0; i<playersImitationsArray.length; i++)
							{
								playersImitationsArray[i][1] = "data:image/png;base64," + playersImitationsArray[i][1];
								const string = "playerImitation" + i;
								/*const string2 = "playerImitation" + (i+1);
								const string3 = "playerImitation" + (i+2);
								const string4 = "playerImitation" + (i+3);
								const string5 = "playerImitation" + (i+4);
								const string6 = "playerImitation" + (i+5);*/
								document.getElementById(string).src = playersImitationsArray[i][1];
								/*document.getElementById(string2).src = playersImitationsArray[i][1];
								document.getElementById(string3).src = playersImitationsArray[i][1];
								document.getElementById(string4).src = playersImitationsArray[i][1];
								document.getElementById(string5).src = playersImitationsArray[i][1];
								document.getElementById(string6).src = playersImitationsArray[i][1];*/
							}
							setPlayers(playersImitationsArray);
						});
						setTimeout(function () {
							client.send("/app/multi/rooms/" + roomID + "/players/records", {}, requestBody)
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
					window.location.href = "/games/record/" + roomID;
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
						<div id="countdown" className="">
						</div>
						<div>
							<img id="playerImitation0" src="" style={{ width: '15%', height: 'auto', margin: 'auto' }}/>
							<img id="playerImitation1" src="" style={{ width: '15%', height: 'auto', margin: 'auto' }}/>
							<img id="playerImitation2" src="" style={{ width: '15%', height: 'auto', margin: 'auto' }}/>
						</div>
						<div className="imitationvote votevater">
							{players.length > 0 ? (
								<PrimaryButton
									width="10%"
									padding-right = "5%"
									onClick={() => {
										if (!buttonClicked) {
											setButtonClicked(true);
											submitScore(0);
										}
									}}
								>
									{"Like it"}
								</PrimaryButton>
							):null}
							{players.length > 1 ? (
								<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
							):null}
							{players.length > 1 ? (
								<PrimaryButton
									width="10%"
									padding-right = "5%"
									onClick={() => {
										if (!buttonClicked) {
											setButtonClicked(true);
											submitScore(1);
										}
									}}
								>
									{"Like it"}
								</PrimaryButton>
							):null}
							{players.length > 2 ? (
								<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
							):null}
							{players.length > 2 ? (
								<PrimaryButton
									width="10%"
									padding-right = "5%"
									onClick={() => {
										if (!buttonClicked) {
											setButtonClicked(true);
											submitScore(2);
										}
									}}
								>
									{"Like it"}
								</PrimaryButton>
							):null}
						</div>
						<br/>
						<div>
							<img id="playerImitation3" src="" style={{ width: '15%', height: 'auto', margin: 'auto' }}/>
							<img id="playerImitation4" src="" style={{ width: '15%', height: 'auto', margin: 'auto' }}/>
							<img id="playerImitation5" src="" style={{ width: '15%', height: 'auto', margin: 'auto' }}/>
						</div>
						<div className="imitationvote votevater">	
							{players.length > 3 ? (
								<PrimaryButton
									width="10%"
									padding-right = "5%"
									onClick={() => {
										if (!buttonClicked) {
											setButtonClicked(true);
											submitScore(3);
										}
									}}
								>
									{"Like it"}
								</PrimaryButton>
							):null}
							{players.length > 4 ? (
								<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
							):null}
							{players.length > 4 ? (
								<PrimaryButton
									width="10%"
									padding-right = "5%"
									onClick={() => {
										if (!buttonClicked) {
											setButtonClicked(true);
											submitScore(4);
										}
									}}
								>
									{"Like it"}
								</PrimaryButton>
							):null}
							{players.length > 5 ? (
								<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
							):null}
							{players.length > 5 ? (
								<PrimaryButton
									width="10%"
									padding-right = "5%"
									onClick={() => {
										if (!buttonClicked) {
											setButtonClicked(true);
											submitScore(5);
										}
									}}
								>
									{"Like it"}
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