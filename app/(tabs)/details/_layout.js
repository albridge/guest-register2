import React from 'react'
import {Stack, useRouter} from 'expo-router'



export default function _layout() {
  
  return (
    
    <Stack>
    
      <Stack.Screen name='Details' options={{
        title:'Details',       
        headerShown: false
      }} />      
       
    </Stack>
   
  )
}
