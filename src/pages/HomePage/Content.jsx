import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const articles = [
  {
    id: 1,
    title: 'Tìm Hiểu Về Hoạt Chất Metalaxyl',
    description: 'Hoạt chất Metalaxyl là gì? Cách dùng Metalaxyl triệt để trong cây trồng...',
    imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.qJrIn3mRst3AGiN9t9eILAHaFj&pid=Api&P=0&h=180',
  },
  {
    id: 2,
    title: 'Kỹ Thuật Trồng & Chăm Sóc Cây Chanh Dây',
    description: 'Kỹ thuật trồng và chăm sóc cây chanh dây đạt năng suất cao...',
    imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.ZEAar_KRmDkDziuNm8dnhwHaE6&pid=Api&P=0&h=180',
  },
  {
    id: 3,
    title: 'Phong Trào Sâu Hại Trên Cây Sầu Riêng',
    description: 'Hướng dẫn phòng trị rầy phấn, nhện đỏ, sâu đục thân hại trên cây sầu riêng...',
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.m88P1cRUzm3p2bICwK2I-wHaE7&pid=Api&P=0&h=180',
  },
];

const Content = () => {
  const handleViewMore = () => {
    // Logic để tải thêm hoặc điều hướng
    alert('Xem thêm nội dung!');
  };

  return (
    <div style={{ padding: '30px 165px ' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Tin Tức & Cẩm Nang Nông Nghiệp
      </Typography>
      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} sm={4} key={article.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={article.imageUrl}
                alt={article.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleViewMore}>
          Xem thêm
        </Button>
      </div>
    </div>
  );
};

export default Content;