import React, { useEffect, useState, useContext } from 'react';
import { createAxios, getDataAPI } from '../../../../utils';
import { observer } from 'mobx-react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import ChatContext from '../../../../context/ChatContext';
import { ListTopic, TopicChild } from '../../../../types/topic.type';
import accountStore from '../../../../store/accountStore';
import CustomSelect from './Picker';

interface DialogProps {
   open: boolean;
   onClose: () => void;
}
const RandomDialog = observer((props: DialogProps) => {
   const { open, onClose } = props;
   const [selectTopic, setSelectTopic] = useState<number | ''>(1);
   const [listTopic, setListTopic] = useState<ListTopic[]>([]);
   const [topicChild, setTopicChild] = useState<TopicChild[]>([]);
   const [selected, setSelected] = useState<TopicChild>(null);

   const account = accountStore?.account;

   const { isBeingRandom, setIsBeingRandom, socket } = useContext(ChatContext);
   const setAccount = () => {
      return accountStore?.setAccount;
   };

   const accountJwt = account;
   const axiosJWT = createAxios(accountJwt, setAccount);

   useEffect(() => {
      getDataAPI(`/topic-parent/all`, account?.access_token, axiosJWT)
         .then(res => {
            setListTopic(res.data.data);
         })
         .catch(err => {
            console.log(err);
         });
   }, []);

   useEffect(() => {
      return () => {
         if (selected !== null) {
            const topicChildren = {
               userId: account.id,
               targetName: 'null',
               username: account.username,
               timeAt: new Date().toISOString(),
               targetId: account.id,
               conversationId: 0,
               data: {
                  id: selected?.id,
               },
            };
            socket.emit('onLeaveChatRandom', topicChildren);
         }
      };
   }, [open]);

   useEffect(() => {
      getDataAPI(`/topic-children/topic-parent=${selectTopic}`, account?.access_token, axiosJWT)
         .then(res => {
            setTopicChild(res.data.data);
            setSelected(null);
         })
         .catch(err => {
            console.log(err);
         });
   }, [selectTopic]);

   const handleSelect = (topicChild: TopicChild) => {
      if (selected?.id === topicChild.id) {
         setSelected(null);
      } else {
         setSelected(topicChild);
      }
   };

   const handleRandom = () => {
      if (selected !== null && socket) {
         setIsBeingRandom(true);
         const topicChildren = {
            userId: account.id,
            targetName: 'null',
            username: account.username,
            timeAt: new Date().toISOString(),
            targetId: account.id,
            conversationId: 0,
            data: {
               id: selected.id,
            },
         };
         socket.emit('onAccessChatRandom', topicChildren);
      }
   };

   const handleCancel = () => {
      setIsBeingRandom(false);
      setSelected(null);
      if (selected !== null && socket) {
         const topicChildren = {
            userId: account.id,
            targetName: 'null',
            username: account.username,
            timeAt: new Date().toISOString(),
            targetId: account.id,
            conversationId: 0,
            data: {
               id: selected?.id,
            },
         };
         socket.emit('onLeaveChatRandom', topicChildren);
      }
      onClose();
   };

   return (
      open && (
         <View style={styles.container}>
            <View style={styles.header}>
               <Text style={styles.headerText}>LOOKING FOR A PARTNER</Text>
               <Text style={styles.headerSubText}>New Conversation</Text>
            </View>
            {isBeingRandom ? (
               <View style={styles.wrapLoading}>
                  {/* <AnimatedLoader
                  overlayColor='rgba(255,255,255,0.75)'
                  animationStyle={styles.lottie}
                  speed={1}
               >
                  <Text>Loading...</Text>
               </AnimatedLoader> */}
                  {/* <AppLoading
                  startAsync={null}
                  onFinish={() => setIsBeingRandom(false)}
                  onError={console.warn}
               /> */}
                  <Text style={styles.loadingText}>Loading...</Text>
               </View>
            ) : (
               <View style={styles.content}>
                  <ScrollView contentContainerStyle={styles.modalContent}>
                     <View style={styles.topicBox}>
                        <View>
                           <CustomSelect
                              selectTopic={selectTopic}
                              setSelectTopic={setSelectTopic}
                              listTopic={listTopic}
                           />
                        </View>
                        <ScrollView style={styles.topicChild}>
                           {topicChild.map(item => (
                              <TouchableOpacity
                                 key={item.id}
                                 style={[
                                    styles.topicItem,
                                    selected?.id === item.id && styles.selectedTopicItem,
                                 ]}
                                 onPress={() => handleSelect(item)}
                              >
                                 <Text>{item.topicChildrenName}</Text>
                              </TouchableOpacity>
                           ))}
                        </ScrollView>
                     </View>
                  </ScrollView>
               </View>
            )}
         </View>
      )
   );
});

export default RandomDialog;
