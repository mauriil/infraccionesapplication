import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {Button} from 'react-native-paper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import {request, PERMISSIONS} from 'react-native-permissions';
import Spinner from 'react-native-loading-spinner-overlay';

const TransporteDetalle = ({route}) => {
  // Assuming the route params contain the details of the selected violation
  const {transporte} = route.params;

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
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          margin: 20px;
          color: #333;
        }
    
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          background-color: #f9f9f9;
        }
    
        .header {
          text-align: center;
          margin-bottom: 10px;
        }
    
        .header img {
            max-width: 450px;
            height: auto;
        }
    
        .label {
          font-weight: bold;
          margin-top: 2px;
          color: #555;
        }
    
        .photoLabel {
          text-align: center;
          font-weight: bold;
          margin-bottom: 4px;
          color: #555;
        }
    
        .data {
          margin-bottom: 20px;
          float: left;
          width: 48%; /* Ajusta el ancho según tus necesidades */
        }
    
        .data p {
          margin: 5px 0;
        }

        .data h2 {
          text-align: center;
        }
    
        .photo-container {
          padding-top: 80px;
          margin-bottom: 20px;
          float: right;    
        }
    
        .photo {
          margin-bottom: 20px;
        }
    
        .photo img {
          width: 100%;
          height: 250px;
        }

        .tipo_transporte {
          text-align: center;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://scontent.firj1-1.fna.fbcdn.net/v/t39.30808-6/411672554_754087126761682_389622176565572570_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=783fdb&_nc_ohc=Auino-jaM8MAX9NqfxY&_nc_ht=scontent.firj1-1.fna&oh=00_AfALGcF66Ngnn3AycnsmvrowF_BwOq77rgVnt7jXNO9VSg&oe=65DA3793" alt="Logo">
        </div>

        <div class="tipo_transporte">
        <h2>Tipo transporte:  ${transporte.tipo_transporte}</h2>
        </div>

        <div class="data">
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

            
        </div>

        <div class="photo-container">
        <p class="label">Poliza:</p>
            <p>${transporte.poliza_seguro}</p>

            <p class="label">VTV:</p>
            <p>${transporte.vtv}</p>

            <p class="label">Tipo de transporte:</p>
            <p>${transporte.tipo_transporte}</p>

            ${
              transporte.observaciones !== ''
                ? `<p class="label">Observaciones adicionales:</p>
              <p>${transporte.observaciones}</p>`
                : ''
            }
        </div>

        <div style="clear: both;"></div> <!-- Clear float para evitar problemas de altura desigual -->
      </div>
    </body>
    `;

    return htmlContent;
  };

  const imprimirPoliza = async () => {
    setLoading(true);
    try {
      // Generate PDF
      const options = {
        html: generatePDFContent(),
        fileName: `Credencial_${transporte.tipo_transporte}_${transporte.numero_legajo}`,
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

      <Button
        mode="contained"
        onPress={() => imprimirPoliza()}
        style={{
          marginBottom: 100,
        }}>
        Imprimir Credencial
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFAF9',
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
