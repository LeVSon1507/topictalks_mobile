import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../helpers/Colors';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'native-base';

export default function Top() {
   const navigation = useNavigation();

   const handleGoBack = () => {
      navigation.navigate('Home' as never);
      Toast.show({ description: 'Không support ở web cô ơi' });
   };

   return (
      <View style={styles.icons}>
         <TouchableOpacity style={styles.back} onPress={handleGoBack}>
            <AntDesign name='arrowleft' size={24} color='white' />
         </TouchableOpacity>
         <TouchableOpacity style={styles.setting}>
            <AntDesign name='setting' size={35} color='white' />
         </TouchableOpacity>
      </View>
   );
}

const styles = StyleSheet.create({
   setting: {},
   icons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   back: {
      backgroundColor: Colors.alt,
      width: 45,
      height: 45,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
   },
});
