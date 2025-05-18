// Weather service with placeholder API integration
const WeatherService = {
    // API configuration (to be replaced with real API keys)
    config: {
        baseUrl: 'https://api.openweathermap.org/data/2.5',
        apiKey: 'YOUR_API_KEY' // To be replaced with environment variable
    },

    // Get weather data for a location
    async getWeather(lat, lon) {
        // For MVP, return mock data
        return this.getMockWeather();

        // Real implementation (commented out for now)
        /*
        try {
            const response = await fetch(
                `${this.config.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.config.apiKey}&units=metric`
            );
            
            if (!response.ok) {
                throw new Error('Weather data fetch failed');
            }

            const data = await response.json();
            return this.formatWeatherData(data);
        } catch (error) {
            return utils.handleError(error, 'WeatherService.getWeather');
        }
        */
    },

    // Format weather data from API response
    formatWeatherData(data) {
        return {
            temperature: {
                celsius: Math.round(data.main.temp),
                fahrenheit: utils.celsiusToFahrenheit(data.main.temp)
            },
            condition: utils.weatherConditions[data.weather[0].icon] || 'unknown',
            description: data.weather[0].description,
            wind: {
                speed: Math.round(data.wind.speed),
                direction: data.wind.deg
            },
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            visibility: data.visibility,
            sunrise: new Date(data.sys.sunrise * 1000),
            sunset: new Date(data.sys.sunset * 1000),
            timezone: data.timezone
        };
    },

    // Mock weather data for development
    getMockWeather() {
        const mockData = {
            temperature: {
                celsius: 22,
                fahrenheit: 72
            },
            condition: 'sunny',
            description: 'Clear sky',
            wind: {
                speed: 5,
                direction: 180
            },
            humidity: 65,
            pressure: 1013,
            visibility: 10000,
            sunrise: new Date(new Date().setHours(6, 0)),
            sunset: new Date(new Date().setHours(20, 0)),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };

        return Promise.resolve(mockData);
    },

    // Get weather icon based on condition
    getWeatherIcon(condition) {
        const icons = {
            sunny: '☀️',
            clear: '🌙',
            'partly-cloudy': '⛅',
            cloudy: '☁️',
            rainy: '🌧️',
            stormy: '⛈️',
            snowy: '🌨️',
            foggy: '🌫️'
        };

        return icons[condition] || '❓';
    }
};

// Export weather service
window.WeatherService = WeatherService; 