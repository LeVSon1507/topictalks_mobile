import { ImageBackground, StyleSheet, View } from 'react-native';
import React from 'react';
import {
   AspectRatio,
   Avatar,
   Box,
   Center,
   HStack,
   Heading,
   Stack,
   VStack,
   Text,
   ScrollView,
} from 'native-base';
import Sizes from './helpers/Sizes';
import Top from './components/Top';
import Middle from './components/Middle';
import Bottom from './components/Bottom';
import { observer } from 'mobx-react';
import accountStore from '../../../../store/accountStore';

const Profile = observer(() => {
   const account = accountStore.account;
   return (
      <ScrollView>
         <ImageBackground
            style={styles.backgroundImage}
            source={require('../../../../assets/images/bg.png')}
         >
            <View style={styles.container}>
               <Top />
               <Middle account={account} />
               <Bottom />
            </View>
         </ImageBackground>
      </ScrollView>
   );
});

export default Profile;

const styles = StyleSheet.create({
   backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
   },
   container: {
      marginHorizontal: Sizes.medium,
      marginTop: Sizes.safe,
   },
});
