import React, {useEffect, useState} from 'react';
import {handleError, client} from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/ChoiceResult.scss';
import BaseContainer from "components/ui/BaseContainer";

const ChoiceResult = props => {
	
	const history = useHistory();  

    const {roomID} = useParams();
	console.log("roomID", roomID);
	const [numPlayers, setNumPlayers] = useState("");
	const [players, setPlayers] = useState([]);
	const playerNames = players.map(player => player.playerName)

	const requestBody = JSON.stringify({ roomID });
    

	useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function stompConnect() {
            try {
                if (!client['connected']) {
                    client.connect({}, function () {
						console.log('connected to stomp');
						client.subscribe("/topic/multi/rooms/"+ roomID +"/games/record", function (response) {
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
							client.send("/app/multi/rooms/"+ "1" + "/players/scoreBoard",{}, requestBody)
						},500);
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
	
	window.addEventListener("load", function() {
		
		var countdown = 20;
		var countdownElement = document.getElementById("countdown");

		var timer = setInterval(function() {
			countdown--;
			countdownElement.innerHTML = countdown + "s";
  
			if (countdown <= 0) {
				clearInterval(timer);
				window.location.href = "/games/record/choice";
			}
		}, 1000);
	});
	

	return (
		<BaseContainer>
			<div  className="choicegame container">
			<div className="choicegame col">

				</div>
				<div className="choicegame col">
				<div className="choicegame form">
					<center>
					<div id="countdown" className="">
					</div>
								
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