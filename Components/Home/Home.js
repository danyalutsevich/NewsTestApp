import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';

import { Article } from '../Article';
import { Links } from '../../Variables';
import { SortBar } from './SortBar';
import { AppContext } from '../../App';

export function Home(props) {

    const [articles, setArticles] = useState([])
    const [amountToShow, setAmountToShow] = useState(10)
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(false)
    const { searchText, date, sortBy } = useContext(AppContext)

    const refresh = () => {
        setAmountToShow(10);
        setRefreshing(true);
        fetch(Links.News(searchText, date.getFullYear(), date.getMonth() + 1, date.getDate(), sortBy))
            .then(data => data.json())
            .then(setArticles)
            .then(() => { setRefreshing(false) })
            .catch(setError)
    }

    useEffect(() => {
        refresh()
    }, [searchText, date, sortBy])

    if (articles.length == 0) {
        return <Text>Loading...</Text>
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };


    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                stickyHeaderHiddenOnScroll={true}
                stickyHeaderIndices={[0]}
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        setAmountToShow(amountToShow + 10)
                        setRefreshing(false)
                    }
                }}
                scrollEventThrottle={400}
                refreshControl={<RefreshControl refreshing={refreshing}
                    onRefresh={() => { refresh() }}
                />}
            >
                <SortBar totalResults={articles.totalResults}></SortBar>
                {(() => {
                    console.log(articles)
                    if (articles.status == "error") {
                        return (
                            <View style={styles.error}>
                                <Text style={styles.errorText}>Error</Text>
                                <Text style={styles.errorText}>{articles.message}</Text>
                            </View>)
                    }
                    else if (articles?.articles?.length == 0) {
                        return (
                            <View style={styles.error}>
                                <Text style={styles.errorText}>No articles found</Text>
                                <Text style={styles.errorText}>Try to change date or use another words to describe what you need</Text>
                            </View>
                        )
                    }
                    else {
                        try {
                            return articles?.articles?.map((article, index) => {
                                if (index < amountToShow) {
                                    return (
                                        <Article article={article} key={index} navigation={props.navigation}></Article>
                                    )
                                }
                            })
                        }
                        catch (err) {
                            <View style={styles.error}>
                                <Text style={styles.errorText}>{err.message}</Text>
                            </View>
                        }
                    }
                })()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        width: "100%",

    },
    error: {
        backgroundColor: '#fafafa',
        alignItems: 'center',
        fontSize: 20,
    },
    errorText: {
        fontSize: 20,
        fontFamily: "sans-serif",
        textAlign: "center",
        padding: 10,

    }

});
