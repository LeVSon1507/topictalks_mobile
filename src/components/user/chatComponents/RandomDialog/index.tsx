import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Button } from 'react-native';
import { observer } from 'mobx-react';
import ChatContext from '../../../../context/ChatContext';
import { createAxios, getDataAPI } from '../../../../utils';
import { MaterialIcons } from '@expo/vector-icons';
import accountStore from '../../../../store/accountStore';
import CustomSelect from './Picker';

const RandomDialog = observer(props => {
   const { open, onClose } = props;
   const [selectTopic, setSelectTopic] = useState(1);
   const [listTopic, setListTopic] = useState([]);
   const [topicChild, setTopicChild] = useState([]);
   const [selected, setSelected] = useState(null);

   const account = accountStore?.account;
   const { isRandoming, setIsRandoming, socket } = useContext(ChatContext);

   const setAccount = () => {
      return accountStore?.setAccount;
   };

   const accountJwt = account;
   const axiosJWT = createAxios(accountJwt, setAccount);

   useEffect(() => {
      getDataAPI(`/topic-parent/all`, account.access_token, axiosJWT)
         .then(res => {
            setListTopic(res.data.data);
         })
         .catch(err => {
            console.log(err);
         });
   }, []);

   useEffect(() => {
      return () => {
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
      };
   }, [open]);

   useEffect(() => {
      getDataAPI(`/topic-children/topic-parent=${selectTopic}`, account.access_token, axiosJWT)
         .then(res => {
            setTopicChild(res.data.data);
            setSelected(null);
         })
         .catch(err => {
            console.log(err);
         });
   }, [selectTopic]);

   const handleSelect = topicChild => {
      if (selected?.id === topicChild.id) {
         setSelected(null);
      } else {
         setSelected(topicChild);
      }
   };

   const handleRandom = () => {
      if (selected !== null && socket) {
         setIsRandoming(true);
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
      setIsRandoming(false);
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
      <Modal animationType='slide' transparent={true} visible={open}>
         <View style={styles.centeredView}>
            <View style={styles.modalView}>
               {isRandoming ? (
                  <View style={styles.loadingContainer}>
                     <Text style={styles.modalText}>Finding...</Text>
                     <MaterialIcons name='agriculture' size={50} color='#fff' />
                  </View>
               ) : (
                  <ScrollView contentContainerStyle={styles.modalContent}>
                     <Text style={styles.modalText}>LOOKING FOR A PARTNER</Text>
                     <Text style={styles.modalText}>New Conversation</Text>
                     <View style={styles.chatNameBox}>
                        <Text>Please Choose Topic:</Text>
                     </View>
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
               )}
               <View style={styles.buttonContainer}>
                  <Button title='Cancel' onPress={handleCancel} />
                  <Button disabled={isRandoming} title='Random' onPress={handleRandom} />
               </View>
            </View>
         </View>
      </Modal>
   );
});

const styles = StyleSheet.create({
   centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
   },
   modalView: {
      margin: 20,
      backgroundColor: 'rgb(20, 27, 45)',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
   },
   loadingContainer: {
      alignItems: 'center',
   },
   modalContent: {
      alignItems: 'center',
   },
   modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: '#fff',
   },
   buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 20,
   },
   selectedTopicItem: {
      backgroundColor: 'lightblue',
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
   },
   topicItem: {
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
      color: '#fff',
      backgroundColor: '#798899',
   },
   disableButton: {
      opacity: 0.7,
   },
   topicChild: {
      maxHeight: 200,
      width: '100%',
   },
   topicBox: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 300,
   },
   selectInput: {
      maxHeight: 50,
      minWidth: 120,
      color: '#000',
      backgroundColor: '#fff',
   },
   chatNameBox: {
      alignItems: 'center',
      flexDirection: 'column',
   },
});

export default RandomDialog;
