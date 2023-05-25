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
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { FaTrophy } from 'react-icons/fa';

const GameResult = props => {
	
    const {roomID} = useParams();
	const [players, setPlayers] = useState([]);
	const questionList = JSON.parse(localStorage.getItem('questionList'));
	const round = localStorage.getItem('round');
	const [votedTimes, setVotedTimes] = useState([]);
	const [showButton, setShowButton] = useState(false);
	const currentQuesType = (questionList[round-1]).questionType;
	const [isParticle, setShowParticles] = useState(true);

	const particlesInit = useCallback(async engine => {
		// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(engine);
	}, []);

	const particlesLoaded = useCallback(async container => {
		await console.log(container);
	}, []);

	useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function stompConnect() {
            try {
                if (!client['connected']) {
                    client.connect({}, function () {
						console.log('connected to stomp');
						client.subscribe("/topic/multi/rooms/"+ roomID +"/scores", function (response) {
							const ranking = response.body;
							const newPlayers = JSON.parse(ranking);
							const sortedArray = Object.entries(newPlayers).sort((a, b) => b[1] - a[1]);
							setPlayers(sortedArray);	
						});
						setTimeout(function () {
							client.send("/app/multi/rooms/"+ roomID + "/players/scores",{}, '');
						},100);

						client.subscribe("/topic/multi/rooms/"+ roomID +"/players/votes", function (response) {
							const votedTimes = response.body;
							const votedTimesParse = JSON.parse(votedTimes);
							setVotedTimes(votedTimesParse)
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
		if (round === localStorage.getItem("numRound")) {
			setTimeout(() => {
				setShowButton(true);
			}, 10000)
		}
	}, []);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowParticles(false);
		}, 15000); // Set the timeout duration in milliseconds (e.g., 5000ms = 5 seconds)

		return () => clearTimeout(timeout); // Clean up the timeout on component unmount
	}, []);

	let content = <center><div className="gameresult container"><Spinner /></div></center>;

	if (players.length !== 0) {
		content = (
			<div className="gameresult container">
				<div className="gameresult timer">
					<Countdown
						date = {Date.now() + 10000} // 10s
						intervalDelay={1000}
						style={{ fontSize: '20px' }}
						renderer={({ seconds }) => <h2>{localStorage.getItem("round")===localStorage.getItem("numRound") ? 'You Have Finished The Game!' :'Waiting for Your Friends...'}</h2>}
						onComplete={() => {nextRound(roomID)}}
					/>
				</div>
				
				<div className="gameresult form">
					<center>
						{currentQuesType === "MultipleChoice" && (
							<table className="gameresult table">
								<thead>
									<tr>
										<th>Name</th>
										<th>Score</th>
									</tr>
								</thead>
								<tbody>
									{players.map((player, index) => (
										<tr key={player[0]} className={index === 0 ? "first-place" : index === 1 ? "second-place" : index === 2 ? "third-place" : index === 3 ? "other-place" : index === 4 ? "other-place" : index === 5 ? "other-place" : ""}>
											<td>{index === 0 && <FaTrophy className="trophy-icon-1" />}{index === 1 && <FaTrophy className="trophy-icon-2" />}{index === 2 && <FaTrophy className="trophy-icon-3" />}{player[0]}</td>
											<td>{player[1]}</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
						{currentQuesType === "HanziDrawing" && (
							<table className="gameresult table">
								<thead>
									<tr>
										<th>Name</th>
										<th>Score</th>
										<th>Like</th>
									</tr>
								</thead>
								<tbody>
									{players.map((player, index) => (
										<tr key={player[0]} className={index === 0 ? "first-place" : index === 1 ? "second-place" : index === 2 ? "third-place" : index === 3 ? "other-place" : index === 4 ? "other-place" : index === 5 ? "other-place" : ""}>
											<td>{index === 0 && <FaTrophy className="trophy-icon-1" />}{index === 1 && <FaTrophy className="trophy-icon-2" />}{index === 2 && <FaTrophy className="trophy-icon-3" />}{player[0]}</td>
											<td>{player[1]}</td>
											{votedTimes.map((votedTime, i)=>{
												if (votedTime.userName == player[0]){
													return (
														<td>{<FaHeart style={{ padding: "4px 4px 0px 0px" }} color="red" />}{votedTime.votedTimes}</td>
													)
												}
											})}
										</tr>
									))}
								</tbody>
							</table>
						)}
						{showButton && (
							<div className="gameresult button-container">
								<br />
								{localStorage.getItem("round")===localStorage.getItem("numRound") &&
									<SecondaryButton
										width="70%"
										onClick={() => window.location.href = `/room/lobby`}
									>
										Back to Lobby
									</SecondaryButton>}
							</div>
						)}
					</center>
				</div>
			
				<div id="particles-js">
					{ localStorage.getItem("round") === localStorage.getItem("numRound") &&
						isParticle &&
						(<Particles
							className="gameresult particles"
							id="tsparticles"
							init={particlesInit}
							loaded={particlesLoaded}
							options={{
								"name": "Fireworks",
								"fullScreen": {
									"enable": true
								},
								"background": {
									"color":"transparent"
								},
								"emitters": {
									"direction": "top",
									"life": {
										"count": 0,
										"duration": 0.1,
										"delay": 0.1
									},
									"rate": {
										"delay": 0.15,
										"quantity": 1
									},
									"size": {
										"width": 100,
										"height": 0
									},
									"position": {
										"y": 100,
										"x": 50
									}
								},
								"particles": {
									"number": {
										"value": 0
									},
									"destroy": {
										"bounds": {
											"top": 30
										},
										"mode": "split",
										"split": {
											"count": 1,
											"factor": {
												"value": 0.333333
											},
											"rate": {
												"value": 80
											},
											"particles": {
												"stroke": {
													"width": 0
												},
												"color": {
													"value": ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"]
												},
												"number": {
													"value": 0
												},
												"collisions": {
													"enable": false
												},
												"destroy": {
													"bounds": {
														"top": 0
													}
												},
												"opacity": {
													"value": {
														"min": 0.1,
														"max": 1
													},
													"animation": {
														"enable": true,
														"speed": 0.7,
														"sync": false,
														"startValue": "max",
														"destroy": "min"
													}
												},
												"shape": {
													"type": "circle"
												},
												"size": {
													"value": 2,
													"animation": {
														"enable": false
													}
												},
												"life": {
													"count": 1,
													"duration": {
														"value": {
															"min": 1,
															"max": 2
														}
													}
												},
												"move": {
													"enable": true,
													"gravity": {
														"enable": true,
														"acceleration": 9.81,
														"inverse": false
													},
													"decay": 0.1,
													"speed": {
														"min": 10,
														"max": 25
													},
													"direction": "outside",
													"random": true,
													"straight": false,
													"outModes": "destroy"
												}
											}
										}
									},
									"life": {
										"count": 1
									},
									"shape": {
										"type": "line"
									},
									"size": {
										"value": {
											"min": 0.1,
											"max": 50
										},
										"animation": {
											"enable": true,
											"sync": true,
											"speed": 90,
											"startValue": "max",
											"destroy": "min"
										}
									},
									"stroke": {
										"color": {
											"value": "rgb(255, 255, 255,0)"
										},
										"width": 1
									},
									"rotate": {
										"path": true
									},
									"move": {
										"enable": true,
										"gravity": {
											"acceleration": 15,
											"enable": true,
											"inverse": true,
											"maxSpeed": 100
										},
										"speed": {
											"min": 10,
											"max": 20
										},
										"outModes": {
											"default": "destroy",
											"top": "none"
										},
										"trail": {
											//"fillColor": "#FFFFFF",
											"fillColor": "transparent",
											//"fillColor": "rgb(255, 255, 255,0)",
											"enable": true,
											"length": 10
										}
									}
								},
								"sounds": {
									"enable": false,
									"events": [
										{
											"event": "particleRemoved",
											"filter": "explodeSoundCheck",
											"audio": [
												"https://particles.js.org/audio/explosion0.mp3",
												"https://particles.js.org/audio/explosion1.mp3",
												"https://particles.js.org/audio/explosion2.mp3"
											]
										}
									],
									"volume": 50
								}
							}}
						/>)
					}
				</div>
			</div>
		)
	}

	return (
		<BaseContainer>
			{content}
		</BaseContainer>
	);
};

export default GameResult;