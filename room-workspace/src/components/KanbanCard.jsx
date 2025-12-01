import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Card, CardContent, Typography, TextField, IconButton, Checkbox, List, ListItem, ListItemText, ListItemButton, Chip, Stack } from '@mui/material';
import { GripVertical, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { useState } from 'react';
import { useKanbanStore } from '../store/useKanbanStore';
import { useAuthStore } from '../store/useAuthStore';

export default function KanbanCard({ card, columnId }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.id });
  const { updateCard, addTask, toggleTask, deleteTask } = useKanbanStore();
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(card.title);
  const [editDesc, setEditDesc] = useState(card.description);
  const [newTask, setNewTask] = useState('');
  const [showTaskInput, setShowTaskInput] = useState(false);

  const isOwner = user?.id === card.userId;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSaveEdit = () => {
    updateCard(card.id, { title: editTitle, description: editDesc });
    setIsEditing(false);
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(card.id, newTask.trim());
      setNewTask('');
      setShowTaskInput(false);
    }
  };

  const completedTasks = card.tasks.filter(t => t.completed).length;
  const totalTasks = card.tasks.length;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      sx={{
        mb: 2,
        cursor: 'grab',
        borderLeft: 4,
        borderColor: card.color,
        '&:active': { cursor: 'grabbing' },
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="flex-start" spacing={1} mb={1}>
          <Box {...attributes} {...listeners} sx={{ cursor: 'grab', mt: 0.5 }}>
            <GripVertical size={16} color="#94a3b8" />
          </Box>
          
          <Box flex={1}>
            {isEditing ? (
              <Stack spacing={1}>
                <TextField
                  size="small"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  fullWidth
                  disabled={!isOwner}
                />
                <TextField
                  size="small"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  multiline
                  rows={2}
                  fullWidth
                  placeholder="Description..."
                  disabled={!isOwner}
                />
                <Stack direction="row" spacing={1}>
                  <IconButton size="small" onClick={handleSaveEdit} color="primary">
                    <Check size={16} />
                  </IconButton>
                  <IconButton size="small" onClick={() => setIsEditing(false)}>
                    <X size={16} />
                  </IconButton>
                </Stack>
              </Stack>
            ) : (
              <>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="subtitle2" fontWeight={600}>
                    {card.title}
                  </Typography>
                  {isOwner && (
                    <IconButton size="small" onClick={() => setIsEditing(true)}>
                      <Edit2 size={14} />
                    </IconButton>
                  )}
                </Stack>
                {card.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {card.description}
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Stack>

        <Chip
          label={card.userName}
          size="small"
          sx={{ mb: 1, bgcolor: card.color, color: 'white', fontSize: '0.7rem' }}
        />

        {card.tasks.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Tasks {completedTasks}/{totalTasks}
            </Typography>
            <List dense disablePadding>
              {card.tasks.map((task) => (
                <ListItem
                  key={task.id}
                  disablePadding
                  secondaryAction={
                    isOwner && (
                      <IconButton edge="end" size="small" onClick={() => deleteTask(card.id, task.id)}>
                        <Trash2 size={14} />
                      </IconButton>
                    )
                  }
                >
                  <ListItemButton
                    dense
                    onClick={() => isOwner && toggleTask(card.id, task.id)}
                    disabled={!isOwner}
                    sx={{ py: 0.5 }}
                  >
                    <Checkbox
                      edge="start"
                      checked={task.completed}
                      size="small"
                      disabled={!isOwner}
                    />
                    <ListItemText
                      primary={task.text}
                      primaryTypographyProps={{
                        variant: 'body2',
                        sx: { textDecoration: task.completed ? 'line-through' : 'none' },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {isOwner && (
          <Box sx={{ mt: 1 }}>
            {showTaskInput ? (
              <Stack direction="row" spacing={1}>
                <TextField
                  size="small"
                  placeholder="New task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                  fullWidth
                  autoFocus
                />
                <IconButton size="small" onClick={handleAddTask} color="primary">
                  <Check size={16} />
                </IconButton>
                <IconButton size="small" onClick={() => setShowTaskInput(false)}>
                  <X size={16} />
                </IconButton>
              </Stack>
            ) : (
              <IconButton size="small" onClick={() => setShowTaskInput(true)} sx={{ mt: 0.5 }}>
                <Plus size={16} />
              </IconButton>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
