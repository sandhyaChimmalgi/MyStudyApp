import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
import MyHeader from '../components/MyHeader';
import { RFValue } from "react-native-responsive-fontsize";
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment'
import db from '../config';
import firebase from 'firebase';

export default class CreateScheduleScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            date:'',
            taskName:'',
            description:'',
            calendarIsVisible:false,
            selectedStartDate:null,
            month:'',
            year:'',
            finalDate:'',
            currentDate:'',
            daysLeft:''
        }
    }
    addSchedule=()=>{
      db.collection('schedules').add({
        emailId:firebase.auth().currentUser.email,
        endDate:this.state.finalDate,
        taskName:this.state.taskName,
        description:this.state.description
      })
      this.setState({
        finalDate:'',
        taskName:'',
        description:''
      })
    }
    onDateChange=(date) =>{
    
      this.setState({
        selectedStartDate: date, 
        calendarIsVisible: false
      });
      
      var startDate =this.state.selectedStartDate ? this.state.selectedStartDate.toString() : '';
      console.log(startDate);
  
      this.state.month = startDate.substring(4,8).trim();
      console.log(this.state.month);
      this.state.year = startDate.substring(11,15);
      console.log(this.state.year);
      this.state.date = startDate.substring(8,10);
      console.log(this.state.date);
  
      var month = this.state.month;
      var monthNumber = ''
  
      switch(month){
        case 'Jan': 
          monthNumber='01'; break;
  
        case 'Feb': 
          monthNumber='02';break;
        case 'Mar': 
          monthNumber='03'; break;
  
        case 'Apr': 
          monthNumber='04';break;
        
        case 'May': 
          monthNumber='05';break;
  
        case 'Jun': 
          monthNumber='06';break;
  
        case 'July': 
          monthNumber='07';break;
  
        case 'Aug': 
          monthNumber='08';break;
  
        case 'Sep': 
          monthNumber='09';break;
  
        case 'Oct': 
          monthNumber='10';break;
  
        case 'Nov': 
          monthNumber='11';break;
          
        case 'Dec': 
          monthNumber='12';break;
  
        default:break;
      }
      console.log(monthNumber);
      var currentDate = moment().format("DD/MM/YYYY");
      var finalDate = monthNumber? (this.state.date+'/'+ monthNumber+'/'+this.state.year ): ''
  
      var start = currentDate.substring(6)+','+currentDate.substring(3,5)+','+currentDate.substring(0,2);
      var end = finalDate.substring(6)+','+finalDate.substring(3,5)+','+finalDate.substring(0,2);
      
      this.setState({ 
        finalDate: finalDate,
        currentDate: currentDate
      });
  
      var daysLeft = moment(end).diff(start, 'days');
      console.log(daysLeft);
  
      this.setState({
        daysLeft:daysLeft
      })
    }

    render(){
        return(
            <View>
                <MyHeader title = {'Create Schedule'} navigation = {this.props.navigation}/>
                <View style = {{alignItems:'center',justifyContent:'center'}}>
                    
                    <TextInput
                style={styles.formInput}
                placeholder={"Date-DD/MM/YY"}
                onChangeText={(text) => {
                  this.setState({
                    calendarIsVisible:true
                  })
                  }
                  
                }
                value = {this.state.finalDate}
              />
              <View>
                {this.state.calendarIsVisible=== true
               ?
               (
                 <CalendarPicker onDateChange = {this.onDateChange}/>
               )
               :
               
                 null
               
              }
              </View>
                
                    <TextInput
                style={styles.formInput}
                placeholder={"Task Name"}
                onChangeText={text => {
                  this.setState({
                    taskName: text
                  });
                }}
                value = {this.state.taskName}
              />
                    
                    <TextInput
                style={[styles.formInput,{height:50}]}
                placeholder={"Description(Optional)"}
                multiline = {true}
                onChangeText={text => {
                  this.setState({
                    description: text
                  });
                }}
                value = {this.state.description}
              />
                <TouchableOpacity style={styles.registerButton} onPress = {()=>{
                  this.addSchedule()
                }
                }>
                    <Text style={styles.registerButtonText}>
                        Submit
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.registerButton}>
                    <Text style = {styles.cancelButtonText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                </View>
              
            </View>
        )
    }
}
const styles = StyleSheet.create({
    formInput: {
        width: "90%",
        height: RFValue(45),
        padding: RFValue(10),
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "grey",
        paddingBottom: RFValue(10),
        marginLeft: RFValue(20),
        marginBottom: RFValue(14)
      },
      registerButton:{
      width: "75%",
      height: RFValue(50),
      marginTop: RFValue(20),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: RFValue(3),
      backgroundColor: "#32867d",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop: RFValue(10)
    },
    registerButtonText: {
      fontSize: RFValue(23),
      fontWeight: "bold",
      color: "#fff"
    },
    cancelButtonText: {
      fontSize: RFValue(20),
      fontWeight: "bold",
      color: "white",
      marginTop: RFValue(10)
    }
})