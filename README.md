# NileGuard - Water is Life 💧

## Overview

**NileGuard** is a comprehensive interactive educational web application and community platform designed for students, educators, and water advocates. The platform combines **real-time water data**, **interactive education**, **community engagement**, **school programs**, and **e-commerce** to promote water conservation awareness and environmental action.

### 🌟 What Makes NileGuard Special

✅ **Real World Data** - Live World Bank API integration showing Egypt's actual water statistics  
✅ **Interactive Learning** - Quiz-based education with PDF certificate generation  
✅ **Community Impact** - Recruit water ambassadors and track events  
✅ **School Programs** - Ready-to-use programs for educators  
✅ **Sustainability Focus** - E-commerce platform for water-saving products  
✅ **Mobile First** - Fully responsive design for all devices

## Project Highlights

## 🎯 Key Features

### 📚 Learn Page (`learn.html`)

- Water facts and global statistics
- Interactive charts (water usage, regional stress)
- Conservation tips with practical advice
- 5-question quiz with immediate scoring
- **PDF certificate generation** upon completion
- Smooth GSAP animations

### 📊 Data Page (`data.html`)

- **Live World Bank API integration** (Egypt water indicators)
- Renewable freshwater resources visualization
- Population and drinking water access statistics
- Interactive Nile River map (Leaflet.js)
- Water usage and loss trend charts
- Automatic fallback to cached data if API unavailable

### 👥 Community Page (`community.html`)

- **Ambassador recruitment form** with validation
- Create a profile as a water advocate
- View active community ambassadors
- Share your water conservation story
- Age verification (13+) and motivation collection
- Growing roster of community leaders

### 🎉 Events Page (`events.html`)

- Browse upcoming water conservation events
- Water Awareness Week, Nile Cleanup, Summit, Hackathon
- View past event impact metrics
- Event location, date, and participant information
- Scroll-triggered animations
- Join and contribute

### 🏫 For Schools Page (`schools.html`)

- Pre-designed water education programs
- Classroom Sessions (45-minute lessons)
- Hands-On Workshops (interactive experiments)
- School Challenges (team competitions)
- **School program request form**
- Partner with NileGuard for your students

### 🛒 Shop Page (`store.html`)

- Water-saving products and supplies
- Eco-friendly merchandise
- Water impact metrics per product
- Shopping cart functionality
- Contribution to water conservation projects

### ⚠️ Risk Simulator (`risk.html`)

- Interactive environmental risk assessment
- noUiSlider controls for 5 parameters
- Real-time land color visualization
- NileScore gauge (0-100)
- Risk factor analysis charts
- Smart action recommendations

### 📱 Smooth Animations & Interactions

- GSAP + ScrollTrigger animations
- Mobile-responsive design
- Animated cards and transitions
- Interactive forms with validation
- Ripple effects and hover states

## 📂 Project Structure

