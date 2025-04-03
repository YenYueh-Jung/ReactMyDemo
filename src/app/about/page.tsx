// 'use client';
// import React from 'react';
// import { 
//   Container,
//   Typography,
//   Card,
//   CardMedia,
//   Avatar,
//   Link,
//   CardContent 
// } from '@mui/material';
// import { Email, LinkedIn, GitHub } from '@mui/icons-material';
// import { styled } from '@mui/system';
// import Image from 'next/image'; // 導入 Next.js Image 組件

// // 使用 styled 組件替代 sx 屬性
// const StyledContainer = styled(Container)({
//   marginTop: '32px',
//   marginBottom: '32px'
// });

// const StyledCard = styled(Card)({
//   maxWidth: '1000px',
//   margin: 'auto',
//   textAlign: 'center'
// });

// const StyledAvatar = styled(Avatar)({
//   width: '100px',
//   height: '100px',
//   margin: '-50px auto 20px',
//   border: '4px solid white'
// });

// const SocialLink = styled(Link)({
//   display: 'inline-flex',
//   marginLeft: '8px',
//   marginRight: '8px',
//   color: 'inherit'
// });

// const SocialIcon = styled('div')({
//   fontSize: '30px'
// });

// // 自定義 CardMedia 替代品，使用 Next.js Image
// const CustomCardMedia = styled('div')({
//   position: 'relative',
//   height: '300px',
//   width: '100%',
//   overflow: 'hidden'
// });

// // 定義社交媒體連結數據
// const socialLinks = [
//   { icon: <Email className="social-icon" />, href: '...com' },
//   { 
//     icon: <LinkedIn className="social-icon" />, 
//     href: '...com', 
//     target: '_blank', 
//     rel: 'noopener' 
//   },
//   { 
//     icon: <GitHub className="social-icon" />, 
//     href: '....com', 
//     target: '_blank', 
//     rel: 'noopener' 
//   },
// ];

// // 技能描述數據
// const skills = [
//   'Frontend: Experienced in React and Next.js, with solid knowledge of HTML, CSS, and JavaScript.',
//   'Proficient in API integration, enabling seamless communication between front-end applications and backend services.',
//   'Backend: Skilled in C# and .NET, with expertise in building scalable and efficient web applications using .NET MVC and .NET API.',
//   'Capable of designing and implementing RESTful APIs.',
//   'Database: Proficient in MS SQL, with experience in database design, query optimization, and managing large datasets efficiently.',
// ];

// export default function AboutPage() {
//   return (
//     <StyledContainer maxWidth="md">
//       <StyledCard>
//         <CustomCardMedia>
//           <Image
//             src="/FrontEnd5.jpg"
//             alt="image"
//             fill
//             style={{ objectFit: 'cover' }}
//             priority
//           />
//         </CustomCardMedia>
//         <StyledAvatar alt="Jo" src="" />
//         <CardContent>
//           <Typography variant="h4" component="h1" gutterBottom>
//             Jo
//           </Typography>
//           <Typography variant="subtitle1" color="textSecondary" gutterBottom>
//             Engineer
//           </Typography>
//           {skills.map((skill, index) => (
//             <Typography key={index} variant="body1" align="left" paragraph>
//               {skill}
//             </Typography>
//           ))}
//           <div style={{ 
//             display: 'flex',
//             justifyContent: 'center',
//             marginTop: '16px'
//           }}>
//             {socialLinks.map((link, index) => (
//               <SocialLink
//                 key={index}
//                 href={link.href}
//                 target={link.target}
//                 rel={link.rel}
//               >
//                 <SocialIcon>{link.icon}</SocialIcon>
//               </SocialLink>
//             ))}
//           </div>
//         </CardContent>
//       </StyledCard>
//     </StyledContainer>
//   );
// }
'use client';
import React from 'react';
import { 
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Avatar,
  Link,
  CardContent 
} from '@mui/material';
import { Email, LinkedIn, GitHub } from '@mui/icons-material';

// 定義內聯樣式，使用 React.CSSProperties 類型
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    marginTop: '32px', // mt: 4 (4 * 8px = 32px)
    marginBottom: '32px', // mb: 4
  },
  card: {
    maxWidth: '1000px',
    margin: '0 auto',
    textAlign: 'center', // 明確指定為 'center'
  },
  avatar: {
    width: '100px',
    height: '100px',
    margin: '-50px auto 20px',
    border: '4px solid white',
  },
  link: {
    display: 'inline-flex',
    marginLeft: '8px', // mx: 1 (8px)
    marginRight: '8px',
  },
  icon: {
    fontSize: '30px',
  },
};

// 定義社交媒體連結數據
const socialLinks = [
  { icon: <Email style={styles.icon} />, href: '...com' },
  { 
    icon: <LinkedIn style={styles.icon} />, 
    href: '...com', 
    target: '_blank', 
    rel: 'noopener' 
  },
  { 
    icon: <GitHub style={styles.icon} />, 
    href: '....com', 
    target: '_blank', 
    rel: 'noopener' 
  },
];

// 技能描述數據
const skills = [
  'Frontend: Experienced in React and Next.js, with solid knowledge of HTML, CSS, and JavaScript.',
  'Proficient in API integration, enabling seamless communication between front-end applications and backend services.',
  'Backend: Skilled in C# and .NET, with expertise in building scalable and efficient web applications using .NET MVC and .NET API.',
  'Capable of designing and implementing RESTful APIs.',
  'Database: Proficient in MS SQL, with experience in database design, query optimization, and managing large datasets efficiently.',
];

