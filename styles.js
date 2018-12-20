import React from 'react';
import { StyleSheet } from 'react-native';
var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;


var styles = StyleSheet.create({
    container: {
        flex:1,
    },
    color: {
        color:'#df4723'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    img: {
        width: 90,
        height: 90,
        borderRadius: 45,
        margin: 10,
        backgroundColor: '#fff'
    },
    imgRow: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        padding: 15
    },
    textInput: {
        width: deviceWidth,padding: 15,
        backgroundColor: '#fff',
        height: 100
    },
    bold: {
        padding: 10
    }
})

module.exports = styles