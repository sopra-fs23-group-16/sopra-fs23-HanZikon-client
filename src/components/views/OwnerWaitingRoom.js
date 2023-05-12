import React, {useEffect, useState} from 'react';
import { handleError, client} from 'helpers/api';
import {useParams} from 'react-router-dom';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import {SecondaryButton} from 'components/ui/SecondaryButton';
import 'styles/views/OwnerWaitingRoom.scss';
import BaseContainer from "components/ui/BaseContainer";
import { nextRound } from "helpers/nextRound";

import {Spinner} from "../ui/Spinner";
import dog from "image/dog.png";

import copyToClipboard from "../../helpers/copyToClipboard";

const OwnerWaitingRoom = props => {
	
	// const history = useHistory();
    const {roomID} = useParams();
	const [roomCode, setRoomcode] = useState('');
	const [players, setPlayers] = useState([]);
	const playerNames = players.length > 0 ? players.map(player => player.playerName) : [];

	const [gameMode, setgameMode] = useState([]);

	const [copied, setCopied] = useState(false);

	const requestBody = JSON.stringify({ roomID });

	useEffect(() => {
		// fetchLocalUser();
		
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function stompConnect() {
            try {
                if (!client['connected']) {
                    client.connect({}, function () {
						// console.log('connected to stomp');
						client.subscribe("/topic/multi/rooms/"+ roomID +"/info", function (response) {
							const room = response.body;
							const roomparse = JSON.parse(room);
							const roomcode = roomparse["roomCode"]
							const players = roomparse["players"]
							//console.log(players[0]);	
							//console.log(getUserIcon(players[0]));	
							setRoomcode(roomcode);	
							setPlayers(players);	

							const gameMode = roomparse["gameParam"]["questionType"]
							setgameMode(gameMode);			
						});
						setTimeout(function () {
							client.send("/app/multi/rooms/"+ roomID + "/info",{}, requestBody)
						},100);
						// client.subscribe('/topic/multi/rooms/' + roomID + '/join', function (response) {
						// 	const room = response.body;
						// 	const roomparse = JSON.parse(room);
						// 	//console.log(roomparse);
						// });
						client.subscribe('/topic/multi/games/' + roomID + '/questions', function (response) {
							const questionList = response.body;
							const qListparse = JSON.parse(questionList);
							// initialise round (0: not started)
							// save questions
							localStorage.setItem('round', 0)
							localStorage.setItem('questionList', JSON.stringify(qListparse));

							nextRound(roomID);

							// window.location.href = '/games/imitation/' + roomID;

						});
						client.subscribe('/topic/multi/rooms/' + roomID + '/drop', function (response) {
							const room = response.body;
							const roomparse = JSON.parse(room);
							const players = roomparse["players"];
							setPlayers(players);
							// console.log(roomparse);
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
	
	const kickout = (players) => {
		client.send("/app/multi/rooms/"+ roomID + "/drop",{}, JSON.stringify(players));
    };
	
	const startGame = (players) => {
		//clear round and questionList
		localStorage.removeItem('round');
		localStorage.removeItem('questionList');
		client.send("/app/multi/games/" + roomID + "/start", {}, '');
    };

	const exitRoom = () => {
		const loggedInUserID = localStorage.getItem("loggedInUser");
		const playerToUpdate = players.find(player => player.userID == Number(loggedInUserID));
		
		client.send('/app/multi/rooms/' + roomID + '/drop', {}, JSON.stringify(playerToUpdate))
		window.location.href = "/rooms/lobby";
    };



	let content = <center><Spinner /></center>;

	if (roomCode) {
		content = (
			<center>
				<div className="ownerwaiting label">{gameMode}</div>
				<div className="ownerwaiting button-container">
					<PrimaryButton
						width="15%"
						disabled = {!players.every(player => player.ready)}
						onClick={() => startGame() }
					>
						Start Game
					</PrimaryButton>
				</div>
				<div className="ownerwaiting button-container">
					<SecondaryButton
						width="15%"
						onClick={() => exitRoom() }
					>
						Exit Room 
					</SecondaryButton>
				</div>
				<div className="ownerwaiting input">
					Room Code: {roomCode}
				</div>
				<div className="ownerwaiting button-container">			
				<button className="ownerwaiting button-box" onClick ={ () => {
						// navigator.clipboard.writeText(roomCode);
						copyToClipboard(roomCode)
						setCopied(true);
						setTimeout(() => {
						setCopied(false);
						}, 5000);
					}} >{copied ? "Code copied!" : "Copy code"}</button></div>
			</center>
		)
	}

	return (
		<BaseContainer>
			<div  className="ownerwaiting container">
				<div className="ownerwaiting col">
					{players.map((player, index) => (
						<>
							{players.length > index ? (
								<div className="ownerwaiting card">
									<img src={dog}  style={{ width: '100%', height: 'auto', display: 'block', margin: 'auto' }} />
								</div>
							) : null}
							{/* owner*/}
							{playerNames.length > index && index == 0 ? (
								<div className="ownerwaiting label" >&#x2705; {playerNames[index]}</div>
							) : null}
							{/*player ready*/}
							{playerNames.length > index && index !== 0 && players[index]?.ready ? (
								<div className="ownerwaiting label" onClick={() => kickout(player)}>&#x1F6AB; &#x2705; {playerNames[index]}</div>
							) : null}
							{/*player not ready*/}
							{playerNames.length > index && index !== 0 && !players[index]?.ready ? (
								<div className="ownerwaiting label" onClick={() => kickout(player)}>&#x1F6AB; &#x274C; {playerNames[index]}</div>
							) : null}
						</>
					))}
				</div>
				<div className="ownerwaiting col">
				<div className="ownerwaiting form">
					{content}
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
export default OwnerWaitingRoom;