import React from 'react';
import WeatherStationRepository from '@/data/repositories/cache/weatherStationRepository';

export const WeatherRepositoryContext = React.createContext<WeatherStationRepository | null>(null);
