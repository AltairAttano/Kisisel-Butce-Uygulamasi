import React from 'react';
import { generatePDF } from '../utils/pdfGenerator';

const PDFDownloadButton = ({ elementId, filename }) => {
  const handleDownload = () => {
    generatePDF(elementId, filename);
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      PDF Olarak İndir
    </button>
  );
};

export default PDFDownloadButton;
