document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const locationBtn = document.getElementById('locationBtn');
    const themeBtn = document.getElementById('themeBtn');

    // Theme Management
    let isDarkMode = localStorage.getItem('theme') === 'dark';
    
    function toggleTheme() {
        isDarkMode = !isDarkMode;
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        themeBtn.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }

    // Initialize theme
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeBtn.textContent = '☀️ Light Mode';
    }

    // Weather Functions
    async function searchWeather(city) {
        if (!city.trim()) {
            WeatherUI.showError('Please enter a city name');
            return;
        }

        WeatherUI.toggleLoading(true);
        
        try {
            const [weatherData, forecastData] = await Promise.all([
                WeatherAPI.getCurrentWeather(city),
                WeatherAPI.getForecast(city)
            ]);
            
            WeatherUI.displayCurrentWeather(weatherData);
            WeatherUI.displayForecast(forecastData);
        } catch (error) {
            WeatherUI.showError('City not found. Please try again.');
            console.error(error);
        } finally {
            WeatherUI.toggleLoading(false);
        }
    }

    async function getLocationWeather() {
        WeatherUI.toggleLoading(true);
        
        if (!navigator.geolocation) {
            WeatherUI.showError('Geolocation is not supported by your browser');
            WeatherUI.toggleLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const [weatherData, forecastData] = await Promise.all([
                        WeatherAPI.getWeatherByCoords(position.coords.latitude, position.coords.longitude),
                        WeatherAPI.getForecastByCoords(position.coords.latitude, position.coords.longitude)
                    ]);
                    
                    WeatherUI.displayCurrentWeather(weatherData);
                    WeatherUI.displayForecast(forecastData);
                    cityInput.value = weatherData.name;
                } catch (error) {
                    WeatherUI.showError('Failed to fetch weather for your location');
                    console.error(error);
                } finally {
                    WeatherUI.toggleLoading(false);
                }
            },
            (error) => {
                WeatherUI.showError('Unable to get your location');
                WeatherUI.toggleLoading(false);
            }
        );
    }

    // Event Listeners
    searchBtn.addEventListener('click', () => searchWeather(cityInput.value));
    
    locationBtn.addEventListener('click', getLocationWeather);
    
    themeBtn.addEventListener('click', toggleTheme);
    
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchWeather(cityInput.value);
        }
    });

    // Load default city
    searchWeather('London');
});
