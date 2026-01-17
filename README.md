# 🐴 Equine Integration - Trainer Overview Dashboard

A modern, interactive, mobile-first dashboard for equine health and performance monitoring. This POC (Proof of Concept) provides trainers with comprehensive insights into horse metrics, alerts, and training data through an intuitive, data-driven interface.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Components](#components)
- [Data Model](#data-model)
- [Development](#development)
- [Scripts](#scripts)

---

## 🎯 Overview

The **Trainer Overview Dashboard** is a single-page application designed to help equine trainers monitor and analyze horse health, training performance, and recovery metrics. Built with a mobile-first approach, the dashboard scales beautifully from mobile devices (375px) to desktop screens (≥1024px).

### Key Highlights

- **📱 Mobile-First Design**: Optimized for mobile devices with responsive scaling to desktop
- **📊 Interactive Data Visualization**: Real-time charts and metrics using Recharts
- **🎨 Modern UI/UX**: Clean, minimal design with smooth animations and transitions
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🔒 Type-Safe**: Full TypeScript implementation for robust code quality
- **🎯 Zero Backend**: Fully functional with local dummy data (no API required)

---

## ✨ Features

### Core Functionality

#### 🐎 Horse Management
- **Horse Selector**: Carousel-style selector with animated transitions
- **Multi-Horse Support**: Switch between multiple horses seamlessly
- **Visual Indicators**: Color-coded horse cards with preview navigation

#### 📅 Date Range Filtering
- **Flexible Time Periods**: Today, 7 days, or 30 days view
- **Real-time Updates**: All widgets update dynamically based on selected range
- **Visual Toggle**: Intuitive segmented control for date selection

#### 📊 Summary Metrics
- **Overall Readiness**: Composite score based on recovery, injury risk, and stress
- **Injury Risk**: Real-time risk assessment with status indicators
- **Recovery Score**: Recovery metrics with visual progress indicators
- **Next Key Event**: Upcoming events and competitions
- **Clickable Cards**: Click any metric card to view detailed information in a modal

#### 📈 Data Visualization
- **Training Load Chart**: Bar chart showing training intensity over time
  - Diversified color palette (7-color gradient)
  - Interactive hover effects (dim non-hovered bars)
  - Baseline comparison with delta percentage
- **Biomechanics Trend**: Line chart tracking symmetry percentage
  - Trend indicators (improving/stable/declining)
  - Smooth line animations
- **Circular Progress Charts**: Percentage metrics with rounded edges
  - Empty center design for number display
  - 3D box shadow effects
  - Gradient backgrounds

#### 🚨 Alerts System
- **Severity-Based Alerts**: Low, Medium, High severity indicators
- **Clickable Alerts**: Click to view detailed alert information
- **Alert Details Modal**: 
  - Full description and recommended actions
  - Historical metric charts
  - Centered modal with smooth animations
- **Add New Alerts**: Plus button to create custom alerts
  - Form validation
  - Auto-generated history data

#### 🏛️ Five Pillars Overview
- **Health**: Recovery and health metrics
- **Training**: Training intensity and load
- **Nutrition**: Diet and nutrition status
- **Biomechanics**: Symmetry and movement analysis
- **Environment**: Stable conditions monitoring
- **Interactive Filtering**: Click a pillar to filter the Updates feed

#### 🧠 Behaviour Panel
- **Focus**: Mental focus metrics with sparklines
- **Stress**: Stress level tracking
- **Willingness**: Willingness to perform indicators
- **Mini Sparklines**: Hover to reveal trend charts

#### 📰 Updates Feed
- **Timeline View**: Chronological list of updates
- **Role Badges**: Trainer, Vet, Nutritionist indicators
- **Category Tags**: Health, Training, Nutrition, Biomechanics, Environment
- **Search Functionality**: Real-time search across updates
- **Category Filtering**: Filter by pillar category or view all

---

## 🛠️ Tech Stack

### Core Technologies

- **React 18.2.0**: Modern React with hooks and functional components
- **TypeScript 5.3.3**: Type-safe development with full type coverage
- **Vite 5.0.8**: Next-generation frontend build tool
  - Lightning-fast HMR (Hot Module Replacement)
  - Optimized production builds
  - Native ES modules support

### UI & Styling

- **TailwindCSS 3.3.6**: Utility-first CSS framework
  - Custom color palette integration
  - Responsive design utilities
  - Custom animations and transitions
- **Lucide React 0.294.0**: Beautiful, consistent icon library
- **PostCSS & Autoprefixer**: CSS processing and vendor prefixing

### Data Visualization

- **Recharts 2.10.3**: Composable charting library built on D3
  - BarChart: Training load visualization
  - LineChart: Trend analysis (Biomechanics, Alerts, Metrics)
  - ResponsiveContainer: Automatic responsive sizing

### Development Tools

- **TypeScript**: Static type checking
- **Vite**: Development server and build tooling
- **ESLint**: Code quality (via TypeScript)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 16.x or higher
- **npm**: Version 7.x or higher (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MaksRechnio/Data-Visualisation-EquineIntegration-No1.git
   cd Data-Visualisation-EquineIntegration-No1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the FREE local development server**
   ```bash
   npm run dev
   ```
   
   The server will automatically:
   - Start on `http://localhost:5173`
   - Open your default browser automatically
   - Listen on all network interfaces (accessible from other devices on your network)
   - Support Hot Module Replacement (HMR) for instant updates

4. **Access the application**
   - **Local**: `http://localhost:5173`
   - **Network**: Check terminal output for network URL (e.g., `http://192.168.x.x:5173`)
   - The server will automatically try the next available port if 5173 is taken

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist/` directory, optimized and ready for deployment.

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing before deployment.

---

## 📁 Project Structure

```
Data-Visualisation-EquineIntegration-No1/
│
├── public/                          # Static assets
│   ├── assets/
│   │   └── horse.png               # Horse icon/logo
│   └── favicon.png                 # Browser favicon
│
├── src/                             # Source code
│   ├── components/                 # React components
│   │   ├── AddAlertModal.tsx       # Modal for adding new alerts
│   │   ├── AlertDetailDrawer.tsx   # Alert detail view (centered modal)
│   │   ├── AlertsList.tsx          # List of active alerts
│   │   ├── BehaviourPanel.tsx      # Behaviour metrics panel
│   │   ├── BiomechanicsChart.tsx   # Symmetry trend chart
│   │   ├── CircularProgress.tsx    # Circular progress component
│   │   ├── HeaderControls.tsx      # Header with horse selector & date range
│   │   ├── HorseSelector.tsx       # Carousel-style horse selector
│   │   ├── MetricDetailModal.tsx   # Detailed metric view modal
│   │   ├── PillarStatusGrid.tsx    # Five pillars overview grid
│   │   ├── SummaryCards.tsx        # Main metric cards (clickable)
│   │   ├── TrainerDashboard.tsx    # Main dashboard container
│   │   ├── TrainingLoadChart.tsx   # Training intensity bar chart
│   │   └── UpdatesFeed.tsx         # Updates timeline feed
│   │
│   ├── data/                        # Data layer
│   │   └── trainerData.ts          # Dummy data generators
│   │
│   ├── utils/                       # Utility functions
│   │   └── helpers.ts              # Helper functions (status, trends, formatting)
│   │
│   ├── App.tsx                      # Root component
│   ├── main.tsx                     # Application entry point
│   └── index.css                   # Global styles & animations
│
├── index.html                       # HTML template
├── package.json                     # Dependencies & scripts
├── tailwind.config.js               # TailwindCSS configuration
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite configuration
└── README.md                        # This file
```

---

## 🎨 Design System

### Color Palette

The application uses a carefully curated color palette:

- **Background**: `#F8F4F3` (brand-bg)
  - Warm, neutral beige tone
  - Applied to body and main container
  
- **Secondary**: `#001B2F` (brand-secondary)
  - Deep navy blue
  - Used for headings, primary text, and important UI elements
  
- **Accent**: `#35D0C6` (brand-accent)
  - Vibrant teal/cyan
  - Used for interactive elements, buttons, and highlights

### Status Colors

- **Good**: Green (`#10B981`) - Positive status indicators
- **Warning**: Yellow/Amber (`#F59E0B`) - Caution indicators
- **Critical**: Red (`#EF4444`) - Critical alerts and warnings

### Typography

- **Font Family**: System fonts (San Francisco, Segoe UI, Roboto)
- **Font Smoothing**: Antialiased for crisp text rendering
- **Hierarchy**: Clear typographic scale with bold headings

### Spacing & Layout

- **Mobile-First**: Designed for 375px width minimum
- **Desktop Scaling**: Responsive grid layouts for ≥1024px
- **Consistent Padding**: 16-24px outer padding, 16px card padding
- **Gap Spacing**: 12-16px between elements

### Visual Effects

- **Shadows**: Subtle, layered shadows for depth
- **Rounded Corners**: `xl` (12px) border radius for cards
- **3D Box Effects**: Enhanced shadows for metric cards
- **Gradient Backgrounds**: Subtle gradients on cards
- **Smooth Animations**: Transitions and keyframe animations
- **Hover Effects**: Interactive feedback on clickable elements

---

## 🧩 Components

### Core Components

#### `TrainerDashboard`
**Location**: `src/components/TrainerDashboard.tsx`

Main container component that manages global state:
- Horse selection
- Date range filtering
- Active alerts and modals
- Updates feed filtering

**State Management**:
- `selectedHorseId`: Currently selected horse
- `range`: Date range ('today' | '7d' | '30d')
- `activePillarFilter`: Active pillar category filter
- `activeAlert`: Currently viewed alert
- `activeMetric`: Currently viewed metric detail
- `updatesSearchText`: Search query for updates feed

#### `HeaderControls`
**Location**: `src/components/HeaderControls.tsx`

Header section containing:
- Brand title ("Equine Integration")
- Page title ("Trainer Overview")
- Date range toggle (Today / 7D / 30D)
- Horse selector integration

#### `HorseSelector`
**Location**: `src/components/HorseSelector.tsx`

Carousel-style horse selector with:
- Animated transitions (slide in/out, rotation, scale)
- Color-coded horse cards
- Preview navigation (previous/next horses)
- Arrow controls
- Smooth animations with direction tracking

#### `SummaryCards`
**Location**: `src/components/SummaryCards.tsx`

Four main metric cards:
1. **Overall Readiness**: Composite score with circular progress
2. **Injury Risk**: Risk percentage with status indicator
3. **Recovery**: Recovery score with trend
4. **Next Key Event**: Upcoming event information

**Features**:
- Clickable cards (opens `MetricDetailModal`)
- Circular progress indicators
- Status badges
- Hover effects with 3D shadows

### Visualization Components

#### `TrainingLoadChart`
**Location**: `src/components/TrainingLoadChart.tsx`

Bar chart displaying training intensity:
- 7-color gradient palette
- Interactive hover effects (dim non-hovered bars)
- Baseline comparison
- Delta percentage calculation

#### `BiomechanicsChart`
**Location**: `src/components/BiomechanicsChart.tsx`

Line chart for symmetry tracking:
- Trend indicators (improving/stable/declining)
- Smooth line animations
- Responsive container

#### `CircularProgress`
**Location**: `src/components/CircularProgress.tsx`

Reusable circular progress component:
- Customizable size and stroke width
- Rounded edges
- Empty center for number display
- Color customization

### Alert Components

#### `AlertsList`
**Location**: `src/components/AlertsList.tsx`

List of active alerts:
- Severity-based color coding
- Clickable alert items
- Add alert button
- Visual severity indicators

#### `AlertDetailDrawer`
**Location**: `src/components/AlertDetailDrawer.tsx`

Centered modal for alert details:
- Full alert description
- Recommended actions
- Historical metric chart
- Smooth animations

#### `AddAlertModal`
**Location**: `src/components/AddAlertModal.tsx`

Modal form for creating alerts:
- Severity selection
- Title and description fields
- Metric key input
- Recommended action input
- Form validation

### Detail Components

#### `MetricDetailModal`
**Location**: `src/components/MetricDetailModal.tsx`

Detailed metric view modal:
- Metric-specific information
- Related metrics grid
- Historical trend charts
- Status indicators
- Smooth animations

**Supported Metrics**:
- `readiness`: Overall readiness with breakdown
- `injuryRisk`: Injury risk with contributing factors
- `recovery`: Recovery score with related metrics
- `nextEvent`: Event details

### Panel Components

#### `PillarStatusGrid`
**Location**: `src/components/PillarStatusGrid.tsx`

Five pillars overview:
- Health, Training, Nutrition, Biomechanics, Environment
- Status indicators
- Clickable cards (filters Updates feed)
- Color-coded categories

#### `BehaviourPanel`
**Location**: `src/components/BehaviourPanel.tsx`

Behaviour metrics panel:
- Focus, Stress, Willingness metrics
- Progress bars
- Mini sparklines (on hover)
- Color-coded cards

#### `UpdatesFeed`
**Location**: `src/components/UpdatesFeed.tsx`

Timeline feed of updates:
- Search functionality
- Category filtering
- Role badges
- Category tags
- Chronological ordering

---

## 📊 Data Model

### Interfaces

#### `Horse`
```typescript
interface Horse {
  id: string;           // Unique identifier (e.g., 'horse-1')
  name: string;         // Horse name
  age: number;          // Age in years
  discipline: string;   // Discipline (e.g., 'Dressage', 'Jumping')
}
```

#### `DailyMetrics`
```typescript
interface DailyMetrics {
  date: string;                    // YYYY-MM-DD format
  trainingIntensity: number;      // 0-10 scale
  recoveryScore: number;          // 0-100 percentage
  injuryRisk: number;             // 0-100 percentage
  restingHR: number;              // Resting heart rate (bpm)
  symmetryPct: number;            // 0-100 percentage
  behaviour: {
    focus: number;                // 0-100 percentage
    stress: number;               // 0-100 percentage
    willingness: number;         // 0-100 percentage
  };
}
```

#### `Alert`
```typescript
interface Alert {
  id: string;                     // Unique identifier
  severity: 'low' | 'med' | 'high';
  title: string;                  // Alert title
  description: string;            // Detailed description
  metricKey: string;              // Related metric key
  history: Array<{                // Historical data
    date: string;
    value: number;
  }>;
  recommendedAction: string;      // Recommended action
}
```

#### `Update`
```typescript
interface Update {
  id: string;                     // Unique identifier
  dateTime: string;               // ISO string
  role: 'Trainer' | 'Vet' | 'Nutritionist';
  category: 'Health' | 'Training' | 'Nutrition' | 'Biomechanics' | 'Environment';
  text: string;                   // Update text
}
```

### Data Generation

The application uses realistic dummy data generated in `src/data/trainerData.ts`:
- **3 Horses**: Pre-configured with different profiles
- **30 Days of Metrics**: Daily metrics with realistic variation
- **Dynamic Alerts**: Generated based on metric thresholds
- **Updates Feed**: Timeline of updates from different roles

---

## 🔧 Development

### Code Style

- **TypeScript**: Strict mode enabled
- **Functional Components**: All components use React hooks
- **Type Safety**: Full type coverage for props and state
- **Component Organization**: Single responsibility principle
- **Naming Conventions**: 
  - Components: PascalCase
  - Files: Match component names
  - Utilities: camelCase

### State Management

- **Local State**: `useState` for component-specific state
- **Lifted State**: Shared state in `TrainerDashboard`
- **No External State Library**: Pure React state management

### Utility Functions

Located in `src/utils/helpers.ts`:

- `getStatus(score, lowerIsBetter)`: Returns status ('good' | 'warning' | 'critical')
- `computeReadiness(metrics)`: Calculates overall readiness score
- `computeTrend(series)`: Determines trend ('improving' | 'stable' | 'declining')
- `filterByRange(data, range)`: Filters data by date range
- `formatDate(dateString)`: Formats date for display
- `formatDateTime(dateTimeString)`: Formats datetime with relative time

---

## 📜 Scripts

### Development Server (FREE & Local)

```bash
npm run dev
# or
npm start
```
Starts the **FREE local development server** with:
- **Port**: 5173 (or next available)
- **Auto-open**: Automatically opens browser
- **Network Access**: Accessible from other devices on your network
- **HMR**: Hot Module Replacement for instant updates
- **URL**: `http://localhost:5173`

### Build

```bash
npm run build
```
Creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
# or
npm run serve
```
Serves the production build locally:
- **Port**: 4173 (or next available)
- **Auto-open**: Automatically opens browser
- **Network Access**: Accessible from other devices
- **URL**: `http://localhost:4173`

---

## 🎯 Key Features Summary

✅ **Mobile-First Design**: Responsive from 375px to desktop  
✅ **Interactive Charts**: Recharts with hover effects  
✅ **Clickable Metrics**: Detailed modal views  
✅ **Alert System**: Severity-based alerts with details  
✅ **Horse Management**: Multi-horse support with animations  
✅ **Date Filtering**: Dynamic data filtering  
✅ **Search & Filter**: Updates feed search and category filtering  
✅ **Smooth Animations**: Transitions and keyframe animations  
✅ **Type-Safe**: Full TypeScript coverage  
✅ **Zero Backend**: Fully functional with local data  

---

## 📝 Notes

- **No Backend Required**: All data is generated locally
- **No Authentication**: POC implementation without auth
- **No External APIs**: Fully self-contained
- **Production Ready**: Optimized build process included

---

## 🤝 Contributing

This is a POC (Proof of Concept) project. For contributions or questions, please open an issue or contact the repository maintainer.

---

## 📄 License

This project is private and proprietary.

---

## 🙏 Acknowledgments

- **Recharts**: For excellent charting capabilities
- **Lucide**: For beautiful, consistent icons
- **TailwindCSS**: For rapid UI development
- **Vite**: For lightning-fast development experience

---

**Built with ❤️ for Equine Integration**
