import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator, Button, IconButton, Menu } from "react-native-paper";
import Plot from "./Plot";
import CalendarModal from "./CalendarModal";
import { WeatherElementType } from "@/data/models/types/WeatherElementType";
import { useAppDispatch, useAppSelector } from "@/constants/hooks";

export default function HistoricalMeasurements() {
    const weatherElements: WeatherElementType[] = useAppSelector(state => state.weatherElementReducer);
    const currentWeatherElement = weatherElements.find(element => element.currentElement);

    const dispatch = useAppDispatch();

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
                    anchor={currentWeatherElement ?
                        <IconButton icon={currentWeatherElement.icon} size={24} onPress={openUnitMenu} /> :
                        <Button onPress={openUnitMenu}>
                            <ActivityIndicator animating/>
                        </Button>
                    }
                    visible={unitMenuVisible}
                    onDismiss={closeUnitMenu}>
                    {weatherElements.map((element: WeatherElementType) => {
                        return (
                            <Menu.Item
                                key={element.name}
                                onPress={() => {
                                    dispatch({ type: 'weatherElement/changeCurrentWeatherElement', payload: element });
                                    closeUnitMenu();
                                }}
                                leadingIcon={element.icon}
                                title={element.name} />
                        );
                    })}
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
