import React, { Component } from 'react';
import { Typography, Box } from '@mui/material';

class ErrorBoundary extends Component {
  state = { coLoi: false };

  static getDerivedStateFromError(error) {
    return { coLoi: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Lỗi:', error, errorInfo);
  }

  render() {
    if (this.state.coLoi) {
      return (
        <Box sx={{ padding: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            Đã có lỗi xảy ra. Vui lòng thử lại sau.
          </Typography>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;