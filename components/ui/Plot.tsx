import { useAppSelector } from "@/constants/hooks";
import Measure from "@/data/models/Measure";
import MeasureRepository from "@/data/repositories/cache/measureRepository";
import React, { useEffect, useState } from "react";
import { View, Text as NativeText } from "react-native";
import { CartesianChart, Line } from "victory-native";
import { useTheme } from "react-native-paper";
import { Canvas, Circle, useFont, Text } from '@shopify/react-native-skia';
import RobotoFont from "../../assets/fonts/Roboto-Regular.ttf";
import { filterMeasuresByTimeline, generateFormattedTimeLabels, generateHourlyTimeLabels, generateTimeLabels, getTimelineLabel } from "@/constants/PlotUtils";
import Timeline from "@/data/models/Timeline";

export default function Plot() {
    const theme = useTheme();
    const font = useFont(RobotoFont, 12);
    const biggerFont = useFont(RobotoFont, 14);
    const measureRepository = new MeasureRepository();
    const currentWeatherStation = useAppSelector(state => state.weatherStationReducer).find(station => station.currentStation);
    const [data, setData] = useState<{value: number, time: number, unit: string}[]>([]);
    const currentTimeline = currentWeatherStation?.currentTimeline;

    const [width, setWidth] = useState(0);

    const handleLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
    };

    function generateYTicks(data: { value: number }[]) {
        if (data.length === 0) return [];
        
        const values = data.map(d => d.value);
        const min = Math.min(...values);
        const max = Math.max(...values);
        
        const step = Math.max(Math.round((max - min) / 4), 1);
        const ticks = [];
        
        for (let val = Math.floor(min); val <= max; val += step) {
            ticks.push(val);
        }
        
        return ticks;
    }

    useEffect(() => {
        const fetchData = async () => {
            if(currentTimeline) {
                const measures = await measureRepository.getLocalMeasuresFromCurrentWeatherStation();
                const results = filterMeasuresByTimeline(measures, Timeline.fromPlainObject(currentTimeline))
                                    .filter((measure) => measure.measuredQuantityName === currentWeatherStation?.currentElementName)
                                    .map((measure: Measure) => ({value: measure.value, time: measure.timestamp.getTime(), unit: measure.unit}));
                setData(results);
            }
        };

        if(currentWeatherStation) {
            fetchData();
        }
        
    }, [currentWeatherStation, currentTimeline]);

    return (
        <View style={{ width: '100%', height: 200 }} onLayout={handleLayout}>
            {data.length > 0 ? <>
                <Canvas style={{ position: "absolute", top: -10, left: 0, height: 20, width: 100 }}>
                    <Text
                        x={0}
                        y={15}
                        text={data.length > 0 ? data[0].unit : ''}
                        font={biggerFont}
                        color={theme.colors.onBackground}
                    />
                </Canvas>
                <CartesianChart 
                    domainPadding={{top: 23, bottom: 5}}
                    data={data} 
                    xKey="time" 
                    yKeys={["value"]} 
                    axisOptions={{
                        font,
                        tickValues: {
                            x: currentTimeline ? generateTimeLabels(Timeline.fromPlainObject(currentTimeline)) : [],
                            y: generateYTicks(data),
                        },
                        formatXLabel: currentTimeline ? generateFormattedTimeLabels(Timeline.fromPlainObject(currentTimeline)) : () => "",
                        labelColor: theme.colors.onBackground,
                        lineColor: theme.colors.onSecondaryContainer,
                    }}
                    >
                    {({ points }) => (
                        <Line
                        points={points.value}
                        color={theme.colors.primary}
                        strokeWidth={1}
                        animate={{ type: "timing", duration: 300 }}
                        />
                    )}
                </CartesianChart>
                {font && (
                    <Canvas style={{ position: "absolute", bottom: -15, left: 0, height: 20, width: 100 }}>
                        <Text
                            x={0}
                            y={15}
                            text={currentTimeline ? getTimelineLabel(Timeline.fromPlainObject(currentTimeline)) : ''}
                            font={font}
                            color={theme.colors.onBackground}
                        />
                    </Canvas>
                )}
            </> : <View style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <NativeText style={{color: theme.colors.onBackground, fontSize: 20}}>No data</NativeText>
                </View>}
            
        </View>
    );
}
