import { api, handleError, client } from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import BaseContainer from "components/ui/BaseContainer";
import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import 'styles/views/RoomSetting.scss';

const FormFieldRoomCode = props => {
  return (
    <div className="roomsetting field">
      <label className="roomsetting label">
        {props.label}
      </label>
      <input
        className="roomsetting input"
        placeholder="room code"
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


const FormFieldNumofPlayers = props => {
  return (
    <div className="roomsetting field">
        <label className="roomsetting label">
			{props.label}
        </label>
		<select id="1" className="roomsetting select">
            <option value="-" selected>Please select...</option>
            <option value="3">3</option>
            <option value="4">4</option>
			<option value="5">5</option>
            <option value="6">6</option>
			value={props.value}
			onChange={e => props.onChange(e.target.value)}
        </select>
    </div>
  );
};

FormFieldNumofPlayers.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

const FormFieldQuestionType = props => {
  return (
    <div className="roomsetting field">
		<label className="roomsetting label">
			{props.label}
		</label>
		<select id="2" className="roomsetting select">
            <option value="-" selected>Please select...</option>
            <option value="single">single choice</option>
            <option value="imitation">imitation</option>
			<option value="mixed">mixed</option>
			value={props.value}
			onChange={e => props.onChange(e.target.value)}
        </select>
    </div>
  );
};

FormFieldQuestionType.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

const RoomSetting = () => {

	const history = useHistory();
	
	const [Room, setRoom] = useState(null);
    const [RoomCode, setRoomCode] = useState(null);
	const [NumofPlayers, setNumofPlayers] = useState(null);
	const [QuestionType, setQuestionType] = useState(null);
	let {roomId} = useParams();

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function stompConnect() {
            try {

                if (!client.isconnected) {
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
        // 在这里使用 newPlayerInfo 对象中的头像和名称信息更新 HTML 页面
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
	
	const goBack = () => {
        history.push(`/roomcreation`);
    };

	const goWaiting = async () => {
		var NumofPlayers = document.getElementById("1");
		let item = {RoomCode, NumofPlayers, QuestionType}
        console.warn("item", item)
		try {
			const requestBody = JSON.stringify({RoomCode, NumofPlayers, QuestionType});
            /*const response = await api.put('/room/' + RoomID, requestBody);

            const room = new Room(response.data);
			history.push(`/`);*/
		} catch (error) {
			alert(`Something is wrong: \n${handleError(error)}`);
		}
    };
	
	const goInvite = async () => {
    /*try {
      history.push(`/invitation`);
    } catch (error) {
      alert(`Something is wrong: \n${handleError(error)}`);
    }*/
    };

    return (
		<BaseContainer>
		  <div className="roomsetting container">
		  <h2>Welcome to Game Room X!</h2>
            <div className="">
              <p className="roomsetting text">
                  You could set parameters of your game here.
              </p>
			  
				<FormFieldRoomCode
					label="Room Code"
					value={RoomCode}
					onChange={un => setRoomCode(un)}
				/>
				<FormFieldNumofPlayers
					label="Number of Players"
					value={NumofPlayers}
					onChange={value => setNumofPlayers(value)}
				/>
				<FormFieldQuestionType
					label="Question Type"
					value={QuestionType}
					onChange={un => setQuestionType(un)}
				/>
			  
				<div className="lobby button-container">
					<Button
						disabled={!RoomCode || !NumofPlayers || !QuestionType}
						width="100%"
						onClick={() => goWaiting()}
					>
					Confirm
					</Button>
				</div>
				<div className="lobby button-container">
					<Button
					width="100%"
					onClick={() => goBack()}
					>
					Cancel
					</Button>
				</div>
                <div className="lobby button-container">
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