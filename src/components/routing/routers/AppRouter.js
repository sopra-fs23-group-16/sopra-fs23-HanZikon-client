import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {GameGuard} from "components/routing/routeProtectors/GameGuard";
import {LobbyGuard} from "components/routing/routeProtectors/LobbyGuard";
import Lobby from "components/views/Lobby";
import RoomRouter from "components/routing/routers/RoomRouter";
import GameRouter from "components/routing/routers/GameRouter";
import {LoginGuard} from "components/routing/routeProtectors/LoginGuard";
import Login from "components/views/Login";
import {RegisterGuard} from "components/routing/routeProtectors/RegisterGuard";
import Register from "components/views/Register";
import {InspectGuard} from "components/routing/routeProtectors/InspectGuard";
import Inspect from "components/views/Inspect";
import Setting from "components/views/Setting";
import {RoomCreationGuard} from "components/routing/routeProtectors/RoomCreationGuard";
import RoomCreation from "components/views/RoomCreation";
import {RoomSettingGuard} from "components/routing/routeProtectors/RoomSettingGuard";
import RoomSetting from "components/views/RoomSetting";
import RoomEntrance from "components/views/RoomEntrance";
import OwnerWaitingRoom from "components/views/OwnerWaitingRoom";
import {OwnerWaitingRoomGuard} from "components/routing/routeProtectors/OwnerWaitingRoomGuard";
import NormalWaitingRoom from "components/views/NormalWaitingRoom";
import {NormalWaitingRoomGuard} from "components/routing/routeProtectors/NormalWaitingRoomGuard";
import ChoiceGame from "components/views/ChoiceGame";
import ImitationGame from "components/views/ImitationGame";
import ChoiceRecord from "components/views/ChoiceResult";
import {ChoiceRecordGuard} from "components/routing/routeProtectors/ChoiceRecordGuard";
import ImitationInspect from "components/views/ImitationInspect";
import {ImitationInspectGuard} from "components/routing/routeProtectors/ImitationInspectGuard";
import ImitationVote from "components/views/ImitationVote";
import {ImitationVoteGuard} from "components/routing/routeProtectors/ImitationVoteGuard";
import GameRule from "components/views/GameRule";
import UserRouter from "./UserRouter";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/rooms">
					<GameGuard>
						<RoomRouter base="/rooms"/>
					</GameGuard>
				</Route>
				<Route path="/games">
					<GameGuard>
						<GameRouter base="/games"/>
					</GameGuard>
				</Route>
				<Route path="/users">
					<GameGuard>
						<UserRouter base="/users"/>
					</GameGuard>
				</Route>
				<Route exact path="/login">
					<LoginGuard>
						<Login/>
					</LoginGuard>
				</Route>
				<Route exact path="/register">
					<RegisterGuard>
						<Register/>
					</RegisterGuard>
				</Route>
				<Route exact path="/">
					<Redirect to="/rooms"/>
				</Route>
      		</Switch>
    	</BrowserRouter>
  );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
