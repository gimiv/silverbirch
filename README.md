# Scale Health (Align Health)

A modern, high-conversion digital health platform designed to seamlessly connect patients with world-class specialists and facilitate comprehensive B2B clinic onboarding.

## 🚀 Key Features

- **Dynamic Patient Journeys**: Custom landing and offer pages tailored for various campaigns (e.g., Shopify integrations, Insider access, Integrated Offers).
- **Clinic Onboarding Flow (Journey 7)**: A robust multi-step B2B registration process for providers to become "Preferred Partners". Features include dynamic service pricing, custom practice details, and structured weekly availability scheduling.
- **Partner Discovery Map (Journey 6)**: An interactive Mapbox-powered interface that allows patients to locate and filter nearby Preferred Partners using proximity-based Haversine filtering.
- **Interactive Intake & Scheduling**: A frictionless patient assessment and appointment scheduling feature designed for maximum conversion.
- **Premium UI/UX**: Crafted with a focus on modern aesthetics, utilizing Framer Motion for micro-animations and Tailwind CSS for responsive, accessible design.

## 🛠 Tech Stack

- **Core**: React 19, TypeScript, Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Mapping & Location**: Mapbox GL, React Map GL, Leaflet
- **Icons**: Lucide React
- **Date Management**: date-fns, react-day-picker

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation & Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the `frontend/` directory and add the necessary API keys (e.g., your Mapbox public token).
   ```bash
   VITE_MAPBOX_TOKEN=your_mapbox_token_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

### Building for Production

To create a production-optimized build:

```bash
npm run build
```
This will compile the TypeScript code and bundle the application into the `dist/` directory using Vite.

## 📁 Project Structure

```text
align_health/
├── frontend/             # Main React/Vite frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components (IntakeFlow, Layout, Chatbot)
│   │   ├── journeys/     # Dedicated campaign flows (Scale Health, Journey 6, Journey 7, etc.)
│   │   ├── pages/        # Core application pages (Portal, Login)
│   │   └── ...
│   └── package.json
├── Resources/            # Project documentation or external resources
└── brand_assets/         # Brand Identity files (Logos, SVGs, etc.)
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📄 License
This project is proprietary and confidential.