```
nileguard/
├── index.html                 # 🏠 Home page with navigation & CTAs
├── learn.html                 # 📚 Learning hub with quiz & certificates
├── data.html                  # 📊 World Bank API data visualization
├── community.html             # 👥 Ambassador recruitment & roster
├── events.html                # 🎉 Events and impact tracking
├── schools.html               # 🏫 School programs & request form
├── awareness.html             # 💡 Water awareness content
├── about.html                 # ℹ️ About NileGuard
├── solution.html              # 💭 Solutions and ideas
├── risk.html                  # ⚠️ Risk simulator
├── store.html                 # 🛒 E-commerce shop
│
├── assets/
│   ├── css/
│   │   ├── common.css         # Global styles, navbar, footer
│   │   ├── index.css          # Home page specific styles
│   │   ├── awareness.css      # Awareness/Learn page styles
│   │   ├── data.css           # Data page styles
│   │   ├── risk.css           # Risk simulator styles
│   │   ├── store.css          # E-commerce styles
│   │   └── style.css          # Additional component styles
│   │
│   ├── js/
│   │   ├── common.js          # Navbar, footer, shared utilities
│   │   ├── main.js            # Global initialization
│   │   ├── animations.js      # GSAP utilities
│   │   ├── data.js            # 🔴 World Bank API integration
│   │   ├── learn.js           # 🔴 Quiz, charts, certificates
│   │   ├── community.js       # 🔴 Ambassador form & roster
│   │   ├── events.js          # 🔴 Event rendering & animations
│   │   ├── schools.js         # 🔴 School form validation
│   │   ├── index.js           # Home page animations
│   │   ├── awareness.js       # Awareness animations
│   │   ├── store.js           # Shop functionality
│   │   └── simulator.js       # Risk simulator logic
│   │
│   ├── data/
│   │   └── worldbank-data.json    # Fallback data for API
│   │
│   └── img/
│       └── team/              # Team member photos
│
├── IMPLEMENTATION_SUMMARY.md  # 📖 Technical implementation details
├── STUDENT_GUIDE.md           # 🎓 Learning guide for students
├── QUICK_REFERENCE.md         # 📋 Quick lookup card
├── DEPLOYMENT_TESTING_GUIDE.md # 🚀 Deployment & testing guide
└── README.md                  # 📄 This file
```

### 🔴 New Pages Created in Latest Update

- `learn.html` - Educational content with quiz
- `community.html` - Ambassador recruitment
- `events.html` - Event management
- `schools.html` - School programs
│   │   ├── index.css          # Home page styles (hero, cards, mission)
│   │   ├── data.css           # Data page styles (maps, charts, quiz)
│   │   ├── risk.css           # Simulator styles (sliders, gauge, layout)
│   │   └── store.css          # Shop page styles (products, cart, filters)
│   │
│   ├── js/
│   │   ├── common.js          # Shared functions, initialization, utilities
│   │   ├── animations.js      # Reusable animation functions (GSAP)
│   │   ├── index.js           # Home page animations & interactions
│   │   ├── data.js            # Data page: maps, charts, quiz logic
│   │   ├── simulator.js       # Risk simulator: sliders, gauge, calculations
│   │   └── store.js           # Shop: products, cart, filtering
│   │
│   ├── img/                   # Images and icons (to be added)
│   │   └── team/              # Team member photos
│   │
│   └── data/
│       └── worldbank-data.json # Dummy data (ready for API integration)
│
├── libs/                      # External libraries (CDN-based)
├── README.md                  # This file
└── .gitignore                 # Git ignore file

