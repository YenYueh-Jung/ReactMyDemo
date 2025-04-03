'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconButton, Box, Tabs, Tab } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(0); // 初始值為 0

  // 定義導航選項
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'AddAPI', path: '/request' },
    { label: 'APIs', path: '/content' },
  ];

  // 在客戶端渲染時動態設置當前 Tab
  useEffect(() => {
    const pathname = window.location.pathname; // 使用 window.location 獲取當前路徑
    const tabIndex = navItems.findIndex((item) => item.path === pathname);
    setCurrentTab(tabIndex === -1 ? 0 : tabIndex); // 如果路徑不在 navItems 中，預設為 0
  }, []); // 空依賴陣列，僅在組件掛載時執行一次

  // 處理 Tab 切換時的跳轉邏輯
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue); // 更新當前選中的 Tab
    router.push(navItems[newValue].path); // 使用 router.push 進行跳轉
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'transparent', borderBottom: 'none', px: 3, py: 0 }}>
      {/* Logo 和 Tab 的容器 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Box
          component="img"
          src="/Logo.png"
          alt="Logo"
          sx={{
            height: 40,
            width: 'auto',
            cursor: 'pointer',
          }}
          onClick={() => router.push('/')}
        />

        {/* 導航 Tabs */}
        <Tabs
          value={currentTab} // 動態設置當前選中的 Tab
          onChange={handleChange}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#243B65',
              height: '3px',
            },
          }}
        >
          {navItems.map((item, index) => (
            <Tab
              key={index}
              label={item.label}
              component={Link}
              href={item.path}
              sx={{
                color: 'black',
                fontWeight: '500',
                fontSize: '14px',
                textTransform: 'none',
                mx: 1,
                '&:hover': {
                  color: '#243B65',
                },
                '&.Mui-selected': {
                  color: 'black',
                },
              }}
            />
          ))}
        </Tabs>

        {/* 小螢幕下的菜單按鈕 */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: 'block', md: 'none' } }}
          onClick={() => router.push('/')}
        >
          <MenuIcon sx={{ color: 'black' }} />
        </IconButton>
      </Box>
    </Box>
  );
}

// import Link from 'next/link';
// import { IconButton, Box, Tabs, Tab } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// export default function Navbar() {
//   // 定義導航選項，包含標籤和路徑
//   const navItems = [
//     { label: 'Home', path: '/' },
//      { label: 'About', path: '/about' },
//      { label: 'AddAPI', path: '/request' },
//      { label: 'APIs', path: '/content' },
//   ];

//   // 處理 Tab 切換時的跳轉邏輯
//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     // 直接使用 window.location.href 進行頁面跳轉
//     window.location.href = navItems[newValue].path;
//   };

//   return (
//     <Box sx={{ width: '100%', bgcolor: 'transparent', borderBottom: 'none', px: 3, py: 0 }}>
//       {/* Logo 和 Tab 的容器 */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         {/* Logo */}
//         <Box
//           component="img"
//           src="/Logo.png"
//           alt="Logo"
//           sx={{
//             height: 40,
//             width: 'auto',
//             cursor: 'pointer',
//           }}
//           onClick={() => window.location.href = '/'} // 點擊 Logo 跳轉到首頁
//         />

//         {/* 導航 Tabs */}
//         <Tabs
//           value={0} // 靜態設置為 0，預設選中第一個 Tab
//           onChange={handleChange}
//           sx={{
//             '& .MuiTabs-indicator': {
//               backgroundColor: '#243B65',
//               height: '3px',
//             },
//           }}
//         >
//           {navItems.map((item, index) => (
//             <Tab
//               key={index}
//               label={item.label}
//               component={Link}
//               href={item.path}
//               sx={{
//                 color: 'black',
//                 fontWeight: '500',
//                 fontSize: '14px',
//                 textTransform: 'none',
//                 mx: 1,
//                 '&:hover': {
//                   color: '#243B65',
//                 },
//                 '&.Mui-selected': {
//                   color: 'black',
//                 },
//               }}
//             />
//           ))}
//         </Tabs>

//         {/* 小螢幕下的菜單按鈕 */}
//         <IconButton
//           edge="end"
//           color="inherit"
//           aria-label="menu"
//           sx={{ display: { xs: 'block', md: 'none' } }}
//           onClick={() => window.location.href = '/'} // 點擊跳轉到首頁
//         >
//           <MenuIcon sx={{ color: 'black' }} />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// }