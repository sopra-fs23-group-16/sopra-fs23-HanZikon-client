import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
// import User from 'models/User';
import {useHistory} from 'react-router-dom';
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
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);
	const [roomid, setRoomID] = useState(null);
	const [roomcode, setRoomCode] = useState(null);
	let id = localStorage.getItem("loggedInUser");

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem("loggedInUser");
		const response = api.get('/logout/'+id);
		history.push('/login');
	}

	const enterRoom = async () => {
		try {
			history.push(`/rooms/{roomid}`);
		} catch (error) {
			alert(`Something went wrong: \n${handleError(error)}`);
			history.push(`/roomentrance`);
		}
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