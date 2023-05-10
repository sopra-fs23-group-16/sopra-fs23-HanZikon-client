import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {Spinner} from 'components/ui/Spinner';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import {useHistory, useParams} from 'react-router-dom';
import 'styles/views/Inspect.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import dog from "image/dog.png";
import cat from "image/cat.jpg";
import seelion from "image/seelion.jpg";
import owl from "image/owl.jpg";
import cattle from "image/cattle.jpg";
import {fetchLocalUser} from "../../helpers/confirmLocalUser";

const FormField = props => {
	return (
		<div className="inspect field">
			<label className="inspect label">
				{props.label}
			</label>
			<input
				className="inspect input"
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

const Inspect = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
	const [icon, setIcon] = useState(localStorage.getItem("icon") || "");
	var userIcon;
	if (icon == "dog"){
		userIcon = dog;
	}
	else if (icon == "cat"){
		userIcon = cat;
	}
	else if (icon == "seelion"){
		userIcon = seelion;
	}
	else if (icon == "cattle"){
		userIcon = cattle;
	}
	else if (icon == "owl"){
		userIcon = owl;
	}
	
    let {userId} = useParams();

    useEffect(() => {

		fetchLocalUser();
		
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/users/'+userId);
                await new Promise(resolve => setTimeout(resolve, 1000));
                setUser(response.data);

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
	
	return user && (
		<BaseContainer>
		<div className="inspect container">
			<h1>My Profile</h1>
			<div className="inspect form">
					<div className="">
						
						<img src={userIcon} style={{ width: '50px', height: '50px', display: 'block', margin: 'auto' }} />
					</div>
                    <div className="user overview">
                        <FormField
                            label="username"
                            value={user.username}
                            onChange={un => setUsername(un)}
                        />
                    </div>
				<div className="inspect button-container">
					<PrimaryButton
						width="70%"
						onClick={() => history.push(`/Setting/${userId}`)}>
						Edit
					</PrimaryButton>
				</div>
				<div className="inspect button-container">
					<PrimaryButton
						width="70%"
						onClick={() => history.push('/lobby')}>
						Back to game overview
					</PrimaryButton>
				</div>
			</div>
		</div>
		</BaseContainer>
	);
}


export default Inspect;
