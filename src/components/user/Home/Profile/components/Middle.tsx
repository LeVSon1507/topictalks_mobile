import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../helpers/Colors';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AVATAR_FAKE } from '../../../../../utils';

export default function Middle({ account }) {
   return (
      <View style={styles.main}>
         <View style={styles.imageContainer}>
            <Image
               style={styles.image}
               source={{
                  uri: account.url_img || AVATAR_FAKE,
               }}
            />
            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>Le V Son</Text>
            <Text style={{ fontSize: 16, color: Colors.darkGray, fontWeight: '500' }}>
               sonlvs@gmail.com
            </Text>
         </View>

         <View style={styles.middleSectionTextContainer}>
            <View style={styles.middleSectionText}>
               <Text style={styles.toptext}>Friends</Text>
               <Text style={styles.bottomtext}>28</Text>
            </View>
            <View style={styles.middleSectionText}>
               <Text style={styles.toptext}>Likes</Text>
               <Text style={styles.bottomtext}>73</Text>
            </View>
            <View style={styles.middleSectionText}>
               <Text style={styles.toptext}>Post</Text>
               <Text style={styles.bottomtext}>18</Text>
            </View>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   main: {
      marginTop: 30,
   },
   imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
   },
   image: {
      width: 150,
      height: 150,
      borderRadius: 50,
      marginBottom: 5,
   },
   middleSectionTextContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 20,
   },
   middleSectionText: {
      justifyContent: 'center',
      alignItems: 'center',
   },
   toptext: {
      fontSize: 16,
      color: Colors.white,
      fontWeight: 'bold',
   },
   bottomtext: {
      fontSize: 16,
      color: Colors.darkGray,
      fontWeight: '700',
   },
});
