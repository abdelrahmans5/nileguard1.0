# NileGuard Quick Start Guide for Students 🌊

This section adds a step-by-step teaching plan for 4 short sessions and splits tasks across 6 students (~13 years old) with clear focus points.

## Teaching Plan (4 Sessions)

### Session 1 – Kickoff & Tiny Wins (60–90 min)

- Learn: What HTML/CSS/JS are, how `index.html` loads linked files.
- Tools: VS Code + Live Server, Chrome DevTools.
- Do:
  - Change hero subtitle in `index.html`.
  - Add one partner card under “Our Partners”.
  - Update one Team card `role` or `blurb`.
- Focus: Don’t break tags; change only inner text; preview via Live Server.

### Session 2 – CSS Basics (60 min)

- Learn: Classes and page styles in `assets/css/index.css` and `assets/css/common.css`.
- Do:
  - Adjust hero button color or padding in `index.css`.
  - Tweak section spacing for readability.
- Focus: Small, reversible changes; check visual consistency.

### Session 3 – JavaScript Intro (45–60 min)

- Learn: Where JS lives (`assets/js/index.js`, `assets/js/common.js`).
- Do:
  - Add smooth scroll for the “Learn More” button to `#intro`.
- Focus: Use `querySelector`, check elements exist, keep code short.

### Session 4 – Quality, Mobile, Share (45 min)

- Learn: Mobile testing (DevTools responsive), link consistency, simple Git commit.
- Do:
  - Verify navbar/footer links work; ensure “Donate” → `risk.html`.
  - Commit: `Update hero text, partner card, and team blurb`.
- Focus: Spelling, spacing, button labels, mobile layout.

## Roles for 6 Students

- Student 1: Hero section owner – text & buttons.
- Student 2: Partners – add/update cards, keep grid neat.
- Student 3: Team – update roles/blurbs, remove duplicates.
- Student 4: CSS stylist – spacing & button colors in `index.css`.
- Student 5: JS helper – smooth scroll in `assets/js/index.js`.
- Student 6: QA/Mobile – test responsive view, note improvements.

Rotate roles next session so everyone touches HTML, CSS, and JS.

## Smooth Scroll Starter (optional)

Add to `assets/js/index.js`:

```js
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.scroll-btn');
  const target = document.querySelector('#intro');
  if (btn && target) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
```

## Safety Checklist Before Commit

- Page loads without console errors.
- Navbar/footer links work.
- Mobile view looks good (spacing, readable text).
- Changes are clear and spelled correctly.

Welcome to the NileGuard water education platform! This guide will help you understand and extend the project.

---

## 🎯 What is NileGuard?

NileGuard is a web-based platform that educates people about water conservation, tracks water-related data, and builds a community of water advocates. It combines:

- 📚 Educational content (Learn page)
- 📊 Real data visualization (Data page with World Bank API)
- 👥 Community engagement (Ambassador program, Events)
- 🏫 School programs (For Schools page)
- 🛒 E-commerce (Store)

---

## 📂 Project File Structure

```
Learn the project layout:
├── index.html            ← Home page (main entry point)
├── learn.html            ← Educational content with quiz
├── data.html             ← Data visualization dashboard
├── community.html        ← Ambassador recruitment
├── events.html           ← Event listings
├── schools.html          ← School programs
├── awareness.html        ← Water awareness
├── about.html            ← About the organization
├── risk.html             ← Risk simulator
├── store.html            ← Shop
│
└── assets/
    ├── css/              ← Styling files
    ├── js/               ← JavaScript functionality
    ├── data/             ← Data files (JSON)
    └── img/              ← Images
```

---

## 🚀 Getting Started

### 1. **Open the Project**

```bash
# Navigate to the project folder
cd nileguard

# Open index.html in your browser
# (Or use Live Server extension in VS Code)
```

### 2. **Explore Each Page**

- **Home (index.html)** - Main landing page with navigation
- **Learn (learn.html)** - Water facts, charts, quiz
- **Data (data.html)** - Live World Bank data
- **Community (community.html)** - Join as ambassador
- **Events (events.html)** - Upcoming water events
- **Schools (schools.html)** - Educational programs

### 3. **Open Developer Tools**

```
Press: F12 (or Ctrl+Shift+I on Windows/Linux, Cmd+Option+I on Mac)
```

This shows:

- Console (for error messages)
- Elements (to inspect HTML)
- Network (to see API calls)

---

## 🔧 Key Technologies Used

