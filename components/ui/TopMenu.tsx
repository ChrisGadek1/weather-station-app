import { useAppDispatch, useAppSelector } from '@/constants/hooks';
import Timeline from '@/data/models/Timeline';
import WeatherStation from '@/data/models/WeatherStation';
import WeatherStationRepository from '@/data/repositories/cache/weatherStationRepository';
import * as React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Divider, IconButton, Menu, useTheme } from "react-native-paper";

export interface ITopMenuProps {
  weatherStations: WeatherStation[];
}

export default function TopMenu() {
  const theme = useTheme();
  const weatherStationRepository = new WeatherStationRepository();

  const [visible, setVisible] = React.useState(false);
  const dispatch = useAppDispatch();
  const weatherStations = useAppSelector(state => state.weatherStationReducer).map(type => WeatherStation.fromPlainObject(type));

  const currentWeatherStationName = weatherStations.find((station: WeatherStation) => station['_currentStation'])?.name || (weatherStations.length > 0 ? weatherStations[0].name : "No station selected");

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleMenuItemPress = (station: WeatherStation) => {
    weatherStationRepository.saveLocalWeatherStations(weatherStations.map(stationIt => {
      if(stationIt.id === station.id) {
        stationIt.currentStation = true;
      }
      else {
        stationIt.currentStation = false;
      }
      return stationIt;
    }), () => {
      dispatch({ type: 'weatherStation/changeCurrentWeatherStation', payload: station.toPlainObject() });
      closeMenu();
    });
  }

  return (
    <View style={styles.mainContainer}>
      <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<IconButton icon={"menu"} size={24} onPress={openMenu} />}>
            <View style={{ marginTop: 20 }}>
              {weatherStations.filter(station => !station.currentStation).map((station: WeatherStation) => (
                <Menu.Item
                  key={station.id + station.name}
                  onPress={() => handleMenuItemPress(station)}
                  title={station.name}
                />
              ))}
            </View>
      </Menu>
      <Text style={[styles.text, { color: theme.colors.onBackground }]}>{currentWeatherStationName}</Text>
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
