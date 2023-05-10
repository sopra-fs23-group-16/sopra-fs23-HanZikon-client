import React, {useEffect, useState} from 'react';
import {api, handleError, client} from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import 'styles/views/ChoiceResult.scss';
import BaseContainer from "components/ui/BaseContainer";
import { nextRound } from "helpers/nextRound";
import User from 'models/User';
import Countdown from 'react-countdown-now';
import {Spinner} from "../ui/Spinner";
import {fetchLocalUser} from "../../helpers/confirmLocalUser";

const ChoiceResult = props => {
	
	// const history = useHistory();

    const {roomID} = useParams();
	const [players, setPlayers] = useState([]);
	const playerNames = players.length > 0 ? players.map(player => player.playerName) : [];
	
	// const [countdown, setCountdown] = useState(5);

	useEffect(() => {

		fetchLocalUser();
		
		// startCountdown();
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
							//const sortedObject = Object.fromEntries(sortedArray);
							setPlayers(sortedArray);	
							console.log(sortedArray[0][1]);							
						});
						setTimeout(function () {
							client.send("/app/multi/rooms/"+ roomID + "/players/scores",{}, '');
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

	let content = <center><div className="choiceresult container"><Spinner /></div></center>;

	if (players.length !== 0) {
		content = (
			<div className="choiceresult container">
				{/*<p className="choiceresult timer">{countdown}s</p>*/}
				<div className="choiceresult label">
					<Countdown
						date={Date.now() + 10000} // 10s
						intervalDelay={1000}
						style={{ fontSize: '20px' }}
						renderer={({ seconds }) => <span>{`${seconds}s`}</span>}
						onComplete={() => nextRound(roomID)}
					/>
				</div>
				<div className="choiceresult form">
					<center>
						{Object.keys(players).length > 0 ? (
							<div className="choiceresult record">
								<PrimaryButton
									width="70%"
								>
									{players[0][0] + ": " + players[0][1]}
								</PrimaryButton>
							</div>) : null}

						{Object.keys(players).length > 1 ? (
							<div className="choiceresult record">
								<PrimaryButton
									width="70%"
								>
									{players[1][0] + ": " + players[1][1]}
								</PrimaryButton>
							</div>) : null}

						{Object.keys(players).length > 2 ? (
							<div className="choiceresult record">
								<PrimaryButton
									width="70%"
								>
									{players[2][0] + ": " + players[2][1]}
								</PrimaryButton>
							</div>) : null}

						{Object.keys(players).length > 3 ? (
							<div className="choiceresult record">
								<PrimaryButton
									width="70%"
								>
									{players[3][0] + ": " + players[3][1]}
								</PrimaryButton>
							</div>) : null}

						{Object.keys(players).length > 4 ? (
							<div className="choiceresult record">
								<PrimaryButton
									width="70%"
								>
									{players[4][0] + ": " + players[4][1]}
								</PrimaryButton>
							</div>) : null}

						{Object.keys(players).length > 5 ? (
							<div className="choiceresult record">
								<PrimaryButton
									width="70%"
								>
									{players[5][0] + ": " + players[5][1]}
								</PrimaryButton>
							</div>) : null}

					</center>

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

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default ChoiceResult;