import React, {useEffect, useState} from 'react';
import {api, handleError, client} from 'helpers/api';
// import User from 'models/User';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import {SecondaryButton} from 'components/ui/SecondaryButton';
import 'styles/views/NormalWaitingRoom.scss';
import BaseContainer from "components/ui/BaseContainer";
import {useHistory, useParams } from 'react-router-dom';
import dog from 'image/dog.png';
import {nextRound} from "../../helpers/nextRound";
import {normalizeGameMode} from "../../helpers/normalizeGameMode";
// import {fetchLocalUser} from "../../helpers/confirmLocalUser";

const NormalWaitingRoom = props => {
    const {roomID} = useParams();
	const [players, setPlayers] = useState([]);
	const playerNames = players.map(player => player.playerName);
	const loggedInUserID = localStorage.getItem("loggedInUser");
	const localPlayer = players.find(player => player.userID == Number(loggedInUserID));
	const isReady = localPlayer && localPlayer.ready;
	// const history = useHistory();

	const [gameMode, setgameMode] = useState([]);
	//const playerNames = players.length > 0 ? players.map(player => player.playerName) : [];

	// const userID = localStorage.getItem("loggedInUser");
	// const playerToUpdate = players.find(player => player.userID == Number(userID));


	useEffect(() => {

		// fetchLocalUser();
		
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function stompConnect() {
            try {
                if (!client['connected']) {
                    client.connect({}, function (frame) {
						console.log('connected to stomp');
						client.subscribe("/topic/multi/rooms/"+ roomID +"/info", function (response) {
							const room = response.body;
							const roomparse = JSON.parse(room);
							const players = roomparse["players"]
							//
							// console.log(roomparse);
							setPlayers(players);	
							
							const gameMode = roomparse["gameParam"]["questionType"]
							setgameMode(gameMode);
						});
						setTimeout(function () {
							const requestBody = JSON.stringify({ roomID });
							client.send("/app/multi/rooms/"+ roomID + "/info",{}, requestBody)
						},100);
						client.subscribe('/topic/multi/rooms/' + roomID + '/drop', function (response) {
							const room = response.body;
							const roomparse = JSON.parse(room);
							// console.log(roomparse);
							
							const players = roomparse["players"]
							setPlayers(players);

							const userIDs = players.map(player => player.userID)
							let userId = localStorage.getItem("loggedInUser");

							// console.log("userId",typeof userId)
							// console.log("userIDS",typeof userIDs[0])
							if (!userIDs.includes(parseInt(userId))) {
								alert("You are no longer in the room!");
								 window.location.href = "/room/lobby";
							}
						});
						client.subscribe('/topic/multi/games/' + roomID + '/questions', function (response) {
							// clear
							localStorage.removeItem('round');
							localStorage.removeItem('questionList');

							const questionList = response.body;
							const qListparse = JSON.parse(questionList);
							// initialise
							localStorage.setItem('round', 0)
							localStorage.setItem('questionList', JSON.stringify(qListparse));

							nextRound(roomID);

							// window.location.href = '/games/multiplechoice/' + roomID;

						});
					});
					//console.log("2 the client is ",client['connected'])
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
				//controller.abort();
				client.disconnect(function () {
					console.log('disconnected from stomp');
				});
			}
		};
    }, []);

	// const getReady = () => {
	// 	// const loggedInUserID = localStorage.getItem("loggedInUser");
  	// 	const playerToUpdate = localPlayer;
	//
	// 	const requestgetready = {
	// 		userID: playerToUpdate.userID,
	// 		ready: true
	// 	};
	// 	client.send("/app/multi/rooms/"+ roomID + "/players/ready",{}, JSON.stringify(requestgetready))
    // };
	//
	//
	// const cancelReady = () => {
	// 	// const loggedInUserID = localStorage.getItem("loggedInUser");
  	// 	const playerToUpdate = localPlayer;
	//
	// 	const requestcancelready = {
	// 		userID: playerToUpdate.userID,
	// 		ready: false
	// 	};
	// 	client.send("/app/multi/rooms/"+ roomID + "/players/ready",{}, JSON.stringify(requestcancelready))
    // };

	const updateReady = (ready) => {
		// const loggedInUserID = localStorage.getItem("loggedInUser");
		const playerToUpdate = localPlayer;

		const request = {
			userID: playerToUpdate.userID,
			ready: ready
		};
		client.send("/app/multi/rooms/" + roomID + "/players/ready", {}, JSON.stringify(request));
	};

	const exitRoom = () => {
		const loggedInUserID = localStorage.getItem("loggedInUser");
		const playerToUpdate = players.find(player => player.userID == Number(loggedInUserID));

		client.send('/app/multi/rooms/' + roomID + '/drop', {}, JSON.stringify(playerToUpdate))
    };

	return (
		<BaseContainer>
			<div  className="normalwaiting container">
			<div className="normalwaiting col">
				{players.map((player, index) => (
					<>
						{players.length > index ? (
							<div className="ownerwaiting card">
								<img src={dog}  style={{ width: '100%', height: 'auto', display: 'block', margin: 'auto' }} />
							</div>
						) : null}
						{/*player ready*/}
						{playerNames.length > index && players[index]?.ready ?(
							<div className="ownerwaiting label" >&#x2705; {playerNames[index]}</div>
						) : null}
						{/*player not ready*/}
						{playerNames.length > index && !players[index]?.ready ? (
							<div className="ownerwaiting label" >&#x274C; {playerNames[index]}</div>
						) : null}
					</>
				))}
				{/*{players.length > 0 ? (*/}
				{/*	<div className="normalwaiting card">*/}
				{/*		<img src={dog} alt="player1" style={{ width: '100%', height: 'auto', display: 'block', margin: 'auto' }} />*/}
				{/*	</div>) : null}*/}
				{/*	{playerNames.length > 0 && players[0]?.ready ? (*/}
				{/*		<div className="normalwaiting label">&#x2705; {playerNames[0]}</div>*/}
				{/*		) : (playerNames.length > 0 && !players[0]?.ready ? (*/}
				{/*		<div className="normalwaiting label">&#x274C; {playerNames[0]}</div>*/}
				{/*	) : null)}*/}
				{/*{players.length > 1 ? (*/}
				{/*	<div className="normalwaiting card">*/}
				{/*		<img src={dog} alt="player1" style={{ width: '100%', height: 'auto', display: 'block', margin: 'auto' }} />*/}
				{/*	</div>) : null}*/}
				{/*	{playerNames.length > 1 && players[1]?.["ready"] ? (*/}
				{/*		<div className="normalwaiting label">&#x2705; {playerNames[1]}</div>*/}
				{/*		) : (playerNames.length > 1 && !players[1]?.ready ? (*/}
				{/*		<div className="normalwaiting label">&#x274C; {playerNames[1]}</div>*/}
				{/*	) : null)}*/}
				{/*{players.length > 2 ? (	*/}
				{/*	<div className="normalwaiting card">*/}
				{/*		<img src={dog} alt="player1" style={{ width: '100%', height: 'auto', display: 'block', margin: 'auto' }} />*/}
				{/*	</div>) : null}*/}
				{/*	{playerNames.length > 2 && players[2]?.ready ? (*/}
				{/*		<div className="normalwaiting label">&#x2705; {playerNames[2]}</div>*/}
				{/*		) : (playerNames.length > 2 && !players[2]?.ready ? (*/}
				{/*		<div className="normalwaiting label">&#x274C; {playerNames[2]}</div>*/}
				{/*	) : null)}*/}
				{/*{players.length > 3 ? (*/}
				{/*	<div className="normalwaiting card">*/}
				{/*		<img src={dog} alt="player1" style={{ width: '100%', height: 'auto', display: 'block', margin: 'auto' }} />*/}
				{/*	</div>) : null}*/}
				{/*	{playerNames.length > 3 && players[3]?.ready ? (*/}
				{/*		<div className="normalwaiting label">&#x2705; {playerNames[3]}</div>*/}
				{/*		) : (playerNames.length > 3 && !players[3]?.ready ? (*/}
				{/*		<div className="normalwaiting label">&#x274C; {playerNames[3]}</div>*/}
				{/*	) : null)}*/}
				{/*{players.length > 4 ? (*/}
				{/*	<div className="normalwaiting card">*/}
				{/*		<img src={dog} alt="player1" style={{ width: '100%', height: 'auto', display: 'block', margin: 'auto' }} />*/}
				{/*	</div>) : null}*/}
				{/*	{playerNames.length > 4 && players[4]?.ready ? (*/}
				{/*		<div className="normalwaiting label">&#x2705; {playerNames[4]}</div>*/}
				{/*		) : (playerNames.length > 4 && !players[4]?.ready ? (*/}
				{/*		<div className="normalwaiting label">&#x274C; {playerNames[4]}</div>*/}
				{/*	) : null)}*/}

				{/*{players.length > 5 ? (*/}
				{/*	<div className="normalwaiting card">*/}
				{/*		<img src={dog} alt="player1" style={{ width: '100%', height: 'auto', display: 'block', margin: 'auto' }} />*/}
				{/*	</div>) : null}*/}
				{/*	{playerNames.length > 5 && players[5]?.ready ? (*/}
				{/*		<div className="normalwaiting label">&#x2705; {playerNames[5]}</div>*/}
				{/*		) : (playerNames.length > 5 && !players[5]?.ready ? (*/}
				{/*		<div className="normalwaiting label">&#x274C; {playerNames[5]}</div>*/}
				{/*	) : null)}*/}
				{/* {players.length > 6 ? (
					<div className="normalwaiting card">
						<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
					</div>) : null}
					{playerNames.length > 6 && players[6]?.ready ? (
						<div className="normalwaiting label">&#x2705; {playerNames[6]}</div>
						) : (playerNames.length > 6 && !players[6]?.ready ? (
						<div className="normalwaiting label">&#x274C; {playerNames[6]}</div>
					) : null)} */}
				</div>
				<div className="normalwaiting col">
				<div className="normalwaiting form">
					<center>
					<div className="ownerwaiting label">Game Mode: {normalizeGameMode(gameMode)}</div>
					<div className="normalwaiting button-container">
				<PrimaryButton
					width="15%"
					onClick={() => updateReady(!isReady)}
					>
					{isReady? "Cancel Ready":"Get Ready"}
				</PrimaryButton>
				</div>
				{/*<div className="normalwaiting button-container">*/}
				{/*<SecondaryButton*/}
				{/*	width="15%"*/}
				{/*	onClick={() => cancelReady()}*/}
				{/*	>*/}
				{/*	Cancel Ready*/}
				{/*</SecondaryButton>*/}
				{/*</div>*/}
				<div className="normalwaiting button-container">
				<SecondaryButton
					width="15%"
					onClick={() => exitRoom()}
					>
					Exit Room
				</SecondaryButton>
				</div>
				</center>
				</div>
			</div>
			{/* <div className="normalwaiting col">
					<div className="normalwaiting card-rule">
						Game Rule
					</div>
				</div> */}
			</div>
		</BaseContainer>
	);
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default NormalWaitingRoom;