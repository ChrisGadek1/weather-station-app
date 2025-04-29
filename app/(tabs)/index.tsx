import HistoricalMeasurements from '@/components/ui/HistoricalMeasurements';
import LastMeasurement from '@/components/ui/LastMeasurement';
import TopMenu from '@/components/ui/TopMenu';
import { useAppDispatch } from '@/constants/hooks';
import WeatherStation from '@/data/models/WeatherStation';
import TimelineRepository from '@/data/repositories/cache/timelineRepository';
import WeatherStationRepository from '@/data/repositories/cache/weatherStationRepository';
import { addTimelines } from '@/data/slices/TimelineSlice';
import { addWeatherStations } from '@/data/slices/WeatherStationSlice';
import React from 'react';
import { Image, StyleSheet, Platform, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
const dispatch = useAppDispatch();

  const fetchWeatherStations = async () => {
    const fetchedWeatherStations = new WeatherStationRepository().getWeatherStations()
    dispatch(addWeatherStations(fetchedWeatherStations.map((station: WeatherStation) => station.toPlainObject())))
  };

  const fetchTimelines = async () => {
    const fetchedTimelines = new TimelineRepository().getTimelines()
    dispatch(addTimelines(fetchedTimelines.map((timeline) => timeline.toPlainObject())));
  }

  React.useEffect(() => {
    fetchWeatherStations();
    fetchTimelines();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.mainOuterColumn}>
          <TopMenu />
          <Divider />
          <View style={styles.mainColumn}>
            <View style={styles.lastMeasurementOuterContainer}>
              <View style={styles.lastMeasurementInnerContainer}>
                <LastMeasurement />
              </View>
            </View>
            <View style={styles.historicalMeasurementsOuterContainer}>
              <View style={styles.historicalMeasurementsInnerContainer}>
                <HistoricalMeasurements />
              </View>
            </View>
          </View>
        </View>
        
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainOuterColumn: {
    flex: 1,
    flexDirection: 'column'
  },
  mainColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    rowGap: 20,
    paddingBottom: 20,
  },
  lastMeasurementOuterContainer: {
    flexGrow: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lastMeasurementInnerContainer: {
    width: '85%',
  },
  historicalMeasurementsOuterContainer: {
    flexGrow: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  historicalMeasurementsInnerContainer: {
    width: '85%',
  },
});
