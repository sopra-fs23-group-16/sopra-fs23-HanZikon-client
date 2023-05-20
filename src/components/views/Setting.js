import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory, useParams} from 'react-router-dom';
import {Spinner} from 'components/ui/Spinner';
import {PrimaryButton} from 'components/ui/PrimaryButton';
import {SecondaryButton} from 'components/ui/SecondaryButton';
import 'styles/views/Setting.scss';
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
		<div className="setting field">
		<label className="setting label">
			{props.label}
		</label>
		<input
			className="setting input"
			placeholder="Change your information:"
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

const Setting = props => {
	const history = useHistory();
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);
	const [icon, setIcon] = useState(null);
	let {userID} = useParams();
	
	const iconset = (icon) => {
		setIcon(icon);
	}
	
	const confirm = async () => {
        let item = {username, password, icon}
        console.warn("item", item)
        try {
            const requestBody = JSON.stringify({username, password, icon});
            const response = await api.put('/users/' + userID, requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);
			//localStorage.setItem("loggedInUser", user.id);
            history.push(`/users/${userID}`);

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

    useEffect(() => {
		
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/users/'+ userID);

                await new Promise(resolve => setTimeout(resolve, 1000));
                setUser(response.data);

                console.log(response);
            } catch (error) {
                console.error(`Something went wrong: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong! See the console for details.");
            }
        }
        fetchData();
    }, []);

    let content = <Spinner/>;

    if (user) {
        content = (
            <div className="">
				<label className="setting label">
					icon
				</label>
				<div className="setting icon">
					<img src={dog} style={{ width: '50px', height: '50px', display: 'block', margin: 'auto', border: icon === 'dog' ? '3px solid #B7B7B7' : 'none' }} onClick={() => {iconset("dog");}} />
					<img src={cat} style={{ width: '50px', height: '50px', display: 'block', margin: 'auto', border: icon === 'cat' ? '3px solid #B7B7B7' : 'none' }} onClick={() => {iconset("cat");}} />
					<img src={seelion} style={{ width: '50px', height: '50px', display: 'block', margin: 'auto', border: icon === 'seelion' ? '3px solid #B7B7B7' : 'none' }} onClick={() => {iconset("seelion");}} />
					<img src={owl} style={{ width: '50px', height: '50px', display: 'block', margin: 'auto', border: icon === 'owl' ? '3px solid #B7B7B7' : 'none' }} onClick={() => {iconset("owl");}} />
					<img src={cattle} style={{ width: '50px', height: '50px', display: 'block', margin: 'auto', border: icon === 'cattle' ? '3px solid #B7B7B7' : 'none' }} onClick={() => {iconset("cattle");}} />
				</div>
				<div className="setting icon">
					<img src={dogandmice} style={{ width: '50px', height: '50px', display: 'block', margin: 'auto', border: icon === 'dogandmice' ? '3px solid #B7B7B7' : 'none' }} onClick={() => {iconset("dogandmice");}} />
					<img src={chimpanzee} style={{ width: '50px', height: '50px', display: 'block', margin: 'auto', border: icon === 'chimpanzee' ? '3px solid #B7B7B7' : 'none' }} onClick={() => {iconset("chimpanzee");}} />
					<img src={seelionface} style={{ width: '50px', height: '50px', display: 'block', margin: 'auto', border: icon === 'seelionface' ? '3px solid #B7B7B7' : 'none' }} onClick={() => {iconset("seelionface");}} />
					<img src={alpaca} style={{ width: '50px', height: '50px', display: 'block', margin: 'auto', border: icon === 'alpaca' ? '3px solid #B7B7B7' : 'none' }} onClick={() => {iconset("alpaca");}} />
					<img src={panda} style={{ width: '50px', height: '50px', display: 'block', margin: 'auto', border: icon === 'panda' ? '3px solid #B7B7B7' : 'none' }} onClick={() => {iconset("panda");}} />
				</div>
                <FormField
                    label="username"
                    value={username}
                    onChange={un => setUsername(un)}
                />
                <FormField
                    label="password"
                    value={password}
                    onChange={p => setPassword(p)}
                />
				&nbsp;
                <PrimaryButton
					disabled={!icon && !username && !password}
                    width="100%"
                    onClick={() => confirm()}
                >
                    Confirm
                </PrimaryButton>
                &nbsp;
                <SecondaryButton
                    width="100%"
                    onClick={() => history.push(`/users/${userID}`)}
                >
                    Cancel
                </SecondaryButton>
            </div>
        );
    }

    return (
        <BaseContainer>
			<div className="setting container">
				<div className="">
					<p className="setting text">
						You could change your icon, username and password here. (Optional)
					</p>
					{content}
				</div>
			</div>
        </BaseContainer>
    );

};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Setting;
