import React from 'react'
import { useParams } from 'react-router-dom'
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'

const VideoRoomPage : React.FC= () => {
    const {roomId} = useParams();

    const myMeeting = async (element:any) =>{
        if (!roomId ) {
            console.log('RoomId or userInfo is undefined.');
            return;
        }
        const appID = 943120359;
      const serverSecret = "83c23c3e5c270270d243b8ddbb16b0bc";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId,  Date.now().toString() , 'Suneesh');
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: element,
        scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall, 
          },
          showScreenSharingButton:false,
        sharedLinks: [
          {
            name: 'Copy Link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomId,
          },
        ],
        
      });
    }
    return (
        <div>
            
            <div className="flex flex-col md:flex-row  ">
                

                
                        <div>
                            
                            <div ref={myMeeting} style={{ width: '100vw', height: '100vh' }}/>
                        </div>
                    
            </div>
        </div>

    )
}

export default VideoRoomPage
