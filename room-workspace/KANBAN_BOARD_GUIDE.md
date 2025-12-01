# Kanban Board - Complete Guide

## Overview
A fully functional, drag-and-drop Kanban board where each room member has their own personal card that only they can edit, while others can view it.

## Features

### ✅ User-Specific Cards
- Each member automatically gets their own card when they join a room
- Cards are color-coded by user
- Only the card owner can edit their card
- All members can view all cards

### ✅ Drag & Drop
- Smooth drag-and-drop functionality using @dnd-kit
- Drag cards between columns (To Do, In Progress, Review, Done)
- Visual feedback during dragging
- Only owners can drag their own cards

### ✅ Task Management
- Add tasks to your card
- Mark tasks as complete/incomplete
- Delete tasks
- Progress tracking (completed/total tasks)

### ✅ Card Editing
- Edit card title and description
- Only card owners can edit
- Real-time updates

### ✅ Columns
- **To Do**: Tasks that need to be started
- **In Progress**: Currently working on
- **Review**: Ready for review
- **Done**: Completed tasks

## How to Use

### Accessing the Kanban Board

1. **In Room Workspace**: Navigate to any room at `/rooms/:id` and click the "Kanban Board" tab
2. **Demo Page**: Visit `/kanban-demo` to test the functionality
3. **Legacy Workspace**: Available in the workspace view at `/workspace/:id`

### Managing Your Card

1. **View Your Card**: Your card is automatically created when you enter a room
2. **Edit Title/Description**: Click the edit icon (✏️) on your card
3. **Add Tasks**: Click the plus (+) button to add a new task
4. **Complete Tasks**: Click the checkbox next to a task
5. **Delete Tasks**: Click the trash icon (🗑️) next to a task
6. **Move Card**: Drag your card to different columns to update status

### Permissions

- ✅ **You CAN**: Edit your own card, add/remove/complete tasks, drag your card
- ❌ **You CANNOT**: Edit other members' cards, drag other members' cards

## Technical Implementation

### Components
- `KanbanBoard.jsx` - Main board with DnD context
- `KanbanColumn.jsx` - Individual columns with drop zones
- `KanbanCard.jsx` - Draggable cards with task management
- `useKanbanStore.js` - Zustand store for state management

### State Management
- Uses Zustand for global state
- Stores cards, columns, and column order
- Automatic user card initialization

### Drag & Drop
- Powered by @dnd-kit/core
- Sortable cards within columns
- Collision detection with closestCorners
- Permission-based dragging (only card owners)

## Routes

- `/rooms/:id` - Room workspace with Kanban board
- `/kanban-demo` - Standalone demo page
- `/workspace/:id` - Legacy workspace with Kanban

## Future Enhancements

- [ ] Real-time collaboration with WebSockets
- [ ] Card comments and mentions
- [ ] File attachments
- [ ] Due dates and reminders
- [ ] Custom columns
- [ ] Card templates
- [ ] Activity history
- [ ] Export/Import boards

## Dependencies

```json
{
  "@dnd-kit/core": "^latest",
  "@dnd-kit/sortable": "^latest",
  "@dnd-kit/utilities": "^latest",
  "@mui/material": "^7.3.5",
  "zustand": "^5.0.8"
}
```

## Tips

1. **Organize Your Work**: Use columns to track your progress
2. **Break Down Tasks**: Add smaller tasks to your card for better tracking
3. **Stay Updated**: Check other members' cards to see team progress
4. **Use Descriptions**: Add context to your card with descriptions
5. **Color Coding**: Each user has a unique color for easy identification
