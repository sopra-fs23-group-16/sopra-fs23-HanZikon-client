import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/NormalWaitingRoom.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { useParams } from 'react-router-dom';

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


const NormalWaitingRoom = props => {
	const history = useHistory();  
    const {roomId} = useParams();
	

	return (
		<BaseContainer>
		<div  className="normalwaiting container">
			<div className="normalwaiting col">
				<div className="normalwaiting row">
					<div className="normalwaiting card">
						player1
					</div>
					<div className="normalwaiting card">
						player2
					</div>
					<div className="normalwaiting card">
						player3
					</div>
					<div className="normalwaiting card">
						player4
					</div>
				</div>
				<div className="normalwaiting form">
					<center>
					<div className="normalwaiting button-container">
				<Button
					width="15%"
					//onClick={() => }
					>
					Get Ready
				</Button>
				</div>

				</center>
				</div>
			</div>
			<div className="normalwaiting col">
					<div className="normalwaiting card-rule">
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
export default NormalWaitingRoom;