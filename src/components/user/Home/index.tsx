import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserHome from './HomePage';
import Topic from './Topic';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Message from './Message';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
   return (
      <Tab.Navigator
         screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
               let iconName;

               if (route.name === 'Message') {
                  iconName = focused ? 'chatbubble-ellipses' : 'chatbubble';
               } else if (route.name === 'Topic') {
                  iconName = focused ? 'ios-list' : 'ios-list-outline';
               } else if (route.name === 'Profile') {
                  iconName = focused ? 'people-circle-outline' : 'people-circle';
               } else if (route.name === 'Post') {
                  iconName = focused ? 'planet' : 'planet';
               } else if (route.name === 'Group') {
                  iconName = focused ? 'people-outline' : 'people-circle-outline';
               }
               // You can return any component that you like here!
               return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
         })}
      >
         <Tab.Screen name='Message' component={Message} />
         <Tab.Screen name='Topic' component={Topic} />
         <Tab.Screen name='Post' component={UserHome} />
         <Tab.Screen name='Group' component={UserHome} />
         <Tab.Screen name='Profile' component={UserHome} />
      </Tab.Navigator>
   );
};

export default HomeScreen;

const styles = StyleSheet.create({});
