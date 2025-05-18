// Sound service for managing ambient audio
const SoundService = {
    // Audio context and current sound
    context: null,
    currentSound: null,
    gainNode: null,
    
    // Sound files mapping (to be replaced with actual audio files)
    sounds: {
        'city-morning': 'assets/sounds/city-morning.mp3',
        'ocean-waves': 'assets/sounds/ocean-waves.mp3',
        'rain': 'assets/sounds/rain.mp3',
        'night-ambience': 'assets/sounds/night-ambience.mp3',
        'birds': 'assets/sounds/birds.mp3',
        'ambient': 'assets/sounds/ambient.mp3'
    },

    // Initialize audio context
    init() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.context = new AudioContext();
            this.gainNode = this.context.createGain();
            this.gainNode.connect(this.context.destination);
            this.gainNode.gain.value = 0.5; // Default volume
        } catch (error) {
            console.error('Web Audio API is not supported in this browser');
            return false;
        }
        return true;
    },

    // Load and play a sound
    async playSound(soundType) {
        // For MVP, return mock sound player
        return this.getMockSoundPlayer(soundType);

        /* Real implementation (commented out for now)
        try {
            if (!this.context) {
                if (!this.init()) return;
            }

            // Stop current sound if playing
            if (this.currentSound) {
                await this.stopSound();
            }

            const soundFile = this.sounds[soundType];
            if (!soundFile) {
                throw new Error(`Sound type "${soundType}" not found`);
            }

            const response = await fetch(soundFile);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.context.decodeAudioData(arrayBuffer);

            const source = this.context.createBufferSource();
            source.buffer = audioBuffer;
            source.loop = true;
            source.connect(this.gainNode);
            source.start(0);

            this.currentSound = source;
            return true;
        } catch (error) {
            console.error('Error playing sound:', error);
            return false;
        }
        */
    },

    // Stop current sound
    async stopSound() {
        if (this.currentSound) {
            try {
                this.currentSound.stop();
                this.currentSound.disconnect();
                this.currentSound = null;
                return true;
            } catch (error) {
                console.error('Error stopping sound:', error);
                return false;
            }
        }
        return true;
    },

    // Set volume (0.0 to 1.0)
    setVolume(volume) {
        if (this.gainNode) {
            this.gainNode.gain.value = Math.max(0, Math.min(1, volume));
            return true;
        }
        return false;
    },

    // Mock sound player for development
    getMockSoundPlayer(soundType) {
        console.log(`Playing ${soundType} sound (mock)`);
        return Promise.resolve({
            isPlaying: true,
            soundType,
            volume: 0.5,
            duration: 120 // Mock duration in seconds
        });
    },

    // Get sound duration (in seconds)
    getSoundDuration(soundType) {
        const durations = {
            'city-morning': 180,
            'ocean-waves': 240,
            'rain': 300,
            'night-ambience': 260,
            'birds': 120,
            'ambient': 200
        };
        return durations[soundType] || 180;
    }
};

// Export sound service
window.SoundService = SoundService; 