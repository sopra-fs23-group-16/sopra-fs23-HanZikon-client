import { websocket } from 'helpers/api';
import Stomp from 'stompjs';
import BaseContainer from "components/ui/BaseContainer";
import React, { useEffect } from 'react'

const RoomSetting = () => {

    const client = Stomp.over(websocket);

    client.connect({}, function () {
        console.log('connected to websocket');
    });

    //send to server
    //"/path",{},JSON
    /*client.send('/app/multi/create', {}, JSON.stringify({
        ownerDTO: { username: 'aaa' },
        gameParam: { level: 1, numPlayers: 4, questionType: 3 }
    }))*/
        /*.then((response) => {
            // deal with response (roomID)
            console.log(response.body);
        })

    //listen to server
    client.subscribe('/topic/room/1', function (message) {
        var newPlayerInfo = JSON.parse(message.body);
        // 在这里使用 newPlayerInfo 对象中的头像和名称信息更新 HTML 页面
    });*/

    return (
        <BaseContainer className="room container">
            <h2>Welcome to Game Room X!</h2>
            <p className="room paragraph">
                Click to invite friends to play:
            </p>
        </BaseContainer>
    );
}

export default RoomSetting;