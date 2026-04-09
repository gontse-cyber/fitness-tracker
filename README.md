# Community News Application - Fitness Tracker

A web-based fitness tracking application that allows users to log workouts, monitor progress, and track fitness goals. Built with vanilla JavaScript, HTML, and CSS.

**Course:** Web Programming (WPR 281) Second Year Group Project  
**Project Type:** Frontend Web Application with JavaScript Logic  
**My Role:** Backend Developer (Data Processing, Statistics, Goal Tracking Logic)

---

## 📋 Overview

The Community News Application is a fitness tracking platform designed to help users monitor their workout activities and fitness goals. The application provides real-time statistics, visual progress tracking, goal management, and motivational features.

### Key Features

- **Workout Logging** - Add workouts with type, duration, and calories burned
- **Real-Time Statistics** - Track total workouts, calories, and average duration
- **Fitness Goal Tracker** - Set fitness goals and track progress with visual progress bars
- **Progress Tracking** - Monitor goal completion with percentage indicators
- **Motivational Messages** - Contextual encouragement based on progress milestones
- **Timer/Countdown** - Built-in timer functionality for workout sessions
- **Workout Favorites** - Mark and manage favorite workouts
- **Motivational Quotes** - Random inspiration quotes for motivation

---

## 🏗️ Technical Architecture

### Technology Stack

- **Frontend:** HTML5, CSS3
- **Backend Logic:** Vanilla JavaScript (ES6+)
- **Data Visualization:** Chart.js
- **Data Storage:** In-memory arrays (session-based, not persisted)
- **Development:** Group collaboration on shared features

### Data Storage Model

**Current Implementation:**
- Workouts stored in memory using JavaScript arrays
- Data persists during the session but resets on page refresh
- Goal data tracked with variables and progress calculations

---

## 📁 Project Structure

```
community-news-application/
├── index.html          # HTML form structure and UI elements
├── java.js             # JavaScript logic and event handling
├── style.css           # CSS styling and layout
└── README.md           # This file
```

---

## 🔧 My Backend Contributions

### 1. **Workout Data Processing**
- Implemented form submission handling and event listeners
- Created validation logic to ensure all required fields are filled
- Built data extraction from form inputs (type, duration, calories, date)
- Designed the workout object structure: `{type, duration, calories, date, isFavorite}`
- Implemented array-based data management for storing multiple workouts

### 2. **Statistics Calculation Engine**
- Implemented `updateStatistics()` function that calculates:
  - **Total Workouts:** Count of workouts array length
  - **Total Calories:** Sum of all calories using `.reduce()` method
  - **Average Duration:** Mean of all durations calculated and formatted to 2 decimal places

### 3. **Goal Tracking & Progress Logic**
- Developed the `setGoal()` function for goal initialization
- Implemented the `updateProgress()` function with:
  - Input validation for goal and progress values
  - Percentage calculation: `(progress / goal) * 100`
  - Boundary checking to prevent progress exceeding goal
  - Error handling for invalid inputs

### 4. **Contextual Messaging System**
- Built milestone-based messaging that triggers at specific progress points:
  - 50% progress: "You're halfway there! Keep going!"
  - 100% progress: "Congratulations, goal achieved!"
  - <50% progress: "Just keep pushing!!"

### 5. **Workout Display Management**
- Implemented `updateWorkoutList()` function that:
  - Dynamically creates list items for each workout
  - Displays formatted workout information (date, type, duration, calories)
  - Implements favorite/unfavorite functionality with heart icon toggle
  - Handles deletion of workouts with combined button logic
  - Re-renders list after any modification

### 6. **Countdown Timer Feature**
- Developed timer functionality with time unit conversions:
  - Days, hours, minutes, seconds calculation from milliseconds
  - Dynamic countdown updates every 1 second
  - Timer completion detection and notifications

### 7. **Motivational Quote System**
- Created array of motivational quotes
- Implemented random quote selection using `Math.random()`
- Integrated quote display into UI

---

## 💡 Implementation Details

