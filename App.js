import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FullArticle } from './Components/FullArticle';
import { Home } from './Components/Home/';
import { SearchBar } from './Components/SearchBar';
import { SimplifiedReader } from './Components/SimplifiedReader';
// import * as SplashScreen from 'expo-splash-screen';

export const AppContext = React.createContext();

// SplashScreen.preventAutoHideAsync();

export default function App() {
  
  const Stack = createNativeStackNavigator();
  const [searchText, setSearchText] = useState("")
  const [date, setDate] = useState(new Date())
  const [sortBy, setSortBy] = useState("publishedAt")

  return (
    <AppContext.Provider value={{ searchText, setSearchText, date, setDate, sortBy, setSortBy }}>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Home" component={Home}
            options={{
              headerTitle: "News",
              headerRight: () => (<SearchBar setSearchText={setSearchText} />),
            }}
          />
          <Stack.Screen name="FullArticle" component={FullArticle}
            options={{
              headerTitle: "Article"
            }} />
          <Stack.Screen name="SimplifiedReader" component={SimplifiedReader}
            options={{
              headerTitle: "Reader"
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
