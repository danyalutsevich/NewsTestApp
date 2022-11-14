import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Links } from '../../Variables';

export function Article(props) {

    const { article } = props
    const [imageUrl, setImageUrl] = useState(article.urlToImage ? { uri: article.urlToImage } : require("../../assets/image.jpg"))
    const [isImageLoaded, setIsImageLoaded] = useState(false)

    useEffect(() => {
        setImageUrl(article.urlToImage ? { uri: article.urlToImage } : require("../../assets/image.jpg"))
    }, [article])

    return (
        <View style={[styles.container, styles.shadowProp]}
            onTouchEnd={() => {
                props.navigation.navigate("FullArticle", { article: article, navigation: props.navigation })
            }}>
            <Image resizeMode='cover' key={article.urlToImage}
                onError={() => { setImageUrl(require("../../assets/image.jpg")) }}
                source={
                    isImageLoaded ? imageUrl : require("../../assets/image.jpg")
                }
                style={styles.image}
                onLoad={() => { setIsImageLoaded(true) }}
            />
            <View>
                <Text style={styles.title}>{article?.title}</Text>
                <Text style={styles.description}>{article?.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: "Roboto",
        textAlign: "left",
        color: "black",
        fontSize: 24,
    },
    description: {
        fontFamily: "Roboto",
        color: "#555",
        textAlign: "left",
        fontSize: 15,
    },
    image: {
        height: 100,
        borderRadius: 10,
        width: "100%",
        backgroundColor: "white",
    },
    shadowProp: {
        elevation: 20,
        shadowColor: '#171717',
    },
});
