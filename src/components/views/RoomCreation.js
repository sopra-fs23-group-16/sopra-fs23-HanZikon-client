import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Button} from 'components/ui/Button';
import Room from 'models/Room';
import {Link, useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/RoomCreation.scss";


const RoomCreation = () => {

	/*const socket = new WebSocket('ws://example.com/socket');
	
	socket.onopen = function(event) {
		console.log('WebSocket opened:', event);
	};

	socket.onmessage = function(event) {
		console.log('WebSocket message received:', event.data);
	};

	socket.onerror = function(error) {
		console.error('WebSocket error:', error);
	};

	socket.onclose = function(event) {
		console.log('WebSocket closed:', event);
	};*/

  const history = useHistory();

  const [users, setUsers] = useState(null);

  const logout = () => {
    localStorage.removeItem('token');
	let id = localStorage.getItem("loggedInUser");
    localStorage.removeItem("loggedInUser");
    const response = api.get('/logout/'+id);
    history.push('/login');
}

  const goLobby = async () => {
    let id = localStorage.getItem("loggedInUser");
      try {
        history.push(`/lobby`);
      } catch (error) {
        alert(`Something went wrong: \n${handleError(error)}`);
      }
    };
	
  const goSetting = async () => {
	  
	const request = {
		type: 'subscribe',
		destination: '/topic/multi/player/{room.id}'
	};

socket.send(JSON.stringify(request));
	  
	const room = new Room();
    localStorage.setItem('roomid', room.id);
      try {
        history.push(`/roomsetting/{room.id}`);
      } catch (error) {
        alert(`Something went wrong: \n${handleError(error)}`);
      }
  };

    const enterRoomDetail = async () => {
      let id = localStorage.getItem("loggedInUser");
        try {
          history.push(`/roomentrance`);
        } catch (error) {
          alert(`Something went wrong: \n${handleError(error)}`);
        }
      };

  return (
    <BaseContainer>
	<div className="creation container">
    <h1>Competition Mode</h1>
      <div className="creation form">
          <div className="creation button-container">
            <Button 
              width="70%"
              onClick={() => goSetting()}
            >
              Create A New Room
            </Button>
          </div>
          <div className="creation button-container">
            <Button
              width="70%"
              onClick={() => enterRoomDetail()}
            >
              Join An Existing Room
            </Button>
          </div>
		  <div className="creation button-container">
            <Button
              width="70%"
              onClick={() => goLobby()}
            >
              Back to Lobby
            </Button>
          </div>
		  <div className="creation button-container">
            <Button
              width="70%"
              onClick={() => logout()}
            >
              Exit
            </Button>
          </div>
        </div>
	</div>
    </BaseContainer>
  );
}

export default RoomCreation;