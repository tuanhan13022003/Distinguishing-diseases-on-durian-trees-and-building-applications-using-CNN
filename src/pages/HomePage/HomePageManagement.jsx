import React from 'react'
import Box from '@mui/material/Box'
import Hero from '~/components/Hero/Hero'
import Footer from '~/components/Footer/Footer'
import Content from './Content'

function HomePageManagement() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        overflowX: 'hidden', 
        backgroundColor: '#fff' 
      }}
    >
      <Hero />
      <Content/>
    </Box>
  )
}

export default HomePageManagement

