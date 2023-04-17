import React, {useEffect, useState} from 'react';
import {api, handleError, client} from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/OwnerWaitingRoom.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import dog from 'image/dog.png';

const OwnerWaitingRoom = props => {
	const history = useHistory();  
    const {roomID} = useParams();
	const [roomCode, setRoomcode] = useState('');
	const [numPlayers, setNumPlayers] = useState("");
	const [players, setPlayers] = useState([]);
	const playerNames = players.map(player => player.playerName)

	const requestBody = JSON.stringify({ roomID });

	useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function stompConnect() {
            try {
                if (!client.isconnected) {
                    client.connect({}, function (frame) {
						console.log('connected to stomp');
						//client.subscribe('/topic/greeting', message => {
						//	console.log('Received message:', message.body)
						//});
						client.subscribe("/topic/multi/rooms/"+ roomID +"/info", function (response) {
							const room = response.body;
							const roomparse = JSON.parse(room);
							const roomcode = roomparse["roomCode"]
							const players = roomparse["players"]
							console.log(roomparse);	
							setRoomcode(roomcode);	
							setPlayers(players);					
						});
						setTimeout(function () {
							client.send("/app/multi/rooms/"+ roomID + "/info",{}, requestBody)
						},1000);
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
			if (client && client.isconnected) {
				client.disconnect(function () {
					console.log('disconnected from stomp');
				});
			}
		};
    }, []);
	
	const kickout = (players) => {
		//console.log(players);
		client.subscribe('/topic/multi/rooms/' + roomID + '/drop', function (response) {
			const room = response.body;
			const roomparse = JSON.parse(room);
			const players = roomparse["players"];
			console.log(roomparse);	
			window.location.reload();
			//history.push("/rooms/" + roomparse["roomID"] + "/owner");
		});
		setTimeout(function () {
			client.send("/app/multi/rooms/"+ roomID + "/drop",{}, JSON.stringify(players));
		},100);
		
    };
	

	return (
		<BaseContainer>
			<div  className="ownerwaiting container">
			<div className="ownerwaiting col">
					<div className="ownerwaiting card">
						{players.length > 1 ? (
						<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						) : null}
					</div>
					{playerNames.length > 1 && players[1]?.ready ? (
						<div className="ownerwaiting label">&#x1F6AB; &#x2705; {playerNames[1]}</div>
						) : (playerNames.length > 1 && !players[1]?.ready ? (
						<div className="ownerwaiting label" onClick={() => kickout(players[1])}>&#x1F6AB; &#x274C; {playerNames[1]}</div>
					) : null)}
					
					<div className="ownerwaiting card">
						{players.length > 2 ? (
						<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						) : null}
					</div>
					{playerNames.length > 2 && players[2]?.ready ? (
						<div className="ownerwaiting label">&#x1F6AB; &#x2705; {playerNames[2]}</div>
						) : (playerNames.length > 2 && !players[2]?.ready ? (
						<div className="ownerwaiting label" onClick={() => kickout(players[2])}>&#x1F6AB; &#x274C; {playerNames[2]}</div>
					) : null)}

					<div className="ownerwaiting card">
						{players.length > 3 ? (
						<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						) : null}
					</div>
					{playerNames.length > 3 && players[3]?.ready ? (
						<div className="ownerwaiting label">&#x1F6AB; &#x2705; {playerNames[3]}</div>
						) : (playerNames.length > 3 && !players[3]?.ready ? (
						<div className="ownerwaiting label" onClick={() => kickout(players[3])}>&#x1F6AB; &#x274C; {playerNames[3]}</div>
					) : null)}

					<div className="ownerwaiting card">
						{players.length > 4 ? (
						<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						) : null}
					</div>
					{playerNames.length > 4 && players[4]?.ready ? (
						<div className="ownerwaiting label">&#x1F6AB; &#x2705; {playerNames[4]}</div>
						) : (playerNames.length > 4 && !players[4]?.ready ? (
						<div className="ownerwaiting label" onClick={() => kickout(players[4])}>&#x1F6AB; &#x274C; {playerNames[4]}</div>
					) : null)}

					<div className="ownerwaiting card">
						{players.length > 5 ? (
						<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
						) : null}
					</div>
					{playerNames.length > 5 && players[5]?.ready ? (
						<div className="ownerwaiting label">&#x2705; {playerNames[5]}</div>
						) : (playerNames.length > 5 && !players[5]?.ready ? (
						<div className="ownerwaiting label" onClick={() => kickout(players[5])}>&#x274C; {playerNames[5]}</div>
					) : null)}
				</div>
				<div className="ownerwaiting col">
				<div className="ownerwaiting form">
					<center>
					<div className="ownerwaiting button-container">
				<Button
					width="15%"
					//onClick={() => }
					>
					Start Game
				</Button>
				</div>
				<div className="ownerwaiting input">Room Code: {roomCode}</div>
				</center>
				</div>
			</div>
			<div className="ownerwaiting col">
					<div className="ownerwaiting card-rule">
						Game Rule
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