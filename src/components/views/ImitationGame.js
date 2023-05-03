import React, { useRef, useEffect, useState } from 'react';
import {api, handleError, client } from 'helpers/api';
import { useHistory, useParams } from 'react-router-dom';
import 'styles/views/ChoiceGame.scss';
import BaseContainer from "components/ui/BaseContainer";
import dog from 'image/dog.png';
import recognizeHandwriting from "../../helpers/recognizeHandwriting";
import 'styles/views/ImitationGame.scss';
import User from 'models/User';

const ImitationGame = props => {

	const canvasRef = useRef(null);
	const [lines, setLines] = useState([[],[]]);
	const [isDrawing, setIsDrawing] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		const preventTouchScroll = (e) => {
			if (e.target === canvas) {
				e.preventDefault();
			}
		};
		document.addEventListener("touchmove", preventTouchScroll, { passive: false });
		return () => {
			document.removeEventListener("touchmove", preventTouchScroll);
		};
	}, []);

	const { roomID } = useParams();
	const [roomCode, setRoomcode] = useState('');
	const [numPlayers, setNumPlayers] = useState("");
	const [players, setPlayers] = useState([]);
	//console.log(players);
	const playerNames = players.map(player => player.playerName)
	//console.log(playerNames);

	const [isDisabled, setDisabled] = useState(false);
	const colorRight = "green";
	const colorWrong = "red";
	const [canvasSize,setcanvasSize] = useState([])
	const history = useHistory();
	const strokeHistory = [[],[]];
	const playerImitations = [[],[]];

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
						client.subscribe("/topic/multi/rooms/" + roomID + "/info", function (response) {
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
							client.send("/app/multi/rooms/" + roomID + "/info", {}, requestBody)
						}, 500);
						client.subscribe('/topic/multi/rooms/' + roomID + '/join', function (response) {
							const room = response.body;
							const roomparse = JSON.parse(room);
							console.log(roomparse);
						});

						// A channel to get the current room players' imitations
						client.subscribe('/topic/multi/rooms/' + roomID + '/imitations', function (response) {
							const playersImitations = response.body;
							const playersImitationsParse = JSON.parse(playersImitations);
							console.log("playersImitationsParse = " + playersImitationsParse);

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

	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = window.innerWidth * 0.25;
		canvas.height = canvas.width;
		setcanvasSize({width:canvas.width, height:canvas.height})
		const context = canvas.getContext("2d");
		context.lineCap = "round";
		context.strokeStyle = "black";
		context.lineWidth = 5;
		/*		context.strokeRect(0, 0, canvas.width, canvas.height);*/

		lines.forEach(line => {
			context.beginPath();
			line.forEach((point, index) => {
				if (index === 0) {
					context.moveTo(point.x, point.y);
				} else {
					context.lineTo(point.x, point.y);
					context.stroke();
				}
			});
		});
	}, [lines]);

	const startDrawing = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;
		setLines(prevState => [...prevState, [{ x: offsetX, y: offsetY }]]);
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		context.beginPath();
		context.moveTo(offsetX, offsetY);
		setIsDrawing(true);
	};

	function saveStrokes(lines) {
		for (const line in lines) {
			//console.log("line",line)
			for (const sample in lines[line]){
				//console.log("sample",lines[line][sample])
				strokeHistory[0].push(lines[line][sample].x);
				strokeHistory[1].push(lines[line][sample].y)
			}
		}
		console.log("Save strokes complete:",strokeHistory)
	}



	const finishDrawing = () => {
		setLines(prevState => {
			const lastIndex = prevState.length - 1;
			const lastLine = prevState[lastIndex];
			return [
				...prevState.slice(0, lastIndex),
				[...lastLine],
			];
		});
		setIsDrawing(false);

	};

	const draw = ({ nativeEvent }) => {
		if (!isDrawing) {
			return;
		}
		const { offsetX, offsetY } = nativeEvent;
		setLines(prevState => {
			const lastIndex = prevState.length - 1;
			const lastLine = prevState[lastIndex];
			return [
				...prevState.slice(0, lastIndex),
				[...lastLine, { x: offsetX, y: offsetY }],
			];
		});
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		context.lineTo(offsetX, offsetY);
		context.stroke();
	};

	const undo = () => {
		setLines(prevState => prevState.slice(0, -1));
	};

	const clearCanvas = () => {
		setLines([]);
	};

	const saveCanvasImgs = () => {
		const canvas = document.getElementById('imitationCanvas');
		canvas.toBlob((blob) => {
			const reader = new FileReader();
			reader.readAsArrayBuffer(blob);
			reader.onloadend = () => {
				const buffer = reader.result;

				const loggedInUserID = localStorage.getItem("loggedInUser");
				const playerToUpdate = players.find(player => player.userID == Number(loggedInUserID));
				// convert the ArrayBuffer to a typed array
				const byteArr = new Uint8Array(buffer);
				const byteArrString = String.fromCharCode.apply(null, byteArr);
				const byteArrString64 = btoa(byteArrString);
				// const newblob = new Blob([byteArr.buffer], { type: "image/jpeg" });

				console.log("Player is sending img:", playerToUpdate.userID);
				console.log("The img buffer is sending :"+ byteArr); // Object ArrayBuffer
				console.log("The img buffer string is sending :"+ byteArrString); // Object ArrayBuffer
				console.log("The img buffer string 64 is sending :"+ byteArrString64); // Object ArrayBuffer  // This is working
				// console.log("The img buffer string new blob is :"+ newblob); // Object ArrayBuffer

				// Below only for testing purpose
				// playerImitations[0].push(playerToUpdate.userID);
				// playerImitations[1].push(byteArrString64)
				// document.getElementById("playerImitation").src = "data:image/png;base64," + playerImitations[1];

				const requestgetready = {
					userID: playerToUpdate.userID,
					imitationBytes: byteArrString64
				};
				client.send("/app/multi/rooms/"+ roomID + "/players/imitations",{}, JSON.stringify(requestgetready))
			};
		}, 'image/png'); // Change the format here to jpeg, bmp, etc.
	};

	const submitDrawing = () =>{
		saveStrokes(lines);
		console.log("canvasSize",canvasSize)
		console.log("strokehIS",strokeHistory)
		recognizeHandwriting(canvasSize,[strokeHistory],10,handleResponse)

		// process cancas strokes as bytes
		saveCanvasImgs();
	}

	function evaluateWriting(response, character) {
		let answer  = character;
		let candidates = response;
		let score = 10;

		for (let i= 0;i < candidates.length; i++) {
			if(i!=0 && i% 3==0){
				score = score - 2;
			}
			if (candidates[i] == answer){
				break;
			}
		}
		return score;
	}

	function handleResponse(response) {
		if (response instanceof Error) {
			console.error('Error:', response.message);
			// Handle the error in some way, such as displaying a message to the user or logging it
		} else {
			console.log('Response:', response);
			const score = evaluateWriting(response,currentQuestion.character);
			localStorage.setItem("roundPoints", score);
			console.log("Score",score)
			// Handle the response data in some way, such as updating the UI or storing it in a database

		}
	}

	const submitScore = () => {
		///////////////////////////////////////////////
		//    make sure it is the right userID       //
		///////////////////////////////////////////////
		const userID = localStorage.getItem('loggedInUser')
		let systemScore = 0;
		if (localStorage.getItem("roundPoints")) {
			systemScore = parseInt(localStorage.getItem("roundPoints"));
			setTimeout(function () {
				console.log("roundPoints", systemScore);
			}, 50);
		}
		const requestBody = {userID,scoreBoard: {systemScore}};
		client.send("/app/multi/rooms/" + roomID + "/players/scoreBoard", {}, JSON.stringify(requestBody))
	}

	window.addEventListener("load", function() {

		var countdown = 8;
		var countdownElement = document.getElementById("countdown");

		var timer = setInterval(function() {
			countdown--;
			countdownElement.innerHTML = countdown + "s";

			if (countdown <= 0) {
				clearInterval(timer);
				submitDrawing();
				setTimeout(submitScore(), 50);
				setTimeout(function () {
					window.location.href = "/games/record/" + roomID;
				}, 500);
			}
		}, 1000);
	});

	return (
		<BaseContainer>
			<div className="choicegame container">
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
					<center>
						<div id="countdown" className="">
						</div>
						<br />
						<br />
					</center>
					<div className="imitationgame canvas-container">
						<center>
							<canvas id = 'imitationCanvas'
								onMouseDown={startDrawing}
								onMouseUp={finishDrawing}
								onMouseMove={draw}
								onTouchStart={(e) => {
									const touch = e.touches[0];
									const { left, top } = canvasRef.current.getBoundingClientRect();
									const touchX = touch.clientX - left;
									const touchY = touch.clientY - top;
									startDrawing({ nativeEvent: { offsetX: touchX, offsetY: touchY } });
								}}
								onTouchEnd={finishDrawing}
								onTouchMove={(e) => {
									const touch = e.touches[0];
									const { left, top } = canvasRef.current.getBoundingClientRect();
									const touchX = touch.clientX - left;
									const touchY = touch.clientY - top;
									draw({ nativeEvent: { offsetX: touchX, offsetY: touchY } });
								}}
								ref={canvasRef}
							></canvas>
						</center>
					</div>
				</div>
				<div>
					<button onClick={undo}>Undo</button>
					<button onClick={clearCanvas}>Clear</button>
					<button onClick={submitDrawing}>Submit</button>

				</div>

				{playerImitations[1] &&
					<img id="playerImitation" src="" ></img>
				}
			</div>
		</BaseContainer>
	);
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default ImitationGame;