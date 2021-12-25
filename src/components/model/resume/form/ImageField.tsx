import React, { useCallback, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDropzone } from 'react-dropzone';
import theme from '../../../../lib/theme';
import { FieldProps } from './Form';
import httpClient from '../../../../lib/httpClient';
import Image from 'next/image';

const ImageField: React.FC<FieldProps<string>> = ({ label, value, onChange }) => {
  const [file, setFile] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        setFile(URL.createObjectURL(file));
      });

      try {
        setError(false);
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        const { data } = await httpClient.post<{ url: string }>('/api/upload', {
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        onChange(data.url);
      } catch (e) {
        setError(true);
      } finally {
        if (file) {
          URL.revokeObjectURL(file);
        }
        setFile(null);
      }
    },
    [file, onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        {...getRootProps()}
        sx={{
          backgroundColor: '#e0e0e0',
          width: '8rem',
          height: '10rem',
          display: 'flex',
          alignItems: 'center',
          justifyItems: 'center',
          cursor: 'pointer',
          borderColor: `${isDragActive ? theme.palette.primary.main : 'black'}`,
          borderStyle: `${isDragActive || (!value && !file) ? 'dashed' : 'none'}`,
        }}
      >
        <input data-testid="drop-input" {...getInputProps()} />
        {file || value ? (
          <Image src={file || value || ''} alt={label} width={128} height={160} />
        ) : (
          <>
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Typography component="label">{label}</Typography>
            </Box>
          </>
        )}
      </Box>
      {error && (
        <Typography sx={{ fontSize: '0.75rem', color: 'error.main', mt: 2 }}>
          ファイルのアップロード時にエラーが発生しました。
        </Typography>
      )}
    </Box>
  );
};

export default ImageField;
