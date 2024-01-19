import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, FlatList, Alert, TextInput, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyActivityIndicator from '../../components/MyActivityIndicator';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useNavigation, useRouter, Link} from 'expo-router'
// import {Shadow} from 'react-native-shadow-2';
// import DropShadow from "react-native-drop-shadow";
// type item = {
//   id:number,
//   first_name:string,
//   last_name:string
// }

export default function TabTwoScreen() {
  const [ipAddress,setIpAddress] = useState<string>(''); 
  const [guests, setGuests] = useState<Array<any | undefined>>()
  const [term, setTerm] = useState<string>()

  const navigation = useNavigation();
  const router = useRouter()

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

  useEffect(() => {
    getIp();  
  }, [ipAddress]);
  

  useEffect(() => {
    if(ipAddress){
      getGuests();
    }
      
  }, [ipAddress]);

  useEffect(() => {
    if(ipAddress){
    getGuests2();  
   }
      
   
      
  }, [term]);



  const getGuests = async () => {
  
    if(ipAddress!=null){
    try{  

     
  
    const res = await fetch(     
      "http://"+ipAddress+":80/guestbook/web/index.php?r=site/guestlist",
      {
        method: "GET",
        headers: {
          // "Accept": "application/json, text/plain, */*", 
          "Accept": "application/json", 
          "Content-type": "application/json"
          // 'Content-Type':'multipart/form-data'
        },
        
       
      }
    );
  
    const data = await res.json();  
    setGuests(data)  ;

    }catch(error){
      console.log(error);
    }
  }
  };

  // guest2
  const getGuests2 = async () => {
  
    if(ipAddress!=null){
    try{  

      const formData2 = new FormData;
  
      formData2.append('term',String(term)) ; 
  
    const res = await fetch(     
      "http://"+ipAddress+":80/guestbook/web/index.php?r=site/guestlist2",
      {
        method: "POST",
        headers: {
          // "Accept": "application/json, text/plain, */*", 
          // "Accept": "application/json", 
          // "Content-type": "application/json"
          'Content-Type':'multipart/form-data'
        },
        body:formData2,
       
      }
    );
  
    const data = await res.json();  
    setGuests(data)  ;

    }catch(error){
      console.log(error);
    }
  }
  };

  const doSignOut = async (id:number) =>{    
    
      try{  
         
              const formData = new FormData;
  
              formData.append('id',String(id)) ; 
            
         
      const res = await fetch("http://"+ipAddress+":80/guestbook/web/index.php?r=site/signout",
     
        {
          method: "POST",
          headers: {
            // "Accept": "application/json, text/plain, */*", 
          //   "Accept": "application/json", 
          //   "Content-type": "application/json"
          'Content-Type':'multipart/form-data'
          },
          // body: JSON.stringify(formData),    
          body: formData,       
         
        }
      );
    
      const data = await res.json();
      
      // console.log(data)
      if(data.result==1){    
    alert('Guest Signed Out!')
    getGuests()
  

  
      //   navigation.replace("Products");
      }else if(data.result==2){
        alert('There was a problem')
      }else{
        // uncomment the data.message line below to debug
  // alert(data.message)
       alert('something isn\'t right')
      }
    
      }catch(error){
        console.log(error);
      }
   
  }

  // past

  const signOut = (item:{id:number,first_name:string,last_name:string}) => {
  
    Alert.alert(
      "Confirm!",
      `Sign Out ${item.first_name+' '+item.last_name} ?`,
      [
        {
          text: "Yes",
          onPress: () => doSignOut(item.id),
          style: "cancel",
        },
        {
          text: "No",
          // onPress: () => doCancel(),
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
  }

  return (
    <View style={{backgroundColor:"white", flex:1, height:"100%"}}>
      <View style={{paddingLeft:10, paddingTop:10}}><Text style={{fontWeight:"bold", fontSize:15}}>{guests?.length} guests in the building</Text></View>
      <View >
        <TextInput
          placeholder="Search Guests"
          onChangeText={text => setTerm(text)}
          value={term}
          // secureTextEntry={true}          
          style={styles.username}  
          placeholderTextColor="#000"   
        />
      </View> 
     {guests && guests.length > 0 ? (
     
          <FlatList
            // numColumns={2}
            data={guests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (             
              // <Shadow
              // distance={5}
              // startColor={'#939699'}
              // containerStyle={{marginVertical: 10, marginHorizontal: 15}}
              
              // style={{flex:1, width:"100%"}}
              // > 
              <View style={[styles.card2,styles.elevation, styles.viewWidth]}>
             <View style={{
              justifyContent:"space-between",              
              padding:10, 
              flexDirection:"row",
              backgroundColor:"white",
              marginTop:10,
             
            
             
              }}>
                <FontAwesome
                    name="user"
                    size={25}
                    color="#428CD6"
                    style={{ marginRight: 15 }}
                  />
              <Text style={{fontWeight:"bold", fontSize:15, marginRight:10, flex:1}}>{item.first_name}</Text>
              <Text style={{fontWeight:"bold", fontSize:15, marginRight:10, flex:1}}>{item.last_name}</Text>           
           

<Link style={{backgroundColor:"#566573", 
              justifyContent:"center", 
              alignContent:"center",
              padding:10,
              borderRadius:5,
              color:"white",
              flex:1,
              marginRight:10,
              textAlignVertical:"center"
           
           
              
              }}
        href={{
          pathname: "/details/Details",
          params: item 
        }}>
          Detail
        </Link>

              <TouchableOpacity onPress={()=>signOut(item)}>
              <View style={{backgroundColor:"#2980B9", justifyContent:"center", 
              alignContent:"center",
              padding:10,
              borderRadius:5,
              flex:1
              }}><Text style={{color:"white"}}>Sign Out</Text>
              </View>
              </TouchableOpacity>
             </View>
            </View>
              //  </Shadow>
            )}          
  
           
            
          /> 

          ) : (
            <Text style={styles.empty}>No Guests in Building</Text>
          )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  empty: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  username: {
    alignItems: "center",
    padding: 10,
    marginBottom:5,
    color:"black",
    borderColor: '#2980B9',
    borderWidth: 1,
    backgroundColor:"white",
    opacity:.8,
    marginLeft:10,
    marginRight:10,
    marginTop:15
    
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  button: {
    backgroundColor: '#4830D3',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    borderRadius: 4,
    marginTop: 30,
   
  },
  buttonText: {
    color: '#fff',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  card2: {
    backgroundColor: 'white',
    // borderRadius: 5,
    // paddingVertical: 45,
    // paddingHorizontal: 25,
    // paddingLeft:10,
    // paddingRight:10,
    paddingBottom:10,    
    width: "90%",
    maxWidth:500,
    marginVertical: 10,
    borderTopWidth:1,
    borderTopColor:"#E0E4E8" ,
    marginRight:10,
    marginLeft:10 ,
    alignSelf:"center",
    flex:1
  },
  elevation: {
    elevation: 5,
    shadowColor: '#52006A',
  },
  viewHeight:{
    height:"100%"
  },
  viewWidth:{
    // width:"100%"
  }
});
