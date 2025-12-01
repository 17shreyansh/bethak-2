import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Divider, Button, Stack } from '@mui/material';
import { LayoutDashboard, Bell, User, LogOut, Settings, Plus } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';

export default function MainLayoutTogethry() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky" color="default" elevation={0} sx={{ bgcolor: 'background.paper' }}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 56 }}>
          <Stack direction="row" spacing={4} alignItems="center">
            <Button component={Link} to="/dashboard" sx={{ textTransform: 'none', color: 'inherit' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ width: 28, height: 28, bgcolor: 'primary.main', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LayoutDashboard size={16} color="white" />
                </Box>
                <Typography variant="h6" fontWeight={600}>Togethry</Typography>
              </Stack>
            </Button>
            
            <Stack direction="row" spacing={0.5}>
              <Button 
                component={Link} 
                to="/dashboard" 
                color={isActive('/dashboard') ? 'primary' : 'inherit'}
                sx={{ fontWeight: isActive('/dashboard') ? 500 : 400 }}
              >
                Dashboard
              </Button>
              <Button 
                component={Link} 
                to="/rooms" 
                color={isActive('/rooms') ? 'primary' : 'inherit'}
                sx={{ fontWeight: isActive('/rooms') ? 500 : 400 }}
              >
                Rooms
              </Button>
              <Button 
                component={Link} 
                to="/people" 
                color={isActive('/people') ? 'primary' : 'inherit'}
                sx={{ fontWeight: isActive('/people') ? 500 : 400 }}
              >
                People
              </Button>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton size="small">
              <Bell size={18} />
            </IconButton>

            <Button
              component={Link}
              to="/rooms/create"
              variant="contained"
              startIcon={<Plus size={16} />}
              size="small"
            >
              New Room
            </Button>

            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'grey.300', fontSize: '0.875rem' }}>
                {user?.name?.[0] || 'U'}
              </Avatar>
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              PaperProps={{ sx: { minWidth: 180, mt: 1 } }}
            >
              <MenuItem component={Link} to="/profile" onClick={() => setAnchorEl(null)}>
                <User size={16} style={{ marginRight: 8 }} /> Profile
              </MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)}>
                <Settings size={16} style={{ marginRight: 8 }} /> Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                <LogOut size={16} style={{ marginRight: 8 }} /> Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
