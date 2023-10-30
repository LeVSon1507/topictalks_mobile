import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Card from '../helpers/Card';
import Colors from '../helpers/Colors';
import Sizes from '../helpers/Sizes';
import { Ionicons } from 'react-native-vector-icons';

export default function Bottom() {
   return (
      <View style={styles.bottomContainer}>
         <Text style={{ fontSize: 20, color: Colors.white, fontWeight: 'bold' }}>
            Profile Information
         </Text>

         <View style={styles.completeContainer}>
            <Card
               icon={<Ionicons name='albums-outline' size={24} color={Colors.primary} />}
               cardTextOne='02 Topic Select'
               cardText='Topic'
               style={{ backgroundColor: Colors.primary }}
            />
            <Card
               icon={<Ionicons name='planet-outline' size={24} color={Colors.secondary} />}
               cardTextOne='04 Posts'
               cardText='My Posts'
               style={{ backgroundColor: Colors.secondary }}
            />
         </View>

         <View style={styles.bottomSection}>
            {/* <Text style={styles.bottomSectionText}>Buy Pro $23.49</Text> */}
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   bottomContainer: {
      marginTop: Sizes.medium,
   },
   completeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: Sizes.xs,
   },
   card: {
      backgroundColor: Colors.secondary,
   },
   bottomSection: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Sizes.medium,
   },
   bottomSectionText: {
      fontWeight: 'bold',
      fontSize: Sizes.smedium,
      color: Colors.darkGray,
      borderBottomWidth: 1,
      marginBottom: 5,
      borderBottomColor: Colors.darkGray,
   },
});
