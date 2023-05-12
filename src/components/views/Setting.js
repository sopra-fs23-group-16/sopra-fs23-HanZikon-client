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
import dog from 'image/dog.png';
import {fetchLocalUser} from "../../helpers/confirmLocalUser";

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
	let {userId} = useParams();
	
	const handleChangeIcon = (event) =>{
		const icon = event.target.value;
		setIcon(icon);
		localStorage.setItem('icon', icon);
		localStorage.setItem("loggedInUser", user.id);
		console.log(icon);
	};
	
	const confirm = async () => {
        let item = {username, password}
        console.warn("item", item)
        try {
            const requestBody = JSON.stringify({username, password});
            const response = await api.put('/users/' + userId, requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);
			//localStorage.setItem("loggedInUser", user.id);
            history.push(`/users/${userId}`);

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

    useEffect(() => {
		
		const localIcon = localStorage.getItem("icon");
		if (localIcon) {
			setIcon(localIcon);
		}

		// fetchLocalUser();
		
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/users/'+userId);

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
				<div className="setting field">
					<label className="setting label">
						icon
					</label>
					<select value = {icon} className="setting select" onChange = {handleChangeIcon}>
						<option value="-" selected>Please select...</option>
						<option value="cat">cat</option>
						<option value="cattle">cattle</option>
						<option value="dog">dog</option>
						<option value="seelion">seelion</option>
						<option value="owl">owl</option>
					</select>
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
                    onClick={() => history.push(`/users/${userId}`)}
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
						You could change your username and password here. (Optional)
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
