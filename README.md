# Weather App

A comprehensive weather application built with Next.js, offering detailed weather information, forecasts, and environmental data with a beautiful, responsive UI.

![Weather App Screenshot](./image/Screenshot%202025-05-31%20171701.png)

## Features

- **Real-time Weather Data**: Current temperature, conditions, and feels-like temperature
- **5-Day Forecast**: Plan ahead with accurate multi-day weather predictions
- **Interactive Map**: Visualize weather patterns on an interactive map powered by Leaflet
- **Air Quality Information**: Monitor air pollution levels in your area
- **UV Index**: Stay informed about UV radiation levels
- **Multilingual Support**: Available in English and Vietnamese
- **Dark/Light Mode**: Choose your preferred theme for comfortable viewing
- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **Detailed Weather Metrics**:
  - Wind speed and direction
  - Humidity levels
  - Atmospheric pressure
  - Visibility distance
  - Sunrise and sunset times
  - Population data for cities

## Tech Stack

- **Frontend**: React 19, Next.js 15, Tailwind CSS
- **State Management**: React Context API
- **Maps**: Leaflet with React-Leaflet
- **Internationalization**: i18next
- **API Integration**: OpenWeatherMap API
- **Data Handling**: Axios for API requests
- **UI Components**: Custom components with Radix UI primitives
- **Styling**: Tailwind CSS with class-variance-authority

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager
- OpenWeatherMap API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your API key:
   ```
   OPENWEATHERMAP_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  ├── app/
  │   ├── api/                # API routes
  │   ├── components/         # UI components
  │   ├── context/            # Global state management
  │   ├── i18n/               # Internationalization
  │   ├── providers/          # Context providers
  │   └── utils/              # Utility functions
  ├── components/             # Shared UI components
  └── lib/                    # Utility libraries
```

## Deployment

This application can be easily deployed on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/weather-app)

## Screenshots

![Home Screen](./image/Screenshot%202025-05-31%20171701.png)
![Weather Details](./image/Screenshot%202025-05-31%20171729.png)
![Map View](./image/Screenshot%202025-05-31%20171758.png)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for providing weather data
- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Leaflet](https://leafletjs.com/) for mapping capabilities
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
