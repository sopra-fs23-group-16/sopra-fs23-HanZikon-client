import React, { useEffect, useState } from 'react';
import { handleError, client } from 'helpers/api';
import { useParams } from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import dog from 'image/dog.png';
import cat from "image/cat.jpg";
import seelion from "image/seelion.jpg";
import owl from "image/owl.jpg";
import cattle from "image/cattle.jpg";
import dogandmice from "image/dogandmice.jpg";
import alpaca from "image/alpaca.jpg";
import seelionface from "image/seelionface.jpg";
import chimpanzee from "image/chimpanzee.jpg";
import panda from "image/panda.jpg";
import 'styles/views/ImitationVote.scss';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import { FaHeart } from "react-icons/fa";
import PlayerCard from "../ui/PlayerCard";

const ImitationVote = props => {
	
	const { roomID } = useParams();
	const [players, setPlayers] = useState([]);
	const playerNames = players.map(player => player.playerName)
	const playerIcons = players.map(player => player.icon);
	const [buttonClicked, setButtonClicked] = useState(false);
	const [button0Clicked, setButton0Clicked] = useState(false);
	const [button1Clicked, setButton1Clicked] = useState(false);
	const [button2Clicked, setButton2Clicked] = useState(false);
	const [button3Clicked, setButton3Clicked] = useState(false);
	const [button4Clicked, setButton4Clicked] = useState(false);
	const [button5Clicked, setButton5Clicked] = useState(false);
	const [playerImitationNames, setPlayerImitationNames] = useState([]);
	const [playerImitations, setPlayerImitations] = useState([]);
	const round = parseInt(localStorage.getItem("round"));
	const loggedInUserID = localStorage.getItem("loggedInUser");
	const requestBody = JSON.stringify({ roomID });
	
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
							setPlayerImitations(playersImitationsParse);
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

	const submitScoreB1 = (userOrder) => {
		const votedScore = 10;
		const userID = players[userOrder][0];
		const requestBody = {userID,scoreBoard: {votedScore}};
		client.send("/app/multi/rooms/" + roomID + "/players/scoreBoard", {}, JSON.stringify(requestBody))
	}

	const submitScore = (userOrder) => {
		const votedTimes = 1;
		const userID = playerImitations[userOrder].userID;
		const fromUserID = loggedInUserID;
		// alert("from userID is " + fromUserID + "to userID is " + userID);
		const requestBody = {userID, fromUserID, votedTimes, round};
		client.send("/app/multi/rooms/" + roomID + "/players/votes", {}, JSON.stringify(requestBody))
	}

	window.addEventListener("load", function() {

		let countdown = 10;
		let countdownElement = document.getElementById("countdown");

		let timer = setInterval(function() {
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
				<div className="normalwaiting col">
					{players.map((player, index) => (
						players.length > index &&
						<PlayerCard waiting={false} ready={players[index].ready}
									src={defineIcon(playerIcons[index])} label={playerNames[index]}>
						</PlayerCard>
					))}
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
									padding-right = "5%"
									onClick={() => {
										if (!buttonClicked) {
											setButtonClicked(true);
											setButton0Clicked(true);
											submitScore(0);
										}
									}}
								>
									{button0Clicked ? (
										<FaHeart style={{ padding: "4px 4px 0px 0px" }} color="red" />
									) : (
										<FaHeart style={{ padding: "4px 4px 0px 0px" }} color="white" />
									)}{playerImitationNames[0]}
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
											setButton1Clicked(true);
											submitScore(1);
										}
									}}
								>
									{button1Clicked ? (
										<FaHeart style={{ padding: "4px 4px 0px 0px" }} color="red" />
									) : (
										<FaHeart style={{ padding: "4px 4px 0px 0px" }} color="white" />
									)}{playerImitationNames[1]}
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
											setButton2Clicked(true);
											submitScore(2);
										}
									}}
								>
									{button2Clicked ? (
										<FaHeart style={{ padding: "4px 4px 0px 0px" }} color="red" />
									) : (
										<FaHeart style={{ padding: "4px 4px 0px 0px" }} color="white" />
									)}{playerImitationNames[2]}
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
											setButton3Clicked(true);
											submitScore(3);
										}
									}}
								>
									{button3Clicked ? (
										<FaHeart style={{ padding: "4px 4px 0px 0px" }} color="red" />
									) : (
										<FaHeart style={{ padding: "4px 4px 0px 0px" }} color="white" />
									)}{playerImitationNames[3]}
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
											setButton4Clicked(true);
											submitScore(4);
										}
									}}
								>
									{button4Clicked ? (
										<FaHeart style={{ padding: "4px 4px 0px 0px" }} color="red" />
									) : (
										<FaHeart style={{ padding: "4px 4px 0px 0px" }} color="white" />
									)}{playerImitationNames[4]}
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
											setButton5Clicked(true);
											submitScore(5);
										}
									}}
								>
									{button5Clicked ? (
										<FaHeart style={{ padding: "4px 4px 0px 0px" }} color="red" />
									) : (
										<FaHeart style={{ padding: "4px 4px 0px 0px" }} color="white" />
									)}{playerImitationNames[5]}
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