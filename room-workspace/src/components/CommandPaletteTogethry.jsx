import { useState, useEffect } from 'react';
import { Box, Dialog, TextField, List, ListItem, ListItemIcon, ListItemText, Typography, Chip, InputAdornment } from '@mui/material';
import { Search, Command } from 'lucide-react';

export default function CommandPaletteTogethry({ open, onClose, commands = [] }) {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(commands);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (search) {
      setFiltered(
        commands.filter((cmd) =>
          cmd.title.toLowerCase().includes(search.toLowerCase()) ||
          cmd.description?.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFiltered(commands);
    }
    setSelected(0);
  }, [search, commands]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected((prev) => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter' && filtered[selected]) {
        e.preventDefault();
        filtered[selected].action();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filtered, selected, onClose]);

  useEffect(() => {
    if (!open) setSearch('');
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          mt: -20,
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search commands..."
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Chip
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Command size={10} />
                      <Typography variant="caption">K</Typography>
                    </Box>
                  }
                  size="small"
                  sx={{ height: 20, fontSize: '0.7rem' }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <List sx={{ maxHeight: 400, overflow: 'auto', p: 1 }}>
        {filtered.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              No commands found
            </Typography>
          </Box>
        ) : (
          filtered.map((cmd, index) => (
            <ListItem
              key={cmd.id}
              button
              selected={index === selected}
              onClick={() => {
                cmd.action();
                onClose();
              }}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'grey.100',
                  '&:hover': { bgcolor: 'grey.200' },
                },
              }}
            >
              {cmd.icon && (
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <cmd.icon size={18} />
                </ListItemIcon>
              )}
              <ListItemText
                primary={cmd.title}
                secondary={cmd.description}
                primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
              {cmd.shortcut && (
                <Chip label={cmd.shortcut} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
              )}
            </ListItem>
          ))
        )}
      </List>
    </Dialog>
  );
}