export default function AboutPage() {
  return (
    <Container maxWidth="md" style={styles.container}>
      <Card style={styles.card}>
        <CardMedia
          component="img"
          height="300"
          image="/FrontEnd5.jpg"
          alt="image"
        />
        <Avatar
          alt="Jo"
          src=""
          style={styles.avatar}
        />
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Jo
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Engineer
          </Typography>
          {skills.map((skill, index) => (
            <Typography key={index} variant="body1" align="left" paragraph>
              {skill}
            </Typography>
          ))}
          <Grid container spacing={2} justifyContent="center" direction="row">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                color="inherit"
                target={link.target}
                rel={link.rel}
                style={styles.link}
              >
                {link.icon}
              </Link>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
// import React from 'react';
// import { 
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   Avatar,
//   Link,
//   CardContent 
// } from '@mui/material';
// import { Email, LinkedIn, GitHub } from '@mui/icons-material';

// // 定義社交媒體連結數據
// const socialLinks = [
//   { icon: <Email sx={{ fontSize: 30 }} />, href: '...com' },
//   { 
//     icon: <LinkedIn sx={{ fontSize: 30 }} />, 
//     href: '...com', 
//     target: '_blank', 
//     rel: 'noopener' 
//   },
//   { 
//     icon: <GitHub sx={{ fontSize: 30 }} />, 
//     href: '....com', 
//     target: '_blank', 
//     rel: 'noopener' 
//   },
// ];

// // 技能描述數據
// const skills = [
//   'Frontend: Experienced in React and Next.js, with solid knowledge of HTML, CSS, and JavaScript.',
//   'Proficient in API integration, enabling seamless communication between front-end applications and backend services.',
//   'Backend: Skilled in C# and .NET, with expertise in building scalable and efficient web applications using .NET MVC and .NET API.',
//   'Capable of designing and implementing RESTful APIs.',
//   'Database: Proficient in MS SQL, with experience in database design, query optimization, and managing large datasets efficiently.',
// ];

// export default function AboutPage() {
//   return (
//     <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
//       <Card sx={{ maxWidth: 1000, margin: 'auto', textAlign: 'center' }}>
//         <CardMedia
//           component="img"
//           height="300"
//           image="/FrontEnd5.jpg"
//           alt="image"
//         />
//         <Avatar
//           alt="Jo"
//           src=""
//           sx={{ width: 100, height: 100, margin: '-50px auto 20px', border: '4px solid white' }}
//         />
//         <CardContent>
//           <Typography variant="h4" component="h1" gutterBottom>
//             Jo
//           </Typography>
//           <Typography variant="subtitle1" color="textSecondary" gutterBottom>
//             Engineer
//           </Typography>
//           {skills.map((skill, index) => (
//             <Typography key={index} variant="body1" align="left" paragraph>
//               {skill}
//             </Typography>
//           ))}
//           <Grid container spacing={2} justifyContent="center" direction="row">
//             {socialLinks.map((link, index) => (
//               <Link
//                 key={index}
//                 href={link.href}
//                 color="inherit"
//                 target={link.target}
//                 rel={link.rel}
//                 sx={{ display: 'inline-flex', mx: 1 }} // 替代 Grid item 的間距控制
//               >
//                 {link.icon}
//               </Link>
//             ))}
//           </Grid>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// }

// import React from 'react';
// import { Container,Typography,Grid,Card,CardMedia,Avatar,Link,CardContent } from '@mui/material';
// import {Email,LinkedIn,GitHub} from '@mui/icons-material'
// export default function AboutPage()
// {
//   return(
// <Container maxWidth='md' sx={{mt:4,mb:4}}>
//   <Card sx={{maxWidth:1000, margin:'auto', textAlign:'center'}}>
//     <CardMedia component='img' height='300' image='/FrontEnd5.jpg' alt='image'/>
//     <Avatar alt='Jo' src='' sx={{width:100,height:100,margin:'-50px auto 20px',border:'4px solid white'}}/>
//     <CardContent>
//       <Typography variant='h4' component='h1' gutterBottom>
//         Jo
//       </Typography>
//       <Typography variant='subtitle1' color='textSecondary' gutterBottom>
//         Engineer
//       </Typography>
//       <Typography variant='body1' align="left" paragraph>
//       Frontend: Experienced in React and Next.js, with solid knowledge of HTML, CSS, and JavaScript.
//       </Typography>
//       <Typography variant='body1' align="left" paragraph>
//       Proficient in API integration, enabling seamless communication between front-end applications and backend services.
//       </Typography>
//       <Typography variant='body1' align="left" paragraph>
//       Backend: Skilled in C# and .NET, with expertise in building scalable and efficient web applications using .NET MVC and .NET API. 
//       </Typography>
//       <Typography variant='body1' align="left" paragraph>
//       Capable of designing and implementing RESTful APIs.
//       </Typography>
//       <Typography variant='body1' align="left" paragraph>
//       Database: Proficient in MS SQL, with experience in database design, query optimization, and managing large datasets efficiently.
//       </Typography>
//       <Grid container spacing={2} justifyContent='center' direction="row">
//         <Grid>
//           <Link href='...com' color='inherit'>
//             <Email sx={{fontSize:30}}/>
//           </Link>
//         </Grid>
//         <Grid>
//           <Link href='...com' target='_blank' rel='noopener' color='inherit'>
//             <LinkedIn sx={{fontSize:30}}></LinkedIn>
//           </Link>
//         </Grid>
//         <Grid>
//          <Link href='....com' target='_blank' rel='noopener' color='inherit'>
//           <GitHub sx={{fontSize:30}}></GitHub>
//          </Link>
//         </Grid>

//       </Grid>
//     </CardContent>

//   </Card>

// </Container>

//   );
// }