import React from "react";
import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: 'Roboto',
  fonts: [
    { src: "https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-black-webfont.ttf" },
    { src: "https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-bold-webfont.ttf", fontWeight: 700 },
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    padding: "2.5cm",
    textAlign: 'justify',
    fontSize: 12,
    lineHeight: 1.5,
  },
  center: {
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 14
  },
  name: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const BaptismPDF = ({rowData}) => {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View>
          <Text style={styles.title}>FE DE BAUTISMO</Text>
        </View>
        <View style={styles.body}>
          <Text>El Infraescrito Párroco de la Parroquia "San Esteban" del municipio de Tepecoyo.</Text>
          <Text>HACE CONSTAR QUE:</Text>
          <Text>En el libro de bautismos N°{rowData.book_number} Folio N°{rowData.folio_number} Acta N°{rowData.record_number}</Text>
          <Text style={styles.center}>Se encuentra el acta de bautismo de:</Text>
          <Text style={styles.name}>{rowData.name}</Text>

          <View>

          </View>

          <Text>Y para efectos de ... firmo y sello la presente, en Tepecoyo el día ....</Text>
        </View>
      </Page>
    </Document>
  );
};

export default BaptismPDF;
