import { useAppDispatch, useAppSelector } from '@/constants/hooks';
import WeatherStation from '@/data/models/WeatherStation';
import * as React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Divider, IconButton, Menu } from "react-native-paper";

export interface ITopMenuProps {
  weatherStations: WeatherStation[];
}

export default function TopMenu() {
  const [visible, setVisible] = React.useState(false);
  const dispatch = useAppDispatch();
  const weatherStations = useAppSelector(state => state.weatherStationReducer).map(type => WeatherStation.fromPlainObject(type));

  const currentWeatherStationName = weatherStations.find((station: WeatherStation) => station['_currentStation'])?.name || (weatherStations.length > 0 ? weatherStations[0].name : "No station selected");

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.mainContainer}>
      <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<IconButton icon={"menu"} size={24} onPress={openMenu} />}>
        {weatherStations.filter(station => !station.currentStation).map((station: WeatherStation) => (
          <Menu.Item
            key={station.id + station.name}
            onPress={() => {
              dispatch({ type: 'weatherStation/changeCurrentWeatherStation', payload: station.id });
              closeMenu();
            }}
            title={station.name}
          />
        ))}
      </Menu>
      <Text style={styles.text}>{currentWeatherStationName}</Text>
      <View style={{width: 44}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 22,
  }
});
