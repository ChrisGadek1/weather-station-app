import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export default function LastMeasurement() {
    const theme = useTheme();

    return (
      <View>
        <View style={styles.titleContainer}>
          <Text style={[styles.mainTitle, { color: theme.colors.onBackground }]}>Last Measurement</Text>
          <Text style={[styles.dateText, { color: theme.colors.onBackground }]}>2025-09-25 12:22:25</Text>
        </View>

        <View>
          <View style={styles.mainMeasuresContainer}>
            <Text style={[styles.mainMeasuresText, { color: theme.colors.primary }]}>22 C</Text>
            <Text style={[styles.mainMeasuresText, { color: theme.colors.primary }]}>1013 HPa</Text>
          </View>

          {[
            { value: '45 %', label: 'Humidity' },
            { value: '1.3 mm', label: 'Precipitation' },
            { value: '13 km/h', label: 'Wind Speed' },
            { value: 'NW', label: 'Wind Direction' },
          ].map(({ value, label }, idx) => (
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