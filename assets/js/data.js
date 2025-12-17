/**
 * Data Page Script with World Bank API Integration
 * Fetches water & population data for Egypt and displays interactively
 */

let usageChart = null;
let lossChart = null;
let egyptWaterData = null;

/**
 * Fetch a single indicator from World Bank API
 */
async function fetchIndicator(code) {
    const url = `https://api.worldbank.org/v2/country/EGY/indicator/${code}?format=json&per_page=100&date=2015:2023`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`World Bank API error for ${code}`);
    const payload = await response.json();
    return payload[1] || [];
}

/**
 * Fetch data from World Bank API
 * Indicators: ER.H2O.FWTL.ZS (renewable freshwater), SP.POP.TOTL (population),
 * SH.H2O.BASW.ZS (access to basic drinking water)
 */
async function fetchWorldBankData() {
    const indicators = {
        renewable: 'ER.H2O.FWTL.ZS',
        population: 'SP.POP.TOTL',
        drinkingWater: 'SH.H2O.BASW.ZS'
    };

    try {
        console.log('🌍 Fetching World Bank data for Egypt...');

        const [renewableData, populationData, drinkingData] = await Promise.all([
            fetchIndicator(indicators.renewable),
            fetchIndicator(indicators.population),
            fetchIndicator(indicators.drinkingWater)
        ]);

        egyptWaterData = {
            renewable: extractLatestData(renewableData),
            population: extractLatestData(populationData),
            drinkingWater: extractLatestData(drinkingData)
        };

        console.log('✅ World Bank data loaded:', egyptWaterData);
        updateDataDisplay();
        return egyptWaterData;
    } catch (error) {
        console.warn('⚠️ World Bank API error, using placeholder data:', error);
        egyptWaterData = {
            renewable: { value: 700.4, year: 2020, label: 'm³ per capita' },
            population: { value: 105000000, year: 2023, label: 'People' },
            drinkingWater: { value: 97.3, year: 2020, label: '% with access' }
        };
        updateDataDisplay();
        return egyptWaterData;
    }
}

/**
 * Extract latest non-null data point from World Bank API response
 */
function extractLatestData(dataArray) {
    if (!dataArray || dataArray.length === 0) return null;

    for (let item of dataArray) {
        if (item.value !== null) {
            return {
                value: parseFloat(item.value),
                year: item.date,
                label: item.indicator.name
            };
        }
    }
    return null;
}

/**
 * Update displayed data with fetched values
 */
function updateDataDisplay() {
    if (!egyptWaterData) return;

    // Update renewable water stat
    const renewableEl = document.querySelector('[data-stat="renewable"]');
    if (renewableEl && egyptWaterData.renewable) {
        const statValue = renewableEl.querySelector('.stat-value');
        statValue.dataset.target = Math.round(egyptWaterData.renewable.value);
        statValue.textContent = '0';
        statValue.classList.remove('animated');
        renewableEl.querySelector('.stat-year').textContent =
            `(${egyptWaterData.renewable.year})`;
    }

    // Update population stat
    const popEl = document.querySelector('[data-stat="population"]');
    if (popEl && egyptWaterData.population) {
        const statValue = popEl.querySelector('.stat-value');
        const populationMillions = egyptWaterData.population.value / 1000000;
        statValue.dataset.target = populationMillions.toFixed(1);
        statValue.textContent = '0';
        statValue.classList.remove('animated');
        popEl.querySelector('.stat-year').textContent =
            `(${egyptWaterData.population.year})`;
    }

    // Update drinking water access
    const drinkEl = document.querySelector('[data-stat="drinking-water"]');
    if (drinkEl && egyptWaterData.drinkingWater) {
        const statValue = drinkEl.querySelector('.stat-value');
        statValue.dataset.target = egyptWaterData.drinkingWater.value.toFixed(1);
        statValue.textContent = '0';
        statValue.classList.remove('animated');
        drinkEl.querySelector('.stat-year').textContent =
            `(${egyptWaterData.drinkingWater.year})`;
    }

    // Re-run animated counters with fresh targets
    animateCounters('.stat-value');
}

/**
 * Initialize Nile River interactive map
 */
function initializeNileMap() {
    const mapElement = document.getElementById('nile-map');

    if (!mapElement || !window.L) {
        console.warn('Map element or Leaflet library not found');
        return;
    }

    const map = L.map('nile-map').setView([26.5, 30.5], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    window.dummyData.nileRegions.forEach(region => {
        const color = region.waterScarcity > 80 ? '#DD0000' : region.waterScarcity > 60 ? '#FFDD00' : '#00AA00';

        const marker = L.circleMarker(getRegionCoordinates(region.name), {
            radius: 10,
            fillColor: color,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);

        marker.bindPopup(`
            <div style="text-align: center;">
                <strong>${region.name}</strong><br>
                Water Scarcity: ${region.waterScarcity}%<br>
                Population: ${region.population}M
            </div>
        `);
    });

    console.log('✅ Nile Map initialized');
}

/**
 * Coordinates for Nile regions (dummy)
 */
function getRegionCoordinates(regionName) {
    const coordinates = {
        'Cairo': [30.0444, 31.2357],
        'Giza': [30.0131, 31.2089],
        'Alexandria': [31.2001, 29.9187],
        'Aswan': [23.9735, 32.8830],
        'Luxor': [25.6872, 32.6396],
        'Assiut': [27.1838, 31.1833]
    };

    return coordinates[regionName] || [26.5, 30.5];
}

/**
 * Initialize statistics charts
 */
function initializeCharts() {
    const usageCtx = document.getElementById('usageChart');
    if (usageCtx) {
        usageChart = new Chart(usageCtx, {
            type: 'doughnut',
            data: {
                labels: ['Agriculture', 'Industry', 'Domestic', 'Other'],
                datasets: [{
                    data: [80, 8, 11, 1],
                    backgroundColor: ['#95E1D3', '#4ECDC4', '#44A08D', '#087E8B'],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { size: 12, family: "'Poppins', sans-serif" },
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    const lossCtx = document.getElementById('lossChart');
    if (lossCtx) {
        lossChart = new Chart(lossCtx, {
            type: 'line',
            data: {
                labels: ['2015', '2017', '2019', '2021', '2023'],
                datasets: [{
                    label: 'Water Loss (%)',
                    data: [45, 43, 41, 40, 40],
                    borderColor: '#FF6B6B',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#FF6B6B',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: { font: { size: 12, family: "'Poppins', sans-serif" } }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { font: { family: "'Poppins', sans-serif" } }
                    },
                    x: {
                        ticks: { font: { family: "'Poppins', sans-serif" } }
                    }
                }
            }
        });
    }

    console.log('✅ Charts initialized');
}

/**
 * Add animations on scroll for stats
 */
function initializeStatsAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.utils.toArray('.stat-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });
}

/**
 * Initialize all Data page features
 */
function initializeDataPage() {
    console.log('📊 Initializing Data Page...');

    // Fetch World Bank data first
    fetchWorldBankData().then(() => {
        initializeNileMap();
        initializeCharts();
        initializeStatsAnimations();
        animateCounters('.stat-value');
        console.log('✅ Data Page Initialized!');
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDataPage);
} else {
    initializeDataPage();
}
