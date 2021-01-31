import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function App() {
  const [display, setDisplay] = useState('')
  const [result, setResult] = useState('')
  const col1Buttons = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    [',', '0', '=']
  ]

  const col2Buttons = ['c', '÷', 'x', '-', '+']
  const handleOp = (op) =>{
      if(op === 'c'){
        setDisplay('')
        setResult('')
      }else if(op === '='){
        setDisplay(result)
        setResult('')
      }else{
        const newDisplay = display+op
        let resultOp = result
        try{
          let fixedOperation = newDisplay.split('x').join('*')
          fixedOperation = fixedOperation.split('÷').join('/')
          fixedOperation = fixedOperation.split(',').join('.')
          resultOp = new String(eval(fixedOperation)).toString()
        }catch(e){

        }
        setDisplay(newDisplay)
        setResult(resultOp)
      }
  }


  return (
    <View style={styles.conteiner} >
      <Text style={styles.display}>{display}</Text>
      <Text style={styles.result}>{result}</Text>

      <View style={styles.buttons} >
        
        <View style={styles.col1}>
          {col1Buttons.map( (line, ind) => <View key={ind} style={styles.line}>
              {line.map(op => <TouchableOpacity key={op} style={styles.btn} onPress={()=> handleOp(op)}>
                <Text style={styles.btnText}>
                  {op}
                </Text>
              </TouchableOpacity> )}             
              
          </View>)}

        </View>

        <View style={styles.col2}>
          {col2Buttons.map(op => <TouchableOpacity key={op} style={styles.btn} onPress={()=> handleOp(op)}>
            <Text style={styles.btnText}>
              {op}
            </Text>
          </TouchableOpacity> )}           
        </View>
      
      </View>     
    </View>
  );
}
const styles = StyleSheet.create({
  conteiner:{
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  display:{
    flex: 1,
    backgroundColor: '#efefef',
    fontSize: 60,
    textAlign: 'right',
    paddingTop: 30,
    paddingRight: 10
  },
  result:{
    flex:  0.4,
    backgroundColor: '#efefef',
    textAlign: 'right',
    paddingRight: 10,
    paddingBottom: 10,
    fontSize: 30
  },
  buttons:{
    flex: 5, 
    flexDirection: 'row'
  },
  col1:{
    flex: 3, 
    backgroundColor: 'gray'
  },
  line:{
    flex: 1,
    flexDirection: "row",
  },  
  btn:{
    flex: 1,
    justifyContent: 'center'
  },
  btnText:{
    textAlign: 'center',
    fontSize: 40,
    color: 'white'
  },
  col2:{
    flex: 1, 
    backgroundColor: '#ababab',
  },
})
