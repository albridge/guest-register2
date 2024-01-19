import React from 'react'
import {Text, View, StyleSheet} from 'react-native';
// type MyButton={
// title:string,
// background?:string
// }
const MyButton = (props:any) => {
  return (
    <View style={styles.button}><Text style={styles.text}>{props.title}</Text></View>
  )
}

export default MyButton

const styles = StyleSheet.create({
    button:{
        backgroundColor:"#D35400",       
        padding:10,
        borderRadius:10, 
             
    },
    text:{
        color:"white",
        textAlign:"center"  
    }
})