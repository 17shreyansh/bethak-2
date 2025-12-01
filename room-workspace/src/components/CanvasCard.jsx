import { Rnd } from 'react-rnd';
import { Card, CardContent, Box, Typography, IconButton, TextField, Checkbox, List, ListItem, Stack, Menu, MenuItem, Chip, Avatar } from '@mui/material';
import { Plus, Trash2, Type, Heading1, List as ListIcon, CheckSquare, Image as ImageIcon, Link as LinkIcon, GripVertical } from 'lucide-react';
import { useState } from 'react';
import { useCanvasStore } from '../store/useCanvasStore';
import { useAuthStore } from '../store/useAuthStore';

export default function CanvasCard({ card }) {
  const { updateCardPosition, updateCardSize, addBlock, updateBlock, deleteBlock } = useCanvasStore();
  const { user } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOwner = user?.id === card.userId;

  const blockTypes = [
    { type: 'heading', icon: <Heading1 size={16} />, label: 'Heading' },
    { type: 'text', icon: <Type size={16} />, label: 'Text' },
    { type: 'list', icon: <ListIcon size={16} />, label: 'List' },
    { type: 'checklist', icon: <CheckSquare size={16} />, label: 'Checklist' },
    { type: 'image', icon: <ImageIcon size={16} />, label: 'Image' },
    { type: 'link', icon: <LinkIcon size={16} />, label: 'Link' },
  ];

  const handleAddBlock = (type) => {
    addBlock(card.id, type);
    setAnchorEl(null);
  };

  return (
    <Rnd
      position={{ x: card.x, y: card.y }}
      size={{ width: card.width, height: card.height }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      onDragStop={(e, d) => updateCardPosition(card.id, d.x, d.y)}
      onResizeStop={(e, direction, ref, delta, position) => {
        updateCardSize(card.id, ref.offsetWidth, ref.offsetHeight);
        updateCardPosition(card.id, position.x, position.y);
      }}
      dragHandleClassName="drag-handle"
      enableResizing={isOwner}
      disableDragging={!isOwner}
    >
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderTop: 4, borderColor: card.color }}>
        <Box className="drag-handle" sx={{ p: 1.5, bgcolor: 'grey.50', cursor: 'move', borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1}>
              <GripVertical size={16} color="#94a3b8" />
              <Avatar sx={{ width: 24, height: 24, bgcolor: card.color, fontSize: '0.75rem' }}>
                {card.userName[0]}
              </Avatar>
              <Typography variant="body2" fontWeight={600}>{card.userName}</Typography>
            </Stack>
            {isOwner && (
              <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Plus size={16} />
              </IconButton>
            )}
          </Stack>
        </Box>

        <CardContent sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          {card.blocks.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
              <Typography variant="body2">
                {isOwner ? 'Click + to add content' : 'No content yet'}
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              {card.blocks.map((block) => (
                <BlockRenderer
                  key={block.id}
                  block={block}
                  cardId={card.id}
                  isOwner={isOwner}
                  onUpdate={(content) => updateBlock(card.id, block.id, content)}
                  onDelete={() => deleteBlock(card.id, block.id)}
                />
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {blockTypes.map(({ type, icon, label }) => (
          <MenuItem key={type} onClick={() => handleAddBlock(type)}>
            <Stack direction="row" spacing={1} alignItems="center">
              {icon}
              <Typography variant="body2">{label}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </Rnd>
  );
}

function BlockRenderer({ block, cardId, isOwner, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  switch (block.type) {
    case 'heading':
      return (
        <Box>
          {isOwner && editing ? (
            <TextField
              fullWidth
              value={block.content}
              onChange={(e) => onUpdate(e.target.value)}
              onBlur={() => setEditing(false)}
              autoFocus
              variant="standard"
              sx={{ '& input': { fontSize: '1.25rem', fontWeight: 600 } }}
            />
          ) : (
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" onClick={() => isOwner && setEditing(true)} sx={{ cursor: isOwner ? 'pointer' : 'default' }}>
                {block.content}
              </Typography>
              {isOwner && <IconButton size="small" onClick={onDelete}><Trash2 size={14} /></IconButton>}
            </Stack>
          )}
        </Box>
      );

    case 'text':
      return (
        <Box>
          {isOwner && editing ? (
            <TextField
              fullWidth
              multiline
              rows={3}
              value={block.content}
              onChange={(e) => onUpdate(e.target.value)}
              onBlur={() => setEditing(false)}
              autoFocus
              variant="outlined"
              size="small"
            />
          ) : (
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Typography variant="body2" onClick={() => isOwner && setEditing(true)} sx={{ cursor: isOwner ? 'pointer' : 'default', flex: 1 }}>
                {block.content}
              </Typography>
              {isOwner && <IconButton size="small" onClick={onDelete}><Trash2 size={14} /></IconButton>}
            </Stack>
          )}
        </Box>
      );

    case 'list':
      return (
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <List dense disablePadding sx={{ flex: 1 }}>
              {block.content.map((item, idx) => (
                <ListItem key={idx} sx={{ py: 0.5, px: 0 }}>
                  <Typography variant="body2">• {item}</Typography>
                </ListItem>
              ))}
            </List>
            {isOwner && <IconButton size="small" onClick={onDelete}><Trash2 size={14} /></IconButton>}
          </Stack>
        </Box>
      );

    case 'checklist':
      return (
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <List dense disablePadding sx={{ flex: 1 }}>
              {block.content.map((item, idx) => (
                <ListItem key={idx} sx={{ py: 0.5, px: 0 }}>
                  <Checkbox
                    size="small"
                    checked={item.checked}
                    onChange={() => {
                      if (isOwner) {
                        const newContent = [...block.content];
                        newContent[idx] = { ...item, checked: !item.checked };
                        onUpdate(newContent);
                      }
                    }}
                    disabled={!isOwner}
                  />
                  <Typography variant="body2" sx={{ textDecoration: item.checked ? 'line-through' : 'none' }}>
                    {item.text}
                  </Typography>
                </ListItem>
              ))}
            </List>
            {isOwner && <IconButton size="small" onClick={onDelete}><Trash2 size={14} /></IconButton>}
          </Stack>
        </Box>
      );

    case 'image':
      return (
        <Box>
          <Stack spacing={1}>
            {block.content ? (
              <Box component="img" src={block.content} sx={{ width: '100%', borderRadius: 1 }} />
            ) : (
              isOwner && (
                <TextField
                  fullWidth
                  placeholder="Paste image URL..."
                  value={block.content}
                  onChange={(e) => onUpdate(e.target.value)}
                  size="small"
                />
              )
            )}
            {isOwner && <IconButton size="small" onClick={onDelete}><Trash2 size={14} /></IconButton>}
          </Stack>
        </Box>
      );

    case 'link':
      return (
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            {block.content ? (
              <Chip
                label={block.content}
                component="a"
                href={block.content}
                target="_blank"
                clickable
                size="small"
                icon={<LinkIcon size={14} />}
              />
            ) : (
              isOwner && (
                <TextField
                  fullWidth
                  placeholder="Paste link URL..."
                  value={block.content}
                  onChange={(e) => onUpdate(e.target.value)}
                  size="small"
                />
              )
            )}
            {isOwner && <IconButton size="small" onClick={onDelete}><Trash2 size={14} /></IconButton>}
          </Stack>
        </Box>
      );

    default:
      return null;
  }
}
