import React, {useEffect, useState} from 'react';
import {handleError, client} from 'helpers/api';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import {SecondaryButton} from 'components/ui/SecondaryButton';
import 'styles/views/RoomEntrance.scss';
import BaseContainer from "components/ui/BaseContainer";
import {FormField} from "../../helpers/formField";

const RoomEntrance = props => {
	const [roomCode, setRoomCode] = useState("");
	let [roomFull, setRoomFull] = useState(false);
	let userID = localStorage.getItem("loggedInUser");
	
	useEffect(() => {
		async function stompConnect() {
			try {
				if (!client['connected']) {
					client.connect({}, function (frame) {
						console.log('connected to stomp');

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
		setRoomFull(false);
	}, [roomCode]);

	const checkRoomFull = (roomparse) => {
		const players = roomparse["players"];

		roomFull= true;
		players.forEach(player => {
			console.log("local userID is" + userID);
			console.log("player userID is" +player.userID);
			if(player.userID == userID){
				roomFull= false;
				setRoomFull(false);
			}
		});
		setRoomFull(roomFull);

	};

	const enterRoom = () => {
		if(roomCode.length!==4){
			setRoomFull(true);
		}else{
			client.subscribe('/topic/multi/rooms/' + roomCode + '/join', function (response) {
				console.log(response.body)
				const room = response.body;
				const roomparse = JSON.parse(room);

				checkRoomFull(roomparse);
				if(roomFull === false){
					console.log("The room is not full!");
					window.location.href = "/room/" + roomparse["roomID"] + "/waitingroom/participant";
				} else {
					console.log("The room is full!");
				}

			});
			const requestBody = JSON.stringify({ userID });
			setTimeout(function () {
				client.send('/app/multi/rooms/' + roomCode + '/join', {}, requestBody);
			},500);
		}
	};

	return (
		<BaseContainer>
			<div className="entrance container">
				<div className="entrance text">Please enter the room detail!</div>
				<div className="entrance form">
					<FormField
						className="entrance"
						label="Room Code"
						value={roomCode}
						onChange={n => setRoomCode(n)}
					/>
					<div className="entrance button-container">
						<PrimaryButton
							disabled={!roomCode}
							width="80%"
							onClick={() => enterRoom()}
						>
						Enter the room
						</PrimaryButton>
					</div>
					<div className="entrance button-container">
						<SecondaryButton
							width="80%"
							onClick={() => window.location.href = `/room/lobby`}
						>
						Cancel
						</SecondaryButton>
					</div>
					{roomFull &&
						<div className="entrance roomFull" >This room is invalid, you may join another one!</div>
					}
				</div>
			</div>
		</BaseContainer>
	);
};

export default RoomEntrance;