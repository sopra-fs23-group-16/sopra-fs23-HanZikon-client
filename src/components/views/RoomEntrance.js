import React, {useEffect, useState} from 'react';
import {api, handleError, client} from 'helpers/api';
import User from 'models/User';
import {useHistory, useParams} from 'react-router-dom';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import 'styles/views/RoomEntrance.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import {fetchLocalUser} from "../../helpers/confirmLocalUser";
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

	// const logout = () => {
	// 	localStorage.removeItem('token');
	// 	localStorage.removeItem("loggedInUser");
	// 	const response = api.get('/logout/'+userID);
	// 	history.push('/login');
	// }
	
	useEffect(() => {

		fetchLocalUser();
		
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
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

	const enterRoom = () => {
		const requestBody = JSON.stringify({ userID });
		client.subscribe('/topic/multi/rooms/' + roomcode + '/join', function (response) {
			console.log(response.body)
			const room = response.body;
			const roomparse = JSON.parse(room);
			window.location.href = "/rooms/" + roomparse["roomID"] + "/participants";
		});
		setTimeout(function () {
			client.send('/app/multi/rooms/' + roomcode + '/join', {}, requestBody);
		},100);
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
						<PrimaryButton
							disabled={!roomcode}
							width="80%"
							onClick={() => enterRoom()}
						>
						Enter the room
						</PrimaryButton>
					</div>
					<div className="entrance button-container">
						<PrimaryButton
							width="80%"
							onClick={() => window.location.href = `/roomcreation`}
						>
						Cancel
						</PrimaryButton>
					</div>
					{/* <div className="creation button-container">
						<PrimaryButton
							width="80%"
							onClick={() => logout()}
						>
						Exit
						</PrimaryButton>
					</div> */}
				</div>
			</div>
		</BaseContainer>
	);
};

export default RoomEntrance;