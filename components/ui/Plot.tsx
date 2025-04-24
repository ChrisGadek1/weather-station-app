import React from "react";
import { View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

export default function Plot() {
    const data = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];

    return (
        <View>
            <LineChart data={data}/>
        </View>
    );
}
