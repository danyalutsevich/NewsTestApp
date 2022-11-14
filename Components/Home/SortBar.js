import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { AppContext } from "../../App";
import DatePicker from '@react-native-community/datetimepicker';
import { Dropdown } from '../Dropdown';

export function SortBar(props) {
    const {
        totalResults
    } = props
    const [showDate, setShowDate] = useState(false);
    const { date, setDate, sortBy, setSortBy } = useContext(AppContext)
    return (
        <View style={styles.container}>
            {showDate ? <DatePicker value={date} onChange={e => { setDate(new Date(e.nativeEvent.timestamp)); setShowDate(false) }} /> : null}
            <Text style={styles.textStyle}>Results: {totalResults || 0}</Text>
            <Dropdown options={["publishedAt", "relevancy", "popularity"]} />
            <TouchableOpacity style={styles.changeDate} onPress={() => { setShowDate(!showDate) }}>
                <Image source={require("../../assets/calendar_month.png")} style={styles.Icon}></Image>
                <Text style={styles.textStyle}>{date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e0e0',
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    changeDate: {
        backgroundColor: "#c4c4c4",
        padding: 10,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    textStyle: {
        color: "black",
    },
    Icon: {
        width: 20,
        height: 20,
        marginRight: 5,
    }
});
