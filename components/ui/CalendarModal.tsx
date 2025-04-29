import React from "react";
import { Button, MD3Theme, Modal, Portal, useTheme } from "react-native-paper";
import {Calendar, CalendarList, Agenda, DateData} from 'react-native-calendars';
import { View, StyleSheet } from "react-native";
import { useAppDispatch } from "@/constants/hooks";
import { changeCurrentTimeline } from "@/data/slices/TimelineSlice";

export type ICalendarModalProps = {
    visible: boolean;
    onDismiss: () => void;
}

export default function CalendarModal({visible, onDismiss}: ICalendarModalProps) {    
    const theme = useTheme();
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
        if(periodBegin && periodEnd) {
            dispatch(changeCurrentTimeline({type: "Custom", customTimeline: {begin: new Date(periodBegin).getTime(), end: new Date(periodEnd).getTime()}, currentTimeline: true}));
        }
        onDismiss();
    }

    const preparedMarkedDates = (currentPeriodBegin: string | undefined, currentPeriodEnd: string | undefined) => {
        const dates: any = {};
        if (currentPeriodBegin) {
            dates[currentPeriodBegin] = {startingDay: true, color: 'green'};
        }
        if (currentPeriodEnd) {
            dates[currentPeriodEnd] = {endingDay: true, color: 'green'};
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
                result[date] = {color: 'green'};
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
