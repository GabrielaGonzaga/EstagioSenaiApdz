import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import api from './services/api';


export default function App(){

useEffect (() => {
    api.get('projects').then(response =>{
        setProjects(response.data)
        setProjects(response.data)
    })
}, []);

    return (
        <>
            <View style={styles.container}>
                {projects.map(project => <Text>{project.title}</Text>)}
                {/* <Text style={styles.title}>Hello World</Text> */}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor : '#7159c1',
        justifyContent: 'center',
        alignItems: 'center'
    },

    title:{
        color: '#FFF',
        fontSize: 32,
        // fontWeight: 'bold'
    }
})
