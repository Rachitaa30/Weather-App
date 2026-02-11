const API_KEY = 'dc57f7dd5fc2be74a2fe91b3fefd5c13'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherAPI {
    static async getCurrentWeather(city) {
        const response = await fetch(
            `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        return await response.json();
    }

    static async getWeatherByCoords(lat, lon) {
        const response = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('Location not found');
        }
        
        return await response.json();
    }

    static async getForecast(city) {
        const response = await fetch(
            `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('Forecast not available');
        }
        
        return await response.json();
    }

    static async getForecastByCoords(lat, lon) {
        const response = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('Forecast not available');
        }
        
        return await response.json();
    }
}