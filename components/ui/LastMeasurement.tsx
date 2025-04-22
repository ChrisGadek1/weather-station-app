import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LastMeasurement() {
    return (
        <View>

            <View style={styles.titleContainer}>
                <Text style={styles.mainTitle}>Last Measurement</Text>
                <Text style={styles.dateText}>2025-09-25 12:22:25</Text>
            </View>
            <View>
                <View style={styles.mainMeasuresContainer}>
                    <Text style={styles.mainMeasuresText}>22 C</Text>
                    <Text style={styles.mainMeasuresText}>1013 HPa</Text>
                </View>
                <View style={styles.secondaryMeasuresContainer}>
                    <Text style={styles.secondaryMeasuresText}>45 %</Text>
                    <Text style={styles.secondaryMeasuresText}>Humidity</Text>
                </View>
                <View style={styles.secondaryMeasuresContainer}>
                    <Text style={styles.secondaryMeasuresText}>1.3 mm</Text>
                    <Text style={styles.secondaryMeasuresText}>Precipitation</Text>
                </View>
                <View style={styles.secondaryMeasuresContainer}>
                    <Text style={styles.secondaryMeasuresText}>13 km/h</Text>
                    <Text style={styles.secondaryMeasuresText}>Wind Speed</Text>
                </View>
                <View style={styles.secondaryMeasuresContainer}>
                    <Text style={styles.secondaryMeasuresText}>NW</Text>
                    <Text style={styles.secondaryMeasuresText}>Wind direction</Text>
                </View>
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