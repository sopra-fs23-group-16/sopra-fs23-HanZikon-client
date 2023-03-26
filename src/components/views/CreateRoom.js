import { websocket } from 'helpers/api';
import BaseContainer from "components/ui/BaseContainer";
import React, { useEffect } from 'react'

const CreateRoom = () => {

    return (
        <BaseContainer className="room container">
            <h2>Welcome to Game Room X!</h2>
            <p className="room paragraph">
                Click to invite friends to play:
            </p>
        </BaseContainer>
    );
}

export default CreateRoom;