import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator, Button, IconButton, Menu, useTheme } from "react-native-paper";
import Plot from "./Plot";
import CalendarModal from "./CalendarModal";
import { WeatherElementType } from "@/data/models/types/WeatherElementType";
import { useAppDispatch, useAppSelector } from "@/constants/hooks";
import Timeline from "@/data/models/Timeline";
import { TimelineType } from "@/data/models/types/Timeline";
import WeatherStationRepository from "@/data/repositories/cache/weatherStationRepository";
import WeatherStation from "@/data/models/WeatherStation";

export default function HistoricalMeasurements() {
    const theme = useTheme();
    const weatherStationRepository = new WeatherStationRepository();
    const currentWeatherStation = useAppSelector(state => state.weatherStationReducer).find(station => station.currentStation);
    const weatherElements: WeatherElementType[] = useAppSelector(state => state.weatherElementReducer);
    const currentWeatherElement = weatherElements.find(element => element.currentElement);

    const timelines: TimelineType[] = useAppSelector(state => state.timelineReducer);
    const currentTimeline = timelines.find(timeline => timeline.currentTimeline);


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
                <Text style={[styles.mainTitle, { color: theme.colors.onBackground }]}>Historical Measurements</Text>
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
                                    if(currentWeatherStation) {
                                        weatherStationRepository.saveLocalWeatherStations([WeatherStation.fromPlainObject({...currentWeatherStation, currentElementName: element.name})], () => {
                                            dispatch({ type: 'weatherElement/changeCurrentWeatherElement', payload: element });
                                            closeUnitMenu();
                                        })
                                    }
                                }}
                                leadingIcon={element.icon}
                                title={element.name} />
                        );
                    })}
                </Menu>
                <Menu
                    anchor={
                        currentTimeline ?
                        <Button onPress={openTimelineMenu}>{currentTimeline.type}</Button> :
                        <Button onPress={openTimelineMenu}>
                            <ActivityIndicator animating/>
                        </Button>
                    }
                    visible={timelineMenuVisible}
                    onDismiss={closeTimelineMenu}>
                        {timelines
                            .map(t => Timeline.fromPlainObject(t))
                            .map((timeline: Timeline) => {
                                return (
                                    <Menu.Item
                                        key={timeline.type}
                                        onPress={() => {
                                            if(timeline.type !== 'Custom') {
                                                weatherStationRepository.saveLocalWeatherStations([WeatherStation.fromPlainObject({...currentWeatherStation, currentTimeline: timeline})], () => {
                                                    dispatch({ type: 'timeline/changeCurrentTimeline', payload: timeline.toPlainObject() });
                                                })
                                            } else {
                                                openCalendar();
                                            }
                                            closeTimelineMenu();
                                        }}
                                        title={timeline.type} 
                                    />
                                );
                            })
                        }
                </Menu>
            </View>
            <CalendarModal visible={calendarVisible} onDismiss={closeCalendar} currentWeatherStation={currentWeatherStation} />
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
