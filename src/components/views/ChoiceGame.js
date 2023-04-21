import React, {useEffect, useState} from 'react';
import {handleError, client} from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/ChoiceGame.scss';
import BaseContainer from "components/ui/BaseContainer";
import dog from 'image/dog.png';

const ChoiceGame = props => {
	const history = useHistory();  
    const {gameID} = useParams();

    const {roomID} = useParams();
	const [roomCode, setRoomcode] = useState('');
	const [numPlayers, setNumPlayers] = useState("");
	const [players, setPlayers] = useState([]);
	//console.log(players);
	const playerNames = players.map(player => player.playerName)
	//console.log(playerNames);

	const [isDisabled, setDisabled] = useState(false);
	const colorRight = "green";
	const colorWrong = "red";

	const questionList = JSON.parse(localStorage.getItem('questionList'));
	if (questionList === null) {
		alert("Game crashed! Retrieve questions failed!")
	}
	const round = localStorage.getItem('round');
	if (round === null) {
		alert("Game crashed! Round is null!")
	}
	const currentQuestion = questionList[round - 1];
	console.log(currentQuestion);

	const choices = currentQuestion.choices;
	console.log(choices);

	const handleClick0 = () => {
		console.log(questionList.answerIndex)
		if (currentQuestion.answerIndex === 0) {
			console.log("Bingo!")
			document.getElementById("A").style.backgroundColor = colorRight
		} else (document.getElementById("A").style.backgroundColor = colorWrong);
		setDisabled(true);
	};

	const handleClick1 = () => {
		if (currentQuestion.answerIndex === 1) {
			document.getElementById("B").style.backgroundColor = colorRight;
		} else (document.getElementById("B").style.backgroundColor = colorWrong)
		setDisabled(true);
	};

	const handleClick2 = () => {
		if (currentQuestion.answerIndex === 2) {
			document.getElementById("C").style.backgroundColor = colorRight;
		} else (document.getElementById("C").style.backgroundColor = colorWrong)
		setDisabled(true);
	};

	const handleClick3 = () => {
		if (currentQuestion.answerIndex === 3) {
			document.getElementById("D").style.backgroundColor = colorRight;
		} else (document.getElementById("D").style.backgroundColor = colorWrong)
		setDisabled(true);
	};

	const requestBody = JSON.stringify({ roomID });

    

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
							const roomcode = roomparse["roomCode"]
							const players = roomparse["players"]
							console.log(players);
							console.log(roomparse);	
							setRoomcode(roomcode);	
							setPlayers(players);					
						});
						setTimeout(function () {
							client.send("/app/multi/rooms/"+ roomID + "/info",{}, requestBody)
						},500);
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
			if (client && client['connected']) {
				client.disconnect(function () {
					console.log('disconnected from stomp');
				});
			}
		};
    }, []);
	
	

	return (
		<BaseContainer>
			<div  className="choicegame container">
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
				<div className="choicegame col">
				<div className="choicegame form">
					<center>
                    <img src={currentQuestion.oracleURL} alt="player1" style={{ width: '20%', height: 'auto', display: 'block', margin: 'auto' }} />
                    <br />
                    <br />
                    <br />
							<button
								id = "A"
								className="choicegame option"
								disabled={isDisabled}
								onClick={handleClick0}
							>
								{choices[0]}
							</button>
							<button
								id="B"
								className="choicegame option"
								disabled={isDisabled}
								onClick={handleClick1}
							>
								{choices[1]}
							</button>
							<button
								id="C"
								className="choicegame option"
								disabled={isDisabled}
								onClick={handleClick2}
							>
								{choices[2]}
							</button>
							<button
								id="D"
								className="choicegame option"
								disabled={isDisabled}
								onClick={handleClick3}
							>
								{choices[3]}
							</button>					
				</center>
				</div>
			</div>
			{/* <div className="choicegame col">
					<div className="choicegame card-rule">
                        <center>
                    <div className="choicegame label"> Score Board</div>
                    </center>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="choicegame label-rangking"> No.1  </div>
                    <br />
                    <div className="choicegame label-rangking"> No.2 </div>
                    <br />
                    <div className="choicegame label-rangking"> No.3 </div>
                    <br />
                    <div className="choicegame label-rangking"> No.4 </div>
                    <br />
                    <div className="choicegame label-rangking"> No.5 </div>
                    <br />
                    <div className="choicegame label-rangking"> No.6 </div>                   
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
export default ChoiceGame;