import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Divider, Button, Badge, Stack, Tabs, Tab } from '@mui/material';
import { LayoutDashboard, Search, Bell, User, LogOut, Settings, Plus } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';

export default function MainLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={4} alignItems="center">
            <Button component={Link} to="/dashboard" sx={{ textTransform: 'none' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ width: 32, height: 32, bgcolor: 'grey.900', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LayoutDashboard size={18} color="white" />
                </Box>
                <Typography variant="h6" fontWeight={600}>Togethry</Typography>
              </Stack>
            </Button>
            
            <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button component={Link} to="/dashboard" color={isActive('/dashboard') ? 'primary' : 'inherit'}>Dashboard</Button>
              <Button component={Link} to="/rooms" color={isActive('/rooms') ? 'primary' : 'inherit'}>Rooms</Button>
              <Button component={Link} to="/people" color={isActive('/people') ? 'primary' : 'inherit'}>People</Button>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton onClick={() => navigate('/search')}>
              <Search size={20} />
            </IconButton>
            
            <IconButton>
              <Badge badgeContent={1} color="primary">
                <Bell size={20} />
              </Badge>
            </IconButton>

            <Button
              component={Link}
              to="/rooms/create"
              variant="contained"
              startIcon={<Plus size={16} />}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              Create Room
            </Button>

            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'grey.400' }}>
                {user?.name?.[0] || 'U'}
              </Avatar>
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem component={Link} to="/profile" onClick={() => setAnchorEl(null)}>
                <User size={16} style={{ marginRight: 8 }} /> Profile
              </MenuItem>
              <MenuItem component={Link} to="/settings" onClick={() => setAnchorEl(null)}>
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
