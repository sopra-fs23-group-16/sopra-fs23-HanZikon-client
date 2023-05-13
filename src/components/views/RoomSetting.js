import { handleError, client } from 'helpers/api';
import {useHistory} from 'react-router-dom';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import {SecondaryButton} from 'components/ui/SecondaryButton';
import BaseContainer from "components/ui/BaseContainer";
import React, { useEffect, useState } from 'react'
import 'styles/views/RoomSetting.scss';

const RoomSetting = () => {

	const history = useHistory();
	// const [users, setUsers] = useState(null);
	// let userId = localStorage.getItem("loggedInUser");
	
	// const [Room, setRoom] = useState(null);
	const [numPlayers, setNumPlayers] = useState("");
	const [level, setLevel] = useState("");
	const [questionType, setQuestionType] = useState("");
	
	// const handleChangenp = (event) =>{
	// 	setNumPlayers(event.target.value);
	// };
	// const handleChangeqt = (event) =>{
	// 	setQuestionType(event.target.value);
	// };
	// const handleChangedl = (event) =>{
	// 	setLevel(event.target.value);
	// };

    useEffect(() => {

		// fetchLocalUser();
		
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
		async function stompConnect() {
            try {
				if (!client['connected']) {
                    client.connect({}, () => {
						console.log('connected to stomp');
						client.subscribe('/topic/multi/create/' + localStorage.getItem("loggedInUser"), function (response) {
							// const room = response.body;
							const room = JSON.parse(response.body);
							console.log(room);
							window.location.href = "/room/" + room["roomID"] + "/waitingroom/owner";
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

	const doCreate = () => {
		// will be redirected to waiting room when new message received
		const requestBody = JSON.stringify({level, numPlayers, questionType});
		client.send('/app/multi/create/' + localStorage.getItem("loggedInUser"), {}, requestBody);
    };
	
	// const goInvite = () => {
    // /*try {
    //   history.push(`/invitation`);
    // } catch (error) {
    //   alert(`Something is wrong: \n${handleError(error)}`);
    // }*/
    // };

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
						<select value={numPlayers} className="roomsetting select" onChange={e => {
							setNumPlayers(e.target.value);
						}}>
							<option value="-" selected>Please select...</option>
							{[2, 3, 4, 5, 6].map((value) => (
								<option key={value} value={value}>{value}</option>
							))}
						</select>
					</div>
					<div className="roomsetting field">
						<label className="roomsetting label">
							Question Type
						</label>
						<select value = {questionType} className="roomsetting select" onChange = {e=> {
							setQuestionType(e.target.value);
						}}>
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
						<select value = {level} className="roomsetting select" onChange = {e=> {
							setLevel(e.target.value);
						}}>
							<option value="-" selected>Please select...</option>
							{[1,2, 3, 4, 5].map((value) => (
								<option key={value} value={value}>{value}</option>
							))}
						</select>
					</div>
					<div className="roomsetting button-container">
						<PrimaryButton
							disabled={!level || !numPlayers || !questionType}
							width="100%"
							onClick={() => doCreate()}
						>
						Confirm
						</PrimaryButton>
					</div>
					<div className="roomsetting button-container">
						<SecondaryButton
							width="100%"
							onClick={() => history.push(`/room/lobby`)}
						>
						Cancel
						</SecondaryButton>
					</div>
					{/* <div className="roomsetting button-container">
						<PrimaryButton
							width="100%"
							onClick={() => goInvite()}
						>
						Generate Invitation Link
						</PrimaryButton>
					</div> */}
				</div>
			</div>
        </BaseContainer>
    );
}

export default RoomSetting;