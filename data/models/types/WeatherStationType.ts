import { IconNamesType } from "@/constants/IconNames";

export type WeatherStationType = {
    id: string;
    name: string;
    sensorList: IconNamesType[];
    currentStation: boolean;
};

export default WeatherStationType;