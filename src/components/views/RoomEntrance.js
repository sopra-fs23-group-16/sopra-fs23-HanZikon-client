import React, {useEffect, useState} from 'react';
import {handleError, client} from 'helpers/api';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import {SecondaryButton} from 'components/ui/SecondaryButton';
import 'styles/views/RoomEntrance.scss';
import BaseContainer from "components/ui/BaseContainer";
import {FormField} from "../../helpers/formField";

// const FormFieldRoomCode = props => {
// 	return (
// 		<div className="entrance field">
// 			<label className="entrance label">
// 				{props.label}
// 			</label>
// 			<input
// 				className="entrance input"
// 				placeholder="Enter the room code here"
// 				value={props.value}
// 				onChange={e => props.onChange(e.target.value)}
// 			/>
// 		</div>
// 	);
// };
//
// FormFieldRoomCode.propTypes = {
// 	label: PropTypes.string,
// 	value: PropTypes.string,
// 	onChange: PropTypes.func
// };

const RoomEntrance = props => {
	// const history = useHistory();
	const [roomCode, setRoomCode] = useState("");
	let [roomFull, setRoomFull] = useState(false);
	let userID = localStorage.getItem("loggedInUser");
	
	// const handleChangerc = (event) =>{
	// 	setRoomCode(event.target.value);
	// };

	// const logout = () => {
	// 	localStorage.removeItem('token');
	// 	localStorage.removeItem("loggedInUser");
	// 	const response = api.get('/logout/'+userID);
	// 	history.push('/login');
	// }
	
	useEffect(() => {

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
		if(roomCode.length === 6){
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
		}

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
		const requestBody = JSON.stringify({ userID });

		setTimeout(function () {
			client.send('/app/multi/rooms/' + roomCode + '/join', {}, requestBody);
		},100);
	};

	return (
		<BaseContainer>
			<div className="entrance container">
				{/* <h2>Please enter the room detail!</h2> */}
				<div className="entrance text">Please enter the room detail!</div>
				<div className="entrance form">
					<FormField
						type="entrance"
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
					{/* <div className="creation button-container">
						<PrimaryButton
							width="80%"
							onClick={() => logout()}
						>
						Exit
						</PrimaryButton>
					</div> */}

					{roomFull &&
						<div className="entrance roomFull" >This room is full, you may join another one!</div>
					}
				</div>
			</div>
		</BaseContainer>
	);
};

export default RoomEntrance;