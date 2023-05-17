import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquareXmark, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import 'styles/ui/PlayerCard.scss';

const PlayerCard = props => {
    return (
        <div className="playerCard card">
            <div className="playerCard icon-container">
                {props.waiting && (
                    <div className="playerCard status-container">
                        <FontAwesomeIcon className={props.ready ? "playerCard status-ready":"playerCard status-cancel"}
                                         icon={props.ready ? faCheckSquare:faSquareXmark} />
                    </div>
                )}
                <img className="playerCard icon-image" src={props.src} alt="icon" />
            </div>
            <div className="playerCard label-container" onClick={() => props.onClick()}>
                {props.host && !props.isHost &&  (
                    <FontAwesomeIcon className="playerCard label-kick" icon={faSquareMinus} />
                )}
                {props.label}
            </div>
        </div>
    );
};

export default PlayerCard;
