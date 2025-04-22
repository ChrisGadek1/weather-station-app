import LastMeasurement from '@/components/ui/LastMeasurement';
import TopMenu from '@/components/ui/TopMenu';
import { Image, StyleSheet, Platform, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TopMenu />
        <Divider />
        <View style={styles.lastMeasurementOuterContainer}>
          <View style={styles.lastMeasurementInnerContainer}>
            <LastMeasurement />
          </View>
        </View>
        
        
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  lastMeasurementOuterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  lastMeasurementInnerContainer: {
    width: '85%',
  }
});
