import HistoricalMeasurements from '@/components/ui/HistoricalMeasurements';
import LastMeasurement from '@/components/ui/LastMeasurement';
import TopMenu from '@/components/ui/TopMenu';
import { useAppDispatch, useAppSelector } from '@/constants/hooks';
import WeatherStation from '@/data/models/WeatherStation';
import WeatherStationRepository from '@/data/repositories/cache/weatherStationRepository';
import { addWeatherStations } from '@/data/slices/WeatherStationSlice';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { measure } from 'react-native-reanimated';
import MeasureRepository from '@/data/repositories/cache/measureRepository';
import seedDb from '@/db/seedDb';
import { createTables } from '@/db/createTables';
import { db } from '@/db/connect';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const theme: any = useTheme();
  const weatherStationRepository = new WeatherStationRepository();
  const measureRepository = new MeasureRepository();

  const weatherStations = useAppSelector(state => state.weatherStationReducer).map(station => WeatherStation.fromPlainObject(station));
  const currentWeatherStation = weatherStations.find(station => station.currentStation) || weatherStations.length > 0 ? weatherStations[0] : undefined;

  const fetchLocalWeatherStations = async () => {
    const fetchedWeatherStations = await weatherStationRepository.getLocalWeatherStations()
    dispatch(addWeatherStations(fetchedWeatherStations.map((station: WeatherStation) => station.toPlainObject())))
  };

  const fetchMeasures = async () => {
    if (currentWeatherStation && currentWeatherStation.id) {
      const localMeasures = await measureRepository.getLocalMeasuresByWeatherStation(currentWeatherStation.id.toString());
      if (localMeasures.length === 0) {
        const remoteMeasures = await measureRepository.getRemoteMeasuresFromCurrentWeatherStation();
        if (remoteMeasures.length > 0) {
          await measureRepository.saveLocalMeasures(remoteMeasures);
        }
      }
      else {
        const sortedLocalMeasures = localMeasures.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        const latestLocalMeasure = sortedLocalMeasures[0];
        const latestLocalMeasureTimestamp = latestLocalMeasure.timestamp.getTime();
        const remoteMeasures = await measureRepository.getRemoteMeasuresForCurrentWeatherStationInTimeline(latestLocalMeasureTimestamp, Date.now());
        if (remoteMeasures.length > 0) {
          await measureRepository.saveLocalMeasures(remoteMeasures);
        }
      }
    }
  }

  const fetchRemoteWeatherStations = async () => {
    const remoteWeatherStations = await weatherStationRepository.getRemoteWeatherStations();
    if (remoteWeatherStations.length > 0) {
      await weatherStationRepository.saveLocalWeatherStations(remoteWeatherStations, async () => {
        await fetchLocalWeatherStations();
      });
    }
  }

  React.useEffect(() => {
    const prepareData = async () => {
      if(currentWeatherStation === undefined) {
        await createTables(await db);
        await fetchRemoteWeatherStations();
      }
      else {
        await fetchMeasures();
      }
    }
    prepareData();
  }, [currentWeatherStation]);

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={theme.backgroundGradientColor}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: '100%',
        }}
      />
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
    paddingTop: 20,
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
