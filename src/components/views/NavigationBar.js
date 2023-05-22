// import React from "react";
// import "styles/views/NavigationBar.scss";
// import Logo from "image/logo.jpg";
// import {api} from 'helpers/api';
// import {useState} from 'react';

// const NavigationBar = () => {

// 	// const history = useHistory();
// 	// const [users, setUsers] = useState(null);
// 	// let id = localStorage.getItem("loggedInUser");

//   const logout = async () => {
//         const response = await api.get('/logout/'+localStorage.getItem("loggedInUser"));
// 		await localStorage.removeItem('token');
// 		await localStorage.removeItem("loggedInUser");
// 		window.location.href = '/login';
// 	}
    

//   return (
//     <div className="navbar container">
//       <div className="logo-container">
//         <img className="navbar logo" src={Logo} alt="logo" />
//       </div>

//       <div className="navbar button-container">
//             <div className="navbar button" onClick={() => window.location.href = "/room/lobby"}><i class="material-icons md-36 text-red">home</i></div>
//             <div className="navbar button" onClick={() => window.location.href = "/users/" + localStorage.getItem("loggedInUser")}><i class="material-icons md-36 text-red">person</i></div>
//             <div className="navbar button" onClick={() => logout()}><i class="material-icons md-36 text-red">logout</i></div>
//       </div>
//     </div>
//   );
// };


// export default NavigationBar;

import React from "react";
import "styles/views/NavigationBar.scss";
import Logo from "image/logo.jpg";
import {api} from 'helpers/api';

const NavigationBar = () => {

    const logout = async () => {
      const response = await api.get('/logout/'+localStorage.getItem("loggedInUser"));
		  await localStorage.removeItem('token');
		  await localStorage.removeItem("loggedInUser");
		  window.location.href = '/login';
	}

  return (
    <div className="navbar container">
       <div className="logo-container">
         <img className="navbar logo" src={Logo} alt="logo" />
       </div>
       <div className="navbar button-container">
            <div className="navbar button" onClick={() => window.location.href = "/welcome"}><i class="material-icons md-36 text-red">public</i></div>
             <div className="navbar button" onClick={() => window.location.href = "/room/lobby"}><i class="material-icons md-36 text-red">home</i></div>
             <div className="navbar button" onClick={() => window.location.href = "/users/" + localStorage.getItem("loggedInUser")}><i class="material-icons md-36 text-red">person</i></div>
             <div className="navbar button" onClick={() => logout()}><i class="material-icons md-36 text-red">logout</i></div>
       </div>
     </div>
  );
};

export default NavigationBar;