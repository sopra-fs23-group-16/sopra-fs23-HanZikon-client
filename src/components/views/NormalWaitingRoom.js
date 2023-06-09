import React, {useEffect, useState} from 'react';
import {handleError, client} from 'helpers/api';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import {SecondaryButton} from 'components/ui/SecondaryButton';
import 'styles/views/NormalWaitingRoom.scss';
import BaseContainer from "components/ui/BaseContainer";
import {useParams} from 'react-router-dom';
import {nextRound} from "../../helpers/nextRound";
import {normalizeGameMode} from "../../helpers/normalizeGameMode";
import dog from "image/dog.png";
import cat from "image/cat.jpg";
import seelion from "image/seelion.jpg";
import owl from "image/owl.jpg";
import cattle from "image/cattle.jpg";
import PlayerCard from "../ui/PlayerCard";
import dogandmice from "image/dogandmice.jpg";
import alpaca from "image/alpaca.jpg";
import seelionface from "image/seelionface.jpg";
import chimpanzee from "image/chimpanzee.jpg";
import panda from "image/panda.jpg";

const NormalWaitingRoom = props => {
    const {roomID} = useParams();
	const [players, setPlayers] = useState([]);
	const playerNames = players.map(player => player.playerName);
	const playerIcons = players.map(player => player.icon);
	const loggedInUserID = localStorage.getItem("loggedInUser");
	const localPlayer = players.find(player => player.userID === Number(loggedInUserID));
	const isReady = localPlayer && localPlayer.ready;

	const [gameMode, setgameMode] = useState([]);

	function defineIcon(icon){
		if (icon === "dog") {
			return dog;
		} else if (icon === "cat") {
			return cat;
		} else if (icon === "seelion") {
			return seelion;
		} else if (icon === "cattle") {
			return cattle;
		} else if (icon === "owl") {
			return owl;
		} else if (icon === "dogandmice") {
			return dogandmice;
		} else if (icon === "seelionface") {
			return seelionface;
		} else if (icon === "alpaca") {
			return alpaca;
		} else if (icon === "panda") {
			return panda;
		} else if (icon === "chimpanzee") {
			return chimpanzee;
		}
	}

	useEffect(() => {
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
							
							const players = roomparse["players"]
							setPlayers(players);

							const userIDs = players.map(player => player.userID)
							let userId = localStorage.getItem("loggedInUser");

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
							localStorage.setItem('numRound', qListparse.length)
							localStorage.setItem('round', 0)
							localStorage.setItem('questionList', JSON.stringify(qListparse));

							nextRound(roomID);
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

	const updateReady = (ready) => {
		const playerToUpdate = localPlayer;

		const request = {
			userID: playerToUpdate.userID,
			ready: ready
		};
		client.send("/app/multi/rooms/" + roomID + "/players/ready", {}, JSON.stringify(request));
	};

	const exitRoom = () => {
		const loggedInUserID = localStorage.getItem("loggedInUser");
		const playerToUpdate = players.find(player => player.userID === Number(loggedInUserID));

		client.send('/app/multi/rooms/' + roomID + '/drop', {}, JSON.stringify(playerToUpdate))
    };

	return (
		<BaseContainer>
			<div  className="normalwaiting container">
				<div className="normalwaiting col">
					{players.map((player, index) => (
						players.length > index &&
						<PlayerCard waiting={true} isHost={index===0} ready={players[index].ready}
							src={defineIcon(playerIcons[index])} label={playerNames[index]}>
						</PlayerCard>
					))}
				</div>
				<div className="normalwaiting col">
				<div className="normalwaiting form">
					<center>
					<div className="normalwaiting mode">{normalizeGameMode(gameMode)}</div>
					<div className="normalwaiting button-container">
				<PrimaryButton
					width="15%"
					onClick={() => updateReady(!isReady)}
					>
					{isReady? "Cancel Ready":"Get Ready"}
				</PrimaryButton>
				</div>
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
			</div>
		</BaseContainer>
	);
};

export default NormalWaitingRoom;