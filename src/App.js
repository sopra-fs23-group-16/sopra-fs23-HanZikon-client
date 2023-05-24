import React from "react";
import AppRouter from "components/routing/routers/AppRouter";
import NavigationBar from "components/views/NavigationBar";
import Welcome from "components/views/Welcome";

const App = () => {
  const isWelcomePage = window.location.pathname === "/welcome";

  if (isWelcomePage) {
    return <Welcome />;
  } else {
    return (
      <div>
        <NavigationBar height="100" />
        <AppRouter />
      </div>
    );
  }
};

export default App;
