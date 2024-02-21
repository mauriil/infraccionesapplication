import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Button } from 'react-native-paper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import { request, PERMISSIONS } from 'react-native-permissions';
import Spinner from 'react-native-loading-spinner-overlay';

const TaxiDetalle = ({ route }) => {
  // Assuming the route params contain the details of the selected violation
  const { taxiRemis } = route.params;
  const [taxi, setTaxi] = useState(taxiRemis);
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
            max-width: 500px;
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
    
        .photo-container {
          margin-top: 20px;
          float: right;
          width: 48%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
    
        }
    
        .photo {
          margin-bottom: 20px;
        }
    
        .photo img {
          width: 100%;
          height: 250px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://scontent.firj1-1.fna.fbcdn.net/v/t39.30808-6/411672554_754087126761682_389622176565572570_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=783fdb&_nc_ohc=Auino-jaM8MAX9NqfxY&_nc_ht=scontent.firj1-1.fna&oh=00_AfALGcF66Ngnn3AycnsmvrowF_BwOq77rgVnt7jXNO9VSg&oe=65DA3793" alt="Logo">
        </div>

        <div class="data">
            <p class="label">Nro Legajo:</p>
            <p>${taxi.numero_legajo}</p>

            <p class="label">Dominio del Vehículo:</p>
            <p>${taxi.dominio_vehiculo}</p>

            <p class="label">Marca y modelo del Vehículo:</p>
            <p>${taxi.marca_vehiculo} ${taxi.modelo_vehiculo}</p>

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

        </div>

        <div class="photo-container">
          <div class="photo">
            <p class="photoLabel">Foto del Conductor:</p>
              ${taxi.foto_conductor ? `<img src="${taxi.foto_conductor}" alt="Foto del Conductor">` : 'No disponible'}
          </div>
          <div class="photo">
            <p class="photoLabel">Foto del vehículo:</p>
              ${taxi.foto_vehiculo ? `<img src="${taxi.foto_vehiculo}" alt="Foto del Vehículo">` : 'No disponible'}
          </div>
        </div>

        <div style="clear: both;"></div> <!-- Clear float para evitar problemas de altura desigual -->
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
