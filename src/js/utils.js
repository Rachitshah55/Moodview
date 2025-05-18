// Utility functions for the application

// Time formatting
function formatTime(date, timezone) {
    return new Date(date).toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

// Temperature conversion
function celsiusToFahrenheit(celsius) {
    return Math.round((celsius * 9/5) + 32);
}

function fahrenheitToCelsius(fahrenheit) {
    return Math.round((fahrenheit - 32) * 5/9);
}

// Weather condition mapping
const weatherConditions = {
    '01d': 'sunny',
    '01n': 'clear',
    '02d': 'partly-cloudy',
    '02n': 'partly-cloudy',
    '03d': 'cloudy',
    '03n': 'cloudy',
    '04d': 'cloudy',
    '04n': 'cloudy',
    '09d': 'rainy',
    '09n': 'rainy',
    '10d': 'rainy',
    '10n': 'rainy',
    '11d': 'stormy',
    '11n': 'stormy',
    '13d': 'snowy',
    '13n': 'snowy',
    '50d': 'foggy',
    '50n': 'foggy'
};

// Mood calculation based on weather and time
function calculateMood(weatherCondition, temperature, timeOfDay) {
    // Simple mood calculation logic (to be expanded)
    if (weatherCondition.includes('sun') && timeOfDay === 'morning') {
        return {
            mood: 'energetic',
            emoji: '🕺',
            description: 'Perfect morning weather!'
        };
    } else if (weatherCondition.includes('rain')) {
        return {
            mood: 'mellow',
            emoji: '🌧️',
            description: 'A cozy, rainy atmosphere'
        };
    } else if (weatherCondition.includes('cloud')) {
        return {
            mood: 'calm',
            emoji: '🧘',
            description: 'Peaceful cloudy day'
        };
    } else if (timeOfDay === 'night') {
        return {
            mood: 'dreamy',
            emoji: '✨',
            description: 'Magical night vibes'
        };
    }
    
    // Default mood
    return {
        mood: 'pleasant',
        emoji: '😊',
        description: 'Nice weather today'
    };
}

// Get time of day
function getTimeOfDay(hour) {
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 20) return 'evening';
    return 'night';
}

// Error handling
function handleError(error, context = '') {
    console.error(`Error ${context}:`, error);
    return {
        isError: true,
        message: error.message || 'An unexpected error occurred',
        context
    };
}

// Local storage helpers
const storage = {
    save: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Storage save error:', error);
            return false;
        }
    },
    
    load: (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Storage load error:', error);
            return null;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Storage remove error:', error);
            return false;
        }
    }
};

// Export utilities
window.utils = {
    formatTime,
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    weatherConditions,
    calculateMood,
    getTimeOfDay,
    handleError,
    storage
}; 