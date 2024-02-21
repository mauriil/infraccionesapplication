import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Button } from 'react-native-paper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import { request, PERMISSIONS } from 'react-native-permissions';
import Spinner from 'react-native-loading-spinner-overlay';


const TransporteDetalle = ({ route }) => {
  // Assuming the route params contain the details of the selected violation
  const { transporte } = route.params;

  const [loading, setLoading] = useState(false);

  const requestStoragePermission = async () => {
    try {
      const granted = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

      if (granted === 'granted') {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (error) {
      console.error('Error requesting storage permission:', error);
    }
  };

  useEffect(() => {
    requestStoragePermission();
  }, []);

  const generatePDFContent = () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 14px;
            }
            .label {
              font-weight: bold;
              margin-bottom: 4px;
            }
          </style>
        </head>
        <body>
          <div>
            <p class="label">Nro Legajo:</p>
            <p>${transporte.numero_legajo}</p>

            <p class="label">Dominio del Vehículo:</p>
            <p>${transporte.dominio_vehiculo}</p>

            <p class="label">Número de Motor:</p>
            <p>${transporte.numero_motor}</p>

            <p class="label">Número de Chasis:</p>
            <p>${transporte.numero_chasis}</p>

            <p class="label">Marca del Vehículo:</p>
            <p>${transporte.marca_vehiculo}</p>

            <p class="label">Modelo del Vehículo:</p>
            <p>${transporte.modelo_vehiculo}</p>

            <p class="label">Nombre del Titular:</p>
            <p>${transporte.nombre_titular}</p>

            <p class="label">Numero licencia</p>
            <p>${transporte.numero_licencia_conductor}</p>

            <p class="label">Nombre del Conductor:</p>
            <p>${transporte.nombre_conductor}</p>

            <p class="label">Poliza:</p>
            <p>${transporte.poliza_seguro}</p>

            <p class="label">VTV:</p>
            <p>${transporte.vtv}</p>

            <p class="label">Tipo de transporte:</p>
            <p>${transporte.tipo_transporte}</p>

            <p class="label">Observaciones adicionales:</p>
            <p>${transporte.observaciones}</p>
          </div>
        </body>
      </html>
    `;

    return htmlContent;
  };


  const imprimirPoliza = async () => {
    setLoading(true);
    try {
      // Generate PDF
      const options = {
        html: generatePDFContent(),
        fileName: 'Poliza_Taxi.pdf',
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      console.log('File generated:', file.filePath);

      // Share the generated PDF via email
      const shareOptions = {
        title: 'Share PDF',
        message: 'Attached is the PDF file for the Poliza_Taxi',
        url: `file://${file.filePath}`,
        type: 'application/pdf',
        failOnCancel: false,
      };
      setLoading(false);
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error generating or sharing PDF:', error);
    }
  };



  return (
    <ScrollView style={styles.container}>
      {loading && (
        <Spinner
          visible={loading}
          textContent="Cargando"
          textStyle={{
            color: 'white',
          }}
        />
      )}

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Nro Legajo:</Text>
        <Text>{transporte.numero_legajo}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Dominio del Vehículo:</Text>
        <Text>{transporte.dominio_vehiculo}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Número de Motor:</Text>
        <Text>{transporte.numero_motor}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Número de Chasis:</Text>
        <Text>{transporte.numero_chasis}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Marca del Vehículo:</Text>
        <Text>{transporte.marca_vehiculo}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Modelo del Vehículo:</Text>
        <Text>{transporte.modelo_vehiculo}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Nombre del Titular:</Text>
        <Text>{transporte.nombre_titular}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Numero licencia</Text>
        <Text>{transporte.numero_licencia_conductor}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Nombre del Conductor:</Text>
        <Text>{transporte.nombre_conductor}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Poliza:</Text>
        <Text>{transporte.poliza_seguro}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>VTV:</Text>
        <Text>{transporte.vtv}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Tipo de transporte:</Text>
        <Text>{transporte.tipo_transporte}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Observaciones adicionales:</Text>
        <Text>{transporte.observaciones}</Text>
      </View>

      <Button mode="contained" onPress={() => imprimirPoliza()} style={{
        marginBottom: 100,
      }}>
        Imprimir poliza
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#00AF5A',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default TransporteDetalle;
