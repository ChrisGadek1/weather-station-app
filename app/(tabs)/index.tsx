import HistoricalMeasurements from '@/components/ui/HistoricalMeasurements';
import LastMeasurement from '@/components/ui/LastMeasurement';
import TopMenu from '@/components/ui/TopMenu';
import { Image, StyleSheet, Platform, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
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
