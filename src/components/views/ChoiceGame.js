import React, {useEffect, useState} from 'react';
import {handleError, client} from 'helpers/api';
import {useParams} from 'react-router-dom';
import 'styles/views/ChoiceGame.scss';
import BaseContainer from "components/ui/BaseContainer";
import dog from 'image/dog.png';
import {Spinner} from 'components/ui/Spinner';
import Countdown from "react-countdown-now";
// import {fetchLocalUser} from "../../helpers/confirmLocalUser";
import getTranslationURL from "../../helpers/getTranslation";

const ChoiceGame = props => {
	// const history = useHistory();
	const [loaded, setLoaded] = useState(false);
	const { roomID } = useParams();
	const [players, setPlayers] = useState([]);
	const playerNames = players.map(player => player.playerName)

	const [isDisabled, setDisabled] = useState(false);
	const [isClicked, setClicked] = useState(false);

	const colorRight = "green";
	const colorWrong = "red";
	let systemScore = 0;

	const questionList = JSON.parse(localStorage.getItem('questionList'));
	if (questionList === null) {
		alert("Game crashed! Retrieve questions failed!")
	}
	const round = localStorage.getItem('round');
	if (round === null) {
		alert("Game crashed! Round is null!")
	}
	console.log("round",round);
	const currentQuestion = questionList[round - 1];
	const choices = currentQuestion.choices

	const [choiceEN,setChoice] = useState();
	const [choicesEN, setChoicesEN] = useState([]);
	const [countdownSeconds, setCountdownSeconds] = useState(10);


	async function fetchTranslation(cn_character) {
		try {
			const url = getTranslationURL(cn_character)
			console.log("URL of the character",url)
			const response = await fetch(url);
			const data = await response.json();

			console.log("raw data",data)
			setChoice({[cn_character]:data});
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		//console.log('Choice has been updated:', choiceEN);
		choicesEN.push(choiceEN)
		console.log("choicesEN",choicesEN)
	}, [choiceEN]);



	useEffect(() => {

		// fetchLocalUser();
		
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
		// setTimeout(submitScore(), 50);
		submitScore();
		setTimeout(function () {
			window.location.href = `/game/${roomID}/result`;
			setChoicesEN([]) // reset the choices
		}, 2000);
		// Make sure even if the player made the choice at the last minute
		// he still has 2 sec to see the answers
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
				<div className="choicegame col">
					{players.map((player, index) => (
						<div key={index} className="choicegame card">
							<img src={dog} alt={`player${index+1}`} style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
							{index < playerNames.length && <div className="choicegame label"><center>{playerNames[index]}</center></div>}
						</div>
					))}
				</div>
				<div className="choicegame col">
					<div className="choicegame form">
						{!loaded && <center><Spinner /></center>}
						<div className={loaded ? "content" : "content hidden"}>
							<center>
							<div className="choicegame timer">
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
							{choicesEN.length >= 4 && loaded && choices.map((choice, index) => (
								<button key={index} id={String.fromCharCode(65+index)} className="choicegame option" disabled={isDisabled} onClick={() => handleClick(index)}>
									{/*{isDisabled ?  choice + <span>searchTranslation(choice)</span>: choice}*/}
									{choice} {isClicked ? (
										<button className="choicegame option small" disabled={true}>{searchTranslation(choice)}</button>
									) : ("")}
								</button>
							))}
						</center>
						</div>
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
export default ChoiceGame;