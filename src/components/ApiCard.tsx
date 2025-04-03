'use client';
import { APIs } from '@/types';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation'; 

interface ApiCardProps {
  api: APIs;
  setApis: React.Dispatch<React.SetStateAction<APIs[]>>;
}

export default function ApiCard({ api, setApis }: ApiCardProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter(); // 用於導航

  const handleDelete = () => {
    if (api.id === 1 || api.id === 2) {
      alert("Demo API 無法刪除");
      setOpen(false);
      return;
    }
    setApis((prev) => {
      const updatedApis = prev.filter((item) => item.id !== api.id);
      localStorage.setItem('apis', JSON.stringify(updatedApis));
      console.log('已刪除 API:', api.id);
      console.log('更新後的 localStorage:', updatedApis);
      return updatedApis;
    });
    setOpen(false);
  };

  const handleCardClick = () => {
    router.push(`/api/${api.id}`); // 根據 api.id 跳轉到動態路由
  };

  return (
    <>
      <Card
        sx={{ maxWidth: 345, boxShadow: 3, cursor: 'pointer', bgcolor: '#e0e0e0' }} 
        onClick={handleCardClick} 
      >
        <CardMedia component="img" height="140" image={api.imagUrl} alt={api.name} />
        <CardContent>
          <Typography variant="h6" component="div" sx={{ color: '#424242' }}>
            {api.name}
          </Typography>
          <Typography variant="body2" sx={{ color: '#616161' }}>
            {api.description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Typography variant="body1" sx={{ color: '#424242' }}>
              價格: ${api.price}
            </Typography>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={(e) => {
                e.stopPropagation(); 
                setOpen(true);
              }}
            >
              <DeleteIcon color="action" fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>確認刪除</DialogTitle>
        <DialogContent>
          <DialogContentText>
          您確定要刪除 {api.name} 嗎？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            取消
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
