import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import moment from 'moment'
import { not } from 'react-native-reanimated';

export default class NotificationScreen extends Component{

    constructor(){
        super()
        this.state = {
          scheduleList : [],
          userId : firebase.auth().currentUser.email,
          notifications:[]
        }
      this.scheduleRef= null
      }
    
      getScheduleList =()=>{
        this.scheduleRef = db.collection("schedules").where("emailId", "==", this.state.userId)
        .onSnapshot((snapshot)=>{
          var scheduleList = snapshot.docs.map(document => document.data());

          
         console.log(scheduleList)

         var currentDate = moment().format("DD/MM/YYYY");
         var start = currentDate.substring(6)+','+currentDate.substring(3,5)+','+currentDate.substring(0,2);
         
         var notifications = []

         scheduleList.map((item)=>{
    
            console.log(item.endDate);
            var end = item.endDate.substring(6)+','+item.endDate.substring(3,5)+','+item.endDate.substring(0,2);
            item.daysLeft = moment(end).diff(start, 'days');
            if(item.daysLeft === 1){
                notifications.push(item)
            }

         })

         this.setState({
           notifications:notifications
          });
          console.log(this.state.scheduleList);

        })
      }
    
      componentDidMount(){
        this.getScheduleList()
      }
    
      componentWillUnmount(){
        this.scheduleRef();
      }



      keyExtractor = (item, index) => index.toString()

      renderItem = ( {item, i} ) =>{
        return (
          <ListItem key = {i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>
                    {item.taskName}
                </ListItem.Title>
                <ListItem.Subtitle>
                    {"Sheduled on "+item.endDate}
                </ListItem.Subtitle>
                <Text style = {{fontSize : 15, color : 'grey'}}>{'One day is left for '+ item.taskName}</Text>
            </ListItem.Content>
          </ListItem>
        )
      }
    
      render(){
        return(
          <View style={{flex:1}}>
            <MyHeader title="Notifications " navigation ={this.props.navigation}/>
            <View style={{flex:1}}>
              {
                this.state.notifications.length === 0
                ?(
                  <View style={styles.subContainer}>
                    <Text style={{ fontSize: 20}}>List Of All Notifications</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.notifications}
                    renderItem={this.renderItem}
                  />
                )
              }
            </View>
          </View>
        )
      }
    }
    
    const styles = StyleSheet.create({
      subContainer:{
        flex:1,
        fontSize: 20,
        justifyContent:'center',
        alignItems:'center'
      },
      button:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8
         }
      }
    })
    