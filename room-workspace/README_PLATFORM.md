# Bethak - Complete Collaboration Platform

## 🎯 Overview

A modern, minimal collaboration platform with VS Code-style split panel workspaces. Built with React, TailwindCSS, React Router, and Zustand.

## 📁 Project Structure

```
src/
├── layouts/
│   └── MainLayout.jsx          # Main navigation layout
├── pages/
│   ├── Landing.jsx             # Public landing page
│   ├── Search.jsx              # Global search
│   ├── auth/
│   │   ├── Login.jsx           # Login page
│   │   └── Signup.jsx          # Signup page
│   ├── dashboard/
│   │   └── Dashboard.jsx       # User dashboard
│   ├── rooms/
│   │   ├── ExploreRooms.jsx    # Browse rooms
│   │   └── CreateRoom.jsx      # Room creation wizard
│   ├── people/
│   │   └── PeopleSearch.jsx    # Find collaborators
│   └── profile/
│       └── Profile.jsx         # User profile
├── store/
│   ├── useAuthStore.js         # Authentication state
│   ├── useRoomsStore.js        # Rooms data
│   └── usePanelStore.js        # Workspace panels
├── components/
│   └── panels/                 # Workspace panel components
├── App.jsx                     # Room workspace UI
├── AppRouter.jsx               # Route configuration
└── main.jsx                    # App entry point
```

## 🚀 Features

### Public Pages
- **Landing Page** - Hero section, features, CTA
- **Login/Signup** - Clean authentication forms

### Authenticated Pages
- **Dashboard** - Quick actions, rooms overview, AI suggestions, activity feed
- **Explore Rooms** - Browse and filter project rooms
- **Create Room** - Multi-step wizard (name, category, tags, visibility)
- **People Search** - Find collaborators by skills
- **Profile** - User info, skills, rooms, contributions
- **Search** - Global search for rooms, people, content
- **Workspace** - VS Code-style split panel room interface

### Navigation
- Top navbar with logo, links, search, notifications, profile menu
- Protected routes with authentication
- Responsive design

## 🎨 Design System

### Colors
- White: `#ffffff`
- Off-White: `#f7f7f8`
- Gray Border: `#e5e5e5`
- Text: `#2b2b2b`
- Accent: `#3b82f6`

### Typography
- Font: Inter
- Base: 15-16px
- Weights: 400, 500, 600, 700

### Spacing
- Padding: 16/24px scale
- Border Radius: 8/12px
- Shadows: shadow-sm, shadow-md

## 🛠 Tech Stack

- **React 19** - UI framework
- **TailwindCSS 4** - Styling
- **React Router** - Navigation
- **Zustand** - State management
- **Allotment** - Split panels
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📦 Installation

```bash
npm install
npm run dev
```

## 🔐 Authentication Flow

1. User visits landing page
2. Signs up or logs in
3. Redirected to dashboard
4. Can create/join rooms
5. Access workspace with split panels

## 🎮 Usage

### Create a Room
1. Click "Create Room" from dashboard
2. Enter room name and select icon
3. Choose category and add tags
4. Set visibility (public/private)
5. Room created, redirected to workspace

### Join a Room
1. Browse "Explore Rooms"
2. Filter by category/tags
3. Click "Join" on any room
4. Access workspace immediately

### Find Collaborators
1. Go to "People" page
2. Search by name or filter by skills
3. View profiles
4. Invite to rooms

### Workspace
- Drag tabs between regions
- Resize panels with dividers
- Multiple tabs per region
- 8 integrated panels (Members, Kanban, Chat, Notes, Resources, Activity, Tools, AI)

## 🔄 State Management

### Auth Store
```javascript
{
  user: { name, email, avatar },
  isAuthenticated: boolean,
  login(userData),
  logout(),
  updateUser(updates)
}
```

### Rooms Store
```javascript
{
  rooms: [...],
  addRoom(room),
  removeRoom(id)
}
```

### Panel Store
```javascript
{
  layout: { left, top, center, bottom, right },
  activeTabs: { ... },
  movePanel(panelId, from, to),
  setActiveTab(region, tabId),
  removePanel(panelId, region)
}
```

## 🎯 Routes

- `/` - Landing page
- `/login` - Login
- `/signup` - Signup
- `/dashboard` - User dashboard
- `/rooms` - Explore rooms
- `/rooms/create` - Create room
- `/people` - Find people
- `/profile` - User profile
- `/search` - Global search
- `/workspace/:id` - Room workspace

## 🎨 Component Patterns

### Page Layout
```jsx
<div className="min-h-screen bg-gray-50">
  <div className="max-w-7xl mx-auto px-6 py-8">
    {/* Content */}
  </div>
</div>
```

### Card
```jsx
<div className="bg-white border border-gray-200 rounded-lg p-6">
  {/* Content */}
</div>
```

### Button Primary
```jsx
<button className="px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800">
  Action
</button>
```

### Button Secondary
```jsx
<button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
  Action
</button>
```

## 🚧 Future Enhancements

- Real-time collaboration with WebSockets
- File upload and sharing
- Video/audio calls
- Advanced search with filters
- Notifications system
- Dark mode
- Mobile responsive workspace
- Room templates
- Analytics dashboard
- Integration with external tools

## 📄 License

MIT
