import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, RefreshControl, TextInput, TouchableOpacity } from 'react-native';



export function SearchBar(props) {
    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} cursorColor={'#234'} selectionColor={'#ddd'} onChangeText={props.setSearchText} placeholder={"Search"} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff',
    },
    textInput: {
        height: 42,
        padding: 10,
        fontSize: 16,
        borderColor: 'gray',
        borderWidth: 1,
        width: 200,
        borderRadius: 10,
        color: "black",
    },
    serchButton: {
        padding: 10,
    },
    serchIcon: {
        height: 20,
        width: 20,
    }

});
