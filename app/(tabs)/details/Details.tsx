import {Text, View, Image, ScrollView, StyleSheet} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
// import {Shadow} from 'react-native-shadow-2';


const Details = () => {
    const [ipAddress,setIpAddress] = useState(''); 
    useEffect(() => {
        getIp();
      }, []);

      const getIp = async () => {
        try {
          const value = await AsyncStorage.getItem('@pos2ipaddress');
          if (value !== null) {
            // We have data!!
            
            setIpAddress(value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };
    const router = useRouter
    const  item = useLocalSearchParams()
// console.log(item)
let dated = new Date((item.arrival_time.toString()));

function hourM()
{
  var time = new Date(dated);
return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

// function formatAMPM(date) {
//   var hours = date.getHours();
//   var minutes = date.getMinutes();
//   var ampm = hours >= 12 ? 'pm' : 'am';
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   minutes = minutes < 10 ? '0'+minutes : minutes;
//   var strTime = hours + ':' + minutes + ' ' + ampm;
//   return strTime;
// }

// console.log(formatAMPM(new Date));


  return (
    
    <View style={{backgroundColor:"white", paddingTop:20, height:"100%"}}>
     <ScrollView
     contentContainerStyle={{paddingBottom:70, paddingTop:30}}
     >
        <View style={{alignSelf:"center"}}>
        {/* flexShrink:1 */}
        {/* flexWrap:"wrap" */}
         
    <View style={[styles.card2,styles.elevation,styles.viewHeight]}>
    <View style={{marginTop:30}}>
    <Image style={{width:100, height:100, alignSelf:"center", borderRadius:5}} source={{ uri: "http://"+ipAddress+":80/guestbook/web/assets/guests/"+item.photo }} /> 
    </View>
    <View style={{paddingTop:10, paddingEnd:20, paddingStart:20, flexDirection:"row", justifyContent:"space-between", }}>
        <View style={{flex:1}}><Text style={{fontWeight:"bold", fontSize:20}}>Guest Name:</Text></View>
        <View style={{marginLeft:10, flex:1}}>
        <Text style={{fontWeight:"bold", fontSize:20}}>{item.first_name+' '+item.last_name}</Text>
        </View>
        </View>

        <View style={{paddingTop:10, paddingEnd:20, paddingStart:20, flexDirection:"row", justifyContent:"space-between"}}>
        <View style={{flex:1}}><Text style={{fontWeight:"bold", fontSize:20}}>Here to see:</Text></View>
        <View style={{flex:1}}>
        <Text style={{fontWeight:"bold", fontSize:20}}>{item.who_to_see}</Text>
        </View>
        </View>

        <View style={{paddingTop:10, paddingEnd:20, paddingStart:20, flexDirection:"row", justifyContent:"space-between"}}>
        <View style={{flex:1}}><Text style={{fontWeight:"bold", fontSize:20}}>Purpose:</Text></View>
        <View style={{marginLeft:10, flex:1}}>
        <Text style={{fontWeight:"bold", fontSize:20}}>{item.purpose}</Text>
        </View>
        </View>

       
        {/* new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})  */}
<View style={{paddingTop:10, paddingEnd:20, paddingStart:20, flexDirection:"row", justifyContent:"space-between"}}>

        <View style={{flex:1}}><Text style={{fontWeight:"bold", fontSize:20}}>Signed in:</Text></View>
        <View style={{flex:1}}>
        {/* new Date(item.arrival_time.toString()).toDateString() */}
        {/* <Text style={{fontWeight:"bold", fontSize:20}}>{dated.toDateString()}</Text> */}
        {/* <Text style={{fontWeight:"bold", fontSize:20}}>{dated.getHours()+' '+dated.getMinutes()}</Text> */}
        <Text style={{fontWeight:"bold", fontSize:20}}>{hourM()}</Text>
        </View>
</View>
<View style={{paddingTop:10, paddingEnd:20, paddingStart:20, flexDirection:"row", justifyContent:"space-between", height:"100%"}}>
        <View style={{flex:1}}><Text style={{fontWeight:"bold", fontSize:20}}>Tag Number:</Text></View>
        <View style={{flex:1}}>
        <Text style={{fontWeight:"bold", fontSize:20}}>{item.tag_number}</Text>
        </View>
    </View>
    
    </View>
   
    </View>
    </ScrollView>
    </View>
    
  )
}

export default Details

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
  },
 
  card2: {
      backgroundColor: 'white',
      borderRadius: 8,
      // paddingVertical: 45,
      // paddingHorizontal: 25,
      paddingLeft:10,
      paddingRight:10,
      paddingBottom:10,    
      width: 300,
      maxWidth:500,
      marginVertical: 10      
    },
    elevation: {
      elevation: 20,
      shadowColor: '#52006A',
    },
    viewHeight:{
      height:"100%"
    }
});