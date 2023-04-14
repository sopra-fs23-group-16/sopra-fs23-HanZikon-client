import React, {useEffect, useState} from 'react';
import {api, handleError, client} from 'helpers/api';
//import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/NormalWaitingRoom.scss';
import BaseContainer from "components/ui/BaseContainer";
//import PropTypes from "prop-types";
import { useParams } from 'react-router-dom';
import dog from 'image/dog.png';

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */


const NormalWaitingRoom = props => {
	const history = useHistory();  
    const {roomID} = useParams();
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
							const players = roomparse["players"]
							console.log(roomparse);	
							setPlayers(players);						
						});
						setTimeout(function () {
							client.send("/app/multi/rooms/"+ roomID + "/info",{}, requestBody)
						},100);
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
	

	return (
		<BaseContainer>
			<div  className="normalwaiting container">
			<div className="normalwaiting col">
			<div className="ownerwaiting card">
    					<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
					</div>
					{players[1]?.ready ? (
 					 <div className="ownerwaiting label">&#x2705; {playerNames[1]}</div>
					) : (
					  <div className="ownerwaiting label">&#x274C; {playerNames[1]}</div>
					)}
					<div className="ownerwaiting card">
						<img src={dog} alt="player2" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto'  }} />
					</div>
					{players[2]?.ready ? (
 					 <div className="ownerwaiting label">&#x2705; {playerNames[2]}</div>
					) : (
					  <div className="ownerwaiting label">&#x274C; {playerNames[2]}</div>
					)}
					<div className="ownerwaiting card">
					</div>
					{players[3]?.ready ? (
 					 <div className="ownerwaiting label">&#x2705; {playerNames[3]}</div>
					) : (
					  <div className="ownerwaiting label">&#x274C; {playerNames[3]}</div>
					)}
					<div className="ownerwaiting card">
					</div>
					{players[4]?.ready ? (
 					 <div className="ownerwaiting label">&#x2705; {playerNames[4]}</div>
					) : (
					  <div className="ownerwaiting label">&#x274C; {playerNames[4]}</div>
					)}
					<div className="ownerwaiting card">
					</div>
					{players[5]?.ready ? (
 					 <div className="ownerwaiting label">&#x2705; {playerNames[5]}</div>
					) : (
					  <div className="ownerwaiting label">&#x274C; {playerNames[5]}</div>
					)}
				</div>
				<div className="normalwaiting col">
				<div className="normalwaiting form">
					<center>
					<div className="normalwaiting button-container">
				<Button
					width="15%"
					//onClick={() => }
					>
					Get Ready
				</Button>
				</div>
				</center>
				</div>
			</div>
			<div className="normalwaiting col">
					<div className="normalwaiting card-rule">
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
export default NormalWaitingRoom;