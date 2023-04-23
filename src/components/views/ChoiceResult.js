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
	console.log("roomID", roomID);
	const [numPlayers, setNumPlayers] = useState("");
	const [players, setPlayers] = useState([]);
	const playerNames = players.map(player => player.playerName)
	
	const [countdown, setCountdown] = useState(15);

	//const requestBody = JSON.stringify({ roomID });
    

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
							console.log(ranking);
							/*const room = response.body;
							const roomparse = JSON.parse(room);
							const roomcode = roomparse["roomCode"]
							const players = roomparse["players"]
							console.log(players);
							console.log(roomparse);	
							setRoomcode(roomcode);	
							setPlayers(players);	*/				
						});
						setTimeout(function () {
							client.send("/app/multi/rooms/"+ roomID + "/players/scores",{}, '');
						},100);
						/*client.subscribe('/topic/multi/rooms/' + roomID + '/join', function (response) {
							const room = response.body;
							const roomparse = JSON.parse(room);
							console.log(roomparse);							
						});*/
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
	
	//client.send("/app/multi/rooms/"+ roomID + "/players/scores",{}, '');
	
	const startCountdown = () => {
		
		const timer = setInterval(() => {
			setCountdown(countdown => countdown - 1);
		}, 1000);

    
		setTimeout(() => {
			clearInterval(timer);
			nextRound(roomID);
		}, 15000);
		
		return () => clearInterval(timer);
	};
	
	/*window.addEventListener("load", function() {
		
		var countdown = 15;
		var countdownElement = document.getElementById("countdown");

		var timer = setInterval(function() {
			countdown--;
			countdownElement.innerHTML = countdown + "s";
  
			if (countdown <= 0) {
				clearInterval(timer);
				nextRound(roomID);
			}
		}, 1000);
	});*/
	

	return (
		<BaseContainer>
			<div  className="choicegame container">
			<div className="choicegame col">

				</div>
				<div className="choicegame col">
				<div className="choicegame form">
					<center>
					<p>{countdown}s</p>
								
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
export default ChoiceResult;