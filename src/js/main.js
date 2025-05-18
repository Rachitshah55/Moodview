// Main application logic
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const locationSearch = document.getElementById('locationSearch');
    const detectLocationBtn = document.getElementById('detectLocation');
    const locationsGrid = document.getElementById('locationsGrid');
    const loadingState = document.getElementById('loadingState');
    const locationModal = document.getElementById('locationModal');

    // State management (temporary, replace with proper state management if needed)
    const state = {
        currentLocation: null,
        locations: new Map(), // Store location data
        activeCard: null,
    };

    // Event Listeners
    detectLocationBtn.addEventListener('click', handleLocationDetection);
    locationSearch.addEventListener('input', debounce(handleLocationSearch, 300));
    
    // Close modal on click outside
    locationModal.addEventListener('click', (e) => {
        if (e.target === locationModal) {
            closeModal();
        }
    });

    // Initialize the application
    init();

    // Core Functions
    async function init() {
        showLoading();
        try {
            // For MVP, we'll just detect the current location on load
            await handleLocationDetection();
        } catch (error) {
            console.error('Initialization failed:', error);
            // Show error state
            locationsGrid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <p class="text-xl text-gray-400">Unable to load location data.</p>
                    <button onclick="handleLocationDetection()" 
                            class="mt-4 px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">
                        Retry
                    </button>
                </div>
            `;
        } finally {
            hideLoading();
        }
    }

    // Placeholder: Location detection (replace with real geolocation)
    async function handleLocationDetection() {
        showLoading();
        try {
            // Placeholder data (replace with real API calls)
            const mockLocation = {
                city: "New York",
                country: "USA",
                coords: { lat: 40.7128, lng: -74.0060 },
                weather: {
                    temp: 72,
                    condition: "sunny",
                    wind: 5
                },
                timezone: "America/New_York"
            };

            await addLocationCard(mockLocation);
        } catch (error) {
            console.error('Location detection failed:', error);
            // Show error in UI
        } finally {
            hideLoading();
        }
    }

    // Placeholder: Location search (replace with real API integration)
    async function handleLocationSearch(event) {
        const searchTerm = event.target.value.trim();
        if (searchTerm.length < 2) return;

        // Placeholder for search API call
        console.log('Searching for:', searchTerm);
        // Implement actual search functionality
    }

    // UI Functions
    function addLocationCard(location) {
        const card = createLocationCard(location);
        locationsGrid.appendChild(card);
        state.locations.set(location.city, location);
    }

    function createLocationCard(location) {
        const card = document.createElement('div');
        card.className = 'location-card bg-gray-800 rounded-lg overflow-hidden shadow-lg';
        
        // Get weather class based on condition
        const weatherClass = `weather-${location.weather.condition.toLowerCase()}`;
        
        card.innerHTML = `
            <div class="relative h-48 ${weatherClass}">
                <div class="absolute inset-0 bg-black bg-opacity-40 p-4">
                    <div class="flex justify-between items-start">
                        <h2 class="text-2xl font-bold">${location.city}</h2>
                        <div class="text-right">
                            <div class="text-xl">${location.weather.temp}°F</div>
                            <div class="text-sm">${location.weather.condition}</div>
                        </div>
                    </div>
                    <div class="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div class="text-sm opacity-90">
                            ${new Date().toLocaleTimeString('en-US', { timeZone: location.timezone })}
                        </div>
                        <button class="sound-control p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75">
                            🔊
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add click handler to open modal
        card.addEventListener('click', () => openModal(location));

        return card;
    }

    function openModal(location) {
        const modalContent = `
            <div class="modal-content">
                <div class="flex justify-between items-start mb-6">
                    <h2 class="text-3xl font-bold">${location.city}, ${location.country}</h2>
                    <button onclick="closeModal()" class="text-gray-500 hover:text-white">
                        ✕
                    </button>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="bg-gray-700 p-4 rounded-lg">
                        <h3 class="text-lg mb-2">Weather</h3>
                        <p class="text-2xl">${location.weather.temp}°F</p>
                        <p>${location.weather.condition}</p>
                        <p>Wind: ${location.weather.wind} mph</p>
                    </div>
                    <div class="bg-gray-700 p-4 rounded-lg">
                        <h3 class="text-lg mb-2">Mood</h3>
                        <p class="text-2xl mood-energetic">Energetic</p>
                        <p>Based on weather and time</p>
                    </div>
                </div>

                <div class="bg-gray-700 p-4 rounded-lg mb-6">
                    <h3 class="text-lg mb-2">Ambient Sound</h3>
                    <div class="flex items-center space-x-4">
                        <button class="sound-control p-3 rounded-full bg-gray-600 hover:bg-gray-500">
                            🔊
                        </button>
                        <div class="flex-1">
                            <div class="h-2 bg-gray-600 rounded-full">
                                <div class="h-full w-1/3 bg-blue-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-sm text-gray-400">
                    Last updated: ${new Date().toLocaleTimeString()}
                </div>
            </div>
        `;

        locationModal.querySelector('div > div').innerHTML = modalContent;
        locationModal.classList.remove('hidden');
        locationModal.classList.add('flex');
        state.activeCard = location;
    }

    function closeModal() {
        locationModal.classList.remove('flex');
        locationModal.classList.add('hidden');
        state.activeCard = null;
    }

    function showLoading() {
        loadingState.classList.remove('hidden');
    }

    function hideLoading() {
        loadingState.classList.add('hidden');
    }

    // Utility Functions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}); 