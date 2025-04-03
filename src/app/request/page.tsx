'use client';
import { useState, useEffect } from 'react';
import { APIs } from '@/types';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Input,
} from '@mui/material';

export default function RequestPage() {
  const [api, setApi] = useState<APIs>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    imagUrl: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  
  useEffect(() => {
    const storedApis: APIs[] = JSON.parse(localStorage.getItem('apis') || '[]');
    console.log('Initial localStorage:', storedApis);
  }, []); 
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setApi((prev) => ({ ...prev, imagUrl: reader.result as string }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 從 localStorage 獲取現有資料
    const existingApis: APIs[] = JSON.parse(localStorage.getItem('apis') || '[]');
    const usedIds = existingApis.map((a) => a.id).sort((a, b) => a - b);
    let newId = 3; // 從 3 開始，1,2 預設for demo用
    for (let i = 0; i < usedIds.length; i++) {
      if (usedIds[i] !== newId) break;
      newId++;
    }

    const newApi = { ...api, id: newId };
    const newApis = [...existingApis, newApi];
    localStorage.setItem('apis', JSON.stringify(newApis));

    // 重置表單
    setApi({ id: 0, name: '', description: '', price: 0, imagUrl: '' });
    setFile(null);
    setPreview('');

    console.log('Added API:', newApi);
    console.log('Current localStorage:', JSON.parse(localStorage.getItem('apis') || '[]'));
  };

  return (
    <Box sx={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom align="center">
        Add New API
      </Typography>
      <Card sx={{ padding: '1rem', boxShadow: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={api.name}
              onChange={(e) => setApi((prev) => ({ ...prev, name: e.target.value }))}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Description"
              value={api.description}
              onChange={(e) => setApi((prev) => ({ ...prev, description: e.target.value }))}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Price"
              type="number"
              value={api.price}
              onChange={(e) => setApi((prev) => ({ ...prev, price: Number(e.target.value) }))}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Input
              type="file"
              inputProps={{ accept: 'image/*' }}
              onChange={handleFileChange}
              fullWidth
              sx={{ margin: '1rem 0' }}
            />
            {preview && (
              <CardMedia
                component="img"
                image={preview}
                alt="Preview"
                sx={{ maxWidth: '200px', margin: '1rem auto', display: 'block' }}
              />
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Add API
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
