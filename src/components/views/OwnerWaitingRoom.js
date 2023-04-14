import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/OwnerWaitingRoom.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { useParams } from 'react-router-dom';
import dog from 'image/dog.png';
/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormFieldUsername = props => {
	return (
		<div className="login field">
			<label className="login label">
				{props.label}
			</label>
			<input
				className="login input"
				placeholder="Enter your username here"
				value={props.value}
				onChange={e => props.onChange(e.target.value)}
			/>
		</div>
	);
};

FormFieldUsername.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func
};


const OwnerWaitingRoom = props => {
	const history = useHistory();  
    const {roomId} = useParams();
	

	return (
		<BaseContainer>
			<div  className="ownerwaiting container">
			<div className="ownerwaiting col">
					<div className="ownerwaiting card">
    					<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto' }} />
					</div>
					<div className="ownerwaiting label">&#x274C; player1 </div>
					<div className="ownerwaiting card">
						<img src={dog} alt="player1" style={{ width: '80%', height: 'auto', display: 'block', margin: 'auto'  }} />
					</div>
					<div className="ownerwaiting label">&#x2705; player2 </div>
					<div className="ownerwaiting card">
					</div>
					<div className="ownerwaiting label">&#x2705; player3</div>
					<div className="ownerwaiting card">
					</div>
					<div className="ownerwaiting label">&#x2705; player4</div>
					<div className="ownerwaiting card">
					</div>
					<div className="ownerwaiting label">&#x2705; player5</div>
				</div>
				<div className="ownerwaiting col">
				<div className="ownerwaiting form">
					<center>
					<div className="ownerwaiting button-container">
				<Button
					width="15%"
					//onClick={() => }
					>
					Start Game
				</Button>
				</div>
				</center>
				</div>
			</div>
			<div className="ownerwaiting col">
					<div className="ownerwaiting card-rule">
						Game Rule
					</div>
				</div>
			</div>

				
		</BaseContainer>
	);
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default OwnerWaitingRoom;