import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Button } from 'react-native-paper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import {request, PERMISSIONS} from 'react-native-permissions';

const TaxiDetalle = ({ route }) => {
  // Assuming the route params contain the details of the selected violation
  const { taxiRemis } = route.params;
  const [taxi, setTaxi] = useState(taxiRemis);

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
            <p>${taxi.numero_legajo}</p>

            <p class="label">Dominio del Vehículo:</p>
            <p>${taxi.dominio_vehiculo}</p>

            <p class="label">Número de Motor:</p>
            <p>${taxi.numero_motor}</p>

            <p class="label">Número de Chasis:</p>
            <p>${taxi.numero_chasis}</p>

            <p class="label">Marca del Vehículo:</p>
            <p>${taxi.marca_vehiculo}</p>

            <p class="label">Modelo del Vehículo:</p>
            <p>${taxi.modelo_vehiculo}</p>

            <p class="label">Nombre del Titular:</p>
            <p>${taxi.nombre_titular}</p>

            <p class="label">Numero licencia</p>
            <p>${taxi.numero_licencia_conductor}</p>

            <p class="label">Nombre del Conductor:</p>
            <p>${taxi.nombre_conductor}</p>

            <p class="label">Poliza:</p>
            <p>${taxi.poliza_seguro}</p>

            <p class="label">VTV:</p>
            <p>${taxi.vtv}</p>

            <p class="label">Revision de salud:</p>
            <p>${taxi.revision_salud}</p>

            <p class="label">Desinfeccion vehicular:</p>
            <p>${taxi.desinfeccion_vehicular}</p>

            <p class="label">Taximetro:</p>
            <p>${taxi.taximetro}</p>

            <p class="label">Observaciones:</p>
            <p>${taxi.observaciones}</p>
          </div>
        </body>
      </html>
    `;

    return htmlContent;
  };


  const imprimirPoliza = async () => {
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
  
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error generating or sharing PDF:', error);
    }
  };
  


  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Nro Legajo:</Text>
        <Text>{taxiRemis.numero_legajo}</Text>


        <Text style={styles.label}>Dominio del Vehículo:</Text>
        <Text>{taxiRemis.dominio_vehiculo}</Text>

        <Text style={styles.label}>Número de Motor:</Text>
        <Text>{taxiRemis.numero_motor}</Text>

        <Text style={styles.label}>Número de Chasis:</Text>
        <Text>{taxiRemis.numero_chasis}</Text>

        <Text style={styles.label}>Marca del Vehículo:</Text>
        <Text>{taxiRemis.marca_vehiculo}</Text>

        <Text style={styles.label}>Modelo del Vehículo:</Text>
        <Text>{taxiRemis.modelo_vehiculo}</Text>

        <Text style={styles.label}>Nombre del Titular:</Text>
        <Text style={styles.label}>{taxiRemis.nombre_titular}</Text>

        <Text style={styles.label}>Numero licencia</Text>
        <Text>{taxiRemis.numero_licencia_conductor}</Text>

        <Text style={styles.label}>Nombre del Conductor:</Text>
        <Text>{taxiRemis.nombre_conductor}</Text>

        <Text style={styles.label}>Poliza:</Text>
        <Text>{taxiRemis.poliza_seguro}</Text>

        <Text style={styles.label}>VTV:</Text>
        <Text>{taxiRemis.vtv}</Text>

        <Text style={styles.label}>Revision de salud:</Text>
        <Text>{taxiRemis.revision_salud}</Text>

        <Text style={styles.label}>Desinfeccion vehicular:</Text>
        <Text>{taxiRemis.desinfeccion_vehicular}</Text>

        <Text style={styles.label}>Taximetro:</Text>
        <Text>{taxiRemis.taximetro}</Text>

        <Text style={styles.label}>Observaciones:</Text>
        <Text>{taxiRemis.observaciones}</Text>
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
    backgroundColor: '#FAD201',
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

export default TaxiDetalle;
