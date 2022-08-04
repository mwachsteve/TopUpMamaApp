import React, { useState, useEffect, Component } from 'react';
import { AsyncStorage, SafeAreaView, Text, View, StyleSheet, Image, ScrollView, Button, TouchableOpacity, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import { SearchBar } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import Notifications from './notifications';
// import BackgroundFetch from 'react-native-background-fetch';
// import AsyncStorage from '@react-native-community/async-storage';
// import { useNavigation } from '@react-navigation/native';

const WeatherData = ({ navigation }) => {
    // class WeatherData extends Component {
//    state = {
//       data: ''
//    };
   
   const [search, setSearch] = useState('');
   const [filteredDataSource, setFilteredDataSource] = useState([]);
   const [masterDataSource, setMasterDataSource] = useState([]);
   const [data, setDataSource] = useState([]);
   const [favourites, setFavourites] = useState([]);
   const [date, setDate] = useState(new Date());
   
   const getArticlesFromApi = async () => {
    let response = await fetch(
      'https://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743,2172797,184742,232422,1850147,186301,2158177,53654&APPID=c66f67ad87fb9cf6b8f300a8d453349b&units=metric'
    );
    let json = await response.json();

    try {
        await AsyncStorage.setItem('STORAGE_KEY', JSON.stringify(json.list));
        console.log('saved');
        // alert('Data successfully saved')
      } catch (e) {
        console.log(e);
        // alert('Failed to save the data to the storage')
      }
    return json.list;
//   }
};

useEffect(() => {
    // localStorage.setItem('items', JSON.stringify(items));
   getArticlesFromApi();
//    filteredDataSource
  }, []);
//   useEffect(() => {
    // localStorage.setItem('items', JSON.stringify(items));
//    getArticlesFromApi();
// setNotification();
//    filteredDataSource
//   }, []);
const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('STORAGE_KEY');
  
      if (value !== null) {
        console.log(JSON.parse(value));
        // setInput(value); 
         setFilteredDataSource(JSON.parse(value));
         setMasterDataSource(JSON.parse(value));
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };
   useEffect(() => {
    readData();
    //  fetch('https://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743,2172797,184742,232422,1850147,186301,2158177,53654&APPID=c66f67ad87fb9cf6b8f300a8d453349b&units=metric')
    //    .then((response) => response.json())
    //    .then((responseJson) => {
    //     console.log(responseJson);
    //     // setDataSource(responseJson);
    //      AsyncStorage.setItem('user', responseJson.list)
    //      setFilteredDataSource(responseJson.list);
    //      setMasterDataSource(responseJson.list);
    //    })
    //    .catch((error) => {
    //      console.error(error);
    //    });
   }, []);

   const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
          
        const itemData = item.name
          ? item.name
          : ''.toUpperCase();
          const textData = text;
        //   console.log(textData);
        return itemData.indexOf(textData) > -1;
      });
      if(favourites.length > 0){
        const newFav = favourites.filter(function (row) {
          
            const itemFav = row.name
              ? row.name
              : ''.toUpperCase();
              const textFav = text;
            //   console.log(textData);
            return itemFav.indexOf(textFav) > -1;
          });   
          setFavourites(newFav);
      }
      console.log(newData);
    //   setFavourites(newFav);
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFavourites(favourites);
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.name.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.name);
  };

    const handlePress = async(item) => {
        // navigation.navigate('Details');
        // alert(item.name);
        setFavourites(preState=>[...preState, item]);
        setFilteredDataSource(preState=>preState.filter(row =>row !== item));
        setMasterDataSource(preState=>preState.filter(row =>row !== item));

        await AsyncStorage.setItem('STORAGE_KEY', JSON.stringify(masterDataSource));
        await AsyncStorage.setItem('FAV_KEY', JSON.stringify(favourites));
        setNotification();
        console.log("full-list", masterDataSource);
        console.log("fav-list", favourites);
    }

    
    const handlePressed = async(item) => {
        // navigation.navigate('Details');
        // alert(item.name);
        setFilteredDataSource(preState=>[...preState, item]);
        setFilteredDataSource(preState=>[...preState, item]);
        setFavourites(preState=>preState.filter(row =>row !== item));
        // setMasterDataSource(preState=>preState.filter(row =>row !== item));

        await AsyncStorage.setItem('STORAGE_KEY', JSON.stringify(masterDataSource));
        await AsyncStorage.setItem('FAV_KEY', JSON.stringify(favourites));
        console.log("full-list", masterDataSource);
        console.log("fav-list", favourites);
    }

    const completeTask = (item) => {
        navigation.navigate('Details',{ddata: item});
        // console.log("card pressed");
        // setIsComplete(!isComplete);
    }

    const setNotification = () => {
        console.log('fav-not', favourites[0].name);
        // Notifications.schduleNotification(new Date(Date.now() + 5 * 1000));
        Notifications.schduleNotification(new Date(Date.now() + 3600 * 1000),favourites[0].name,favourites[0].weather[0].main);
    }
    const url = 'http://openweathermap.org/img/w/';
    
      return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
          <View style={styles.container}>
          <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Type Here..."
          value={search}
        />
        <View>
            <Button
                // onPress = {setNotification}
                title='Fav'
                />
        </View>
        
