import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import {SecondaryButton} from 'components/ui/SecondaryButton';
import {useHistory, useParams} from 'react-router-dom';
import 'styles/views/Inspect.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import dog from "image/dog.png";
import cat from "image/cat.jpg";
import seelion from "image/seelion.jpg";
import owl from "image/owl.jpg";
import cattle from "image/cattle.jpg";
import dogandmice from "image/dogandmice.jpg";
import alpaca from "image/alpaca.jpg";
import seelionface from "image/seelionface.jpg";
import chimpanzee from "image/chimpanzee.jpg";
import panda from "image/panda.jpg";

const FormField = props => {
	return (
		<div className="inspect field">
			<label className="inspect label">
				{props.label}
			</label>
			<input type="text" disabled
				className="inspect input"
				value={props.value}
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
	const [userIcon, setUserIcon] = useState(null);
    let {userID} = useParams();

    useEffect(() => {
		
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/users/' + userID);
                await new Promise(resolve => setTimeout(resolve, 1000));
                setUser(response.data);
				if (response.data.icon === "dog") {
					setUserIcon(dog);
				} else if (response.data.icon === "cat") {
					setUserIcon(cat);
				} else if (response.data.icon === "seelion") {
					setUserIcon(seelion);
				} else if (response.data.icon === "cattle") {
					setUserIcon(cattle);
				} else if (response.data.icon === "owl") {
					setUserIcon(owl);
				} else if (response.data.icon === "panda") {
					setUserIcon(panda);
				} else if (response.data.icon === "seelionface") {
					setUserIcon(seelionface);
				} else if (response.data.icon === "dogandmice") {
					setUserIcon(dogandmice);
				} else if (response.data.icon === "chimpanzee") {
					setUserIcon(chimpanzee);
				} else if (response.data.icon === "alpaca") {
					setUserIcon(alpaca);
				}
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
				if(error.response.status === 400) {
					alert("Please register or login your account first! ");
				} else {
					alert("Something went wrong while fetching the users! See the console for details.");
				}
            }
        }

        fetchData();
    }, []);
	
	return user && (
		<BaseContainer>
		<div className="inspect container">
		<div className="inspect label-title">My Profile </div>
			<div className="inspect form-box">
				<div className="inspect icon">
					<img src={userIcon} style={{ width: '50px', height: '50px', display: 'block', margin: 'auto' }} />
				</div>
                <FormField
                    label="username"
                    value={user.username}
                />
				<div className="inspect button-container">
					<PrimaryButton
						width="100%"
						onClick={() => history.push(`/users/${userID}/edit`)}>
						Edit
					</PrimaryButton>
				</div>
				<div className="inspect button-container">
					<SecondaryButton
						width="100%"
						onClick={() => history.push('/room/lobby')}>
						Back to Lobby
					</SecondaryButton>
				</div>
			</div>
		</div>
		</BaseContainer>
	);
}

export default Inspect;
