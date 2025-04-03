// "use client"; 
// import React from "react";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
// import { ThemeProvider, CssBaseline } from "@mui/material";
// import theme from "@/theme"; // 自訂 MUI 主題 (可選)

// const cache = createCache({ key: "css", prepend: true });

// export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
//   return (
//     <CacheProvider value={cache}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline /> {/* 確保樣式一致 */}
//         {children}
//       </ThemeProvider>
//     </CacheProvider>
//   );
// }