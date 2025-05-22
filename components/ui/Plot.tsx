import { useAppSelector } from "@/constants/hooks";
import Measure from "@/data/models/Measure";
import MeasureRepository from "@/data/repositories/cache/measureRepository";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { CartesianChart, Line } from "victory-native";
import { useTheme } from "react-native-paper";
import { Canvas, Circle, useFont } from '@shopify/react-native-skia';
import RobotoFont from "../../assets/fonts/Roboto-Regular.ttf";

export default function Plot() {
    const theme = useTheme();
    const font = useFont(RobotoFont, 12);
    const measureRepository = new MeasureRepository();
    const currentWeatherStation = useAppSelector(state => state.weatherStationReducer).find(station => station.currentStation);
    const [data, setData] = useState<{value: number, time: number}[]>([]);

    const [width, setWidth] = useState(0);

    const handleLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
    };

    useEffect(() => {
        const fetchData = async () => {
            const measures = await measureRepository.getLocalMeasuresFromCurrentWeatherStation();
            const results = measures
                                .filter((measure) => measure.measuredQuantityName === currentWeatherStation?.currentElementName)
                                .map((measure: Measure) => ({value: measure.value, time: measure.timestamp.getTime()}))
            setData(results);
        };

        if(currentWeatherStation) {
            fetchData();
        }
        
    }, [currentWeatherStation]);

    return (
        <View style={{ width: '100%', height: 200 }} onLayout={handleLayout}>
            <CartesianChart data={data} xKey="time" yKeys={["value"]} axisOptions={{font, formatXLabel: (label: number) => new Date(label).getHours().toString()}}>
                {({ points }) => (
                    <Line
                    points={points.value}
                    color="red"
                    strokeWidth={1}
                    animate={{ type: "timing", duration: 300 }}
                    curveType="natural"   
                    />
                )}
            </CartesianChart>
        </View>
    );
}