| Technology | Purpose | Files |
|---|---|---|
| HTML5 | Page structure | *.html |
| CSS3 | Styling & layout | assets/css/*.css |
| JavaScript | Interactivity | assets/js/*.js |
| Bootstrap 5 | Responsive grid | CSS link in HTML |
| Chart.js | Data visualization | learn.html, data.html |
| GSAP | Animations | Common in *.html |
| World Bank API | Real water data | data.js |

---

## 📊 Understanding the Data Flow

### Example: How the Data Page Works

```
1. Page loads → data.html is opened
2. JavaScript runs → assets/js/data.js executes
3. fetchWorldBankData() function is called
4. Request sent → https://api.worldbank.org/v2/...
5. Data received → JSON response parsed
6. HTML updated → Numbers displayed on page
7. Chart rendered → Visual representation
```

**Try it yourself:**

1. Open `data.html` in browser
2. Open DevTools (F12)
3. Go to "Network" tab
4. Watch the API call happen
5. See the response in "Response" tab

---

## 💻 Modifying the Code

### Example 1: Change Quiz Question

**File:** `assets/js/learn.js`

**Current code:**

```javascript
const quizData = [
  {
    question: "What percentage of Earth's water is freshwater?",
    options: ["25%", "3%", "50%", "75%"],
    correct: 1
  },
  // ... more questions
];
```

**To modify:**

1. Open `assets/js/learn.js` in editor
2. Find the `quizData` array
3. Change the question text
4. Update options array (new answers)
5. Update `correct: 1` to point to right answer (0 = first, 1 = second, etc.)
6. Save file (Ctrl+S)
7. Refresh browser (F5)

---

### Example 2: Add New Ambassador

**File:** `assets/js/community.js`

**Current code:**

```javascript
let ambassadorsData = [
  {
    name: "Ahmed Mohamed",
    age: 20,
    country: "Egypt",
    motivation: "Passionate about water...",
    avatar: "👨‍🎓"
  },
  // ... more ambassadors
];
```

**To add new:**

1. Open `assets/js/community.js`
2. Find the `ambassadorsData` array
3. Add new object at the end:

```javascript
{
  name: "Your Name",
  age: 18,
  country: "Egypt",
  motivation: "I want to help...",
  avatar: "👨‍💼"  // Choose emoji
}
```

4. Save and refresh browser

---

### Example 3: Change Chart Colors

**File:** `assets/js/learn.js`

**Find this code:**

```javascript
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Agriculture', 'Industry', 'Domestic'],
    datasets: [{
      data: [70, 19, 11],
      backgroundColor: ['#0066cc', '#17a2b8', '#20c997'],  // ← Colors here
      borderColor: '#fff',
      borderWidth: 2
    }]
  }
});
```

**To change:**

- Find hex color codes (#0066cc = blue)
- Use websites like [colorpicker.com](https://colorpicker.com)
- Replace hex codes
- Save and refresh

---

## 🌐 Working with the World Bank API

### Understanding API Integration

**File:** `assets/js/data.js`

The function that fetches data:

```javascript
async function fetchWorldBankData() {
  const indicators = {
    'renewable': 'ER.H2O.FWTL.ZS',
    'population': 'SP.POP.TOTL',
    'drinking_water': 'SH.H2O.BASW.ZS'
  };
  
  // Fetch each indicator
  for (const [key, indicator] of Object.entries(indicators)) {
    const url = `https://api.worldbank.org/v2/country/EGY/indicator/${indicator}?...`;
    const response = await fetch(url);
    // ... process response
  }
}
```

### Add a New Indicator

1. Find your indicator code at [World Bank Data](https://data.worldbank.org/)
2. In `data.js`, add to `indicators` object:

```javascript
indicators['new_stat'] = 'NEW.INDICATOR.CODE';
```

3. Add to HTML in `data.html`:

```html
<div class="stat-card" data-stat="new_stat">
  <h3 id="new-stat">--</h3>
  <p>Stat Description</p>
</div>
```

---

## 🎨 Customizing Styles

### Common CSS Changes

**File:** `assets/css/common.css` or page-specific CSS

**Change navbar color:**

```css
.navbar {
  background: linear-gradient(135deg, #0066cc 0%, #00b4d8 100%);
  /* OR */
  background-color: #0066cc;
}
```

**Change button colors:**

```css
.btn-primary {
  background-color: #0066cc;
  border-color: #0066cc;
}

