import { useState } from 'react';
import { Box, Typography, Stack, Chip, Avatar, IconButton, TextField, Button } from '@mui/material';
import { Plus, MoreVertical, Clock, MessageSquare } from 'lucide-react';

const INITIAL_TASKS = {
  todo: [
    { id: '1', title: 'Design new landing page', assignee: 'JD', priority: 'high', comments: 3, time: '2h' },
    { id: '2', title: 'Update API documentation', assignee: 'SK', priority: 'medium', comments: 1, time: '4h' },
  ],
  doing: [
    { id: '3', title: 'Implement auth flow', assignee: 'AM', priority: 'high', comments: 5, time: '6h' },
  ],
  done: [
    { id: '4', title: 'Setup CI/CD pipeline', assignee: 'RK', priority: 'low', comments: 2, time: '8h' },
  ],
};

export default function TaskBoardPanel() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [draggedTask, setDraggedTask] = useState(null);

  const handleDragStart = (task, column) => {
    setDraggedTask({ task, column });
  };

  const handleDrop = (targetColumn) => {
    if (!draggedTask) return;
    const { task, column: sourceColumn } = draggedTask;
    
    if (sourceColumn === targetColumn) return;

    setTasks(prev => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter(t => t.id !== task.id),
      [targetColumn]: [...prev[targetColumn], task],
    }));
    setDraggedTask(null);
  };

  const priorityColors = {
    high: 'error',
    medium: 'warning',
    low: 'info',
  };

  const Column = ({ title, columnKey, items, count }) => (
    <Box
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => handleDrop(columnKey)}
      sx={{
        flex: 1,
        minWidth: 280,
        bgcolor: 'grey.50',
        borderRadius: 2,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle2" fontWeight={600}>{title}</Typography>
          <Chip label={count} size="small" sx={{ height: 20, fontSize: '0.75rem' }} />
        </Stack>
        <IconButton size="small"><Plus size={16} /></IconButton>
      </Stack>

      {items.map(task => (
        <Box
          key={task.id}
          draggable
          onDragStart={() => handleDragStart(task, columnKey)}
          sx={{
            bgcolor: 'white',
            p: 2,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'grey.200',
            cursor: 'grab',
            transition: 'all 0.2s',
            '&:hover': {
              boxShadow: 3,
              transform: 'translateY(-2px)',
            },
            '&:active': {
              cursor: 'grabbing',
            },
          }}
        >
          <Stack spacing={1.5}>
            <Typography variant="body2" fontWeight={500}>{task.title}</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip label={task.priority} size="small" color={priorityColors[task.priority]} sx={{ height: 22 }} />
              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                <Clock size={12} />
                <Typography variant="caption">{task.time}</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                <MessageSquare size={12} />
                <Typography variant="caption">{task.comments}</Typography>
              </Stack>
              <Box sx={{ flex: 1 }} />
              <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>{task.assignee}</Avatar>
            </Stack>
          </Stack>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3, overflow: 'auto' }}>
      <Stack direction="row" spacing={2} sx={{ height: '100%', overflowX: 'auto' }}>
        <Column title="To Do" columnKey="todo" items={tasks.todo} count={tasks.todo.length} />
        <Column title="In Progress" columnKey="doing" items={tasks.doing} count={tasks.doing.length} />
        <Column title="Done" columnKey="done" items={tasks.done} count={tasks.done.length} />
      </Stack>
    </Box>
  );
}
