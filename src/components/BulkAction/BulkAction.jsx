import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone'; // Importing the dropzone library
import './BulkAction.css'; // Import the CSS file
import * as XLSX from 'xlsx';

const BulkAction = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState(''); // Track the uploaded file name
  const generateExcelFile = () => {
    const data = [
      {
        name: 'Product 1',
        description: 'A sample product.',
        polish: 'Gloss',
        category: 'Category1',
        subcategory: 'Subcategory1',
        barcode: '12345678',
        costPrice: 50,
        images: 'image1.jpg,image2.jpg',
        size: 'S',
        retailPrice: 100,
        wholesalePrice: 90,
        stock: 10,
        thresholdStock: 5,
      },
      {
        name: 'Product 1',
        description: 'A sample product.',
        polish: 'Gloss',
        category: 'Category1',
        subcategory: 'Subcategory1',
        barcode: '12345678',
        costPrice: 50,
        images: 'image1.jpg,image2.jpg',
        size: 'M',
        retailPrice: 110,
        wholesalePrice: 100,
        stock: 5,
        thresholdStock: 2,
      },
      {
        name: 'Product 2',
        description: 'Another product.',
        polish: 'Matte',
        category: 'Category2',
        subcategory: 'Subcategory2',
        barcode: '87654321',
        costPrice: 40,
        images: 'image3.jpg',
        size: 'L',
        retailPrice: 80,
        wholesalePrice: 70,
        stock: 15,
        thresholdStock: 3,
      },
    ];
  
    // Create a new workbook and add the data to a sheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
  
    // Generate a Blob from the workbook
    const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const blob = new Blob([s2ab(excelFile)], { type: 'application/octet-stream' });
  
    // Create a link to download the Excel file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sample-file.xlsx';
    link.click();
  };
  
  // Helper function to convert string to ArrayBuffer
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  };
  // Handle file selection via drag-and-drop
  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setFile(selectedFile);
      setMessage('');
      setError('');
      setUploadedFileName(selectedFile.name); // Store the uploaded file name
    } else {
      setError('Please upload a valid Excel file');
      setUploadedFileName(''); // Clear uploaded file name if invalid file type
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.xlsx, .xls',
  });

  // Handle form submission (file upload)
  const onFileUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/products/bulk-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
      setError('');
      setUploadedFileName(''); // Clear file name after successful upload
      setFile(null); // Reset the file state after upload
    } catch (err) {
      setError('Failed to upload products');
      setMessage('');
    }
  };

  // Handle sample file download
  const handleDownloadSample = () => {
    const link = document.createElement('a');
    link.href = '/sample-file.xlsx'; // Path to the hosted Excel file
    link.download = 'sample-file.xlsx';
    link.click();
  };

  return (
    <div className="bulk-upload-container">
      <h2 className="title">Bulk Upload Products</h2>
      
      {/* Drag and drop file upload */}
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & Drop your file here or click to select</p>
      </div>
      
      {/* Display the selected file name */}
      {uploadedFileName && (
        <div className="uploaded-file-info">
          <p>Uploaded File: {uploadedFileName}</p>
        </div>
      )}

      {/* Upload button */}
      <div className="upload-section">
        <button onClick={onFileUpload} className="upload-button">Upload</button>
      </div>
      
      {/* Sample file download */}
      <div className="download-section">
        <button onClick={generateExcelFile} className="download-button">Download Sample File</button>
      </div>
      
      {/* Display messages */}
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default BulkAction;
