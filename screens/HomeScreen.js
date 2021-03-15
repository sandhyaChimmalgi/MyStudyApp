import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import moment from 'moment'

export default class BookDonateScreen extends Component{
  constructor(){
    super()
    this.state = {
      scheduleList : [],
      userId : firebase.auth().currentUser.email,
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
     

     scheduleList.map((item)=>{

        console.log(item.endDate);
        var end = item.endDate.substring(6)+','+item.endDate.substring(3,5)+','+item.endDate.substring(0,2);
        item.daysLeft = moment(end).diff(start, 'days');

     })

     this.setState({
        scheduleList :scheduleList
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
            <Text style = {{fontSize : 15, color : 'grey'}}>{item.daysLeft+' day(s) left for this task'}</Text>
        </ListItem.Content>
      </ListItem>
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="My Schedules" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.scheduleList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Schedules</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.scheduleList}
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