```

## Technologies & Libraries

### Core Technologies

- **HTML5** - Semantic markup
- **CSS3** - Advanced styling, animations, gradients
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Bootstrap 5** - Responsive grid system

### Featured Libraries (CDN-based)

- **GSAP 3.12** + **ScrollTrigger** - Advanced animations
- **Chart.js 3.9** - Data visualization (bar, line, doughnut charts)
- **Leaflet.js 1.9** - Interactive maps
- **noUiSlider 15.7** - Range sliders for simulator
- **CountUp.js 2.0** - Animated number counters
- **html2pdf.js 0.10** - PDF certificate generation
- **Swiper 10.2** - Product carousel
- **tsParticles 2.12** - Particle animations
- **Poppins Font** - Google Fonts (friendly, readable)

## 🌐 API Integration

### World Bank Data API

NileGuard fetches **real-time water data** from the World Bank API for Egypt:

**Integrated Indicators:**
- `ER.H2O.FWTL.ZS` - Total renewable freshwater resources (% of total water resources)
- `SP.POP.TOTL` - Total population
- `SH.H2O.BASW.ZS` - Access to basic drinking-water services (% of population)

**Data Range:** 2015 - 2023

**Location:** [`assets/js/data.js`](assets/js/data.js)

**Features:**
- ✅ Automatic data fetching on page load
- ✅ Error handling with fallback to cached data
- ✅ JSON parsing and DOM injection
- ✅ Displays latest available year's data

**Example:**
```javascript
// fetch('https://api.worldbank.org/v2/country/EGY/indicator/ER.H2O.FWTL.ZS?format=json&date=2015:2023')
// Returns: Current freshwater resources percentage for Egypt
```

## Pages Overview

### 1. **index.html** - Home Page

- Hero section with animated title and water drop animation
- 3 intro cards (What/Why/How) with smooth entrance animations
- 3 mission cards (Awareness/Risk/Solutions) with floating effect
- CTA section with dual buttons
- Animated scroll progress bar
- Responsive navbar with smooth transitions

### 2. **data.html** - Data & Awareness

- **Nile Map**: Interactive Leaflet map with region markers showing water scarcity levels
- **Statistics**: 4 stat cards with CountUp.js animations
- **Charts**: Water usage distribution (doughnut) + loss trend (line chart)
- **Student Hub**:
  - 4 water-saving tips cards
  - Interactive 5-question quiz with instant feedback
  - PDF certificate generation based on score
- **Water Cycle**: Animated SVG showing evaporation, condensation, precipitation

### 3. **risk.html** - Risk Simulator

- **Left Panel**: 5 noUiSlider controls (water loss, irrigation efficiency, population, industrial, climate)
- **Center Canvas**: SVG grid that changes color (green → yellow → brown) based on risk
- **Right Panel**:
  - NileScore gauge (0-100)
  - Key metrics (available water, demand, deficit, population at risk)
  - Action recommendations (dynamic based on parameters)
- **Charts Section**: Water balance, risk trends, usage breakdown

### 4. **store.html** - Water-Saving Shop

- 8 dummy products with water-saving statistics
- Product cards with hover effects (3D tilt on desktop)
- Filter buttons (All/Home/Garden/Industrial)
- Swiper.js carousel for featured products
- Fixed cart sidebar with add/remove/quantity controls
- Cart summary with total water saved
- Checkout simulation with notifications

## Key Animations & Interactions

### GSAP Animations

- **Stagger animations** for card reveals
- **ScrollTrigger** for scroll-based animations
- **Timeline animations** for sequences
- **Parallax effects** for hero background
- **Number counter animations** with CountUp.js

### Interactive Features

- **Slider controls** (noUiSlider) with real-time updates
- **Real-time calculations** for risk level and metrics
- **Gauge needle animation** based on NileScore
- **Quiz system** with progress bar and feedback
- **Cart system** with localStorage persistence
- **Product filtering** with smooth transitions
- **Ripple effects** on buttons and cards
- **Notification toasts** for user feedback

## Getting Started

### 1. Installation

No build process needed! This is a vanilla HTML/CSS/JS project.

```bash
# Clone or download the project
cd nileguard

# Open in your browser
open index.html  # macOS
start index.html # Windows
```

### 2. Using with a Local Server (Recommended)

For better Leaflet map functionality and avoiding CORS issues:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
http-server

# Using Live Server (VS Code extension)
# Just right-click index.html and select "Open with Live Server"
```

Then visit: `http://localhost:8000`

## Features in Detail

### 🗺️ Interactive Mapping

- Leaflet.js with OpenStreetMap tiles
- Custom circle markers for Nile regions
- Pop-up information on region click
- Water scarcity visualization by region

### 📊 Data Visualization

- **Doughnut Chart**: Water usage distribution (Agriculture/Industry/Domestic)
- **Line Chart**: Water loss trends over time
- **Bar Chart**: Water balance (Available/Demand/Deficit)
- All charts with custom colors and animations

### 🎮 Risk Simulator

- 5 adjustable parameters (Water Loss, Irrigation Efficiency, Population Growth, Industrial Usage, Climate Impact)
- Real-time risk calculation (0-100 scale)
- SVG grid visualization (color changes with risk)
- NileScore gauge with smooth needle animation
- Action recommendations based on risk level
- Reset functionality to restore defaults

### 🛍️ E-commerce

