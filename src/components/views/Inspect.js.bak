import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory, useParams} from 'react-router-dom';
import 'styles/views/Game.scss';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

const Player = ({user}) => (
    <div className="player container">
        <div className="player id">id: {user.id}</div>
        <div className="player username">{user.username}</div>
    </div>
);

const FormField = props => {
  return (
    <div className="login field">
      <label className="login label">
        {props.label}
      </label>
      <input
        className="login input"
		placeholder="Not defined"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

Player.propTypes = {
    user: PropTypes.object
};

const Inspect = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    let {userId} = useParams(); // get current parameters of clicked user

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/users/'+userId);

                // delays continuous execution of an async operation for 1 second.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Get the returned users and update the state.
                setUser(response.data);

                // This is just some data for you to see what is available.
                // Feel free to remove it.
                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, []);

    let content = <Spinner/>;

    if (user) {
        content = (
            <div className="user overview">

				window.onload = function(){
					var img = document.createElement("img");
					img.src = "../image/dog.png"
					img.width = "80";
					var myp = document.getElementById('myp');
					myp.appendChild(img);
				};

                <FormField
                    label="username"
                    value={user.map(itm => itm.username)}
                    onChange={un => setUsername(un)}
                    />

                <Button
                    disabled={userId !== localStorage.getItem("loggedInUser")}
                    width="100%"
                    onClick={() => history.push(`/Setting/${user.map(itm => itm.id)}`)}>
                    Edit
                </Button>
                &nbsp;
                <Button
                    width="100%"
                    onClick={() => history.push('/game')}
                >
                    Back to user overview
                </Button>
            </div>
        );
    }
	
	return (
    <BaseContainer>
      <div className="login container">
        <div className="game form">
          {content}
        </div>
      </div>
    </BaseContainer>
  );
}


export default Inspect;
