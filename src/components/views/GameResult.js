import React, {useEffect, useState} from 'react';
import {handleError, client} from 'helpers/api';
import {useParams} from 'react-router-dom';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import 'styles/views/GameResult.scss';
import BaseContainer from "components/ui/BaseContainer";
import { nextRound } from "helpers/nextRound";
import Countdown from 'react-countdown-now';
import {Spinner} from "../ui/Spinner";
import {SecondaryButton} from "../ui/SecondaryButton";
import { FaHeart } from "react-icons/fa";
import AnimationItems from "helpers/FlowerVisualEffect"

const GameResult = props => {
	
    const {roomID} = useParams();
	const [players, setPlayers] = useState([]);
	const questionList = JSON.parse(localStorage.getItem('questionList'));
	const round = localStorage.getItem('round');
	const [votedTimes, setVotedTimes] = useState([]);
	console.log((questionList[round-1]).questionType);
	//const playerNames = players.length > 0 ? players.map(player => player.playerName) : [];
	const animation = new AnimationItems();
	const currentQuesType = (questionList[round-1]).questionType;

	useEffect(() => {
		// startCountdown();
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function stompConnect() {
            try {
                if (!client['connected']) {
                    client.connect({}, function () {
						console.log('connected to stomp');
						client.subscribe("/topic/multi/rooms/"+ roomID +"/scores", function (response) {
							const ranking = response.body;
							console.log(ranking);
							const newPlayers = JSON.parse(ranking);
							const sortedArray = Object.entries(newPlayers).sort((a, b) => b[1] - a[1]);
							//const sortedObject = Object.fromEntries(sortedArray);
							setPlayers(sortedArray);	
							console.log("sorted values",sortedArray[0][1]);
						});
						setTimeout(function () {
							client.send("/app/multi/rooms/"+ roomID + "/players/scores",{}, '');
						},100);

						client.subscribe("/topic/multi/rooms/"+ roomID +"/players/votes", function (response) {
							const votedTimes = response.body;
							const votedTimesParse = JSON.parse(votedTimes);
							setVotedTimes(votedTimesParse)
							console.log(votedTimesParse[0].userName);
							console.log(votedTimesParse.length);
						});
						setTimeout(function () {
							const requestBody = {round};
							client.send("/app/multi/rooms/" + roomID + "/players/voteTimes", {}, JSON.stringify(requestBody))
						},100);
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
		if (localStorage.getItem("round") === localStorage.getItem("numRound")) {
			animation.start();//开始
			setTimeout(() => {
				animation.stop();//停止
			}, 10000)
		}
	}, []);
	
	// const startCountdown = () => {
	//
	// 	const timer = setInterval(() => {
	// 		setCountdown(countdown => countdown - 1);
	// 	}, 1000);
	//
	// 	setTimeout(() => {
	// 		clearInterval(timer);
	// 		nextRound(roomID);
	// 	}, 5000);
	//
	// 	return () => clearInterval(timer);
	// };

	let content = <center><div className="gameresult container"><Spinner /></div></center>;

	if (players.length !== 0) {
		content = (
			<div className="gameresult container">
				{/*<p className="choiceresult timer">{countdown}s</p>*/}
				<div className="gameresult timer">
					<Countdown
						date = {Date.now() + 10000} // 10s
						intervalDelay={1000}
						style={{ fontSize: '20px' }}
						renderer={({ seconds }) => <span>{`${seconds}s`}</span>}
						onComplete={() => {nextRound(roomID);}}
					/>
				</div>
				{currentQuesType !== "MultipleChoice"?(
					<div className="gameresult form">
						<center>
							{[0, 1, 2, 3, 4, 5].map(index => {
								if (index < Object.keys(players).length) {
									return (
										<table className="gameresult table">
											<thead>
											<tr>
												<th>Name</th>
												<th>Score</th>
												<th>Liked</th>
											</tr>
											</thead>
											<tbody>
												{players.map(player => (
													<tr key={index}>
														<td>{players[index][0]}</td>
														<td>{players[index][1]}</td>
														{votedTimes.map((votedTime, i)=>{
															if (votedTime.userName == players[index][0]){
																return (
																	<td>{votedTime.votedTimes}</td>
																)
															}
														})}
													</tr>
												))}
											</tbody>
										</table>
									);
								}
							})}
							<div className="gameresult button-container">
								{localStorage.getItem("round")===localStorage.getItem("numRound") &&
									<SecondaryButton
									width="70%"
									onClick={() => window.location.href = `/room/lobby`}
								>
									Back to Lobby
								</SecondaryButton>}
							</div>
						</center>
					</div>
				) : (
					<div className="gameresult form2">
						<center>
							{[0, 1, 2, 3, 4, 5].map(index => {
								if (index < Object.keys(players).length) {
									return (
										<table className="gameresult table2">
											<thead>
											<tr>
												<th>Name</th>
												<th>Score</th>
											</tr>
											</thead>
											<tbody>
												{players.map(player => (
													<tr key={index}>
														<td>{players[index][0]}</td>
														<td>{players[index][1]}</td>
													</tr>
												))}
											</tbody>
										</table>
									);
								}
							})}
							<div className="gameresult button-container">
								{localStorage.getItem("round")===localStorage.getItem("numRound") &&
									<SecondaryButton
									width="70%"
									onClick={() => window.location.href = `/room/lobby`}
								>
									Back to Lobby
								</SecondaryButton>}
							</div>
						</center>
					</div>
				)}
			</div>
		)
	}

	return (
		<BaseContainer>
			{content}
		</BaseContainer>
	);
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default GameResult;

// <div className="gameresult record" key={index}>
// 	<PrimaryButton
// 		width="70%"
// 	>
// 		{players[index][0]}
// 	</PrimaryButton>
// 	<PrimaryButton
// 		width="70%"
// 	>
// 		{players[index][1]}
// 	</PrimaryButton>
// 	{votedTimes.map((votedTime, i)=>{
// 		if (votedTime.userName == players[index][0]){
// 			return (
// 				<PrimaryButton
// 					key={i}
// 					width="70%"
// 				>
// 					{votedTime.votedTimes}
// 				</PrimaryButton>
// 			)
// 		}
// 	})}
// </div>