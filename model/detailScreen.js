import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card } from 'react-native-paper';
import WeatherData from './index.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function DetailsScreen({ route, navigation }) {
    const { ddata } = route.params;
    
    console.log(ddata.weather);
    const url = 'http://openweathermap.org/img/w/';
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Text>Details Screen</Text> */}
        <Text>Details Screen</Text>
      {/* <Text>city: {JSON.stringify(ddata)}</Text> */}
      
      {/* <Text>weather: {JSON.stringify(ddata.weather)}</Text> */}
      {/* {JSON.stringify(ddata.weather) && JSON.stringify(ddata.weather).length > 0 && ddata.weather.map((fweather,index) => { */}
<Card style = {styles.itemfav}>
<Image source={{uri:url +''+ ddata.weather[0].icon +'.png'}} style={{width: 60, height: 60}} />
<Text style={{ textAlign: 'center', fontSize: 18 }}>city: {ddata.name}</Text>
      <Text style={{ textAlign: 'center' }}>long: {JSON.stringify(ddata.coord.lon)}</Text>
      <Text style={{ textAlign: 'center' }}>lat: {JSON.stringify(ddata.coord.lat)}</Text>
<Text style={{ textAlign: 'center' }}>
  Condition: { ddata.weather[0].main }
</Text>
<Text style={styles.paragraph}>
  Description: { ddata.weather[0].description }
</Text>
      <Text style={{ textAlign: 'center', fontSize: 18 }}>temp: {JSON.stringify(ddata.main.temp)}</Text>
      <Text style={{ textAlign: 'center', fontSize: 18, }}>winds: {JSON.stringify(ddata.wind.speed)}</Text>
      <Text style={{ textAlign: 'center', fontSize: 18, }}>clouds: {JSON.stringify(ddata.clouds.all)}</Text>
</Card>
      {/* })} */}
      </View>
    );
  }

  export default DetailsScreen;
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
    

