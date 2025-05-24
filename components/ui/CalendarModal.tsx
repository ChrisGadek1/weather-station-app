import React from "react";
import { Button, MD3Theme, Modal, Portal, useTheme } from "react-native-paper";
import {Calendar, DateData} from 'react-native-calendars';
import { View, StyleSheet } from "react-native";
import { useAppDispatch } from "@/constants/hooks";
import WeatherStationRepository from "@/data/repositories/cache/weatherStationRepository";
import WeatherStation from "@/data/models/WeatherStation";
import Timeline from "@/data/models/Timeline";
import CustomTimeline from "@/data/models/CustomTimeline";
import WeatherStationType from "@/data/models/types/WeatherStationType";

export type ICalendarModalProps = {
    visible: boolean;
    onDismiss: () => void;
    currentWeatherStation?: WeatherStationType;
}

export default function CalendarModal({visible, onDismiss, currentWeatherStation}: ICalendarModalProps) {    
    const theme: any = useTheme();
    const weatherStationRepository = new WeatherStationRepository();
    const calendarTheme = {
        backgroundColor: theme.colors.background,
        calendarBackground: theme.colors.background,
        textSectionTitleColor: theme.colors.onBackground,
        selectedDayBackgroundColor: theme.colors.primary,
        selectedDayTextColor: theme.colors.onPrimary,
        todayTextColor: theme.colors.primary,
        dayTextColor: theme.colors.onBackground,
        textDisabledColor: theme.colors.onSurfaceDisabled ?? '#d9e1e8',
        dotColor: theme.colors.primary,
        arrowColor: theme.colors.primary,
        monthTextColor: theme.colors.onBackground,
        indicatorColor: theme.colors.primary,
        textDayFontFamily: 'System',
        textMonthFontFamily: 'System',
        textDayHeaderFontFamily: 'System',
    };

    const [periodBegin, setPeriodBegin] = React.useState<string | undefined>(undefined);
    const [periodEnd, setPeriodEnd] = React.useState<string | undefined>(undefined);
    const [markedDates, setMarkedDates] = React.useState<any>({});

    const dispatch = useAppDispatch();

    const handleCloseCalendar = () => {
        if(periodBegin && periodEnd && currentWeatherStation) {
            const newTimeline = new Timeline("Custom", new CustomTimeline(new Date(periodBegin), new Date(new Date(periodEnd).getTime() + 24 * 60 * 60 * 1000)));
            weatherStationRepository.saveLocalWeatherStations([WeatherStation.fromPlainObject({...currentWeatherStation, currentTimeline: newTimeline.toPlainObject()})], () => {
                dispatch({type: 'weatherStation/changeCurrentWeatherTimelineOfCurrentStation', payload: { currentTimeline: newTimeline.toPlainObject()} });
            });
        }
        onDismiss();
    }

    const preparedMarkedDates = (currentPeriodBegin: string | undefined, currentPeriodEnd: string | undefined) => {
        const dates: any = {};
        if (currentPeriodBegin) {
            dates[currentPeriodBegin] = {startingDay: true, color: theme.calendarDateIndicatorColor};
        }
        if (currentPeriodEnd) {
            dates[currentPeriodEnd] = {endingDay: true, color: theme.calendarDateIndicatorColor};
        }
        return {...addMissingDaysBetween(currentPeriodBegin, currentPeriodEnd), ...dates};
    }

    const addMissingDaysBetween = (start: string | undefined, end: string | undefined) => {
        const result: any = {}

        if(start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            const dates: string[] = [];

            for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
                dates.push(d.toISOString().split('T')[0]);
            }
            
            dates.forEach((date) => {
                result[date] = {color: theme.calendarDateIndicatorColor};
            })
        }
        
        return result;
    }

    const handleDayPress = (day: DateData) => {
        let currentPeriodBegin = periodBegin;
        let currentPeriodEnd = periodEnd;

        if (periodBegin === undefined) {
            setPeriodBegin(day.dateString);
            currentPeriodBegin = day.dateString;
        } else if (periodEnd === undefined) {
            setPeriodEnd(day.dateString);
            currentPeriodEnd = day.dateString;
        } else {
            setPeriodBegin(day.dateString);
            setPeriodEnd(undefined);
            currentPeriodBegin = day.dateString;
            currentPeriodEnd = undefined;
        }
        setMarkedDates(preparedMarkedDates(currentPeriodBegin, currentPeriodEnd));
    }

    return (
        <Portal>
            <Modal
                theme={theme}
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={styles(theme).modalContentContainer}>
                <Calendar
                    markingType={'period'}
                    onDayPress={handleDayPress}
                    markedDates={markedDates}
                    minDate={periodBegin && !periodEnd ? periodBegin : undefined}
                    theme={calendarTheme}
                />
                <View style={styles(theme).buttonContainer}>
                    <Button disabled={!periodBegin || !periodEnd} onPress={handleCloseCalendar}>Confirm</Button>
                </View>
            </Modal>
        </Portal>
    );
}

const styles = (theme: MD3Theme) => StyleSheet.create({
    buttonContainer: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "flex-end"
    },
    modalContentContainer: {
        padding: 20,
        margin: 20,
        borderRadius: 10,
        backgroundColor: theme.colors.background,
    }
})
