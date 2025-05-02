import * as SQLite from 'expo-sqlite';

export const createTables = async (db: SQLite.SQLiteDatabase) => {
    const weatherStationsQuery = `
      CREATE TABLE IF NOT EXISTS weather_stations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          sensor_list TEXT,
          current_station INTEGER DEFAULT 0,
          current_element_name TEXT,
          current_timeline TEXT,
          PRIMARY KEY(id)
      )
    `
    const measures = `
     CREATE TABLE IF NOT EXISTS measures (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        unit TEXT,
        name TEXT,
        value REAL,
        measured_quantity_name TEXT,
        weather_station_id INTEGER,
        FOREIGN KEY(weather_station_id) REFERENCES weather_stations(id),
        PRIMARY KEY(id)
     )
    `
    
    try {
      await db.execAsync(weatherStationsQuery)
      await db.execAsync(measures)
    } catch (error) {
      console.error(error)
      throw Error(`Failed to create tables`)
    }
  }
