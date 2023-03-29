import { websocket } from 'helpers/api';
import Stomp from 'stompjs';
import BaseContainer from "components/ui/BaseContainer";
import React, { useEffect } from 'react'

const CreateRoom = () => {

    const client = Stomp.over(websocket);

    client.connect({}, function () {
        console.log('connected to websocket');
    });

    client.send('/game/create', {}, JSON.stringify({
        ownerDTO: { username: 'aaa' },
        gameParam: { level: 1, numPlayers: 4, questionType: 3 }
    }))
        .then((response) => {
            // deal with response (roomID)
            console.log(response.body);
        });

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