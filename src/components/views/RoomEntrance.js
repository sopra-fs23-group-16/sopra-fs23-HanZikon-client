import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
// import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/RoomEntrance.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
// import Room from 'models/Room';



/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormFieldRoomID = props => {
  return (
    <div className="entrance field">
      <label className="entrance label">
        {props.label}
      </label>
      <input
        className="entrance input"
        placeholder="Enter the room ID here"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormFieldRoomID.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

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


  const logout = () => {
    localStorage.removeItem('token');
	let id = localStorage.getItem("loggedInUser");
    localStorage.removeItem("loggedInUser");
    const response = api.get('/logout/'+id);
    history.push('/login');
}

  const enterRoom = async () => {
    try {
      history.push(`/rooms/:id`);
    } catch (error) {
      alert(`Something went wrong: \n${handleError(error)}`);
	  history.push(`/roomentrance`);
    }
  };


  const goLobby = async () => {
    let id = localStorage.getItem("loggedInUser");
      try {
        history.push(`/lobby`);
      } catch (error) {
        alert(`Something went wrong: \n${handleError(error)}`);
      }
    };



  return (
    <BaseContainer>
      <div className="entrance container">
      <h2 className="entrance title">Please enter the room detail!</h2>
        <div className="entrance form">
          <FormFieldRoomID
            label="Room ID"
            value={roomid}
            onChange={un => setRoomID(un)}
          />
          <FormFieldRoomCode
            label="Room Code"
            value={roomcode}
            onChange={n => setRoomCode(n)}
          />
          <div className="entrance button-container">
          <Button
          disabled={!roomid && !roomcode}
          width="80%"
          onClick={() => enterRoom()}
        >
          Enter the room
        </Button>
    </div>
    <div className="entrance button-container">
        <Button
          width="80%"
          onClick={() => goLobby()}
        >
          Back to Lobby
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

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default RoomEntrance;