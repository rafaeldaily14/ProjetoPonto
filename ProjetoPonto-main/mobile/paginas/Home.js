import React from 'react'
import Tabela from './Tabela'
import {
    Button, View, Text, TextInput, SafeAreaView, StyleSheet,
    TouchableOpacity, Alert
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { defineAnimation } from 'react-native-reanimated'
//import { StatusBar } from 'expo-status-bar';

const axios = require('axios')

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
}

export default function CadastroCliente({ navigation }) {
    const [nome, onChangeNome] = React.useState(null); 
    const [senha, onChangeSenha] = React.useState(null);
    const [faltas, onChangeFaltas] = React.useState([['','','','']]);
    const [loginErrado, onChangeLoginErrado] = React.useState(false);

    const showAlerta = (nome) => {
        onChangeNome('')
        onChangeEndereco('')
        Alert.alert(
            "Cliente Cadastrado",
            nome,
            [
                {
                    text: "Confirma",
                    onPress: () => Alert.alert("Apertou o Cancelar"),
                    style: "cancel",
                },
            ],
            {
                cancelable: true,
                onDismiss: () =>
                    Alert.alert(
                        "This alert was dismissed by tapping outside of the alert dialog."
                    ),
            }
        );

    }

    async function gerarRelatorio() { 
        try {
            const data = await axios.get('http://10.0.2.2:3000/api/faltas/'+nome);
            let dataArray=[]
            for(let i=0; i<data.data.length;i++){
                dataArray.push([])
                dataArray[i].push(data.data[i].nome)
                dataArray[i].push(data.data[i].dia)
                dataArray[i].push(data.data[i].horario)
                dataArray[i].push(data.data[i].tipo)
            }
            onChangeFaltas(dataArray)
            
        }
        catch (error) {
            console.warn(error)
        }
    }

    function fazLogin() { 
        let login = {}
        
        login = {
            user: nome,          
            password: senha
        }

        axios.post('http://10.0.2.2:3000/api/login',login, axiosConfig)
        .then((res) => {
            console.warn("Resposta recebida: ", res.data.login);
            if(res.data.login=="True"){
                gerarRelatorio()
                onChangeLoginErrado(false)
            }else{
                onChangeLoginErrado(true)
            }                        
        })
        .catch((err) => {
            console.warn("Problema: ", err);
        }) 
        
    }

    return (

        <View style={styles.container}>
            <View style={styles.inputContainer} >
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNome}
                    value={nome}
                    placeholder="Usuário"
                    keyboardType="text"
                    clearButtonMode="always"
                />


                <TextInput
                    style={styles.input}
                    onChangeText={onChangeSenha}
                    value={senha}
                    placeholder="Senha"
                    keyboardType="text"
                    secureTextEntry={true}
                    clearButtonMode="always"
                />
                <TouchableOpacity style={styles.button}
                    onPress={e => fazLogin()}
                >
                    <Text style={styles.buttonText}>Login</Text>

                </TouchableOpacity>
                {loginErrado && <Text style={styles.texto}>Login Errado</Text>} 
                <Tabela faltas={faltas}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C0C0C0',
        alignItems: 'center',
    },

    input: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch'
    },

    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        marginTop: 10,
        height: 60,
        backgroundColor: 'blue',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowOpacity: 20,
        shadowColor: '#ccc',
    },
    inputContainer: {
        flex: 1,
        marginTop: 30,
        width: '90%',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },texto: {
        marginTop: 40,
        color: 'red',
    }
});

