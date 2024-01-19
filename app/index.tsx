import React, {useState, useEffect, useContext} from 'react';
import { Text, View, Button, TextInput, StyleSheet, TouchableOpacity, Image, ImageBackground, KeyboardAvoidingView, Alert, StatusBar } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import MyButton from "../components/MyButton";
// import { AsyncStorage } from 'react-native';
import MyActivityIndicator from '../components/MyActivityIndicator';
import { UserContext } from '../components/UserContext';
import * as NavigationBar from 'expo-navigation-bar';
import {useNavigation, useRouter} from 'expo-router'
// import {StackNavigationProp} from '@react-navigation/stack'


const index = () => {
  NavigationBar.setBackgroundColorAsync("#000000");
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [ipAddress,setIpAddress] = useState(''); 
    const [showA,setShowA] = useState(false) // display or hide activity indicator like loading
    const [user, setUser] = React.useContext(UserContext);
    const [deviceId,setDeviceId] = useState(''); 
    const [config,setConfig] = useState<{logo:string,id:number,width:number,height:number}>(); 



    const navigation = useNavigation<any>();
    // const navigation =  useNavigation<StackNavigationProp<{route: {} }>>()
    const router = useRouter()
   
    function drag()
    {
      setShowA(false)
    }

    const Cleared = () =>{
        // navigation.navigate("Products");
    }

    const doIp = () =>{
      navigation.navigate("IpAddress");
    }

    useEffect(() => {
      getIp();
    }, []);

    useEffect(() => {
      drag();
    }, []);

    useEffect(() => {
      getId();
    }, []);

    useEffect(() => {
      if(ipAddress)
      {
        getConfig();
      }
    }, [ipAddress]);

    
      
      // const options = {
      // method: 'POST',
      // headers: {
      // 'Content-Type': 'application/json',
      // },
      // body: JSON.stringify(update),
      // };


    const doLogin = async () => {
      if(deviceId==null)
      {
        alert('You are not authorized');
        return;
      }

     
      setShowA(true);
      try{  
        let logDetails = {
          username,
          password,      
          };
      const res = await fetch(
        // "http://"+ipAddress+":80/jstore/index.php?r=site/applogin",
        "http://"+ipAddress+":80/guestbook/web/index.php?r=site/applogin",
        {
          method: "POST",
          headers: {
            // "Accept": "application/json, text/plain, */*", 
            "Accept": "application/json", 
            "Content-type": "application/json"
          },
          body: JSON.stringify(logDetails),
          
         
        }
      );
    
      const data = await res.json();
      if(data.result==1){
        
        setShowA(false)
        let user={userId:data.userId,myUsername:data.myUsername}
        setUser(data.userId)
        storeUser(user);
        setUsername("");
        setPassword("")
        router.push("/(tabs)");
      }else{
        Alert.alert(
          "Error!",
          "Wrong Username or Password!",
          [
            {
              text: "OK",
              // onPress: () => navigation.goBack(),
              style: "cancel",
            },
          ],
          {
            cancelable: false,
            onDismiss: () =>
              Alert.alert(
                "Error alert was dismissed by tapping outside of the alert dialog."
              ),
          }
        );
       setShowA(false) ;
      }
    
      }catch(error){
        console.log(error);
      }
    };

    const storeUser = async (value:any) => {
      try {        
        await AsyncStorage.setItem('@pos2id',
          String(value.userId)
        );
        await AsyncStorage.setItem('@pos2name',
          value.myUsername
        );
      } catch (error) {
        console.log(error);
      }
    };


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


    const getId = async () => {
      try {
        const value = await AsyncStorage.getItem('@pos2deviceid');
        if (value !== null) {
          // We have data!!
          setDeviceId(value);
        }
      } catch (error) {
        // Error retrieving data
      }
    };


    // get config
    const getConfig = async () => {
  
      if(ipAddress!=null){
      try{  
       setShowA(true)
      const res = await fetch(     
        "http://"+ipAddress+":80/guestbook/web/index.php?r=site/getconfig",
        {
          method: "GET",
          headers: {
            // "Accept": "application/json, text/plain, */*", 
            "Accept": "application/json", 
            "Content-type": "application/json"
          }
         
        }
      );
    
      const data = await res.json();  
     setConfig(data[0])
     setShowA(false)
    //  console.log(data[0].logo)
      }catch(error){
        console.log(error);
      }
    }
    };

    StatusBar.setHidden(true, 'none');
  return (
    <>
     {/* <StatusBar hidden={true} />
     <StatusBar hidden /> */}
     <StatusBar  backgroundColor={'#000000'} />
    {/* <KeyboardAvoidingView> */}
     <ImageBackground source={require("../assets/desk/desk.jpg")} style={styles.image}>
    <View style={styles.container}>
      <View style={{marginTop:100, marginBottom:20}}>
      {config && <Image style={{width:Number(config.width), height:Number(config.height), alignSelf:"center", borderRadius:5}} source={{ uri: "http://"+ipAddress+":80/guestbook/web/logos/"+config.logo }} /> }
      </View>
    

    <View style={{backgroundColor:"white", padding:5, marginLeft:40, marginRight:40, marginBottom:50, borderTopRightRadius:10, borderBottomLeftRadius:10}}>
    <Text style={{textAlign:"center", fontSize:30, fontWeight:"bold"}}>GUEST BOOK</Text>
    {/* <Text style={{textAlign:'center', fontSize:25, fontWeight:"bold"}}>Login</Text> */}
    </View>  
 

    <View style={styles.holder}>    

    
    {showA===true && <MyActivityIndicator />}
    <View>
        <TextInput
          placeholder="Enter Username"
          onChangeText={text => setUsername(text)}
          value={username}
          style={styles.username}                 
          placeholderTextColor="#000" 
                     
        />
      </View>
      
    <View >
        <TextInput
          placeholder="Enter Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}          
          style={styles.username}  
          placeholderTextColor="#000"   
        />
      </View>      
      
    <View style={{marginTop:30}}><Button title="Login" color="#CC2912" onPress={doLogin} ></Button></View>
    </View>
    <TouchableOpacity onPress={() => doIp()}>
      
    <View style={{marginTop:30}}><MyButton title="Set Ip Address" onPress={doIp}  /></View>
    </TouchableOpacity>
    
    </View>
    </ImageBackground>
    {/* </KeyboardAvoidingView> */}
    </>
  )
}

export default index;

const styles = StyleSheet.create({
    container: {
      // marginTop:0,
      // padding: 10,
      // backgroundColor:"#3E53C8",
      // backgroundColor:"#F16B1F",
      flex:1
    },
    username: {
      alignItems: "center",
      padding: 10,
      marginBottom:5,
      color:"black",
      borderColor: '#000',
      borderWidth: 1,
      backgroundColor:"white",
      opacity:.8
      
    },
    holder:{
      // backgroundColor:"#F16B1F",
      paddingLeft:20, paddingRight:20,
       
    },
    header:{
      color:"#F16B1F",
      fontSize:30,
      fontWeight:"bold",
      textAlign:"center",
      marginBottom:30
    },
    title:{
      marginTop:200,
      color:"#CC2912",
      fontSize:30,
      fontWeight:"bold",
      textAlign:"center",
      marginBottom:10
    },
    image:{
      width:"100%",
      height:"100%",
      
    }
  });