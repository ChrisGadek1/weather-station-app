import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, IconButton } from "react-native-paper";
import Plot from "./Plot";

export default function HistoricalMeasurements() {
    return (
        <View>
            <View style={styles.mainTitleContainer}>
                <Text style={styles.mainTitle}>Historical Measurements</Text>
            </View>
            <View style={styles.menuContainer}>
                <IconButton icon={"cog"} size={24} />
                <Button onPress={() => console.log('Pressed')}>
                    Last 24h
                </Button>
            </View>
            <View style={styles.plotContainer}>
                <Plot />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    mainTitle: {
        fontSize: 20,
        fontWeight: "medium",
    },
    mainTitleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    plotContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    menuContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 12,
        paddingBottom: 12,
    }
})