### Event-Driven Architecture
All functionality is driven by event listeners:
- Form submission for adding workouts
- Button clicks for goal setting and progress updates
- Click handlers for favorite toggle and deletion

### Array Processing Methods Used
- `.push()` - Add workouts to array
- `.reduce()` - Sum calories and durations
- `.forEach()` - Iterate over workouts for display
- `.splice()` - Remove workouts from array
- `.filter()` - Filter countdowns by ID

### Data Flow

```
User Input (Form/Buttons)
    ↓
Event Listener Triggered
    ↓
Validation Check
    ↓
Data Processing/Calculation
    ↓
Array Updated
    ↓
DOM Elements Updated
    ↓
Visual Display Refreshed
```

---

## 🎯 Code Contributions Summary

| Component | Responsibility | Key Functions |
|-----------|-----------------|----------------|
| **Workout Processing** | Form handling, validation, storage | `handleFormSubmit()`, `updateWorkoutList()` |
| **Statistics** | Calculation and display | `updateStatistics()` |
| **Goal Tracking** | Goal setup and progress calculation | `setGoal()`, `updateProgress()` |
| **UI Updates** | DOM manipulation and re-rendering | All `update*()` functions |
| **Messaging** | Contextual feedback to user | Milestone-based messages |
| **Timer** | Countdown functionality | `showCountdownPopup()`, `updateCountdowns()` |

---

## 🚀 How to Use

### Adding a Workout

1. Select a workout type from the dropdown
2. Enter the duration in minutes
3. Enter calories burned
4. Select the workout date
5. Click "Add Workout"
6. Workout appears in the list immediately
7. Statistics update in real-time

### Setting a Fitness Goal

1. Enter your target goal number in the "Goal" field
2. Click "Set Goal" button
3. The progress bar initializes to 0%

### Tracking Progress

1. Enter your current progress in the "Progress" field
2. Click "Update Progress" button
3. Progress bar updates with percentage
4. Motivational message displays based on progress level

### Using the Timer

1. Click the "Timer" button
2. Select a time unit (days, hours, minutes, seconds)
3. Enter the amount
4. Timer counts down and notifies when complete

---

## 📊 Technical Implementation Notes

### Calculation Algorithms

**Total Calories Calculation:**
```javascript
const totalCalories = workouts.reduce((sum, workout) => sum + workout.calories, 0);
```

**Average Duration:**
```javascript
const averageDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0) / workouts.length;
```

**Goal Progress Percentage:**
```javascript
const percentage = Math.floor((progress / goal) * 100);
```

### Input Validation

- Empty field checking
- Type conversion with `parseInt()` and `Number()`
- Range validation (progress can't exceed goal)
- NaN checking to prevent invalid calculations

---

## 🎓 Technical Concepts Demonstrated

### JavaScript Fundamentals
- **Event Handling:** Form submission, click events
- **DOM Manipulation:** Creating, appending, and removing elements
- **Array Methods:** push, reduce, forEach, splice, filter
- **String Manipulation:** Template literals, text formatting
- **Conditional Logic:** Input validation, milestone checking
- **Math Operations:** Calculations, time conversions

### Problem Solving
- Validation logic to prevent errors
- Boundary checking for progress tracking
- Dynamic UI updates based on data changes
- Time unit conversion algorithm

### Code Organization
- Modular functions with single responsibilities
- Event listeners for different user actions
- Array for data storage
- Separation of concerns (display vs. logic)

---

## 👥 Group Members

This was a combined group effort for a second-year programming course. My contribution focused on the backend logic implementation, data processing, statistical calculations, and user interaction handlers.

---

## 🚀 Getting Started

### Running the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/community-news-application.git
   ```

2. Open the application:
   - Double-click `index.html`
   - Or use a local server: `python -m http.server 8000`
   - Then visit `http://localhost:8000`

### Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No dependencies to install (uses CDN for Chart.js)
- No backend server required

---

**Status:** Educational Project - Complete  
**Last Updated:** February 2025 
**Version:** 1.0.0
