import { StyleSheet, Text, Image, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import accountStore from '../../../../store/accountStore';
import HeaderBar from '../../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import { fakePostData } from './data';
import { AVATAR_FAKE, IPost, createAxios, getDataAPI } from '../../../../utils';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import friendStore from '../../../../store/friendStore';
import uiStore from '../../../../store/uiStore';
import postItemStore from '../../../../store/postStore';

const tabs = [
   {
      iconName: 'chatbox-outline',
      name: 'Community Post',
   },
   {
      iconName: 'person-outline',
      name: 'Friends Post',
   },
   {
      iconName: 'people-outline',
      name: 'My Post',
   },
];
interface PostProps {
   posts?: IPost[];
   handleDetailPost: (id: number) => void;
}

const PostScreen = observer((props: PostProps) => {
   const { handleDetailPost } = props;
   const [postsDT, setPostDT] = useState([]);

   const posts = postItemStore?.posts;
   const account = accountStore?.account;
   const setAccount = () => {
      return accountStore?.setAccount;
   };

   const accountJwt = account;
   const axiosJWT = createAxios(accountJwt, setAccount);

   //TODO: post by topic
   // useEffect(() => {
   //    uiStore?.setLoading(true);
   //    getDataAPI(
   //       `${
   //          selectTopic === 0
   //             ? `post/all-posts/is-approved=${true}`
   //             : `/post/all-posts/tpid=${selectTopic}`
   //       }`,
   //       account.access_token,
   //       axiosJWT
   //    )
   //       .then(res => {
   //          postItemStore?.setPosts(res.data.data);
   //          uiStore?.setLoading(false);
   //       })
   //       .catch(err => {
   //          console.log(err);
   //       });
   // }, [selectTopic]);

   useEffect(() => {
      uiStore?.setLoading(true);
      getDataAPI(`${`post/all-posts/is-approved=${true}`}`, account.access_token, axiosJWT)
         .then(res => {
            postItemStore?.setPosts(res.data.data);
            setPostDT(res.data.data);
            uiStore?.setLoading(false);
         })
         .catch(err => {
            console.log(err);
         });
   }, []);

   const navigation = useNavigation();

   const postApproves = postsDT?.filter(item => {
      const isFriend = friendStore?.friends?.some(
         friend =>
            (friend.friendId === item?.author_id || friend?.userid === item?.author_id) &&
            friend?.accept
      );
      return (
         item?.status === 1 ||
         (item?.status === 2 && isFriend) ||
         accountStore?.account.id === item?.author_id
      );
   });

   const [tabView, setTabView] = useState(0);

   const handleChangeTab = tab => {
      setTabView(tab);
   };

   const goToPostDetail = (item: IPost): void => {
      // @ts-ignore: Unreachable code error
      navigation.navigate('PostDetail', { postData: item });
   };

   const renderItem = (item: IPost) => {
      return (
         tabView === 0 && (
            <View style={styles.contentContainer}>
               <View style={styles.itemContainer}>
                  <View style={styles.postHeaderWrap}>
                     <View style={styles.userNameWrap}>
                        <Image
                           source={{ uri: item?.avatar_url || AVATAR_FAKE }}
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
                     <TouchableOpacity
                        onPress={() => goToPostDetail(item)}
                        style={styles.itemPostImageWrap}
                     >
                        <Image
                           style={styles.imagePost}
                           source={{
                              uri: item?.img_url,
                           }}
                        />
                     </TouchableOpacity>

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
         <View style={styles.tabViewWrap}>
            {tabs.map((tab, index) => (
               <TouchableOpacity
                  key={index}
                  style={[styles.tabWrap, tabView === index && { backgroundColor: '#C67C4E' }]}
                  onPress={() => handleChangeTab(index)}
               >
                  <Ionicons name={tab.iconName} size={16} color={'white'} />
                  <Text style={styles.tabText}>{tab.name}</Text>
               </TouchableOpacity>
            ))}
         </View>
         <TouchableOpacity style={styles.titleWrap}>
            <Ionicons name={'planet'} size={35} />
            <Text style={styles.title}>Post</Text>
         </TouchableOpacity>
         {/* Post Content */}
         <FlatList
            data={postsDT}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={item => item?.username}
         />
         {/* <ScrollView style={styles.contentWrap}></ScrollView> */}
      </View>
   );
});

export default PostScreen;

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
      flexDirection: 'row',
      paddingVertical: 16,
      paddingHorizontal: 6,
      justifyContent: 'center',
      marginVertical: 8,
      marginHorizontal: 4,
      borderRadius: 12,
   },
   tabText: {
      color: 'white',
      paddingLeft: 4,
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
