import React from "react";
import { Page, Text, View, Image, Document, StyleSheet, Font } from "@react-pdf/renderer";
import logo from '../../assets/images/logo.jpg'
import RobotoRegular from '../../assets/fonts/Raleway-Regular.ttf'
import RobotoBold from '../../assets/fonts/Raleway-Bold.ttf'

Font.register({
  family: 'Roboto',
  fonts: [
    { src: RobotoRegular },
    { src: RobotoBold, fontWeight: 700 },
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    padding: "2.5cm",
    textAlign: 'justify',
    fontSize: 11,
    lineHeight: 1.5,
  },
  row: {
    flexDirection: 'row'
  },
  center: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: "bold",
  },
  centerAndBold: {
    textAlign: 'center',
    fontWeight: "bold",
  },
  marginBottom: {
    marginBottom: 14
  },
  logo: {
    width: '3cm',
    height: '3cm'
  },
  title: {
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 12,
    marginVertical: 16
  },
  name: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginVertical: 20
  },
});

const BaptismPDF = ({rowData, additionalData}) => {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>

        <View style={{...styles.row, marginBottom:'0.5cm'}}>
          <View>
            <Image src={logo} style={styles.logo} />
          </View>

          <View style={{marginLeft: -50, marginTop: 10}}>
            <Text style={styles.centerAndBold}>Parroquia "San Esteban" Protomártir</Text>
            <Text style={styles.centerAndBold}>Barrio El Centro, Calle Manuel Antonio Mejía</Text>
            <Text style={styles.centerAndBold}>Tepecoyo, La Libertad. Tel. 2338 - 9254</Text>
          </View>
        </View>

        <View>
          <Text style={styles.title}>FE DE BAUTISMO</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.marginBottom}>El Infraescrito Párroco de la Parroquia "San Esteban" del municipio de Tepecoyo.</Text>
          <Text style={styles.bold}>HACE CONSTAR QUE:</Text>
          <Text style={styles.marginBottom}>En el libro de bautismos N°{rowData.book_number} Folio N°{rowData.folio_number} Acta N°{rowData.record_number}</Text>
          <Text style={styles.center}>Se encuentra el acta de bautismo de:</Text>
          <Text style={styles.name}>{rowData.name}</Text>

          <View style={styles.row}>
            <Text>Fecha de bautismo: </Text>
            <Text style={styles.bold}>{rowData.date_with_format}</Text>
          </View>

          <View style={styles.row}>
            <Text>Fecha de bautismo: </Text>
            <Text style={styles.bold}>{rowData.birth_date_with_format}</Text>
          </View>

          <View style={styles.row}>
            <Text>Hijo/a de: </Text>
            <Text style={styles.bold}>{rowData.father_name} y {rowData.mother_name}</Text>
          </View>

          <View style={styles.row}>
            <Text>Padrinos: </Text>
            <Text style={styles.bold}>{rowData.godfather_name} y {rowData.godmother_name}</Text>
          </View>

          <View style={{...styles.row, ...styles.marginBottom}}>
            <Text>Sacerdote celebrante: </Text>
            <Text style={styles.bold}>{rowData.celebrating_priest}</Text>
          </View>

          <Text>Y para efectos de {additionalData.reason} firmo y sello la presente, en Tepecoyo el día {additionalData.date}</Text>
        
          <View style={{marginVertical: '2.5cm'}}>
            <Text style={styles.centerAndBold}>F._________________________________________________</Text>
            <Text style={{...styles.centerAndBold, marginVertical: 2}}>{additionalData.priest}</Text>
            <Text style={styles.centerAndBold}>Párroco</Text>
          </View>
        
        </View>
      </Page>
    </Document>
  );
};

export default BaptismPDF;