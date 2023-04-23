import React, {useEffect, useState} from 'react';
import {handleError, client} from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/ChoiceResult.scss';
import BaseContainer from "components/ui/BaseContainer";
import { nextRound } from "helpers/nextRound";

const ChoiceResult = props => {
	
	const history = useHistory();  

    const {roomID} = useParams();
	const [players, setPlayers] = useState([]);
	const playerNames = players.length > 0 ? players.map(player => player.playerName) : [];
	
	const [countdown, setCountdown] = useState(10);

	useEffect(() => {
		startCountdown();
		stompConnect();
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function stompConnect() {
            try {
                if (!client['connected']) {
                    client.connect({}, function () {
						console.log('connected to stomp');
						client.subscribe("/topic/multi/rooms/"+ roomID +"/scores", function (response) {
							const ranking = response.body;
							const players = JSON.parse(ranking);
							console.log(Object.keys(players).length);
							setPlayers(players);			
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
		
		// return a function to disconnect on unmount
		return function cleanup() {
			if (client && client['connected']) {
				client.disconnect(function () {
					console.log('disconnected from stomp');
				});
			}
		};
		
    }, []);
	
	const startCountdown = () => {
		
		const timer = setInterval(() => {
			setCountdown(countdown => countdown - 1);
		}, 1000);

		setTimeout(() => {
			clearInterval(timer);
			nextRound(roomID);
		}, 10000);
		
		return () => clearInterval(timer);
	};

	return (
		<BaseContainer>
			<div className="choiceresult container">
			    <p className="choiceresult timer">{countdown}s</p>
				<div className="choiceresult form">
					<center>
						{Object.keys(players).length > 0 ? (
							<div className="choiceresult record">
								<Button
									width="70%"
								>
								{Object.keys(players)[0] + ": " + players[Object.keys(players)[0]]}
								</Button>
							</div>) : null}
							
						{Object.keys(players).length > 1 ? (
							<div className="choiceresult record">
								<Button
									width="70%"
								>
								{Object.keys(players)[1] + ": " + players[Object.keys(players)[1]]}
								</Button>
							</div>) : null}
							
						{Object.keys(players).length > 2 ? (
							<div className="choiceresult record">
								<Button
									width="70%"
								>
								{Object.keys(players)[2] + ": " + players[Object.keys(players)[2]]}
								</Button>
							</div>) : null}
							
						{Object.keys(players).length > 3 ? (
							<div className="choiceresult record">
								<Button
									width="70%"
								>
								{Object.keys(players)[3] + ": " + players[Object.keys(players)[3]]}
								</Button>
							</div>) : null}
							
						{Object.keys(players).length > 4 ? (
							<div className="choiceresult record">
								<Button
									width="70%"
								>
								{Object.keys(players)[4] + ": " + players[Object.keys(players)[4]]}
								</Button>
							</div>) : null}
							
						{Object.keys(players).length > 5 ? (
							<div className="choiceresult record">
								<Button
									width="70%"
								>
								{Object.keys(players)[5] + ": " + players[Object.keys(players)[5]]}
								</Button>
							</div>) : null}
								
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
export default ChoiceResult;