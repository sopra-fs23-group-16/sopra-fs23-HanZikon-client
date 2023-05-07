import React, { useRef, useEffect, useState } from 'react';
import {api, handleError, client } from 'helpers/api';
import { useHistory, useParams } from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import dog from 'image/dog.png';
import recognizeHandwriting from "../../helpers/recognizeHandwriting";
import 'styles/views/ImitationVote.scss';
import User from 'models/User';

const ImitationVote = props => {

	const { roomID } = useParams();
	const [roomCode, setRoomcode] = useState('');
	const [numPlayers, setNumPlayers] = useState("");
	const [players, setPlayers] = useState([]);
	//console.log(players);
	const playerNames = players.map(player => player.playerName)
	//console.log(playerNames);

	const history = useHistory();
	
	const questionList = JSON.parse(localStorage.getItem('questionList'));
	if (questionList === null) {
		alert("Game crashed! Retrieve questions failed!")
	}
	const round = localStorage.getItem('round');
	if (round === null) {
		alert("Game crashed! Round is null!")
	}
	const currentQuestion = questionList[round - 1];
	console.log(currentQuestion);

	const requestBody = JSON.stringify({ roomID });



	useEffect(() => {
		
		async function fetchLocalUser() {
			try {
				const requestBody = JSON.stringify({ token: localStorage.getItem("token") });
				const response = await api.post(`/users/localUser`, requestBody);

				const user = new User(response.data);
				console.log("Confirm local user:",user);
				localStorage.setItem('loggedInUser', user.id);

			} catch (error) {
				alert("You are not logged in!");
				localStorage.removeItem('token');
				history.push('/login');
			}
		}
		fetchLocalUser();
		
		// effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
		async function stompConnect() {
			try {
				if (!client['connected']) {
					client.connect({}, function () {
						console.log('connected to stomp');
						client.subscribe("/topic/multi/rooms/" + roomID + "/info", function (response) {
							const room = response.body;
							const roomparse = JSON.parse(room);
							const roomcode = roomparse["roomCode"]
							const players = roomparse["players"]
							console.log(players);
							console.log(roomparse);
							setRoomcode(roomcode);
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
		// return a function to disconnect on unmount
		return function cleanup() {
			if (client && client['connected']) {
				client.disconnect(function () {
					console.log('disconnected from stomp');
				});
			}
		};
	}, []);

	/*function evaluateWriting(response, character) {
		let answer  = character;
		let candidates = response;
		let score = 10;

		for (let i= 0;i < candidates.length; i++) {
			if(i!=0 && i% 3==0){
				score = score - 2;
			}
			if (candidates[i] == answer){
				break;
			}
		}
		return score;
	}

	function handleResponse(response) {
		if (response instanceof Error) {
			console.error('Error:', response.message);
			// Handle the error in some way, such as displaying a message to the user or logging it
		} else {
			console.log('Response:', response);
			const score = evaluateWriting(response,currentQuestion.character);
			localStorage.setItem("roundPoints", score);
			console.log("Score",score)
			// Handle the response data in some way, such as updating the UI or storing it in a database

		}
	}

	const submitScore = () => {
		///////////////////////////////////////////////
		//    make sure it is the right userID       //
		///////////////////////////////////////////////
		const userID = localStorage.getItem('loggedInUser')
		let systemScore = 0;
		if (localStorage.getItem("roundPoints")) {
			systemScore = parseInt(localStorage.getItem("roundPoints"));
			setTimeout(function () {
				console.log("roundPoints", systemScore);
			}, 50);
		}
		const requestBody = {userID,scoreBoard: {systemScore}};
		client.send("/app/multi/rooms/" + roomID + "/players/scoreBoard", {}, JSON.stringify(requestBody))
	}*/

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
			<div className="choicegame container">
				<div className="choicegame col">

					{players.length > 0 ? (
						<div className="choicegame card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 0 ? (
						<div className="choicegame label"> {playerNames[0]}</div>
					) : null}
					{players.length > 1 ? (
						<div className="choicegame card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 1 ? (
						<div className="choicegame label"> {playerNames[1]}</div>
					) : null}

					{players.length > 2 ? (
						<div className="choicegame card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 2 ? (
						<div className="choicegame label"> {playerNames[2]}</div>
					) : null}

					{players.length > 3 ? (
						<div className="choicegame card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 3 ? (
						<div className="choicegame label"> {playerNames[3]}</div>
					) : null}

					{players.length > 4 ? (
						<div className="choicegame card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 4 ? (
						<div className="choicegame label"> {playerNames[4]}</div>
					) : null}

					{players.length > 5 ? (
						<div className="choicegame card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 5 ? (
						<div className="choicegame label"> {playerNames[5]}</div>
					) : null}

					{players.length > 6 ? (
						<div className="choicegame card">
							<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						</div>) : null}
					{playerNames.length > 6 ? (
						<div className="choicegame label"> {playerNames[6]}</div>
					) : null}

				</div>
				<div className="choicegame col">
					<center>
						<div id="countdown" className="">
						</div>
						<br />
						<br />
					</center>
					<div className="">
						<center>
							
						</center>
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
export default ImitationVote;