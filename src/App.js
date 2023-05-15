// import AppRouter from "components/routing/routers/AppRouter";
// import NavigationBar from "components/views/NavigationBar";

// /**
//  * Happy coding!
//  * React Template by Lucas Pelloni
//  * Overhauled by Kyrill Hux
//  */
// const App = () => {
//   return (
//     <div>
//       <NavigationBar height="100"/>
//       <AppRouter/>
//     </div>
//   );
// };

// export default App;


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppRouter from "components/routing/routers/AppRouter";
import NavigationBar from "components/views/NavigationBar";
import Welcome from "components/views/Welcome";

const App = () => {
  return (
    <Router>
      <NavigationBar height="100" />
      <Switch>
        <Route exact path="/welcome">
          <Welcome />
        </Route>
        <Route path="/">
          <AppRouter />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
