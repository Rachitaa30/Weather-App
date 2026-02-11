class WeatherUI {
    static formatDate(timestamp) {
        return new Date(timestamp * 1000).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }

    static getWeatherIcon(iconCode) {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }

    static displayCurrentWeather(data) {
        document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('date').textContent = this.formatDate(data.dt);
        document.getElementById('temp').textContent = Math.round(data.main.temp);
        document.getElementById('feelsLike').textContent = Math.round(data.main.feels_like);
        document.getElementById('humidity').textContent = data.main.humidity;
        document.getElementById('windSpeed').textContent = (data.wind.speed * 3.6).toFixed(1);
        document.getElementById('pressure').textContent = data.main.pressure;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('weatherIcon').src = this.getWeatherIcon(data.weather[0].icon);
    }

    static displayForecast(data) {
        const forecastContainer = document.getElementById('forecastContainer');
        forecastContainer.innerHTML = '';

        // Get one forecast per day (at 12:00 PM)
        const dailyForecasts = data.list.filter(item => 
            item.dt_txt.includes('12:00:00')
        ).slice(0, 5);

        dailyForecasts.forEach(forecast => {
            const card = document.createElement('div');
            card.className = 'forecast-card';
            
            card.innerHTML = `
                <div class="forecast-date">${this.formatDate(forecast.dt)}</div>
                <img class="forecast-icon" src="${this.getWeatherIcon(forecast.weather[0].icon)}" alt="weather">
                <div class="forecast-temp">${Math.round(forecast.main.temp)}°C</div>
                <div class="forecast-desc">${forecast.weather[0].description}</div>
                <div style="margin-top: 10px; font-size: 0.9rem;">
                    💧 ${forecast.main.humidity}%
                </div>
            `;
            
            forecastContainer.appendChild(card);
        });
    }

    static showError(message) {
        const errorEl = document.getElementById('error');
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
        
        setTimeout(() => {
            errorEl.classList.add('hidden');
        }, 5000);
    }

    static toggleLoading(show) {
        const loadingEl = document.getElementById('loading');
        const weatherEl = document.getElementById('weatherContainer');
        
        if (show) {
            loadingEl.classList.remove('hidden');
            weatherEl.classList.add('hidden');
        } else {
            loadingEl.classList.add('hidden');
            weatherEl.classList.remove('hidden');
        }
    }
}