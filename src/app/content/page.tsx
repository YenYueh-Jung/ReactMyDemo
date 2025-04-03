'use client';
import { useState, useEffect } from 'react';
import ApiCard from '@/components/ApiCard';
import { APIs } from '@/types';
import { Box, Typography } from '@mui/material';

// 定義預設的固定 API
const defaultApis: APIs[] = [
  {
    id: 1,
    name: "Exchange Rate API",
    description: "Convert currency using real-time rates",
    price: 0,
    imagUrl: "/API1.jpg",
  },
  {
    id: 2,
    name: "Text Recognition JS",
    description: "Recognize invoice details from images",
    price: 0,
    imagUrl: "/API2.jpg",
  },
];

export default function ContentPage() {
  const [apis, setApis] = useState<APIs[]>([]);

  useEffect(() => {
    const initializeApis = () => {
      let storedApis: APIs[] = JSON.parse(localStorage.getItem('apis') || '[]');

      if (storedApis.length === 0) {
        storedApis = [...defaultApis];
        localStorage.setItem('apis', JSON.stringify(storedApis));
      } else {
        const hasId1 = storedApis.some((api) => api.id === 1);
        const hasId2 = storedApis.some((api) => api.id === 2);

        if (!hasId1) storedApis.unshift(defaultApis[0]);
        if (!hasId2) storedApis.unshift(defaultApis[1]);
        localStorage.setItem('apis', JSON.stringify(storedApis));
      }

      setApis(storedApis);
    };

    initializeApis();
    window.addEventListener('storage', initializeApis);
    return () => window.removeEventListener('storage', initializeApis);
  }, []);

  return (
    <Box sx={{ 
      padding: '2rem', 
      maxWidth: '1200px', 
      margin: '0 auto',
      '& .api-container': {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        justifyContent: 'center'
      },
      '& .api-item': {
        width: 'calc(33.333% - 24px)',
        minWidth: '300px',
        '@media (max-width: 900px)': {
          width: 'calc(50% - 24px)'
        },
        '@media (max-width: 600px)': {
          width: '100%'
        }
      }
    }}>
      <Typography variant="h4" gutterBottom align="center">
        API List
      </Typography>
      
      <div className="api-container">
        {apis.length > 0 ? (
          apis.map((api) => (
            <div className="api-item" key={api.id}>
              <ApiCard api={api} setApis={setApis} />
            </div>
          ))
        ) : (
          <Typography variant="body1" align="center" sx={{ width: '100%' }}>
            No APIs available yet.
          </Typography>
        )}
      </div>
    </Box>
  );
}
