import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Button} from 'components/ui/Button';
import {Link, useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/RoomCreation.scss";


const RoomCreation = () => {

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
    let id = localStorage.getItem("loggedInUser");
      try {
        history.push(`/roomsetting`);
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