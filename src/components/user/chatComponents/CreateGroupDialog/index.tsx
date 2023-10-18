import React, { useEffect, useState } from 'react';
import {
   View,
   Text,
   Button,
   TextInput,
   TouchableOpacity,
   ScrollView,
   StyleSheet,
} from 'react-native';
import uiStore from '../../../../store/uiStore';
import accountStore from '../../../../store/accountStore';
import { createAxios, postDataAPI } from '../../../../utils';
import chatStore from '../../../../store/chatStore';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const CreateGroupDialog = observer(props => {
   const { open, onClose } = props;
   const route = useRoute();
   const navigate = useNavigation();

   const [inputName, setInputName] = useState('');
   const [selectTopic, setSelectTopic] = useState(1);
   const [listTopic, setListTopic] = useState([]);
   const [topicChild, setTopicChild] = useState([]);
   const [selected, setSelected] = useState(null);

   const account = accountStore?.account;

   const setAccount = () => {
      return accountStore?.setAccount;
   };

   const accountJwt = account;
   const axiosJWT = createAxios(accountJwt, setAccount);

   const handleSelect = topicChild => {
      if (selected?.id === topicChild.id) {
         setSelected(null);
      } else {
         setSelected(topicChild);
      }
   };

   const createGroupChat = () => {
      if (inputName !== '' && selected) {
         uiStore?.setLoading(true);
         const groupData = {
            chatName: inputName,
            topicChildrenId: selected.id,
            adminId: account.id,
         };
         postDataAPI('/participant/create-group-chat', groupData, account.access_token, axiosJWT)
            .then(res => {
               alert('Create Group Sucessfully');
               chatStore?.setChats([res.data.data, ...chatStore?.chats]);
               route.name !== '/Message' && navigate.navigate('/Message' as never);
               route.name !== '/message'
                  ? setTimeout(() => {
                       chatStore.setSelectedChat(res.data.data);
                       uiStore?.setLoading(false);
                    }, 600)
                  : chatStore.setSelectedChat(res.data.data);
               route.name === '/message' && uiStore?.setLoading(false);
               onClose();
            })
            .catch(err => {
               console.log(err);
            });
      }
   };

   const CustomPicker = ({ selectedValue, onValueChange, listItems }) => {
      return (
         <View style={styles.pickerContainer}>
            {listItems.map(item => (
               <TouchableOpacity
                  key={item.id}
                  style={[
                     styles.pickerItem,
                     { backgroundColor: selectedValue === item.id ? '#abcdef' : '#ffffff' },
                  ]}
                  onPress={() => onValueChange(item.id)}
               >
                  <Text style={styles.pickerText}>{item.topicParentName}</Text>
               </TouchableOpacity>
            ))}
         </View>
      );
   };
   return open ? (
      <>
         <View style={styles.createGroupDialog}>
            <View style={styles.dialogTitle}>
               <Text style={styles.titleText}>CREATE GROUP CHAT</Text>
               <Text>New Conversation</Text>
            </View>
            <ScrollView style={styles.dialogContent}>
               <View style={styles.chatNameBox}>
                  <Text>Chat Name:</Text>
                  <TextInput
                     style={styles.input}
                     placeholder='Enter Chat Name'
                     value={inputName}
                     onChangeText={text => setInputName(text)}
                  />
               </View>
               <View style={styles.topicBox}>
                  <CustomPicker
                     selectedValue={selectTopic}
                     onValueChange={itemValue => setSelectTopic(itemValue)}
                     listItems={listTopic}
                  />
                  <ScrollView style={styles.topicChild}>
                     {topicChild.length > 0 &&
                        topicChild?.map(item => (
                           <TouchableOpacity
                              key={item.id}
                              style={[
                                 styles.topicItem,
                                 {
                                    backgroundColor:
                                       selected?.id === item.id ? '#abcdef' : '#798899',
                                 },
                              ]}
                              onPress={() => handleSelect(item)}
                           >
                              <Text style={styles.topicText}>{item.topicChildrenName}</Text>
                           </TouchableOpacity>
                        ))}
                  </ScrollView>
               </View>
            </ScrollView>
            <View style={styles.dialogAction}>
               <Button title='Cancel' onPress={props.onClose} />
               <Button title='Submit' onPress={createGroupChat} />
            </View>
         </View>
      </>
   ) : (
      <></>
   );
});

const styles = StyleSheet.create({
   createGroupDialog: {
      flex: 1,
      backgroundColor: '#e1e1e1',
      padding: 20,
   },
   dialogTitle: {
      alignItems: 'center',
      marginBottom: 20,
   },
   titleText: {
      fontSize: 24,
      fontWeight: 'bold',
   },
   dialogContent: {
      flex: 1,
   },
   chatNameBox: {
      marginBottom: 20,
   },
   input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 10,
   },
   topicBox: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   picker: {
      height: 40,
      width: 100,
      borderColor: 'gray',
      borderWidth: 1,
      marginRight: 10,
   },
   topicChild: {
      flex: 1,
   },
   dialogAction: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
   },
   topicItem: {
      padding: 10,
      margin: 5,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
   },
   topicText: {
      color: '#fff',
   },
   pickerContainer: {
      flexDirection: 'row',
      borderColor: 'gray',
      borderWidth: 1,
      marginRight: 10,
   },
   pickerItem: {
      padding: 10,
      margin: 5,
      borderRadius: 5,
   },
   pickerText: {
      color: '#000000',
   },
});

export default CreateGroupDialog;
