import React, {useEffect, useState} from 'react';
import {handleError, client} from 'helpers/api';
import {useParams} from 'react-router-dom';
import 'styles/views/ChoiceGame.scss';
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
import {Spinner} from 'components/ui/Spinner';
import Countdown from "react-countdown-now";
import getTranslationURL from "../../helpers/getTranslation";
import PlayerCard from "../ui/PlayerCard";

const ChoiceGame = props => {
	const [loaded, setLoaded] = useState(false);
	const { roomID } = useParams();
	const [players, setPlayers] = useState([]);
	const playerNames = players.map(player => player.playerName)
	const playerIcons = players.map(player => player.icon);

	const [isDisabled, setDisabled] = useState(false);
	const [isClicked, setClicked] = useState(false);

	const roundSum = localStorage.getItem('numRound');

	const colorRight ="rgba(136, 214, 191, 0.5)"
	const colorWrong = "rgba(251, 178, 173, 0.5)";
	let systemScore = 0;

	const questionList = JSON.parse(localStorage.getItem('questionList'));
	if (questionList === null) {
		alert("Game crashed! Retrieve questions failed!")
	}
	const round = localStorage.getItem('round');
	if (round === null) {
		alert("Game crashed! Round is null!")
	}
	const currentQuestion = questionList[round - 1];
	const choices = currentQuestion.choices

	const [choiceEN,setChoice] = useState();
	const [choicesEN, setChoicesEN] = useState([]);
	const [countdownSeconds, setCountdownSeconds] = useState(10);
	
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

	async function fetchTranslation(cn_character) {
		try {
			const url = getTranslationURL(cn_character)
			console.log("URL of the character",url)
			const response = await fetch(url);
			const data = await response.json();

			setChoice({[cn_character]:data});
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		choicesEN.push(choiceEN)
	}, [choiceEN]);

	useEffect(() => {
		
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function stompConnect() {
            try {
                if (!client['connected']) {
                    client.connect({}, function () {
						console.log('connected to stomp');
						client.subscribe("/topic/multi/rooms/"+ roomID +"/info", function (response) {
							const room = response.body;
							const roomparse = JSON.parse(room);
							const players = roomparse["players"]
							setPlayers(players);					
						});
						setTimeout(function () {
							const requestBody = JSON.stringify({ roomID });
							client.send("/app/multi/rooms/"+ roomID + "/info",{}, requestBody)
						},500);
					});
                }
            } catch (error) {
                console.error(`Something went wrong: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong! See the console for details.");
            }
        }
		stompConnect();

		// initialize all the tranlsations when the page is mounted
		for (const choice in choices) {
			setTimeout(() => {
				fetchTranslation(choices[choice]);
			}, 100);
		}
		setChoicesEN(choicesEN.slice(1,5)) // choose those that corresponds to choices

		// return a function to disconnect on unmount
		return function cleanup() {
			if (client && client['connected']) {
				client.disconnect(function () {
					console.log('disconnected from stomp');
				});
			}
		};
	}, []);

	const handleClick = (idx) => {
		const optionIDs = "ABCD"
		const userID = localStorage.getItem('loggedInUser')
		if (currentQuestion.answerIndex === idx) {
			document.getElementById(optionIDs[idx]).style.backgroundColor = colorRight;
			systemScore = 10;
			const requestBody = {userID,scoreBoard: {systemScore}};
			client.send("/app/multi/rooms/" + roomID + "/players/scoreBoard", {}, JSON.stringify(requestBody))
				setDisabled(true);
				setTimeout(() => {
				setClicked(true);
			}, 500);

		} else {
			document.getElementById(optionIDs[idx]).style.backgroundColor = colorWrong
			const requestBody = {userID,scoreBoard: {systemScore}};
			client.send("/app/multi/rooms/" + roomID + "/players/scoreBoard", {}, JSON.stringify(requestBody))
				setDisabled(true);
				setTimeout(() => {
				setClicked(true)
				// show the right answer after the choice
				document.getElementById(optionIDs[currentQuestion.answerIndex]).style.backgroundColor = colorRight
			}, 1500);
		};
	};

	const submitScore = () => {
		const userID = localStorage.getItem('loggedInUser')
		if (!isDisabled){
			const requestBody = {userID,scoreBoard: {systemScore}};
			client.send("/app/multi/rooms/" + roomID + "/players/scoreBoard", {}, JSON.stringify(requestBody));
		}
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setCountdownSeconds((prevSeconds) => prevSeconds - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const goNext = () => {
		const optionIDs = "ABCD"
		setDisabled(true);
		setClicked(true);
		// show the right answer after the choice
		document.getElementById(optionIDs[currentQuestion.answerIndex]).style.backgroundColor = colorRight
		submitScore();
		setTimeout(function () {
			window.location.href = `/game/${roomID}/result`;
			setChoicesEN([]) // reset the choices
		}, 2000);
		// Make sure even if the player made the choice at the last minute, he or she will still have 2 sec to see the answers
	}

	let loadedCmp = 0;

	const handleCmpLoad = (num) => {
		loadedCmp++;
		if(loadedCmp === num){
			setLoaded(true);
		}
	}

	// util function: input(Chinese) search and return translation(English)
	const searchTranslation = (chinese) =>{
		for (const Key in choicesEN) {
			try {
				let value = choicesEN[Key][chinese]
				return value['data']['translations'][0]['translatedText']
			}
			catch (e) {}
		}
		return chinese; // no corresponding English
	}

	return (
		<BaseContainer>
			<div  className="choicegame container">
				<div className="normalwaiting col">
					{players.map((player, index) => (
						players.length > index &&
						<PlayerCard waiting={false} ready={players[index].ready}
							src={defineIcon(playerIcons[index])} label={playerNames[index]}>
						</PlayerCard>
					))}
				</div>
				<div className="choicegame col">
					<div className="choicegame form">
						{!loaded && <center><Spinner /></center>}
						<div className={loaded ? "content" : "content hidden"}>
							<center>
								<div className="choicegame round-label">
									<span>Round  </span>
									<span className="beforeSlash">{round}</span>
									<span> / </span>
									<span className="afterSlash">{roundSum}</span>
								</div><br/>
								
								<div className="choicegame timer">
									<span className="choicegame clock-icon">&#128358;</span>
									<Countdown
										date={Date.now() + countdownSeconds * 1000} // 10s
										intervalDelay={1000}
										style={{ fontSize: '20px' }}
										renderer={({ seconds }) => <span>{`${seconds}s`}</span>}
										onComplete={() => goNext()}
									/>
								</div>
								<br /><br />
								
								<img src={currentQuestion.oracleURL} alt="oracleURL" onLoad={()=>handleCmpLoad(1)}
									 style={{ width: '20%', height: 'auto', display: 'block', margin: 'auto' }} />
								<br /><br /><br />
								
								<div className="choicegame button-container">
								{choicesEN.length >= 4 && loaded && choices.map((choice, index) => (
									<div key={index} className="choicegame">
										<button id={String.fromCharCode(65 + index)} className="option" disabled={isDisabled}  style={{ margin: "10px" }} onClick={() => handleClick(index)}>
											{choice}
										</button>
										{isClicked && (
											<div className="label-translation" disabled={true}>{searchTranslation(choice)}</div>
										)}
									</div>
								))}
								</div>
							</center>
						</div>
					</div>
				</div>
			</div>
		</BaseContainer>
	);
};

export default ChoiceGame;