{/* <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        /> */}
        <Text>Fav</Text>
{favourites && favourites.length > 0 && favourites.map((fweather,index) => {
    
    return <TouchableOpacity key = {index} onPress={() => completeTask(fweather)}>
<Card style = {styles.itemfav}>
    <Image source={{uri:url +''+ fweather.weather[0].icon +'.png'}} style={{width: 60, height: 60}} />
<Text style={{ textAlign: 'center' }}>
  city: { fweather.name }
</Text>
<Text style={styles.paragraph}>
  temp: { fweather.main.temp }
</Text>
<Text style={{ textAlign: 'center' }}>
  high: { fweather.main.temp_max }
</Text>
<Text style={{ textAlign: 'center' }}>
  low: { fweather.main.temp_min }
</Text>
<Button
  onPress = {async () => {await handlePressed(fweather)}}
  title = "Remove Fav!"
  color = "Blue"
  />
</Card>
</TouchableOpacity>
})}


<Text>Current</Text>
{/* {filteredDataSource.list && filteredDataSource.list.length > 0 && filteredDataSource.list.map((weather,i) => { */}
             {filteredDataSource && filteredDataSource.length > 0 && filteredDataSource.map((weather,i) => {
                // return <TouchableOpacity key = {weather.id} >
                return <TouchableOpacity key = {weather.id} onPress={() => completeTask(weather)}>
        {/* <Card pointerEvents="none" style = {styles.item}> */}
                
       <Card style = {styles.item}>
    <Image source={{uri:url +''+ weather.weather[0].icon +'.png'}} style={{width: 60, height: 60}} />
              <Text style={{ textAlign: 'center' }}>
                city: { weather.name }
              </Text>
              <Text style={styles.paragraph}>
                temp: { weather.main.temp }
              </Text>
              <Text style={{ textAlign: 'center' }}>
                high: { weather.main.temp_max }
              </Text>
              <Text style={{ textAlign: 'center' }}>
                low: { weather.main.temp_min }
              </Text>
              <Button
                onPress = {async () => {await handlePress(weather)}}
                title = "Add Fav!"
                color = "blue"
                />
            </Card>
             </TouchableOpacity>
            })}
          </View>
             }
          </ScrollView>
        </SafeAreaView>
        //  <View>
        //     <Text>
        //        {this.state.data.body}
        //     </Text>
        //  </View>
      )
   }
// }
export default WeatherData;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 20
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
     },
     itemfav: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         padding: 30,
         margin: 2,
         borderColor: '#2a4944',
         borderWidth: 1,
         backgroundColor: '#ccaabb'
        //  backgroundColor: '#d2f7f1'
      },
  });
  