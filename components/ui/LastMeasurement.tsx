import { useAppSelector } from "@/constants/hooks";
import Measure from "@/data/models/Measure";
import MeasureRepository from "@/data/repositories/cache/measureRepository";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

export default function LastMeasurement() {
    const theme = useTheme();
    const measureRepository = new MeasureRepository();
    const [lastMeasurementsData, setLastMeasurementsData] = useState<{ [type: string]: Measure }>({})
    const currentWeatherStation = useAppSelector((state) => state.weatherStationReducer).find((station) => station.currentStation);

    useEffect(() => {
        const fetchLastMeasurement = async () => {
            if (!currentWeatherStation) {
                return;
            }
            const measures = await measureRepository.getLocalMeasuresByWeatherStation(currentWeatherStation.id);
            const sortedMeasures = measures
                                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            let index = 0;
            const currentLastMeasurementsData: { [type: string]: Measure } = {};
            while (index < sortedMeasures.length) {
                if(currentLastMeasurementsData[sortedMeasures[index].name] === undefined) {
                  currentLastMeasurementsData[sortedMeasures[index].name] = sortedMeasures[index];
                    index++;
                }
                else {
                    break;
                }
            }

            setLastMeasurementsData(currentLastMeasurementsData);
        };

        fetchLastMeasurement();
    }, [currentWeatherStation])

    const formattedTime = (timestamp: Date) => 
        `${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, '0')}-${String(timestamp.getDate()).padStart(2, '0')} ${String(timestamp.getHours()).padStart(2, '0')}:${String(timestamp.getMinutes()).padStart(2, '0')}:${String(timestamp.getSeconds()).padStart(2, '0')}`;

    return (
      <View>
        <View style={styles.titleContainer}>
          <Text style={[styles.mainTitle, { color: theme.colors.onBackground }]}>Last Measurement</Text>
          <Text style={[styles.dateText, { color: theme.colors.onBackground }]}>{lastMeasurementsData['Temperature'] ? formattedTime(lastMeasurementsData['Temperature'].timestamp) : ''}</Text>
        </View>

        <View>
          <View style={styles.mainMeasuresContainer}>
            {lastMeasurementsData['Temperature'] ? <Text style={[styles.mainMeasuresText, { color: theme.colors.primary }]}>{lastMeasurementsData['Temperature'].value + ' ' + lastMeasurementsData['Temperature'].unit}</Text> : ''}
            {lastMeasurementsData['Pressure'] ? <Text style={[styles.mainMeasuresText, { color: theme.colors.primary }]}>{lastMeasurementsData['Pressure'].value + lastMeasurementsData['Pressure'].unit}</Text> : ''}
          </View>

          {
            Object.keys(lastMeasurementsData)
            .filter((key) => key !== 'Temperature' && key !== 'Pressure')
            .map((key) => ({label: key, value: lastMeasurementsData[key].value + ' ' + lastMeasurementsData[key].unit}))
            .map(({ value, label }, idx) => (
            <View key={idx} style={styles.secondaryMeasuresContainer}>
              <Text style={[styles.secondaryMeasuresText, { color: theme.colors.onBackground }]}>{value}</Text>
              <Text style={[styles.secondaryMeasuresText, { color: theme.colors.onBackground }]}>{label}</Text>
            </View>
          ))}
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "medium",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "medium",
  },
  mainMeasuresContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 30,
    paddingBottom: 30,
  },
  secondaryMeasuresContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
  },
  mainMeasuresText: {
    fontSize: 32,
    fontWeight: "medium",
  },
  secondaryMeasuresText: {
    fontSize: 16,
    fontWeight: "medium",
    lineHeight: 20
  }
});