.btn-primary:hover {
  background-color: #004da6;
}
```

**Change font sizes:**

```css
h1 { font-size: 3rem; }    /* Large headers */
p { font-size: 1rem; }     /* Regular text */
.small-text { font-size: 0.875rem; }
```

---

## ✅ Form Validation

### How Forms Work

**Community Ambassador Form** (community.html):

1. User fills form
2. JavaScript validates (age >= 13)
3. If valid → adds to `ambassadorsData` array
4. If invalid → shows error message
5. Display updates automatically

**Checking validation in code:**

```javascript
// In assets/js/community.js
const age = parseInt(document.getElementById('ambasAge').value);
if (age < 13) {
  showMessage('Age must be at least 13', 'error');
  return;
}
```

### Adding New Validation

```javascript
// Example: Require name to be at least 3 characters
const name = document.getElementById('ambasName').value;
if (name.length < 3) {
  showMessage('Name must be at least 3 characters', 'error');
  return;
}
```

---

## 🎬 Understanding Animations

### GSAP ScrollTrigger Animations

**What it does:** Animates elements when they scroll into view

**Example from events.js:**

```javascript
gsap.utils.toArray('.event-card').forEach((element, index) => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    delay: index * 0.1
  });
});
```

**How to use:**

1. Add class to element: `<div class="event-card">`
2. Element animates when visible in viewport
3. Delay between items: `delay: index * 0.1` (100ms gap)

---

## 🐛 Debugging Tips

### 1. Check Browser Console (F12)

**Common errors:**

```
Uncaught ReferenceError: x is not defined
→ Check variable spelling

Uncaught TypeError: Cannot read property 'value' of null
→ Element ID doesn't exist, check HTML

SyntaxError: Unexpected token }
→ Missing comma or bracket
```

### 2. Use Console Logs

```javascript
console.log('Data:', data);      // Print variables
console.log('Form submitted');   // Track execution
console.error('Error message');  // Red error text
console.warn('Warning message'); // Yellow warning
```

### 3. Check Network Tab

- See API calls
- Check response status (200 = success, 404 = not found)
- View returned data

### 4. Inspect Elements

- Right-click → Inspect
- See actual HTML structure
- Check applied CSS styles
- Test CSS changes live

---

## 📚 Learning Resources

### JavaScript Basics

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)

### HTML/CSS

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS Tricks](https://css-tricks.com/)

### Bootstrap

- [Bootstrap Docs](https://getbootstrap.com/docs/)

### Chart.js

- [Chart.js Documentation](https://www.chartjs.org/)

### GSAP Animations

- [GSAP Getting Started](https://gsap.com/getting-started/)

### World Bank API

- [Data Catalog](https://data.worldbank.org/)
- [API Documentation](https://data.worldbank.org/developers)

---

## 🎯 Challenge Ideas

### Beginner Challenges

1. **Change color scheme** - Update navbar/button colors
2. **Add new quiz question** - Modify learn.js
3. **Add new ambassador** - Update community.js
4. **Change chart labels** - Modify chart data in learn.js

### Intermediate Challenges

1. **Create new page** - Copy structure from existing page
2. **Add new API indicator** - Extend data.js
3. **Modify form validation** - Add new validation rules
4. **Create new animation** - Use GSAP ScrollTrigger

### Advanced Challenges

1. **Connect to backend** - Wire forms to database
2. **Add user authentication** - Login system
3. **Implement search** - Search events/ambassadors
4. **Create mobile app** - Convert to React/Vue

---

## 🤝 Contributing

### How to Contribute

1. Create a new branch for your feature
2. Make changes to code
3. Test thoroughly (use F12)
4. Submit pull request
5. Get code reviewed

### Code Style Guide

- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused
- Test all changes

---

## 📞 Getting Help

### If Something Breaks

1. Check browser console (F12)
2. Read error message carefully
3. Google the error message
4. Check code syntax (missing commas, brackets)
5. Reload page (Ctrl+F5 = hard refresh)

### Questions?

- Review existing code comments
- Check IMPLEMENTATION_SUMMARY.md
- Look at similar code sections
- Experiment safely (use console!)

---

## ✨ Quick Reference

### Important Files to Know

| File | Purpose | Modify for |
|------|---------|-----------|
| learn.js | Quiz & charts | Questions, answers, colors |
| community.js | Ambassadors | Form rules, ambassador list |
| events.js | Events | Event data, dates |
| data.js | World Bank data | New indicators, API calls |
| common.css | Base styles | Colors, fonts, layout |

### Common Selectors

```javascript
// Get element by ID
const element = document.getElementById('elementId');

// Get element by class
const elements = document.querySelectorAll('.className');

// Get form value
const value = document.getElementById('inputId').value;

// Add event listener
element.addEventListener('click', () => { /* do something */ });
```

---

**Happy coding! 🎉 Remember: the best way to learn is by experimenting!**

---

**Version:** 1.0  
**Created:** 2025
