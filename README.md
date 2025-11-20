# User Dashboard

A modern React-based user dashboard application with comprehensive user management and post creation features. Built with React 18, TypeScript, Tailwind CSS, and Vite.

## Features

### Theme Management
- **Light & Dark Theme Toggle**: Switch between light and dark themes seamlessly
- **Theme Persistence**: Selected theme is saved to localStorage and restored on page reload
- **Smooth Transitions**: All theme changes include smooth color transitions
- **Light Theme**: Blue gradient background with white cards
- **Dark Theme**: Indigo-purple gradient background with dark cards

### User Management
- **User Directory**: Browse all users with beautiful card-based layout
- **User Details**: View comprehensive user information including:
  - Email, phone, website, and company details
  - User avatar with fallback initial avatar
  - Unique avatar images from Pravatar API
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

### Post Management
- **Create Posts**: Add new posts with title and body content
- **Edit Posts**: Modify existing posts through a modal interface
- **Delete Posts**: Remove posts with confirmation dialog
- **Search Posts**: Filter posts by title in real-time
- **Infinite Scroll**: Load posts progressively as you scroll

### Form Validation
- **Real-time Validation**: Inline error messages below form fields
- **Post Title Validation**: 
  - Required field
  - Minimum 3 characters
  - Maximum 200 characters
- **Post Body Validation**: 
  - Optional field
  - Maximum 5000 characters
- **Theme-aware Styling**: Error states match the current theme

### Notifications
- **Toast Notifications**: Success messages for post creation, updates, and deletion
- **Toast Position**: Top-right corner for better visibility
- **Theme Integration**: Toast styling matches the selected theme

### User Interface
- **Header Component**: Responsive header with logo and theme toggle
- **Modal Components**: 
  - Edit Post Modal with inline validation
  - Confirmation Modal for destructive actions
- **Loading States**: Loading indicators while fetching data
- **Error Handling**: Graceful error messages for failed operations

## Tech Stack

- **Frontend Framework**: React 18.3.1
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3.4.0
- **Routing**: React Router v6
- **State Management**: React Context API
- **Icons**: react-icons (Feather & Material Design)
- **Notifications**: react-toastify
- **Package Manager**: npm/yarn

## Node & Package Versions

- **Node.js**: v18+ (recommended)
- **React**: 18.3.1
- **React DOM**: 18.3.1
- **React Router**: 6.x
- **Tailwind CSS**: 3.4.0
- **Vite**: 6.0.0
- **TypeScript**: 5.6.2

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd user-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

The optimized build will be generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.tsx      # Header with theme toggle
│   ├── UserCard.tsx    # User card component
│   ├── PostItem.tsx    # Post item component
│   ├── EditPostModal.tsx   # Edit post modal
│   └── ConfirmModal.tsx    # Confirmation modal
├── context/            # React Context for state management
│   └── ThemeContext.tsx # Theme provider and hook
├── pages/             # Page components
│   ├── UsersList.tsx  # Users listing page
│   └── UserDetail.tsx # User detail page
├── utils/             # Utility functions
│   └── validation.ts  # Form validation utilities
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main app component
├── main.tsx           # Application entry point
└── index.css          # Global styles

public/
└── data/
    ├── users.json     # Static users data
    └── posts.json     # Static posts data
```

## Key Features in Detail

### Theme System
The theme system uses React Context API to manage global theme state with localStorage persistence:
- Automatically detects and applies saved theme on app load
- All UI elements respond to theme changes in real-time
- Custom color schemes for light and dark modes

### Form Validation
Built-in validation for all form fields:
- Client-side validation with immediate feedback
- Error messages displayed inline below fields
- Visual indicators (red borders/backgrounds) for invalid fields
- Works for both create and edit operations

### Data Source
- Uses static JSON files for users and posts
- Simulates API responses without external dependencies
- Perfect for prototyping and demos

## Development Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests to help improve this project.

