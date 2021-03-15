import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import CustomSideBarMenu  from './CustomSideBarMenu';
import CreateScheduleScreen from '../screens/CreateScheduleScreen'
import {Icon} from 'react-native-elements';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/Notification'


export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : HomeScreen,
    navigationOptions:{
      drawerIcon : <Icon name="home" type ="fontawesome5" />
    }
    },
  
  
  CreateSchedule :{
    screen: CreateScheduleScreen,
    navigationOptions:{
      drawerIcon : <Icon name="gift" type ="font-awesome" />,
      drawerLabel : "Create Schedule"
    }
  },
  Notification : {
    screen: NotificationScreen,
    navigationOptions:{
      drawerIcon:<Icon name = 'bell' type = 'font-awesome'/>
    }
  }
},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
