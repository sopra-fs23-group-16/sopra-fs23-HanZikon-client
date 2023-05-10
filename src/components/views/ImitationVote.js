import React, { useRef, useEffect, useState } from 'react';
import {api, handleError, client } from 'helpers/api';
import { useHistory, useParams } from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import dog from 'image/dog.png';
import recognizeHandwriting from "../../helpers/recognizeHandwriting";
import 'styles/views/ImitationVote.scss';
import 'styles/views/ChoiceGame.scss';
import User from 'models/User';
import {fetchLocalUser} from "../../helpers/confirmLocalUser";

const ImitationVote = props => {

	const { roomID } = useParams();
	const [players, setPlayers] = useState([]);
	const playerNames = players.map(player => player.playerName)
	const playerImitations = [[],[]];

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
							setPlayers([]);
							const playersImitations = response.body;
							const playersImitationsParse = JSON.parse(playersImitations);
							const playersImitationsArray = Object.entries(playersImitationsParse)
							console.log(playersImitationsArray);
							for (var i=0; i<playersImitationsArray.length; i++)
							{
								playersImitationsArray[i][1] = "data:image/png;base64," + playersImitationsArray[i][1];
								const string = "playerImitation" + i;
								document.getElementById(string).src = playersImitationsArray[i][1];
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

	/*
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

				<div className="choicegame form">
					<center>
						<div id="countdown" className="">
						</div>
						<div>
							<img id="playerImitation0" src="" style={{ width: '15%', height: 'auto', margin: 'auto' }}/>
							<img id="playerImitation1" src="" style={{ width: '15%', height: 'auto', margin: 'auto' }}/>
							<img id="playerImitation2" src="" style={{ width: '15%', height: 'auto', margin: 'auto' }}/>
							<img id="playerImitation3" src="" style={{ width: '15%', height: 'auto', margin: 'auto' }}/>
							<img id="playerImitation4" src="" style={{ width: '15%', height: 'auto', margin: 'auto' }}/>
							<img id="playerImitation5" src="" style={{ width: '15%', height: 'auto', margin: 'auto' }}/>
						</div>
						
						<div className="choicegame label"> {"Like it"}</div>
						<div className="choicegame label"> {"Like it"}</div>
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