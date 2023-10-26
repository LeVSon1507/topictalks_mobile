import { StyleSheet, Text, Image, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import accountStore from '../../../../store/accountStore';
import HeaderBar, { avatarUrlDemo } from '../../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import { IPost } from '../../../../utils';
import dayjs from 'dayjs';
import { fakePostData } from '../Post/data';
import { RouteProp, useRoute } from '@react-navigation/native';

const tabs = ['Community Post', 'Friends Post', 'My Post'];

type ParamList = {
   PostDetail: {
      postData: IPost;
   };
};

const PostDetailScreen = observer(({}) => {
   const route = useRoute<RouteProp<ParamList, 'PostDetail'>>();

   const { postData } = route.params || {};

   const account = accountStore.account;

   const [tabView, setTabView] = useState(0);

   const handleChangeTab = tab => {
      setTabView(tab);
   };

   const renderItem = (item: IPost) => {
      return (
         tabView === 0 && (
            <View style={styles.contentContainer}>
               <View style={styles.itemContainer}>
                  <View style={styles.postHeaderWrap}>
                     <View style={styles.userNameWrap}>
                        <Image
                           source={{ uri: item?.avatar_url || avatarUrlDemo }}
                           alt='avatar'
                           style={[styles.imageUserStyle, { borderRadius: 50 }]}
                        />
                        <Text style={styles.userName}>{item?.username}</Text>
                     </View>
                     <Text style={styles.createTime}>
                        {dayjs(item?.created_at)?.format('DD/MM/YYYY')}
                     </Text>
                  </View>
                  <View style={styles.itemPostWrap}>
                     <View style={styles.itemPostImageWrap}>
                        <Image
                           style={styles.imagePost}
                           source={{
                              uri: item?.img_url,
                           }}
                        />
                     </View>
                     <Ionicons name={'heart-outline'} size={25} />
                     <Ionicons name={'chatbubbles-outline'} size={25} />
                     <Ionicons name={'share-social-outline'} size={25} />
                     <Ionicons name={'arrow-redo-outline'} size={25} />
                     <Text style={styles.itemTitle}>{item?.title}</Text>
                     <Text style={styles.itemContent}>{item?.content}</Text>
                  </View>
               </View>
            </View>
         )
      );
   };

   return (
      <View style={styles.container}>
         <HeaderBar account={account} />
         <View style={{ backgroundColor: 'black', height: 20 }}></View>

         <TouchableOpacity style={styles.titleWrap}>
            <Ionicons name={'planet'} size={35} />
            <Text style={styles.title}>Post Detail</Text>
         </TouchableOpacity>
         {/* Post Content */}
         {renderItem(postData)}
         <ScrollView style={styles.contentWrap}></ScrollView>
      </View>
   );
});

export default PostDetailScreen;

const styles = StyleSheet.create({
   postHeaderWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
   },
   userNameWrap: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   createTime: { fontSize: 12, fontWeight: '600' },
   userName: {
      backgroundColor: '#C67C4E',
      color: 'white',
      marginRight: 8,
      borderRadius: 16,
      fontStyle: 'italic',
      fontWeight: 'bold',
      padding: 8,
      marginLeft: 8,
      fontSize: 12,
   },
   imageUserStyle: {
      width: 25,
      paddingLeft: 5,
      height: 25,
      zIndex: 1,
      backgroundColor: 'white',
      borderRadius: 8,
   },
   //=======item=========
   itemContainer: {
      padding: 12,
   },
   imageAvaPost: {
      borderRadius: 50,
      width: 50,
      height: 50,
   },
   itemPostImageWrap: {
      backgroundColor: '#fffff2',
      padding: 10,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
   },
   itemPostWrap: {
      width: '100%',
   },
   itemTitle: {
      paddingTop: 8,
      fontSize: 12,
      fontWeight: '600',
   },
   itemContent: {
      fontSize: 14,
      fontWeight: '400',
   },
   imagePost: {
      width: '80%',
      borderTopRightRadius: 32,
      borderBottomLeftRadius: 32,
      height: 150,
   },
   //============
   container: {
      flex: 1,
   },
   tabViewWrap: {
      flexDirection: 'row',
      justifyContent: 'center',
   },
   tabWrap: {
      backgroundColor: '#313131',
      padding: 16,
      margin: 8,
      borderRadius: 12,
   },
   tabText: {
      color: 'white',
      fontWeight: '600',
   },
   titleWrap: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // borderWidth: 1,
   },
   title: {
      color: 'black',
      paddingLeft: 16,
      fontSize: 24,
      fontWeight: 'bold',
   },
   contentContainer: {
      paddingHorizontal: 8,
      justifyContent: 'center',
   },
   contentWrap: {
      backgroundColor: 'white',
   },
});
