import { api, handleError, client } from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import BaseContainer from "components/ui/BaseContainer";
import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import 'styles/views/RoomSetting.scss';

const RoomSetting = () => {

	const history = useHistory();
	const [users, setUsers] = useState(null);
	let userId = localStorage.getItem("loggedInUser");
	
	const [Room, setRoom] = useState(null);
	const [numPlayers, setNumPlayers] = useState("");
	const [level, setLevel] = useState("");
	const [questionType, setQuestionType] = useState("");
	
	const handleChangenp = (event) =>{
		setNumPlayers(event.target.value);
	};
	const handleChangeqt = (event) =>{
		setQuestionType(event.target.value);
	};
	const handleChangedl = (event) =>{
		setLevel(event.target.value);
	};

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
		async function stompConnect() {
            try {
				if (!client['connected']) {
                    client.connect({}, () => {
						console.log('connected to stomp');
						client.subscribe('/topic/multi/create/' + userId, function (response) {
							const room = response.body;
							const roomparse = JSON.parse(room);
							console.log(roomparse);
							window.location.href = "/rooms/" + roomparse["roomID"] + "/owner";
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
			if (client && client['connected']) {
				client.disconnect(function () {
					console.log('disconnected from stomp');
				});
			}
		};
    }, []);

	const goWaiting = () => {
		const requestBody = JSON.stringify({numPlayers, questionType, level});
		client.send('/app/multi/create/' + userId, {}, requestBody);
    };
	
	const goInvite = () => {
    /*try {
      history.push(`/invitation`);
    } catch (error) {
      alert(`Something is wrong: \n${handleError(error)}`);
    }*/
    };

    return (
		<BaseContainer>
			{/*<SockJSClient url = {"http://localhost:8080/websocket"} topics = {["topic/create"]}*/}
			{/*	onMessage={handleMsg} ref = {(client) => setClient(client)}*/}
			{/*	onConnect = {console.log("connected")}*/}
			{/*	onDisconnect = {console.log("disconnected")}*/}
			{/*	debug = {false} />*/}
			<div className="roomsetting container">
				<div className="">
					<p className="roomsetting text">
						You could set parameters of your game here.
					</p>
					<div className="roomsetting field">
						<label className="roomsetting label">
							Number of Players
						</label>
						<select value = {numPlayers} className="roomsetting select" onChange = {handleChangenp}>
							<option value="-" selected>Please select...</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
						</select>
					</div>
					<div className="roomsetting field">
						<label className="roomsetting label">
							Question Type
						</label>
						<select value = {questionType} className="roomsetting select" onChange = {handleChangeqt}>
							<option value="-" selected>Please select...</option>
							<option value="MultipleChoice">Oracle Guessing</option>
							<option value="HanziDrawing">Hanzi Imitation</option>
							<option value="Mixed">I WANT BOTH</option>
						</select>
					</div>
					<div className="roomsetting field">
						<label className="roomsetting label">
							Difficulty Level
						</label>
						<select value = {level} className="roomsetting select" onChange = {handleChangedl}>
							<option value="-" selected>Please select...</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>				
						</select>
					</div>
					<div className="roomsetting button-container">
						<Button
							disabled={!level || !numPlayers || !questionType}
							width="100%"
							onClick={() => goWaiting()}
						>
						Confirm
						</Button>
					</div>
					<div className="roomsetting button-container">
						<Button
							width="100%"
							onClick={() => history.push(`/roomcreation`)}
						>
						Cancel
						</Button>
					</div>
					<div className="roomsetting button-container">
						<Button
							width="100%"
							onClick={() => goInvite()}
						>
						Generate Invitation Link
						</Button>
					</div>
				</div>
			</div>
        </BaseContainer>
    );
}

export default RoomSetting;