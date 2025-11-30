# MUI Components Quick Reference

## Common Components Used in This Project

### Layout Components

#### Box
```jsx
<Box sx={{ p: 2, bgcolor: 'background.paper' }}>
  Content
</Box>
```
- Flexible container with sx prop for styling
- Replaces: `<div className="...">`

#### Container
```jsx
<Container maxWidth="lg">
  Content
</Container>
```
- Responsive centered container
- maxWidth: xs, sm, md, lg, xl

#### Stack
```jsx
<Stack direction="row" spacing={2} alignItems="center">
  <Item1 />
  <Item2 />
</Stack>
```
- Flexbox layout utility
- direction: row, column
- spacing: 0-10 (8px units)

#### Grid
```jsx
<Grid container spacing={3}>
  <Grid item xs={12} md={6}>
    Content
  </Grid>
</Grid>
```
- 12-column responsive grid
- xs, sm, md, lg, xl breakpoints

### Navigation

#### AppBar & Toolbar
```jsx
<AppBar position="static">
  <Toolbar>
    <Typography variant="h6">Title</Typography>
  </Toolbar>
</AppBar>
```
- Top navigation bar
- position: static, fixed, sticky

#### Tabs
```jsx
<Tabs value={activeTab} onChange={handleChange}>
  <Tab label="Tab 1" value="1" />
  <Tab label="Tab 2" value="2" />
</Tabs>
```
- Tab navigation
- Controlled component

#### Menu
```jsx
<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
  <MenuItem onClick={handleClick}>Option 1</MenuItem>
  <MenuItem onClick={handleClick}>Option 2</MenuItem>
</Menu>
```
- Dropdown menus
- Requires anchor element

### Data Display

#### Card
```jsx
<Card>
  <CardContent>
    <Typography variant="h5">Title</Typography>
    <Typography variant="body2">Content</Typography>
  </CardContent>
</Card>
```
- Content container with elevation
- variant: outlined, elevation

#### List
```jsx
<List>
  <ListItem>
    <ListItemIcon><Icon /></ListItemIcon>
    <ListItemText primary="Text" secondary="Subtext" />
  </ListItem>
</List>
```
- Vertical list of items
- ListItemButton for clickable items

#### Avatar
```jsx
<Avatar sx={{ bgcolor: 'primary.main' }}>
  JD
</Avatar>
```
- User avatars
- Can contain text, image, or icon

#### Chip
```jsx
<Chip label="Tag" color="primary" variant="outlined" />
```
- Compact elements for tags/filters
- color: default, primary, secondary, error, info, success, warning

#### Badge
```jsx
<Badge badgeContent={4} color="primary">
  <Icon />
</Badge>
```
- Notification badges
- Can be dot or number

#### Typography
```jsx
<Typography variant="h4" fontWeight={700} gutterBottom>
  Heading
</Typography>
```
- Text with consistent styling
- variant: h1-h6, body1-body2, caption, button

### Inputs

#### Button
```jsx
<Button variant="contained" color="primary" startIcon={<Icon />}>
  Click Me
</Button>
```
- variant: text, outlined, contained
- size: small, medium, large

#### IconButton
```jsx
<IconButton color="primary">
  <Icon />
</IconButton>
```
- Icon-only buttons
- Circular by default

#### TextField
```jsx
<TextField
  label="Email"
  type="email"
  fullWidth
  required
  InputProps={{
    startAdornment: <InputAdornment position="start"><Icon /></InputAdornment>
  }}
/>
```
- Text input fields
- variant: outlined, filled, standard

#### Checkbox
```jsx
<FormControlLabel
  control={<Checkbox checked={checked} onChange={handleChange} />}
  label="Remember me"
/>
```
- Checkbox inputs
- Use with FormControlLabel

#### Radio
```jsx
<RadioGroup value={value} onChange={handleChange}>
  <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
  <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
</RadioGroup>
```
- Radio button groups
- Controlled component

#### Slider
```jsx
<Slider
  value={value}
  onChange={handleChange}
  min={0}
  max={100}
  valueLabelDisplay="auto"
/>
```
- Range slider
- valueLabelDisplay: auto, on, off

#### ToggleButton
```jsx
<ToggleButtonGroup value={value} exclusive onChange={handleChange}>
  <ToggleButton value="left">Left</ToggleButton>
  <ToggleButton value="right">Right</ToggleButton>
</ToggleButtonGroup>
```
- Toggle button groups
- exclusive: single selection

### Feedback

#### Paper
```jsx
<Paper elevation={3} sx={{ p: 2 }}>
  Content
</Paper>
```
- Elevated surface
- elevation: 0-24
- variant: elevation, outlined

#### Divider
```jsx
<Divider />
```
- Visual separator
- orientation: horizontal, vertical

### Navigation

#### Stepper
```jsx
<Stepper activeStep={activeStep}>
  <Step><StepLabel>Step 1</StepLabel></Step>
  <Step><StepLabel>Step 2</StepLabel></Step>
</Stepper>
```
- Multi-step forms
- orientation: horizontal, vertical

## Styling with sx Prop

### Common Properties
```jsx
sx={{
  // Spacing
  p: 2,           // padding: 16px
  pt: 1,          // padding-top: 8px
  px: 3,          // padding-left & right: 24px
  m: 2,           // margin: 16px
  
  // Colors
  bgcolor: 'primary.main',
  color: 'text.primary',
  borderColor: 'divider',
  
  // Layout
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 2,
  
  // Sizing
  width: '100%',
  height: 400,
  minHeight: '100vh',
  maxWidth: 600,
  
  // Border & Radius
  border: 1,
  borderRadius: 2,
  
  // Shadow
  boxShadow: 3,
  
  // Responsive
  display: { xs: 'none', md: 'flex' },
  
  // Hover
  '&:hover': {
    bgcolor: 'grey.50'
  }
}}
```

## Theme Access

### Colors
- `primary.main`, `primary.light`, `primary.dark`
- `secondary.main`, `secondary.light`, `secondary.dark`
- `error.main`, `warning.main`, `info.main`, `success.main`
- `text.primary`, `text.secondary`
- `background.default`, `background.paper`
- `grey[50]` to `grey[900]`
- `divider`

### Spacing
- Numbers multiply by 8px: `p: 2` = 16px
- Use 0-10 for most cases

### Breakpoints
- `xs`: 0px
- `sm`: 600px
- `md`: 900px
- `lg`: 1200px
- `xl`: 1536px

## Best Practices

1. **Use sx prop** instead of inline styles
2. **Use theme tokens** for colors and spacing
3. **Responsive design** with breakpoint objects
4. **Consistent spacing** with theme.spacing
5. **Semantic HTML** with component prop
6. **Accessibility** - MUI handles ARIA attributes
7. **TypeScript** - Full type support available

## Resources

- [MUI Documentation](https://mui.com/material-ui/)
- [Component API](https://mui.com/material-ui/api/)
- [Customization](https://mui.com/material-ui/customization/theming/)
- [Migration Guide](https://mui.com/material-ui/migration/migration-v4/)
