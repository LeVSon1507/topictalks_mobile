import React, { useEffect, useState } from 'react';
import ChatContext from './ChatContext';
import { observer } from 'mobx-react';
import { io } from 'socket.io-client';
import accountStore from '../store/accountStore';
import chatStore from '../store/chatStore';
import { IMessage } from '../types';
import VideoCall from '../videocall/VideoCall';
import { ICallData, ListMesage } from '../types/chat.type';
import { View } from 'react-native';

interface ChatProviderProps {
   children: React.ReactNode;
}
var socket;
const ChatProvider: React.FC<ChatProviderProps> = observer(props => {
   const [message, setMessage] = useState<IMessage[]>([]);
   const account = accountStore?.account;
   const chat = chatStore?.selectedChat;

   //notification
   //tam thoi thong bao trc cho message
   const [notification, setNotification] = useState<IMessage[]>([]);

   //call
   const [openVideoCall, setOpenVideoCall] = useState<boolean>(false);
   const [callUser, setCallUser] = useState<ICallData>(null);
   const [receiveCallUser, setReceiveCallUser] = useState<ICallData>(null);
   const [isAccepted, setIsAccepted] = useState<boolean>(false);
   const [turnMyVideo, setTurnMyVideo] = useState<boolean>(true);
   const [turnUserVideo, setTurnUserVideo] = useState<boolean>(true);
   const [isRandoming, setIsRandoming] = useState<boolean>(false);
   const [openRandom, setOpenRandom] = useState<boolean>(false);
   const codeAccept = 'CA01410';
   const codeMissing = 'MA01410';

   const targetNameCustom =
      account?.username !== receiveCallUser?.username && receiveCallUser?.username !== undefined
         ? receiveCallUser?.username
         : callUser?.targetName;
   const targetIdCustom =
      account?.id !== receiveCallUser?.userId && receiveCallUser?.userId !== undefined
         ? receiveCallUser?.userId
         : callUser?.targetId;

   const receiveMessageDTO = {
      data: {
         message: 'reject',
      },
      targetName: targetNameCustom,
      targetId: targetIdCustom,
      timeAt: new Date().toISOString(),
      userId: account?.id,
      username: account?.username,
      conversationId: receiveCallUser?.conversationId || callUser?.conversationId,
   };
   useEffect(() => {
      if (account !== null) {
         let isMounted = true;
         socket = io(`http://localhost:8085?uid=${account.id}`);
         socket.on('sendMessage', handleReceiveMessage);
         socket.on('1V1CommunicateVideo', (data: ICallData) => {
            const statusCall = data.data.message;
            if (statusCall === 'reject') {
               setCallUser(null);
               setReceiveCallUser(null);
               setIsAccepted(false);
               setOpenVideoCall(false);
               setTurnMyVideo(true);
               setTurnUserVideo(true);
            } else if (statusCall === 'accept') {
               setIsAccepted(true);
               setReceiveCallUser(data);
            } else if (statusCall === 'call') {
               setReceiveCallUser(data);
               setOpenVideoCall(true);
               setTurnMyVideo(false);
               setTurnUserVideo(false);
            } else if (statusCall === 'turnVideo') {
               setTurnUserVideo(prevTurnUserVideo => !prevTurnUserVideo);
            } else {
               setReceiveCallUser(data);
               setOpenVideoCall(true);
            }
         });
         socket.on('partiAccess', (data: ListMesage) => {
            if (isMounted && data !== null) {
               setTimeout(() => {
                  const isMatch = chatStore?.chats.some(
                     item => item.conversationInfor.id !== data.conversationInfor.id
                  );
                  const isNewConversation = chatStore?.chats.length === 0 || isMatch;
                  if (isNewConversation) {
                     setIsRandoming(false);
                     chatStore?.setSelectedChat(data);
                     alert('You access random chat succesfully');
                     chatStore?.setChats([data, ...chatStore?.chats]);
                     setOpenRandom(false);
                  }
               }, 2000);
            }
         });
         return () => {
            isMounted = false;
            socket.disconnect();
         };
      }
   }, [chat, account]);

   const handleReceiveMessage = (receiveMessageDTO: IMessage) => {
      if (chat?.conversationInfor.id === receiveMessageDTO.conversationId) {
         setMessage(prevMessages => [...prevMessages, receiveMessageDTO]);
      } else {
         setNotification(prevNotification => [...prevNotification, receiveMessageDTO]);
      }
   };

   const handleLeaveCall = () => {
      setCallUser(null);
      setReceiveCallUser(null);
      socket.emit('1V1CommunicateVideo', receiveMessageDTO);
      setIsAccepted(false);
      setOpenVideoCall(false);
      setTurnMyVideo(true);
      setTurnUserVideo(true);
   };

   const acceptCall = () => {
      const acceptData = {
         ...receiveMessageDTO,
         data: {
            message: 'accept',
         },
      };
      setIsAccepted(true);
      socket.emit('1V1CommunicateVideo', acceptData);
   };

   const handleTurnVideo = () => {
      const turnVideoData = {
         ...receiveMessageDTO,
         data: {
            message: 'turnVideo',
         },
      };
      setTurnMyVideo(!turnMyVideo);
      socket.emit('1V1CommunicateVideo', turnVideoData);
   };

   const saveCall = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const receiveMessag = {
         data: {
            message: `isCall${codeAccept} ${!isAccepted && codeMissing},  ${
               seconds > 60 ? `${minutes} minutes` : `${seconds} seconds`
            }`,
         },
         TargetId: targetIdCustom,
         userId: account.id,
         conversationId: receiveCallUser?.conversationId || callUser?.conversationId,
      };
      const stateMessage = {
         data: {
            message: `isCall${codeAccept} ${!isAccepted && codeMissing}, ${
               seconds > 60 ? `${minutes} minutes` : `${seconds} seconds`
            }`,
         },
         username: account.username,
         userId: account.id,
         timeAt: new Date().toISOString(),
         conversationId: receiveCallUser?.conversationId || callUser?.conversationId,
      };
      socket.emit('sendMessage', receiveMessag);
      if (stateMessage?.conversationId === chat?.conversationInfor?.id) {
         setMessage((prevMessages: IMessage[]) => [...prevMessages, stateMessage]);
      }
   };

   return (
      <View>
         <ChatContext.Provider
            value={{
               message,
               setMessage,
               socket,
               setCallUser,
               setOpenVideoCall,
               notification,
               setNotification,
               setTurnMyVideo,
               setTurnUserVideo,
               isRandoming,
               setIsRandoming,
               openRandom,
               setOpenRandom,
            }}
         >
            {props.children}
            {openVideoCall && (
               <VideoCall
                  open={openVideoCall}
                  onLeaveCall={handleLeaveCall}
                  callUser={callUser}
                  receiveCallUser={receiveCallUser}
                  acceptCall={acceptCall}
                  isAccepted={isAccepted}
                  saveCall={saveCall}
                  handleTurnVideo={handleTurnVideo}
                  turnMyVideo={turnMyVideo}
                  turnUserVideo={turnUserVideo}
               />
            )}
         </ChatContext.Provider>
      </View>
   );
});

export default ChatProvider;