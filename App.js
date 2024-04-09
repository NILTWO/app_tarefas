import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import AppLoading from 'expo-app-loading';
import React, { useEffect, useState } from 'react';
import { useFonts, Allan_400Regular, Allan_700Bold } from '@expo-google-fonts/allan';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, TouchableHighlight, Modal, Alert, TextInput } from 'react-native';

export default function App() {

  useEffect(()=>{
    (async () => {
    try{
      let tarefaAtual = await AsyncStorage.getItem('tarefas');
      if(tarefaAtual == null){
        setTarefas([]);
      }else{
        setTarefas(JSON.parse(tarefaAtual));
      }
    }catch(error){

    }
  })();
},[]);

  const image = require('./resources/bg.jpg');

  console.disableYellowBox = true;

  const [tarefas, setTarefas] = useState([]);

  const [modal, setModal] = useState(false);

  const [tarefaAtual, setTarefaAtual] = useState('');

  let [fontsLoaded] = useFonts({
    Allan_400Regular,
    Allan_700Bold,
  });

  function deletarTarefa(id){
    let newArr = tarefas.filter(function(val){
      return val.id != id;
    });

    setTarefas(newArr)
  }

  function addTarefa(){ 
    setModal(!modal);
    
    let id = 0;
    if(tarefas.length > 0){
      id = tarefas[tarefas.length - 1].id + 1
    }

    let tarefa = {id: id, tarefa: tarefaAtual}

    setTarefas([...tarefas, tarefa])
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

    return (
      <ScrollView style={{flex:1}}>
        <StatusBar hidden></StatusBar>
        <Modal 
          animationType='slide' 
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.")
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput onChangeText={text => setTarefaAtual(text)} autoFocus={true}></TextInput>
              <TouchableHighlight 
                style={{...styles.openButton, backgroundColor: "#2196F3", margin:20}}
                onPress={()=> addTarefa()}
              >
                <Text style={styles.textStyle}>Adicionar Tarefas</Text>
            
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <ImageBackground source={image} style={styles.image}>
          <View style={styles.coverView}>
              <Text style={styles.textHeader}>Lista de Tarefas - Niltwo</Text>
          </View>
        </ImageBackground>    

        {
          tarefas.map(function(val){
            return(<View style={styles.tarefaSingle}>
              <View style={{flex:1, width:'100%' , padding:10}}>
                <Text>{val.tarefa}</Text>
              </View>
              <View style={{flex:1, alignItems:'flex-end' , padding:10}}>
                <TouchableOpacity onPress={()=> deletarTarefa(val.id)}><AntDesign name="minuscircleo" size={24} color="black" /></TouchableOpacity>
              </View>
            </View>)
          })
        }

        <TouchableOpacity style={styles.btnAddTarefa} onPress={()=>setModal(true)}>
          <Text style={{textAlign:"center", color:"black"}}>Adicionar Tarefa</Text>
        </TouchableOpacity>
        
        {/* <View style={styles.teste}>
          <View style={styles.testeMenor}>

          </View>

        </View> */}

        {/* <View style={{width: "auto", height: 200, backgroundColor:"green", flex: 1, marginTop: 30}}>
          <View style={{width: 100, height: 100, backgroundColor:"yellow", marginTop: 50, marginLeft:50}}>
            <Text style={{textAlign: "center", marginTop:43, fontSize: 15}}>Imagem</Text>
          </View>
          <View style={{width: 200, height: 100, backgroundColor:"yellow", top: -100, left: 200}}>
            <Text style={{textAlign: "center"}} >Titulo</Text>
            <Text style={{textAlign: "center", marginTop: 20}} >Texto explicativo</Text>
          </View>
        </View>

        <View style={{width: "auto", height: 200, backgroundColor:"green", flex: 1, marginTop: 30}}>
          <View style={{width: 100, height: 100, backgroundColor:"yellow", marginTop: 50, marginLeft:50}}>
            <Text style={{textAlign: "center", marginTop:43, fontSize: 15}}>Imagem</Text>
          </View>
          <View style={{width: 200, height: 100, backgroundColor:"yellow", top: -100, left: 200}}>
            <Text style={{textAlign: "center"}} >Titulo</Text>
            <Text style={{textAlign: "center", marginTop: 20}} >Texto explicativo</Text>
          </View>
        </View> */}

      </ScrollView>

      

        
      
    );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    flex: 1,
    resizeMode: 'cover',
  },
  // teste:{
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  // testeMenor:{
  //   marginTop: 10,
  //   width: 180, 
  //   height: 100,
  //   borderRadius: 50,
  //   backgroundColor: "rgba(183, 172, 159, 0.8)",
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  btnAddTarefa: {
    width: 200, 
    padding: 8,
    backgroundColor: 'gray',
    marginTop: 20
  },  
  coverView:{
    width: '100%',
    height: 150,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  textHeader: {
    paddingTop: 80,
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontFamily: 'Allan_400Regular'
  },
  tarefaSingle: {
    marginTop:20,
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    flexDirection: 'row',
    paddingBottom: 10
  },
  centeredView:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#0000",
    shadowOffset:{
      width:0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
