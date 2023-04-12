import React, {useEffect, useState} from 'react';
import {api, handleError, client} from 'helpers/api';
// import User from 'models/User';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/RoomEntrance.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
// import Room from 'models/Room';

const FormFieldRoomCode = props => {
	return (
		<div className="entrance field">
			<label className="entrance label">
				{props.label}
			</label>
			<input
				className="entrance input"
				placeholder="Enter the room code here"
				value={props.value}
				onChange={e => props.onChange(e.target.value)}
			/>
		</div>
	);
};

FormFieldRoomCode.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func
};

const RoomEntrance = props => {
	const history = useHistory();  
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [roomcode, setRoomCode] = useState("");
	let userID = localStorage.getItem("loggedInUser");
	
	const handleChangerc = (event) =>{
		setRoomCode(event.target.value);
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem("loggedInUser");
		const response = api.get('/logout/'+userID);
		history.push('/login');
	}
	
	useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function stompConnect() {
            try {
                if (!client.isconnected) {
                    client.connect({}, function (frame) {
						console.log('connected to stomp');
						client.subscribe('/topic/multi/rooms' + roomcode + '/join', function (response){
							const room = response.body;
							const roomparse = JSON.parse(room);
							history.push("/rooms/" + roomparse["roomID"] + "/participants");
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
			if (client && client.isconnected) {
				client.disconnect(function () {
					console.log('disconnected from stomp');
				});
			}
		};
    }, []);

	const enterRoom = () => {
		const requestBody = JSON.stringify({userID});
		client.send('/app/multi/rooms/' + roomcode + '/join', {}, requestBody);
	};

	return (
		<BaseContainer>
			<div className="entrance container">
				<h2>Please enter the room detail!</h2>
				<div className="entrance form">
					<FormFieldRoomCode
						label="Room Code"
						value={roomcode}
						onChange={n => setRoomCode(n)}
					/>
					<div className="entrance button-container">
						<Button
							disabled={!roomcode}
							width="80%"
							onClick={() => enterRoom()}
						>
						Enter the room
						</Button>
					</div>
					<div className="entrance button-container">
						<Button
							width="80%"
							onClick={() => history.push(`/roomcreation`)}
						>
						Cancel
						</Button>
					</div>
					<div className="creation button-container">
						<Button
							width="80%"
							onClick={() => logout()}
						>
						Exit
						</Button>
					</div>
				</div>
			</div>
		</BaseContainer>
	);
};

export default RoomEntrance;