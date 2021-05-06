import React from "react";
import { PDFDownloadLink } from '@react-pdf/renderer'

const DownloadPDF = ({fileName, Pdf}) => {
  return (
    <PDFDownloadLink
      document={Pdf}
      fileName={fileName}
      style={{
        textDecoration: "none",
        padding: "10px"
      }}
    >
      {({ url, loading, error }) =>
        loading ? "Cargando..." : <a href={url} target="blank">Imprimir </a>
      }
    </PDFDownloadLink>
  );
};

export default DownloadPDF;
