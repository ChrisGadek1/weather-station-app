import React from "react";
import { View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useTheme } from "react-native-paper";

export default function Plot() {
    const theme = useTheme();
    const data = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];

    return (
        <View style={{ padding: 10 }}>
            <LineChart
                data={data}
                color={theme.colors.primary}
                yAxisColor={theme.colors.outline}
                xAxisColor={theme.colors.outline}
                textColor={theme.colors.onBackground}
                hideDataPoints={false}
                showVerticalLines={true}
                showXAxisIndices={true}
                thickness={2}
                spacing={40}
                areaChart={false}
                yAxisTextStyle={{ color: theme.colors.onBackground }}
                xAxisLabelTextStyle={{ color: theme.colors.onBackground }}
                dataPointsColor={theme.colors.primary}
                xAxisIndicesColor={theme.colors.outline}
                curved
            />
        </View>
    );
}
