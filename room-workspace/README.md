# Room Workspace - Advanced VS Code Style Split Panel System

Professional React workspace with VS Code-inspired drag-and-drop panel system.

## ✨ Features

### 🎯 Advanced Panel System
- **Drag & Drop Tabs** - Move panels anywhere by dragging tabs
- **Edge Drop Zones** - Drag to screen edges to create new regions
- **Resizable Dividers** - Click and drag any divider to resize
- **Tab Groups** - Multiple panels in one region with tabs
- **Empty State Handling** - Quick add buttons when regions are empty
- **Auto-Save Layout** - Layout persists automatically

### 🎨 Professional UI
- **Minimal White Theme** - Clean, modern design
- **Smooth Animations** - Framer Motion transitions
- **Toast Notifications** - Action feedback
- **Status Bar** - Live panel count and user status
- **Toolbar** - Quick access to all features
- **Command Palette** - ⌘K for quick actions

### 📦 8 Integrated Panels
1. **Members** - Team members with status
2. **Kanban** - Task board overview
3. **Chat** - Team messaging
4. **Notes** - Quick notes with search
5. **Resources** - File management
6. **Activity** - Real-time feed
7. **Tools** - Quick actions
8. **AI Suggestions** - Smart recommendations

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 🎮 How to Use

### Drag Panels
1. Click and hold any tab title
2. Drag to another region or edge
3. Blue indicator shows drop zone
4. Release to dock

### Create New Regions
1. Drag tab to screen edge (left/right/top/bottom)
2. "Create [edge] panel" appears
3. Release to create new region
4. Panel docks automatically

### Resize Panels
- Hover over dividers between panels
- Divider turns blue
- Click and drag to resize
- Adjacent panels adjust automatically

### Switch Tabs
- Click any tab to switch
- Active tab has blue underline
- Smooth slide animation

### Close Panels
- Hover over tab
- X button appears
- Click to close
- Region shows empty state if last panel

### Add Panels
- Click panel button in empty region
- Or use Command Palette (⌘K)
- Panel appears instantly

## ⌨️ Keyboard Shortcuts

- `⌘K` / `Ctrl+K` - Command palette
- `Escape` - Close modals
- `F11` - Toggle fullscreen

## 🛠 Tech Stack

- React 19 + Vite
- TailwindCSS 4
- Allotment (split panels)
- Zustand (state management)
- Framer Motion (animations)
- React Hot Toast (notifications)
- Lucide React (icons)

## 📐 Architecture

```
src/
├── components/
│   ├── panels/          # 8 panel components
│   ├── PanelContainer   # Tab management
│   ├── DraggableTab     # Draggable tab
│   ├── DropZone         # Drop target
│   ├── EdgeDropZone     # Edge detection
│   ├── EmptyRegion      # Empty state
│   ├── Toolbar          # Top toolbar
│   ├── StatusBar        # Bottom status
│   ├── CommandPalette   # Quick actions
│   ├── Minimap          # Layout overview
│   └── ShortcutsModal   # Keyboard help
├── store/
│   └── usePanelStore    # Zustand store
└── App.jsx              # Main layout
```

## 🎨 Customization

### Add New Panel

1. Create `src/components/panels/YourPanel.jsx`
2. Add to `PANEL_COMPONENTS` in `App.jsx`
3. Add to store in `usePanelStore.js`

### Change Theme

Edit `src/index.css`:
- Panel colors
- Border styles
- Shadows
- Transitions

### Modify Layout

Edit `defaultLayout` in `usePanelStore.js`

## 🌟 Advanced Features

- **Toast Notifications** - Visual feedback for all actions
- **Layout Minimap** - Visual overview of panel distribution
- **Quick Actions** - Helpful hints for new users
- **Shortcuts Modal** - Complete keyboard reference
- **Status Bar** - Live workspace statistics
- **Edge Detection** - Smart region creation
- **Empty States** - Graceful handling of empty regions
- **Persistent State** - Layout saved to localStorage

## 📱 Responsive

- Desktop: Full multi-panel layout
- Tablet: Simplified layout
- Mobile: Single panel mode (coming soon)

## 🔧 Future Enhancements

- [ ] Panel maximize/minimize
- [ ] Save/load custom layouts
- [ ] Dark theme
- [ ] Mobile responsive mode
- [ ] Panel search
- [ ] Workspace templates
- [ ] Collaborative cursors
- [ ] Real-time sync

## 📄 License

MIT
