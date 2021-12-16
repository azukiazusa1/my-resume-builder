import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        backgroundColor: '#e0e0e0',
        padding: '1rem',
        width: '8rem',
        height: '8rem',
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        cursor: 'pointer',
      }}
    >
      <input {...getInputProps()} />
      <p>ファイルをドロップ またはクリックして選択</p>
    </div>
  );
}

export default MyDropzone;
