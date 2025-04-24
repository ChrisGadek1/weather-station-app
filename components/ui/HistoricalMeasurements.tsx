import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, IconButton, Menu } from "react-native-paper";
import Plot from "./Plot";
import CalendarModal from "./CalendarModal";

export default function HistoricalMeasurements() {
    const [unitMenuVisible, setUnitMenuVisible] = React.useState(false);
    const [timelineMenuVisible, setTimelineMenuVisible] = React.useState(false);
    const [calendarVisible, setCalendarVisible] = React.useState(false);

    const openUnitMenu = () => setUnitMenuVisible(true);
    const openTimelineMenu = () => setTimelineMenuVisible(true);
    const openCalendar = () => setCalendarVisible(true);
  
    const closeUnitMenu = () => setUnitMenuVisible(false);
    const closeTimelineMenu = () => setTimelineMenuVisible(false);
    const closeCalendar = () => setCalendarVisible(false);

    return (
        <View>
            <View style={styles.mainTitleContainer}>
                <Text style={styles.mainTitle}>Historical Measurements</Text>
            </View>
            <View style={styles.menuContainer}>
                
                <Menu
                    anchor={<IconButton icon={"thermometer"} size={24} onPress={openUnitMenu} />}
                    visible={unitMenuVisible}
                    onDismiss={closeUnitMenu}>
                    <Menu.Item onPress={closeUnitMenu} leadingIcon={"thermometer"} title="Temperature" />
                    <Menu.Item onPress={closeUnitMenu} leadingIcon={"water"} title="Humidity" />
                    <Menu.Item onPress={closeUnitMenu} leadingIcon={"weather-rainy"} title="Precipitation" />
                    <Menu.Item onPress={closeUnitMenu} leadingIcon={"weather-windy"} title="Wind Speed" />
                    <Menu.Item onPress={closeUnitMenu} leadingIcon={"weight"} title="Pressure" />
                </Menu>
                <Menu
                    anchor={<Button onPress={openTimelineMenu}>Last 24h</Button>}
                    visible={timelineMenuVisible}
                    onDismiss={closeTimelineMenu}>
                    <Menu.Item onPress={closeTimelineMenu} title="Last 24h" />
                    <Menu.Item onPress={closeTimelineMenu} title="Last 7 days" />
                    <Menu.Item onPress={closeTimelineMenu} title="Last 30 days" />
                    <Menu.Item onPress={closeTimelineMenu} title="Last year" />
                    <Menu.Item onPress={closeTimelineMenu} title="All time" />
                    <Menu.Item onPress={() => {
                        openCalendar();
                        closeTimelineMenu();
                    }} title="Custom" />
                </Menu>
            </View>
            <CalendarModal visible={calendarVisible} onDismiss={closeCalendar} />
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
