'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { APIs } from '@/types';
import { Box, Typography } from '@mui/material';
import ExchangeRatePage from './ExchangeRatePage'; // 創建
import InvoiceRecognitionPage from './InvoiceRecognitionPage'; // 創建

export default function ApiDetailPage() {
 //使用 useParams 從 URL 獲取動態 路由id
  const { id } = useParams(); 
  const [api, setApi] = useState<APIs | null>(null);

  useEffect(() => {
    const storedApis = JSON.parse(localStorage.getItem('apis') || '[]');
    const foundApi = storedApis.find((a: APIs) => a.id === Number(id));
    setApi(foundApi || null);
  }, [id]);

  if (!api) {
    return (
      <Box sx={{ padding: '2rem', textAlign: 'center' }}>
        <Typography variant="h6">未找到該 API</Typography>
      </Box>
    );
  }

  // 匯率轉換 API
  if (api.id === 1) {
    return <ExchangeRatePage api={api} />;
  }
  //文字辨識JS，後續欲改使用API應用辨識發票
  if (api.id === 2) {
    return <InvoiceRecognitionPage api={api} />;
  }
  // 其他新增的API
  return (
    <Box sx={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', bgcolor: '#f5f5f5' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#424242' }}>
        {api.name}
      </Typography>
      <Typography variant="body1" sx={{ color: '#616161' }}>
        {api.description}
      </Typography>
      <Typography variant="body1" sx={{ color: '#424242', mt: 2 }}>
        價格: ${api.price}
      </Typography>
    </Box>
  );
}