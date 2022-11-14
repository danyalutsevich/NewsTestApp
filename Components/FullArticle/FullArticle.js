import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';

export function FullArticle(props) {

    const { article } = props.route.params
    const [imageUrl, setImageUrl] = useState(article.urlToImage ? { uri: article.urlToImage } : require("../../assets/image.jpg"))
    return (
        <ScrollView contentContainerStyle={styles.container} >

            <Image resizeMode='cover'
                onError={() => { setImageUrl(require("../../assets/image.jpg")) }}
                source={imageUrl}
                defaultSource={require("../../assets/image.jpg")}
                style={styles.image} />

            <Text style={styles.title}>{article.title}</Text>
            <View style={styles.about}>
                <Text style={styles.aboutText}>{new Date(article.publishedAt).toDateString()}</Text>
                <Text style={styles.aboutText}>Author: {article.author}</Text>
                <Text style={styles.aboutText}>Source: {article.source.name}</Text>

            </View>
            <Text style={styles.content}>{article.content}</Text>

            <TouchableOpacity onPress={() => {
                (async () => {
                    if (await Linking.canOpenURL(article.url)) {
                        await Linking.openURL(article.url)
                    }
                })()
            }} style={styles.OpenIn}>
                <Text> Open in browser</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate("SimplifiedReader", { article: article, navigation: props.navigation })
            }} style={styles.OpenIn}>
                <Text> Open in Reader</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        height: "100%",
        width: "100%",
    },
    image: {
        height: 200,
        width: "100%",
    },
    title: {
        width: "100%",
        fontFamily: "Roboto",
        textAlign: "left",
        fontSize: 24,
        color: "black",
        padding: 10,
    },
    about: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    aboutText: {
        fontFamily: "Roboto",
        textAlign: "left",
        color: "black",
        fontSize: 15,
        marginHorizontal: 10,
    },
    content: {
        width: "100%",
        fontFamily: "Roboto",
        color: "black",
        textAlign: "left",
        fontSize: 18,
        padding: 10,
    },
    OpenIn: {
        marginTop: 10,
        backgroundColor: "#ddd",
        padding: 10,
        borderRadius: 10,
    },
});