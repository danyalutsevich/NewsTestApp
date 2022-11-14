import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { AppContext } from '../../App';


export function Dropdown(props) {

    const { label, options } = props
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(options[0]);

    const { sortBy, setSortBy } = useContext(AppContext)

    const toggleDropdown = () => {
        setVisible(!visible);
    };

    const renderDropdown = () => {
        if (visible) {
            return (
                <View style={styles.dropdown}>{
                    options.map((option, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => { setSortBy(option); setVisible(false) }} style={[styles.option, option == sortBy ? styles.selectedOption : null]}>
                                <Text style={styles.optionText}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            )
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
            <Image source={require("../../assets/sort.png")} style={styles.dropdownIcon}></Image>
            <Text numberOfLines={1} style={styles.optionText}>{sortBy}</Text>
            <Image source={require("../../assets/arrow-drop-down.png")} style={styles.dropdownIcon}></Image>
            {renderDropdown()}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#c4c4c4',
        borderRadius: 10,
        width: '35%',
    },
    dropdown: {
        borderRadius: 10,
        position: 'absolute',
        backgroundColor: '#c4c4c4',
        top: 50,
    },
    option: {
        padding: 10,
        color: 'black',
    },
    optionText:{
        color: 'black',
    },
    selectedOption: {
        borderRadius: 10,
        backgroundColor: '#e0e0e0',
    },
    dropdownIcon: {
        width: 20,
        height: 20,
        marginHorizontal: 5,
    }
});

export default Dropdown;