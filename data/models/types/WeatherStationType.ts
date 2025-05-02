import { IconNamesType } from "@/constants/IconNames";

export type WeatherStationType = {
    id: string;
    name: string;
    sensorList: IconNamesType[];
    currentStation: boolean;
    currentElementName: string;
    currentTimeline: string;
};

export default WeatherStationType;