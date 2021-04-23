import React from "react";
import { PDFDownloadLink } from '@react-pdf/renderer'

const DownloadPDF = ({fileName, Pdf}) => {
  return (
    <PDFDownloadLink
      document={Pdf}
      fileName={fileName}
      style={{
        textDecoration: "none",
        padding: "10px",
        color: "#4a4a4a",
        backgroundColor: "#f2f2f2",
        border: "1px solid #4a4a4a",
      }}
    >
      {({ blob, url, loading, error }) =>
        loading ? "Cargando documento." : <a href={url} target="blank">Imprimir</a>
      }
    </PDFDownloadLink>
  );
};

export default DownloadPDF;
