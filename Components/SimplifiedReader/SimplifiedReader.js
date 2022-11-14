import React, { useState, useEffect, useContext } from 'react';
import ReadabilityView from "react-native-readability";
import { StyleSheet, View } from 'react-native';


export function SimplifiedReader(props) {

    const { article } = props.route.params;

   

    return (
        <View style={styles.container}>
            <ReadabilityView url={article.url} style={{color:'black'}} title={article.title} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        width: "100%",
        height: "100%",
    }
})