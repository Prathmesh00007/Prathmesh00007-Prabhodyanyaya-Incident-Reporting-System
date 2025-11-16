I'll help you get the complete README.md file code. Let me first check what README files exist in your project and then read the main one.


[1 tool called]

Now let me read the main README.md files to give you the complete code:


[4 tools called]

Here are the complete README.md files from your project:

## 1. Main Project README.md (Root Level)

```markdown
# Incident Reporting System

A full-stack web application for reporting, managing, and resolving incidents efficiently.

## Project Structure

```
Incident-Reporting-System/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    uploads/
    .env
    package.json
    server.js
  frontend/
    public/
    src/
    index.html
    package.json
    tailwind.config.js
    vite.config.js
```

---

## Backend

### Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Cloudinary (for file uploads)
- Google Generative AI (for severity prediction)

### Setup

1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```

2. **Environment Variables:**
   - Copy `.env.example` to `.env` and fill in required values (MongoDB URI, Cloudinary keys, etc.).

3. **Run the server:**
   ```sh
   npm start
   ```
   The server runs on `https://prathmesh00007-prabhodyanyaya-incident-ostr.onrender.com` by default.

---

## Frontend

### Tech Stack

- React
- Vite
- Tailwind CSS
- DaisyUI
- React Router

### Setup

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```

2. **Run the development server:**
   ```sh
   npm run dev
   ```
   The app runs on `http://localhost:5173` by default.

---

## Features

- User registration with document/photo upload
- Admin approval workflow
- Incident reporting and management
- Severity prediction using AI
- User profiles and notifications
- Responsive UI with Tailwind CSS

---

## Scripts

### Backend

- `npm start` — Start the backend server

### Frontend

- `npm run dev` — Start the frontend dev server
- `npm run build` — Build for production

---

## License

MIT

---

## Acknowledgements

- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Google Generative AI](https://ai.google.dev/)
```

## 2. Detailed Project README.md (Incident-Reporting-System Directory)

```markdown
# Incident Reporting System

A full-stack web application for reporting, managing, and resolving incidents efficiently with role-based access control and AI-powered severity prediction.

## 🚀 Features

### Core Features
- **User Registration & Authentication**: Secure user registration with document upload and admin approval workflow
- **Role-Based Access Control**: Three user roles (Admin, Authority, User) with different permissions
- **Incident Reporting**: Users can report incidents with images and AI-powered severity prediction
- **Incident Management**: Authorities can assign, update status, and resolve incidents
- **Real-time Notifications**: Users receive notifications about incident updates
- **Dashboard Analytics**: Comprehensive dashboards for admins and authorities with charts and statistics

### Admin Features
- **User Management**: Approve/reject user registrations, manage existing users
- **System Overview**: View system statistics, incident trends, and user analytics
- **Incident Monitoring**: Track all incidents across the system

### Authority Features
- **Incident Assignment**: Get assigned incidents and manage their lifecycle
- **Status Updates**: Update incident status and add messages
- **Resolution Tracking**: Mark incidents as resolved and generate reports

### User Features
- **Incident Reporting**: Report incidents with detailed descriptions and images
- **Incident Tracking**: View status of reported incidents and receive updates
- **Profile Management**: Update personal information and change password

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication
- **Multer** - File upload handling
- **Google Generative AI** - Severity prediction
- **Cloudinary** - Cloud file storage (optional)

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **DaisyUI** - Component library
- **React Router** - Navigation
- **Zustand** - State management
- **Chart.js** - Data visualization
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📁 Project Structure

```
Incident-Reporting-System/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── utils.js
│   ├── controllers/
│   │   ├── admin.controllers.js
│   │   ├── auth.controller.js
│   │   └── authority.controllers.js
│   ├── middleware/
│   │   ├── admin.middleware.js
│   │   ├── auth.middleware.js
│   │   └── authority.middleware.js
│   ├── models/
│   │   ├── incident.model.js
│   │   ├── registeredUsers.model.js
│   │   ├── report.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── admin.routes.js
│   │   ├── auth.routes.js
│   │   └── authority.routes.js
│   ├── uploads/
│   ├── env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   │   ├── AdminDashboard/
    │   │   ├── AuthorityDashboard/
    │   │   ├── Home/
    │   │   ├── Login/
    │   │   └── ...
    │   ├── stores/
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Google Generative AI API key

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Incident-Reporting-System
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Edit .env file with your configuration
# MONGO_URL=mongodb://localhost:27017/incident-reporting-system
# JWT_SECRET=your-super-secret-jwt-key-here
# GEMINI_API=your-gemini-api-key
# PORT=5000

# Start the server
npm start
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend API: https://prathmesh00007-prabhodyanyaya-incident-ostr.onrender.com

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017/incident-reporting-system

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Google Generative AI
GEMINI_API=your-gemini-api-key

# Server Configuration
PORT=5000
NODE_ENV=development

# Optional: Cloudinary Configuration (for cloud file storage)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 👥 User Roles & Workflows

### 1. User Registration Flow
1. User registers with personal details and documents
2. Admin reviews and approves/rejects registration
3. Approved users can log in and report incidents

### 2. Incident Reporting Flow
1. User reports incident with description and image
2. AI predicts severity level
3. Incident is assigned to authority
4. Authority updates status and adds messages
5. User receives notifications about updates
6. Incident is marked as resolved

### 3. Admin Management Flow
1. Admin views pending registrations
2. Approves or rejects user applications
3. Monitors system statistics and user activity
4. Manages existing users

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/admin-signup` - Admin registration
- `POST /api/auth/authority-signup` - Authority registration

### User Management
- `GET /api/auth/notifications` - Get user notifications
- `PUT /api/auth/update-profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `GET /api/auth/user-incidents` - Get user's incidents

### Incident Management
- `POST /api/auth/report-incident` - Report new incident
- `GET /api/authority/view-incidents` - View all incidents
- `GET /api/authority/assigned-incidents` - Get assigned incidents
- `PUT /api/authority/update-incident/:id` - Update incident
- `PUT /api/authority/mark-solved/:id` - Mark incident as resolved

### Admin Management
- `GET /api/admin/dashboard-stats` - Get dashboard statistics
- `GET /api/admin/view-registrations` - View pending registrations
- `POST /api/admin/verify/:id` - Approve/reject user
- `GET /api/admin/all-users` - Get all users
- `DELETE /api/admin/remove-user/:id` - Remove user

## 🎨 UI Components

### Dashboards
- **Admin Dashboard**: User management, system statistics, incident overview
- **Authority Dashboard**: Incident management, assignment tracking, status updates

### Key Pages
- **Home**: Landing page with statistics and testimonials
- **Login/Signup**: Authentication forms
- **Incident Form**: Report new incidents
- **Profile**: User profile management
- **Incidents**: View and track incidents

## 🔒 Security Features

- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- File upload validation
- Input sanitization
- CORS configuration

## 📈 Analytics & Reporting

- Real-time statistics
- Chart.js visualizations
- Incident trend analysis
- User activity tracking
- Resolution rate metrics

## 🚀 Deployment

### Backend Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Serve static files
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Fast build tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [DaisyUI](https://daisyui.com/) - Component library
- [Google Generative AI](https://ai.google.dev/) - AI-powered features
- [Chart.js](https://www.chartjs.org/) - Data visualization
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.
```

## 3. Frontend README.md

```markdown
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
```

## 4. Mobile App README.md

```markdown
# Prabhodhanyaya Mobile App

A React Native mobile application for the Prabhodhanyaya Scam Reporting System. This app provides a comprehensive platform for reporting scams, viewing community posts, accessing helpline services, and managing scammer databases.

## Features

### 🔐 Authentication
- User registration and login
- Profile management
- Role-based access (User, Admin, Authority)

### 📝 Incident Reporting
- Report scam incidents with detailed information
- Include scammer details (name, phone, UPI ID, email, website)
- Upload evidence images
- Location-based reporting with pincode

### 👥 Community
- View and create community posts
- Share scam experiences
- Filter by scam type and region
- Anonymous posting option

### 🗺️ Interactive Map
- View scam incidents and community posts on map
- Filter by type and severity
- Identify scam hotspots
- Real-time data visualization

### 📞 Helpline
- Emergency contact numbers
- Quick action messages
- Custom message sending
- Safety tips and guidelines

### 🛡️ Scammer Database
- Search verified scammer information
- Filter by verification status and scam type
- Detailed scammer profiles
- Report tracking

### 📊 Dashboards
- User dashboard with statistics
- Admin dashboard for management
- Authority dashboard for incident handling

## Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **Zustand** - State management
- **React Native Maps** - Map integration
- **Expo Image Picker** - Image handling
- **React Native Paper** - UI components
- **Axios** - HTTP client

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Incident-Reporting-System/mobile-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Expo CLI globally**
   ```bash
   npm install -g @expo/cli
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

## Configuration

### API Configuration
Update the API base URL in `src/config/api.js`:
```javascript
export const API_BASE_URL = 'http://your-backend-url:5000';
```

### Environment Variables
Create a `.env` file in the root directory:
```env
API_BASE_URL=https://prathmesh00007-prabhodyanyaya-incident.onrender.com
```

## Running the App

### Development
```bash
# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

### Production Build
```bash
# Build for Android
expo build:android

# Build for iOS
expo build:ios
```

## Project Structure

```
mobile-app/
├── App.js                 # Main app component
├── package.json           # Dependencies
├── app.json              # Expo configuration
├── babel.config.js       # Babel configuration
├── metro.config.js       # Metro bundler configuration
└── src/
    ├── config/
    │   └── api.js        # API configuration
    ├── stores/
    │   └── authStore.js  # Authentication state management
    └── screens/
        ├── auth/         # Authentication screens
        ├── dashboard/    # Dashboard screens
        ├── incident/     # Incident reporting
        ├── community/    # Community features
        ├── map/          # Map functionality
        ├── helpline/     # Helpline services
        ├── scammer/      # Scammer database
        └── profile/      # User profile
```

## Features Overview

### 1. Authentication System
- Secure login/signup with validation
- JWT token-based authentication
- Persistent login state
- Role-based navigation

### 2. Incident Reporting
- Comprehensive form with validation
- Image upload functionality
- Scammer details integration
- Location services integration

### 3. Community Features
- Post creation and viewing
- Search and filtering
- Anonymous posting
- Scam type categorization

### 4. Map Integration
- Interactive map with markers
- Real-time data visualization
- Filtering capabilities
- Hotspot identification

### 5. Helpline Services
- Quick contact options
- Message templates
- Emergency procedures
- Safety guidelines

### 6. Scammer Database
- Search and filter functionality
- Detailed profiles
- Verification status tracking
- Report statistics

## API Integration

The app integrates with the backend API endpoints:
- Authentication: `/api/auth/*`
- Community: `/api/community/*`
- Map: `/api/map/*`
- Helpline: `/api/helpline/*`
- Scammer Database: `/api/scammers/*`

## State Management

Uses Zustand for state management:
- Authentication state
- User profile data
- API loading states
- Error handling

## Navigation

Implements stack navigation with:
- Authentication flow
- Role-based dashboard routing
- Feature-specific screens
- Modal presentations

## Styling

- Consistent design system
- Responsive layouts
- Platform-specific adaptations
- Dark/light theme support

## Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## Deployment

### Android
1. Generate signed APK
2. Upload to Google Play Store
3. Configure app signing

### iOS
1. Build for App Store
2. Upload to App Store Connect
3. Submit for review

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **Dependency conflicts**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Android build issues**
   - Ensure Android SDK is properly configured
   - Check Java version compatibility

4. **iOS build issues**
   - Ensure Xcode is up to date
   - Check iOS deployment target

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## Changelog

### v1.0.0
- Initial release
- Core functionality implementation
- Authentication system
- Incident reporting
- Community features
- Map integration
- Helpline services
- Scammer database
```

These are all the README.md files from your project. The main comprehensive README is the one in the `Incident-Reporting-System` directory, which provides detailed documentation for the entire system including backend, frontend, and mobile app components.