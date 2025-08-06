# React Dashboard

A modern, responsive dashboard application built with React, TypeScript, and Tailwind CSS. Features a clean interface with dark/light theme support, interactive charts, and a comprehensive analytics overview.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with dark/light theme toggle
- **Interactive Charts**: Revenue tracking, channel analytics, and device usage charts
- **Real-time Data**: Dynamic metrics with live updates and loading states
- **Responsive Layout**: Mobile-first design with collapsible sidebar
- **Type Safety**: Built with TypeScript for enhanced development experience
- **Component Library**: Built with Shadcn/ui components for consistent design system
- **Analytics Dashboard**: Comprehensive overview with key metrics and insights

## 📊 Dashboard Components

- **Metrics Grid**: Key performance indicators with trend analysis
- **Revenue Chart**: Interactive line chart showing revenue over time
- **Channel Chart**: Pie chart displaying traffic distribution by source
- **Device Chart**: Bar chart showing device usage statistics
- **Campaigns Table**: Sortable table with campaign performance data
- **Activity Feed**: Real-time activity notifications
- **User Management**: Profile settings and user analytics

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.0
- **Type System**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 4.1.11
- **Build Tool**: Vite 7.0.4
- **Routing**: React Router DOM 7.7.1
- **Charts**: Recharts 3.1.0
- **UI Components**: Shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Date Handling**: date-fns 4.1.0

## 🎨 Shadcn/ui Integration

This project uses [Shadcn/ui](https://ui.shadcn.com/) as the primary component library, providing:

- **Consistent Design System**: Pre-built, customizable components
- **Accessibility**: Built on Radix UI primitives for full accessibility support
- **Theming**: CSS variables for easy light/dark theme switching
- **TypeScript**: Full TypeScript support out of the box
- **Customizable**: Easy to modify and extend components

### Available Shadcn/ui Components

The project includes the following Shadcn/ui components:
- `Button` - Interactive buttons with multiple variants
- `Card` - Content containers with header, content, and footer
- `DropdownMenu` - Accessible dropdown menus
- `Input` - Form input components
- `ScrollArea` - Custom scrollable areas
- `Skeleton` - Loading state placeholders
- `Switch` - Toggle switches for settings
- `Table` - Data tables with sorting and filtering

### Adding New Shadcn/ui Components

To add new Shadcn/ui components:

```bash
npx shadcn@latest add <component-name>
```

Example:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add badge
npx shadcn@latest add toast
```

### Configuration

Shadcn/ui is configured via `components.json`:
- **Style**: New York design style
- **Base Color**: Gray color palette
- **CSS Variables**: Enabled for theming
- **Icon Library**: Lucide React icons

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/           # Dashboard-specific components
│   │   ├── ActivityFeed.tsx
│   │   ├── CampaignsTable.tsx
│   │   ├── DashboardOverview.tsx
│   │   ├── MetricsGrid.tsx
│   │   └── charts/          # Chart components
│   │       ├── ChannelChart.tsx
│   │       ├── DeviceChart.tsx
│   │       ├── RevenueChart.tsx
│   │       └── index.ts
│   ├── layout/              # Layout components
│   │   ├── DashboardLayout.tsx
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Sidebar.tsx
│   │   └── UserProfile.tsx
│   ├── ui/                  # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── scroll-area.tsx
│   │   ├── skeleton.tsx
│   │   ├── switch.tsx
│   │   └── table.tsx
│   └── ThemeToggle.tsx
├── contexts/
│   └── ThemeContext.tsx     # Theme management
├── data/
│   └── mockData.ts          # Sample data for development
├── lib/
│   └── utils.ts             # Utility functions
├── assets/
└── App.tsx                  # Main application component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ReactDashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🎨 Customization

### Theme Configuration

The application supports both light and dark themes. Theme configuration is managed through:
- `src/contexts/ThemeContext.tsx` - Theme context provider
- `src/components/ThemeToggle.tsx` - Theme toggle component
- `tailwind.config.js` - Tailwind CSS theme configuration

### Adding New Components

1. Create new components in the appropriate directory under `src/components/`
2. Use Shadcn/ui components as building blocks: `npx shadcn@latest add <component-name>`
3. Export from the relevant index file if needed
4. Import and use in your desired location

### Styling

The project uses Tailwind CSS with Shadcn/ui design system:
- Shadcn/ui components configured in `components.json`
- Custom color scheme and CSS variables defined in `tailwind.config.js`
- Component styling utilities in `src/lib/utils.ts` (cn function)
- Component-level styling using Tailwind classes

## 📊 Data Management

Currently uses mock data from `src/data/mockData.ts`. To integrate with a real API:

1. Replace mock data imports with API calls
2. Add error handling and loading states
3. Consider using a state management library for complex data flows

## 🔧 Configuration

### TypeScript

- `tsconfig.json` - Main TypeScript configuration
- `tsconfig.app.json` - App-specific configuration
- `tsconfig.node.json` - Node.js configuration

### ESLint

- `eslint.config.js` - ESLint configuration with React and TypeScript rules

### Vite

- `vite.config.ts` - Vite configuration with React plugin

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy the dist folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in `vite.config.ts`
2. **Module not found**: Check import paths and ensure dependencies are installed
3. **Build errors**: Run `npm run lint` to check for linting errors

### Performance Optimization

- Use React.memo for expensive components
- Implement virtual scrolling for large lists
- Optimize chart rendering with data sampling
- Use lazy loading for route components

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check existing issues for solutions
- Review the documentation

---

Built with ❤️ using React and TypeScript