- 8 sample products (showerheads, drip irrigation, recycling systems, etc.)
- Each product shows water savings in liters/year
- Shopping cart with add/remove/quantity controls
- Product filtering by category
- Cart persistence using localStorage
- Checkout simulation with notifications

### 📚 Educational Quiz

- 5 water-related knowledge questions
- Instant feedback (correct/incorrect highlighting)
- Progress bar tracking
- Final score display
- PDF certificate generation (using html2pdf)

## Customization Guide

### Adding New Products

Edit `assets/js/common.js` in the `window.dummyData.products` array:

```javascript
{
    id: 9,
    name: 'New Product',
    icon: '🌱',
    price: 49,
    waterSaved: 75000,
    category: 'garden',
    description: 'Product description'
}
```

### Adding Quiz Questions

Edit `window.dummyData.quizQuestions` in `assets/js/common.js`:

```javascript
{
    question: 'Your question here?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correct: 1  // Index of correct answer (0-3)
}
```

### Adding Nile Regions

Edit `window.dummyData.nileRegions` and update `getRegionCoordinates()` in `assets/js/data.js`:

```javascript
{ name: 'Region Name', waterScarcity: 75, population: 5.2 }
```

### Color Customization

Edit CSS variables in `assets/css/common.css`:

```css
:root {
    --primary-blue: #1E90FF;
    --primary-aqua: #00BFFF;
    --success-green: #00AA00;
    --warning-yellow: #FFDD00;
    --danger-red: #DD0000;
    /* ... more variables ... */
}
```

## API Integration (Future Enhancement)

The project is structured for easy World Bank API integration:

1. Replace dummy data in `common.js` with API calls
2. Update `data.js` to fetch real water statistics
3. Connect risk simulator calculations to actual environmental data
4. Integrate real product database via backend API

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Lazy loading for images and charts
- CSS animations (GPU-accelerated)
- Debounced scroll events
- Efficient SVG rendering
- Minimal DOM manipulation
- Optimized asset sizes

## Accessibility Features

- Semantic HTML5 markup
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast colors
- Readable fonts (16px base)
- Focus indicators on buttons

## Roadmap

### Phase 1 ✅ (Current)

- [x] Landing page with hero section
- [x] Data & awareness page with maps & charts
- [x] Risk simulator with sliders & gauge
- [x] E-commerce shop with cart
- [x] Smooth animations & interactions

### Phase 2 (Planned)

- [ ] Real World Bank API integration
- [ ] User authentication system
- [ ] Leaderboard for quiz scores
- [ ] Mobile app version
- [ ] Multiplayer simulation mode
- [ ] Video tutorials
- [ ] Social sharing features

### Phase 3 (Future)

- [ ] AR water visualization
- [ ] AI-powered recommendations
- [ ] Real payment integration
- [ ] Community forum
- [ ] Offline mode (PWA)
- [ ] Multiple language support

## Troubleshooting

### Maps not loading

- Ensure you're using a local server (see "Getting Started")
- Check browser console for CORS errors

### Charts not displaying

- Verify Canvas elements exist in HTML
- Check Chart.js library is loaded
- Open browser DevTools > Network tab

### Sliders not working

- Ensure noUiSlider CSS is loaded
- Check browser console for JavaScript errors

### Animations lagging

- Disable browser extensions that interfere with animation
- Try a different browser
- Reduce number of particles on hero section

## File Size Summary

- Total HTML: ~45 KB
- Total CSS: ~35 KB
- Total JS: ~65 KB
- Minified would be ~50% smaller
- External libraries: loaded from CDN

## Credits

**Created**: December 2025
**For**: Water Scarcity Awareness & Education
**Target Audience**: Children 11+ and educators
**License**: Open Source (Educational Use)

## Support & Contributing

For bug reports, feature requests, or contributions, please create an issue or pull request.

## Citation

If you use this project in educational contexts, please cite:
> NileGuard - Interactive Water Scarcity Awareness Platform (2025)

---

**Remember: Water is Life! 💧 Every drop counts!**
