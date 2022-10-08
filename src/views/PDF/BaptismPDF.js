import React from "react";
import { Page, Text, View, Image, Document, StyleSheet, Font } from "@react-pdf/renderer";
import logo from '../../assets/images/logo.png'
import RobotoRegular from '../../assets/fonts/Raleway-Regular.ttf'
import RobotoBold from '../../assets/fonts/Raleway-Bold.ttf'
import { formatLongDate, empty } from "../../services/helpers";

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
    padding: "1.5cm 2cm",
    textAlign: 'justify',
    fontSize: 11,
    lineHeight: 1.9,
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

  let parentsName = `${rowData.father_name || ''}${rowData.mother_name || ''}`
  let godparentsName = `${rowData.godfather_name || ''}${rowData.godmother_name || ''}`

  if(!empty(rowData.father_name) && !empty(rowData.mother_name))
  {
    parentsName = `${rowData.father_name} y ${rowData.mother_name}`
  }

  if(!empty(rowData.godfather_name) && !empty(rowData.godmother_name))
  {
    godparentsName = `${rowData.godfather_name} y ${rowData.godmother_name}`
  }

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>

        <View style={{...styles.row, marginBottom:'0.4cm'}}>
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
          <Text style={styles.marginBottom}>En el libro de bautismos N° {rowData.book_number}    Folio N° {rowData.folio_number}    Acta N° {rowData.record_number}</Text>
          <Text style={styles.center}>Se encuentra el acta de bautismo de:</Text>
          <Text style={styles.name}>{rowData.name}</Text>

          <View style={styles.row}>
            <Text>Fecha de bautismo: </Text>
            <Text style={styles.bold}>{formatLongDate(rowData.date)}</Text>
          </View>

          <View style={styles.row}>
            <Text>Fecha de nacimiento: </Text>
            <Text style={styles.bold}>{formatLongDate(rowData.birth_date)}</Text>
          </View>

          <View style={styles.row}>
            <Text>Hijo/a de: </Text>
            <Text style={styles.bold}>{parentsName}</Text>
          </View>

          <View style={styles.row}>
            <Text>Padrinos: </Text>
            <Text style={styles.bold}>{godparentsName}</Text>
          </View>

          <View style={{...styles.row, ...styles.marginBottom}}>
            <Text>Sacerdote celebrante: </Text>
            <Text style={styles.bold}>{rowData.celebrating_priest}</Text>
          </View>

          <Text>Y para efectos de {additionalData.reason} se extiende la presente, en la Parroquia de "San Esteban Protomártir" el día {formatLongDate(additionalData.date)}</Text>
        
          <View style={{marginVertical: '2.5cm'}}>
            <Text style={styles.centerAndBold}>F._________________________________________________</Text>
            <Text style={{...styles.centerAndBold, marginVertical: 2}}>{additionalData.priest}</Text>
            <Text style={styles.centerAndBold}>{additionalData.position}</Text>
          </View>
        
        </View>
      </Page>
    </Document>
  );
};

export default BaptismPDF;
