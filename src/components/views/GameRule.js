import {useEffect, useState} from 'react';
import {api} from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/GameRule.scss";
import User from 'models/User';

const GameRule = () => {

	useEffect(() => {
		// fetch localuser's information by token
		async function fetchLocalUser() {
			try {
				const requestBody = JSON.stringify({ token: localStorage.getItem("token") });
				const response = await api.post(`/users/localUser`, requestBody);

				const user = new User(response.data);
				console.log("Confirm local user:",user);
				localStorage.setItem('loggedInUser', user.id);

			} catch (error) {
				alert("You are not logged in!");
				localStorage.removeItem('token');
				history.push('/login');
			}
		}
		fetchLocalUser();
	}, []);

    const history = useHistory();
	const [users, setUsers] = useState(null);
	let id = localStorage.getItem("loggedInUser");

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem("loggedInUser");
		const response = api.get('/logout/'+id);
		history.push('/login');
	}
  
	//const params = new URLSearchParams(window.location.search);

	return (
		<BaseContainer>
        <center>
				<h1>Game Rule</h1>
				<div className="gamerule form">
                <div className="gamerule label">
                Game Modes:<br /><br />
				<b>1. HanziDrawing</b><br /><br />
					a. Learn to write Chinese characters from Live Demo and a guided imitation.<br />
					b. Browse the evolution of Chinese characters dating back to 2nd millennium BC.<br />
					c. "Draw" the Chinese character from your memory.<br />
					d.Peer review all your teammates’ works and take a vote!.<br /><br />
					<b>2. OracleGuessing</b><br /><br />
					a. An Oracle bone script, together with the English meaning of the word, will be displayed.<br />
					b. Four choices of modern Chinese characters will be displayed.<br />
					c. Only one answer is correct.<br /><br />
					<b>Note:</b> Empirical evidence suggests, a prior knowledge in Chinese isn’t going to help. Just trust your gut and have fun!<br /><br />
					<b>3. A bit of Both</b><br /><br />
					a. Just like its name, a bit of both modes coming in random order.
                    </div>
					<br />
					<br />
					<div className="lobby button-container">
						<Button 
							width="12%"
							onClick={() => history.push(`/lobby`)}
						>
						Back to Lobby
						</Button>
					</div>
					<div className="lobby button-container">
						<Button
							width="12%"
							onClick={() => history.push(`/roomcreation`)}
						>
						Start a Game
						</Button>
					</div>	
				</div>
        </center>
		</BaseContainer>
	);
}

export default GameRule;