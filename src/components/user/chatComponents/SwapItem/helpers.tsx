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

export const renderItemGroupChat = (
   { item, index },
   isGroupChat,
   setSelectedChat,
   isActive,
   getGroupName
) => {
   return (
      <Box>
         {isGroupChat(item) ? (
            <Pressable
               onPress={() => setSelectedChat(item)}
               _dark={{
                  bg: 'coolGray.800',
               }}
               _light={{
                  bg: '#f2f2f2',
               }}
            >
               <Box pl='4' pr='5' py='2'>
                  <HStack alignItems='center' space={3}>
                     <Avatar
                        size='48px'
                        source={{
                           uri: 'https://media.istockphoto.com/id/943348520/vector/silhouette-icon-group-chat.jpg?s=1024x1024&w=is&k=20&c=IjWuVXOZp6fqGq3EM5ULZ5lbdoURWpr8N9OT6KgOtnA=',
                        }}
                     />
                     <VStack>
                        <Text
                           color='coolGray.800'
                           _dark={{
                              color: 'warmGray.50',
                           }}
                           bold
                        >
                           {getGroupName(item)}
                        </Text>
                        <Text
                           color='coolGray.600'
                           _dark={{
                              color: 'warmGray.200',
                           }}
                           maxW={150}
                        >
                           {item?.conversationInfor?.topicChildren?.topicChildrenName}
                        </Text>
                     </VStack>
                     <Spacer />

                     <VStack>
                        <Text
                           fontSize='xs'
                           color='coolGray.800'
                           _dark={{
                              color: 'warmGray.50',
                           }}
                           alignSelf='flex-start'
                        >
                           {isActive(item) ? (
                              <Ionicons size={30} name={'happy-outline'} color={'green'} />
                           ) : (
                              <Ionicons size={30} name={'happy-outline'} color={'red'} />
                           )}
                        </Text>
                     </VStack>
                     <Text
                        fontSize='xs'
                        color='coolGray.800'
                        _dark={{
                           color: 'warmGray.50',
                        }}
                        alignSelf='flex-start'
                     >
                        {'00:00'}
                     </Text>
                  </HStack>
               </Box>
            </Pressable>
         ) : (
            <></>
         )}
      </Box>
   );
};

export const renderItemMessage = (
   { item, index },
   isGroupChat,
   setSelectedChat,
   isActive,
   imageUser,
   partnerName
) => {
   return (
      <Box>
         {!isGroupChat(item) && item?.partnerName && (
            <Pressable
               onPress={() => setSelectedChat(item)}
               _dark={{
                  bg: 'coolGray.800',
               }}
               _light={{
                  bg: '#f2f2f2',
               }}
            >
               <Box pl='4' pr='5' py='2'>
                  <HStack alignItems='center' space={3}>
                     <Avatar
                        size='48px'
                        source={{
                           uri: imageUser(item?.partnerDTO),
                        }}
                     />
                     <VStack>
                        <Text
                           color='coolGray.800'
                           _dark={{
                              color: 'warmGray.50',
                           }}
                           bold
                        >
                           {partnerName(item?.partnerDTO)}
                        </Text>
                        <Text
                           color='coolGray.600'
                           _dark={{
                              color: 'warmGray.200',
                           }}
                        >
                           {'recentText'}
                        </Text>
                     </VStack>
                     <Spacer />

                     <VStack>
                        <Text
                           fontSize='xs'
                           color='coolGray.800'
                           _dark={{
                              color: 'warmGray.50',
                           }}
                           alignSelf='flex-start'
                        >
                           {isActive(item) ? (
                              <Ionicons size={30} name={'happy-outline'} color={'green'} />
                           ) : (
                              <Ionicons size={30} name={'happy-outline'} color={'red'} />
                           )}
                        </Text>
                     </VStack>
                     <Text
                        fontSize='xs'
                        color='coolGray.800'
                        _dark={{
                           color: 'warmGray.50',
                        }}
                        alignSelf='flex-start'
                     >
                        {'00:00'}
                     </Text>
                  </HStack>
               </Box>
            </Pressable>
         )}
      </Box>
   );
};
