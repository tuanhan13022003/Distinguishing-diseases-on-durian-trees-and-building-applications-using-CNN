import React, { useState, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  InputAdornment,
  Grid2
} from '@mui/material'
import { Search as SearchIcon, History as HistoryIcon, Star as StarIcon, CameraAlt as CameraIcon } from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import { useHotkeys } from 'react-hotkeys-hook'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { searchProductAPI } from '~/redux/product/productSlice'
import { useLoading } from '~/context/loading'

function SearchButtonModalCustom({ isDisplayText = true }) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState([])
  const { setIsLoading } = useLoading()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useHotkeys('ctrl+k, command+k', (event) => {
    event.preventDefault()
    setOpen(true)
  })

  useHotkeys('esc', (event) => {
    event.preventDefault()
    setOpen(false)
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    onDrop: (acceptedFiles) => {
      const filesWithPreview = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
      setUploadedFiles((prev) => [...prev, ...filesWithPreview])
    }
  })

  // Xử lý khi chụp ảnh từ camera
  const handleCameraCapture = (event) => {
    const file = event.target.files[0]
    if (file) {
      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
      setUploadedFiles((prev) => [...prev, fileWithPreview])
    }
  }

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview))
    }
  }, [uploadedFiles])

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setSearchQuery('')
    setUploadedFiles([])
  }

const sendToBackend = async () => {
  setIsLoading(true);

  try {
    if (uploadedFiles.length > 0) {
      const file = uploadedFiles[0];

      // Kiểm tra xem file có đúng là dạng File không
      if (!(file instanceof File)) {
        console.error("[ERROR] Tệp tin không đúng định dạng File");
        alert("Định dạng tệp không hợp lệ.");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('file', file, file.name);

      // Kiểm tra nội dung formData
      for (let pair of formData.entries()) {
        console.log(`[DEBUG] formData - ${pair[0]}: ${pair[1].name || pair[1]}`);
      }

      const response = await dispatch(searchProductAPI(formData));
      console.log('[DEBUG] Phản hồi từ BE:', response);
      navigate('/products/search');
    } else {
      alert("Vui lòng chọn tệp ảnh.");
      setIsLoading(false);
      return;
    }
  } catch (error) {
    console.error('[ERROR] Lỗi khi gửi ảnh:', error.response?.data || error.message);
  } finally {
    handleClose();
    setUploadedFiles([]);
    setSearchQuery('');
    setIsLoading(false);
  }
};






  const recentSearches = ['Product 1', 'Product 2', 'Product 3', 'Product 4']
  const favorites = ['Product 5', 'Product 6', 'Product 7']

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Button
        variant="outlined"
        startIcon={<SearchIcon />}
        onClick={handleOpen}
        sx={{
          width: '100%',
          borderRadius: '24px',
          padding: '8px 16px',
          textTransform: 'none',
          color: 'gray',
          borderColor: '#dadce0',
          '&:hover': {
            color: 'black',
            borderColor: '#dadce0',
            backgroundColor: '#f8f9fa',
            '& .MuiTypography-root': {
              color: 'white',
              backgroundColor: '#73C7C7'
            }
          }
        }}
      >
        Search...
        {isDisplayText && (
          <Typography
            component="span"
            sx={{
              color: 'black',
              padding: '0 6px',
              borderRadius: '4px',
              marginLeft: '8px',
              fontSize: '14px'
            }}
          >
            Ctrl+K
          </Typography>
        )}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '12px',
            maxHeight: '80vh'
          }
        }}
      >
        <DialogTitle sx={{ padding: '16px 24px' }}>
          <TextField
            autoFocus
            fullWidth
            placeholder="Hãy tìm kiểm bệnh bằng hình ảnh tại đây..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="standard"
            slotProps={{
              input: {
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment
                    position="start"
                    onClick={sendToBackend}
                    sx={{
                      cursor: 'pointer',
                      '& .MuiSvgIcon-root': {
                        '&:hover': {
                          color: '#73C7C7'
                        }
                      }
                    }}
                  >
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" onClick={handleClose} sx={{ cursor: 'pointer' }}>
                    <Typography
                      sx={{
                        backgroundColor: '#f1f3f4',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}
                    >
                      esc
                    </Typography>
                  </InputAdornment>
                )
              }
            }}
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '1.1rem'
              }
            }}
          />
        </DialogTitle>

        <DialogContent sx={{ padding: '0 24px 24px' }}>
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed #ccc',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              marginBottom: '20px',
              backgroundColor: isDragActive ? '#f8f9fa' : 'transparent',
              cursor: 'pointer'
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <Typography>Thả hình vào đây...</Typography>
            ) : (
              <Typography>Kéo và thả hình ảnh vào đây hoặc nhấp để chọn tệp</Typography>
            )}
          </Box>

          {/* Nút chụp ảnh từ camera */}
          <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
            <Button
              variant="outlined"
              startIcon={<CameraIcon />}
              component="label"
              sx={{ textTransform: 'none' }}
            >
              Take a Photo
              <input
                type="file"
                accept="image/*"
                capture="environment" // Mở camera (environment: camera sau, user: camera trước)
                onChange={handleCameraCapture}
                style={{ display: 'none' }}
              />
            </Button>
          </Box>

          {uploadedFiles.length > 0 && (
            <Box sx={{ marginBottom: '20px' }}>
              <Typography variant="subtitle1" gutterBottom>Uploaded Images:</Typography>
              <Grid2 container spacing={2}>
                {uploadedFiles.map((file, index) => (
                  <Grid2 item xs={4} key={index}>
                    <Box sx={{ border: '1px solid #eee', borderRadius: '4px', overflow: 'hidden' }}>
                      <img
                        src={file.preview}
                        alt={file.name}
                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ padding: '4px', display: 'block', textAlign: 'center', wordBreak: 'break-all' }}
                      >
                        {file.name}
                      </Typography>
                    </Box>
                  </Grid2>
                ))}
              </Grid2>
            </Box>
          )}

          
          <Divider sx={{ my: 2 }} />

          
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SearchButtonModalCustom

