import React, {useEffect, useState} from 'react';
import {api, handleError, client} from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/OwnerWaitingRoom.scss';
import BaseContainer from "components/ui/BaseContainer";
import dog from 'image/dog.png';
import { nextRound } from "helpers/nextRound";
import User from 'models/User';
import {Spinner} from "../ui/Spinner";

const OwnerWaitingRoom = props => {
	
	const history = useHistory();
    const {roomID} = useParams();
	const [roomCode, setRoomcode] = useState('');
	// const [numPlayers, setNumPlayers] = useState("");
	const [players, setPlayers] = useState([]);
	//const playerNames = players.map(player => player.playerName)
	const playerNames = players.length > 0 ? players.map(player => player.playerName) : [];


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
						},100);
						client.subscribe('/topic/multi/rooms/' + roomID + '/join', function (response) {
							const room = response.body;
							const roomparse = JSON.parse(room);
							console.log(roomparse);							
						});
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
		window.location.href = "/lobby";
    };

	let content = <center><Spinner /></center>;

	if (roomCode) {
		content = (
			<center>
				<div className="ownerwaiting button-container">
					<Button
						width="15%"
						disabled = {!players.every(player => player.ready)}
						onClick={() => startGame() }
					>
						Start Game
					</Button>
				</div>
				<div className="ownerwaiting button-container">
					<Button
						width="15%"
						onClick={() => exitRoom() }
					>
						Exit Room
					</Button>
				</div>
				<div className="ownerwaiting input">Room Code: {roomCode}</div>
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
									<img src={dog} alt={`player${index + 1}`} style={{ width: '100%', height: 'auto', display: 'block', margin: 'auto' }} />
								</div>
							) : null}
							{playerNames.length > index && players[index]?.ready ? (
								<div className="ownerwaiting label" onClick={() => kickout(player)}>&#x1F6AB; &#x2705; {playerNames[index]}</div>
							) : (playerNames.length > index && !players[index]?.ready ? (
								<div className="ownerwaiting label" onClick={() => kickout(player)}>&#x1F6AB; &#x274C; {playerNames[index]}</div>
							) : null)}
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