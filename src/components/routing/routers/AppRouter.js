import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {GameGuard} from "components/routing/routeProtectors/GameGuard";
import {LobbyGuard} from "components/routing/routeProtectors/LobbyGuard";
import Lobby from "components/views/Lobby";
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
	  
        <Route path="/game">
          <GameGuard>
            <GameRouter base="/game"/>
          </GameGuard>
        </Route>
		
		<Route path="/lobby">
          <LobbyGuard>
            <Lobby/>
          </LobbyGuard>
        </Route>
		
		<Route path="/roomsetting">
          <RoomSettingGuard>
            <RoomSetting/>
          </RoomSettingGuard>
        </Route>

				<Route path="/roomcreation">
          <RoomCreationGuard>
            <RoomCreation/>
          </RoomCreationGuard>
        </Route>

        <Route path="/roomentrance">
            <RoomEntrance/>
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
          <Redirect to="/login"/>
        </Route>
		
        <Route path ="/users/:userId">
          <Inspect/>
        </Route>
        <Route path ="/users/:userId">
          <InspectGuard>
            <Inspect/>
          </InspectGuard>
        </Route>
		
        <Route path ="/Setting/:userId">
          <Setting/>
        </Route>
		
		<Route path ="/users/:userId">
		  <Setting/>
		</Route>
		
        <Route path ="/logout/:userId">
          <LoginGuard>
            <Login/>
          </LoginGuard>
        </Route>
		
      </Switch>
    </BrowserRouter>
  );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
