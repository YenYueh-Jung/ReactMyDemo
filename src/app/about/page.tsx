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

// 使用 React.CSSProperties 類型
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    marginTop: '32px', // mt: 4 (4 * 8px = 32px)
    marginBottom: '32px', // mb: 4
  },
  card: {
    maxWidth: '1000px',
    margin: '0 auto',
    textAlign: 'center', 
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

// 連結數據
const socialLinks = [
  { 
    icon: <Email style={styles.icon} />, 
    href: '...com' 
  },
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
                //href={link.href}
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
