import {
   Avatar,
   Box,
   Center,
   HStack,
   Heading,
   Icon,
   Spacer,
   Text,
   VStack,
   Pressable,
   ScrollView,
} from 'native-base';
import { useState } from 'react';
import { Entypo, MaterialIcons, Ionicons } from 'react-native-vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { FakeDataListMessages } from './fakedata';
import { renderItemGroupChat, renderItemMessage } from './helpers';

export function SwapItem({
   setSelectedChat,
   isActive,
   imageUser,
   partnerName,
   listChats,
   isGroupTab,
}) {
   return (
      <Center h='100%'>
         <Box
            _dark={{
               bg: 'coolGray.800',
            }}
            _light={{
               bg: '#f2f2f2',
            }}
            flex='1'
            safeAreaTop
            w='100%'
         >
            <ScrollView showsVerticalScrollIndicator={false}>
               <Basic
                  isGroupTab={isGroupTab}
                  listChats={listChats}
                  partnerName={partnerName}
                  isActive={isActive}
                  imageUser={imageUser}
                  setSelectedChat={setSelectedChat}
               />
            </ScrollView>
         </Box>
      </Center>
   );
}

function Basic({
   setSelectedChat,
   partnerName,
   isActive,
   imageUser,
   listChats,
   isGroupTab = false,
}) {
   const data = [
      {
         id: '1',
         fullName: 'Afreen Khan',
         timeStamp: '12:47 PM',
         recentText: 'Good Day!',
         avatarUrl:
            'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
      {
         id: '2',
         fullName: 'Sujita Mathur',
         timeStamp: '11:11 PM',
         recentText: 'Cheer up, there!',
         avatarUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
      },
      {
         id: '3',
         fullName: 'Anci Barroco',
         timeStamp: '6:22 PM',
         recentText: 'Good Day!',
         avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
      },
      {
         id: '4',
         fullName: 'Aniket Kumar',
         timeStamp: '8:56 PM',
         recentText: 'All the best',
         avatarUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
      },
      {
         id: '5',
         fullName: 'Kiara',
         timeStamp: '12:47 PM',
         recentText: 'I will call today.',
         avatarUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
      },
   ];
   const [listData, setListData] = useState(FakeDataListMessages);

   const closeRow = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
         rowMap[rowKey].closeRow();
      }
   };

   const deleteRow = (rowMap, rowKey) => {
      //   closeRow(rowMap, rowKey);
      //   const newData = [...listData];
      //   const prevIndex = listData.findIndex(item => item?.id === rowKey);
      //   newData.splice(prevIndex, 1);
      //   setListData(newData);
   };

   const isGroupChat = item => item?.conversationInfor?.isGroupChat === true && isGroupTab === true;

   const getGroupName = item => item?.conversationInfor?.chatName;

   const onRowDidOpen = rowKey => {
      console.log('This row opened', rowKey);
   };

   const renderHiddenItem = (data, rowMap) => (
      <HStack flex='1' pl='2'>
         <Pressable
            w='70'
            ml='auto'
            bg='coolGray.200'
            justifyContent='center'
            onPress={() => closeRow(rowMap, data.item.key)}
            _pressed={{
               opacity: 0.5,
            }}
         >
            <VStack alignItems='center' space={2}>
               <Icon as={<Entypo name='dots-three-horizontal' />} size='xs' color='coolGray.800' />
               <Text fontSize='xs' fontWeight='medium' color='coolGray.800'>
                  More
               </Text>
            </VStack>
         </Pressable>
         <Pressable
            w='70'
            bg='red.500'
            justifyContent='center'
            onPress={() => deleteRow(rowMap, data.item.key)}
            _pressed={{
               opacity: 0.5,
            }}
         >
            <VStack alignItems='center' space={2}>
               <Icon as={<MaterialIcons name='delete' />} color='white' size='xs' />
               <Text color='white' fontSize='xs' fontWeight='medium'>
                  Delete
               </Text>
            </VStack>
         </Pressable>
      </HStack>
   );

   return (
      <Box bg='#f2f2f2' safeArea flex='1'>
         <SwipeListView
            data={listChats}
            renderItem={({ item, index }) =>
               isGroupTab
                  ? renderItemGroupChat(
                       { item, index },
                       isGroupChat,
                       setSelectedChat,
                       isActive,
                       getGroupName
                    )
                  : renderItemMessage(
                       { item, index },
                       isGroupChat,
                       setSelectedChat,
                       isActive,
                       imageUser,
                       partnerName
                    )
            }
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-130}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
         />
      </Box>
   );
}
