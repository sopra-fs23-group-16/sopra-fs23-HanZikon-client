import React from 'react';
import 'styles/ui/PlayerCard.scss';

const PlayerCard = props => {
    return (
        <div className="playerCard card">
            <div className="playerCard icon-container">
                <img className="playerCard icon-image" src={props.src} alt="icon" />
                {props.waiting && (
                    <div className="playerCard status">
                        {props.ready ? (
                            <span>&#x2705;</span>
                        ) : (
                            <span>&#x274C;</span>
                        )}
                    </div>
                )}
            </div>
            <div className="playerCard label" onClick={() => props.onClick()}>
                {props.host && !props.isHost &&  (
                    <span>&#x1F6AB;</span>
                )}
                {props.label}
            </div>
        </div>
    );
};

export default PlayerCard;
