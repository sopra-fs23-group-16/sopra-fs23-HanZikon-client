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
                Lorem ipsum dolor sit amet, has ut aeque omnium numquam. Ei pro augue epicurei, eum an duis posse moderatius. Cu eam nobis recusabo recteque, qualisque incorrupte intellegebat te est, ei mazim essent vim. Ne rebum omnes dicunt est.

Modo delenit electram ea quo. Vide constituto cu eos, cibo malis molestiae eum ut. Ei facete audiam signiferumque has, mel malorum inermis voluptua ei, ei eius explicari gloriatur quo. Essent veritus scaevola no quo, vel tale tritani no.

At lorem nostro sit, aeque gubergren vis ea. Ea habemus accommodare has, in nisl graeco platonem his, nam noster recusabo iracundia cu. Tempor delectus consequat vis id, utroque docendi cotidieque eu sea. Ad vis ferri dignissim gubergren. Nec eu salutandi efficiantur voluptatibus, id sit ferri habemus. Mea vide deleniti corrumpit id.

Quo cu ullum officiis detraxit. Semper deterruisset at nec, at congue appareat pri, per legere virtute cu. No duo regione malorum, eu est meis inimicus. Tale altera senserit at mel. Id cum probo labore, pri graeci maiorum an.

Pri eu mollis verear, his et fuisset epicurei necessitatibus. His atqui deleniti ea. Et quot tota atqui est, cu quo eruditi laboramus. Mei ex probo doctus, ut tation deserunt pertinax usu.
                    </div>
				</div>
        </center>
		</BaseContainer>
	);
}

export default GameRule;