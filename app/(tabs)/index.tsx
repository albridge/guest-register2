import React, {useState, useEffect} from 'react'
import * as ImagePicker from 'expo-image-picker'; 
import { Button, TextInput, View, Text, ScrollView, Image } from 'react-native';
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyActivityIndicator from '../../components/MyActivityIndicator';
import { useNavigation } from 'expo-router';
var FormData = require('form-data');
type todaysList=[
  id:number,
  name:string
]

// type myData = [
//   key:number,
//   value:string,
//   prevState:undefined
// ]


export default function home() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [iType,setType] = useState<string>()
    const [path,setPath] = useState<string>()
    const [email,setEmail] = useState<string>()
    const [phone,setPhone] = useState<string>()
    const [address,setAddress] = useState<string>()
    const [whom,setWhom] = useState<string>()
    const [purpose,setPurpose] = useState<string>()
    const [todaysList, setList] = useState<Array<any>>([]);
    const [selectedList, setSelectedList] = useState<Array<any>>(); // holds sorted runcat data
    const [selected, setSelected] = React.useState<number>(); // used by dropdownlist extension
    const [showD, setShowD] = useState(false);
    const [ipAddress,setIpAddress] = useState<string>(''); 
    const [showA,setShowA] = useState(false)
    const [tagNumber,setTagNumber] = useState<any>()
    const [seeText,setSeeText] = useState<any>()

    const navigation = useNavigation()
 

    useEffect(() => {
      getIp();  
    }, [ipAddress]);

    useEffect(() => {
      if(ipAddress)
      {
        getStaff();
      }  
    }, [ipAddress]);

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

  const pickImageAsync = async () => {
    const c = await ImagePicker.requestCameraPermissionsAsync();

    if (c.status === "granted") {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,    
    });

    if (!result.canceled) {         
       
        setPath(result.assets[0].uri);
        setType(result.assets[0].type) 

    } else {
      alert('You did not select any image.');
    }
}
  };

  const sendData = async () => {  
    
    try{  
       
            const formData = new FormData;

            formData.append('firstName',firstName)
            formData.append('lastName',lastName)
            formData.append('phone',phone)    
            formData.append('address',address)  
            formData.append('email',email)  
            formData.append('whom',Number(selected))   
            formData.append('purpose',purpose) 
            formData.append('seeText',seeText) 
            formData.append('tagNumber',tagNumber) 
            // formData.append(selectedImage,selectedImage)
            formData.append('photo',{
                uri:path,
                type:'image/jpeg',
                name:'myfile'
               
            })
      
      
    //    let postData=formData

    if(firstName==null || lastName==null || purpose==null || tagNumber==null || phone==null || purpose==null)
    {
      alert('Please fill  all required fields');
      return;
    }

    if(path==null)
    {
      alert('Kindly click the blue button to snap a photo of guest before submitting');
      return
    }

    if(selected==null)
    {
      alert('Please Click the green button at the top of the page to select who you want to see from the dropdown list');
      return
    }
          
       
    const res = await fetch("http://"+ipAddress+":80/guestbook/web/index.php?r=site/book",
   
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
  alert('Data Saved!')

 setAddress('');
 setFirstName('')
 setPhone('')
 setWhom('')
 setPurpose('')
 setSeeText('')
 setPath('')
 setTagNumber('')
 setEmail('')
 setLastName('')
 setSelected(0)
 setSelectedList(undefined)

    //   navigation.replace("Products");
    }else if(data.result==3){
      alert('Please fill all form fields')
    }else{
      // uncomment the data.message line below to debug
// alert(data.message)
     alert('There was a problem')
    }
  
    }catch(error){
      console.log(error);
    }
  };

  //get list of staff
  const getStaff = async () => {
  
    if(ipAddress!=null){
    try{  
     setShowA(true)
    const res = await fetch(     
      "http://"+ipAddress+":80/guestbook/web/index.php?r=site/stafflist",
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
    setList(data)
    // runCat();
    // setMyOrders(data);
  // {data && setList(data,[runCat])
   
    // const sing = () =>{
    //   console.log('singing')
    // } 
  
  
  // }
    }catch(error){
      console.log(error);
    }
  }
  };

  let runCat =  () =>{
    showD ? setShowD(false) : setShowD(true)
   
    // let myData = [];      
    let myData: Array<{ key: number, value: string }> = [] 
  
    for(let x=0; x<todaysList.length; x++)
    {
      myData[x]={"key":todaysList[x].id,"value":todaysList[x].name}
      // myData.push({"key":todaysList[x].transaction_id,"value":todaysList[x].transaction_id+'-'+todaysList[x].table_number+'-'+todaysList[x].staff})
   
    }
  
   
 setSelectedList(myData) 

  }


  // const doLogOut = () => {
  //   navigation.navigate('Logout');
  // }

  return (
    // source={{ uri: "http://"+ipAddress+":80/amonie/assets/bc/"+item.photo }}
    <View style={{paddingLeft:10, paddingRight:10, paddingTop:10, height:"100%", paddingBottom:30}}>
     
        <ScrollView
        style={{marginBottom:30}}
        >
             <View style={{marginEnd:10,marginStart:10}}>
   <Button title="who do you want to see?" color="#349B2F" onPress={runCat} />
   </View>
   {showD &&
   selectedList && <View style={{marginEnd:10,marginStart:10, marginBottom:23}}><SelectList
    setSelected = {(val:number) => setSelected(val)}
    data={selectedList}
    save="key"
    // onSelect={isAddon}    
    />
   
    </View>
   }
          {/* <Button title='Logout' color="red" onPress={doLogOut} /> */}
        <Text style={{fontWeight:"bold", textAlign:"center", fontSize:20}}>Please fill in your details in the form below</Text>
        <Text>First Name</Text>
    <TextInput
          // placeholder="First Name"
          onChangeText={text => setFirstName(text)}
          value={firstName}
          style={{padding:8, borderColor:"grey", borderWidth:2, flexBasis:'auto', marginTop:5}}                 
          placeholderTextColor="#000"
                     
        />
        <Text>Last Name</Text>
        <TextInput
          // placeholder="Last Name"
          onChangeText={text => setLastName(text)}
          value={lastName}
          style={{padding:8, borderColor:"grey", borderWidth:2, marginTop:5}}                 
          placeholderTextColor="#000"
                     
        />
<Text>Phone Number</Text>
<TextInput
          // placeholder="Phone Number"
          onChangeText={text => setPhone(text)}
          value={phone}
          style={{padding:8, borderColor:"grey", borderWidth:2, marginTop:5}}                 
          placeholderTextColor="#000"
                     
        />

<Text>Address</Text>
<TextInput
          // placeholder="Address"
          onChangeText={text => setAddress(text)}
          value={address}
          style={{padding:8, borderColor:"grey", borderWidth:2, marginTop:5}}                 
          placeholderTextColor="#000"
                     
        />

<Text>Purpose</Text>
<TextInput
          // placeholder="Purpose"
          onChangeText={text => setPurpose(text)}
          value={purpose}
          style={{padding:8, borderColor:"grey", borderWidth:2, marginTop:5}}                 
          placeholderTextColor="#000"
                     
        />
{/* <Text>Who do you want to see?</Text>
<TextInput
          // placeholder="Whom to see"
          onChangeText={text => setSeeText(text)}
          value={seeText}
          style={{padding:8, borderColor:"grey", borderWidth:2, marginTop:5}}                 
          placeholderTextColor="#000"
                     
        /> */}
<Text>Email</Text>
<TextInput
          // placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
          style={{padding:8, borderColor:"grey", borderWidth:2, marginTop:5}}                 
          placeholderTextColor="#000"
                     
        />
<Text>Tag Number</Text>
<TextInput
          // placeholder="Tag Number"
          onChangeText={text => setTagNumber(text)}
          value={tagNumber}
          style={{padding:8, borderColor:"grey", borderWidth:2, marginTop:5}}                 
          placeholderTextColor="#000"
                     
        />
        <View style={{marginTop:5}}>
        <Button title="select image" color="blue" onPress={pickImageAsync} />
            </View>

            <View style={{marginTop:5}}>
            <Button title='Save Info' color="green" onPress={sendData} />
                </View>
    
   

                </ScrollView>
    </View>
  )
}
