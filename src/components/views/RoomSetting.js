import { api, handleError, client } from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import BaseContainer from "components/ui/BaseContainer";
import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import 'styles/views/RoomSetting.scss';
/*import SockJSClient from 'react-stomp';*/

const RoomSetting = () => {

	const history = useHistory();
	const [users, setUsers] = useState(null);
	let userId = localStorage.getItem("loggedInUser");
	
	const [Room, setRoom] = useState(null);
	const [numPlayers, setNumPlayers] = useState("");
	const [level, setLevel] = useState("");
	const [questionType, setQuestionType] = useState("");
/*	const [client, setClient] = useState("");*/
	
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
                if (!client.isconnected) {
                    client.connect({}, function (frame) {
						console.log('connected to stomp');
						client.subscribe('/topic/greeting', message => {
							console.log('Received message:', message.body)
						});
						client.subscribe('/topic/multi/create/' + userId, message => {
							console.log('Received message:', message.body)
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
    
    /*client.connect({}, function (frame) {
        console.log('connected to stomp');
    });*/

    //send to server
    //"/path",{},JSON
    /*client.send('/app/multi/create', {}, JSON.stringify({
        ownerDTO: { username: 'aaa' },
        gameParam: { level: 1, numPlayers: 4, questionType: 3 }
    }))*/
        /*.then((response) => {
            // deal with response (roomID)
            console.log(response.body);
        })*/

    //listen to server
    /*client.subscribe('/topic/multi/player/1', function (message) {
        console.log('Received message:', message.body);
        // ������ʹ�� newPlayerInfo �����е�ͷ���������Ϣ���� HTML ҳ��
    });*/
	
	    /*useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/room/'+roomId);

                // delays continuous execution of an async operation for 1 second.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Get the returned users and update the state.
                setRoom(response.data);

                // This is just some data for you to see what is available.
                // Feel free to remove it.
                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);
            } catch (error) {
                console.error(`Something went wrong: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong! See the console for details.");
            }
        }
        fetchData();
		}, []);*/

	/*const goWaiting = async () => {
		let item = {numPlayers, questionType, level}
        console.warn("item", item)
		try {
			const requestBody = JSON.stringify({numPlayers, questionType, level});
            const response = await client.send('/app/multi/create/' + userId, {}, requestBody)

			//listen to server
			client.subscribe('/topic/multi/create/' + userId, function (message) {
				console.log('Received message:', message.body);
			});
            const room = new Room(response.data);
			//history.push(`/`);
		} catch (error) {
			alert(`Something is wrong: \n${handleError(error)}`);
		}
    };*/
	
	const goWaitingOld = async () => {
		let item = {numPlayers, questionType, level}
        console.warn("item", item)
		try {
			const requestBody = JSON.stringify({numPlayers, questionType, level});
			client.send('/app/multi/create/' + userId, {}, requestBody)
		} catch (error) {
			alert(`Something is wrong: \n${handleError(error)}`);
		}
    };

	//////////////////////////////////////////////////////////// 处理返回的message，解包roomid和roomcode
	const roomid = 1;
	const goWaiting = () => {
		if (roomid){
			const requestBody = JSON.stringify({numPlayers, questionType, level});
			client.send('/app/multi/create/' + userId, {}, requestBody)
			history.push("/rooms/" + roomid + "/owner")
		}		
    };

	
//	const subscription = async (data) => {
//		console.log('Received message');
//		await client.subscribe('/topic/multi/create/' + userId, function (response) {
//				console.log('Received message:' + response.body);
///*				const room = new Room (data);*/
//				console.log('Received message:' + room.roomID);
//				//history.push(`/`);
//			}, function(error){
//				console.log('Not received:' + error);
//			});
//    };
	
	/*const goWaiting = () => {
		console.log('Received message');
		client.subscribe('/topic/multi/create/' + userId, function (response) {
				console.log('Received message:' + response.body);
				const room = new Room (paramSetting());
				console.log('Received message:' + room.roomID);
				//history.push(`/`);
			}, function(error){
				console.log('Not received:' + error);
			});
    };
	
	const paramSetting = async () => {
		let item = {numPlayers, questionType, level}
        console.warn("item", item)
		try {
			const requestBody = JSON.stringify({numPlayers, questionType, level});
            const response = await client.send('/app/multi/create/' + userId, {}, requestBody)
			return response.data;
			console.log('Sent');
			
		} catch (error) {
			alert(`Something is wrong: \n${handleError(error)}`);
		}
    };*/
	
	const goInvite = () => {
    /*try {
      history.push(`/invitation`);
    } catch (error) {
      alert(`Something is wrong: \n${handleError(error)}`);
    }*/
    };
	
	//const handleMsg = () => {
	//	console.log("sent");
	//}

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
						</select>
					</div>
					<div className="roomsetting field">
						<label className="roomsetting label">
							Question Type
						</label>
						<select value = {questionType} className="roomsetting select" onChange = {handleChangeqt}>
							<option value="-" selected>Please select...</option>
							<option value="single">single choice</option>
							<option value="imitation">imitation</option>
							<option value="mixed">mixed</option>
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