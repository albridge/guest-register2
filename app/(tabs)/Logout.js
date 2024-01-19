import React, {useEffect, useContext} from 'react'
import { Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';

const Logout = () => {
  
    const navigation = useNavigation();
  
  const cleanUp = async (value) => {
    try {        
      await AsyncStorage.removeItem('@pos2id');
      await AsyncStorage.removeItem('@pos2name');
      // await AsyncStorage.removeItem('@pos2deviceid');
    
      navigation.replace("index")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cleanUp();
  }, []);

  return (
    <>
    {/* <View>
      <Text>You are logged out</Text>
    </View>
    <View><Text>Login again</Text></View> */}
    </>
  )
}

export default Logout