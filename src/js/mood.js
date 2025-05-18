// Mood service for calculating and managing location moods
const MoodService = {
    // Mood types and their properties
    moodTypes: {
        energetic: {
            emoji: '🕺',
            color: '#ffd700',
            description: 'Vibrant and full of energy',
            soundType: 'upbeat'
        },
        calm: {
            emoji: '🧘',
            color: '#4facfe',
            description: 'Peaceful and serene',
            soundType: 'peaceful'
        },
        mellow: {
            emoji: '🌧️',
            color: '#a8c0ff',
            description: 'Cozy and relaxed',
            soundType: 'rain'
        },
        dreamy: {
            emoji: '✨',
            color: '#b06ab3',
            description: 'Magical and mysterious',
            soundType: 'ambient'
        },
        pleasant: {
            emoji: '😊',
            color: '#7bed9f',
            description: 'Nice and comfortable',
            soundType: 'nature'
        }
    },

    // Calculate mood based on weather and time
    calculateMood(weatherData, timeData) {
        const { condition, temperature } = weatherData;
        const hour = new Date(timeData).getHours();
        const timeOfDay = utils.getTimeOfDay(hour);

        // Basic mood calculation rules
        if (condition === 'sunny' && timeOfDay === 'morning') {
            return this.getMoodData('energetic');
        }
        
        if (condition.includes('rain')) {
            return this.getMoodData('mellow');
        }
        
        if (condition === 'cloudy') {
            return this.getMoodData('calm');
        }
        
        if (timeOfDay === 'night') {
            return this.getMoodData('dreamy');
        }

        // Default mood
        return this.getMoodData('pleasant');
    },

    // Get full mood data for a mood type
    getMoodData(moodType) {
        const mood = this.moodTypes[moodType] || this.moodTypes.pleasant;
        return {
            type: moodType,
            ...mood
        };
    },

    // Get background gradient based on mood
    getMoodGradient(moodType) {
        const gradients = {
            energetic: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
            calm: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            mellow: 'linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)',
            dreamy: 'linear-gradient(135deg, #b06ab3 0%, #4568dc 100%)',
            pleasant: 'linear-gradient(135deg, #7bed9f 0%, #00d2d3 100%)'
        };

        return gradients[moodType] || gradients.pleasant;
    },

    // Get complementary colors for UI elements based on mood
    getMoodTheme(moodType) {
        const themes = {
            energetic: {
                primary: '#ffd700',
                secondary: '#ff7f50',
                text: '#2d3436'
            },
            calm: {
                primary: '#4facfe',
                secondary: '#00f2fe',
                text: '#ffffff'
            },
            mellow: {
                primary: '#a8c0ff',
                secondary: '#3f2b96',
                text: '#ffffff'
            },
            dreamy: {
                primary: '#b06ab3',
                secondary: '#4568dc',
                text: '#ffffff'
            },
            pleasant: {
                primary: '#7bed9f',
                secondary: '#00d2d3',
                text: '#2d3436'
            }
        };

        return themes[moodType] || themes.pleasant;
    },

    // Get sound theme based on mood
    getSoundTheme(moodType) {
        const sounds = {
            energetic: 'city-morning',
            calm: 'ocean-waves',
            mellow: 'rain',
            dreamy: 'night-ambience',
            pleasant: 'birds'
        };

        return sounds[moodType] || 'ambient';
    }
};

// Export mood service
window.MoodService = MoodService; 