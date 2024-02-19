import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {Text, TextInput, Button, Menu} from 'react-native-paper';
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';
import { uploadImagesToS3 } from '../../api/aws';

const CrearMultaScreen = () => {
  const [dominio, setDominio] = useState('');
  const [nombrePropietario, setNombrePropietario] = useState('');
  const [nombreConductor, setNombreConductor] = useState('');
  const [domicilioConductor, setDomicilioConductor] = useState('');
  const [marcaVehiculo, setMarcaVehiculo] = useState('');
  const [modeloVehiculo, setModeloVehiculo] = useState('');
  const [colorVehiculo, setColorVehiculo] = useState('');
  const [nroLicenciaConducir, setNroLicenciaConducir] = useState('');
  const [referenciaUbicacion, setReferenciaUbicacion] = useState('');
  const [infracciones, setInfracciones] = useState([]);
  const [nroInfraccion, setNroInfraccion] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImagesToUpload, setSelectedImagesToUpload] = useState([]);

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleInfraccionSelect = infraccionId => {
    // Add the selected infraction to the array
    // avoidd duplicates
    if (infracciones.includes(infraccionId)) {
      return;
    }
    setInfracciones([...infracciones, infraccionId]);
  };

  const handleRemoveInfraccion = infraccionId => {
    // Remove the selected infraction from the array
    setInfracciones(infracciones.filter(id => id !== infraccionId));
  };

  const handleImagePicker = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 0.7,
      includeBase64: false,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('Camera cancelled');
      } else if (response.error) {
        console.error('Camera error:', response.error);
      } else {
        setSelectedImages([...selectedImages, response.assets[0].uri]);
        setSelectedImagesToUpload([...selectedImagesToUpload, response.assets[0]]);
      }
    });
  };

  const handleRemoveImage = index => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    const updatedImagesToUpload = [...selectedImagesToUpload];
    updatedImagesToUpload.splice(index, 1);
    setSelectedImagesToUpload(updatedImagesToUpload);
  };

  const uploadImages = async () => {
    return await uploadImagesToS3(selectedImagesToUpload);
  };

  const handleSubmit = async () => {
    const imagesUrl = await uploadImages();
    console.log({
      dominio,
      dateTime: dateTime.toISOString(),
      nombrePropietario,
      nombreConductor,
      domicilioConductor,
      marcaVehiculo,
      modeloVehiculo,
      colorVehiculo,
      nroLicenciaConducir,
      referenciaUbicacion,
      infracciones,
      nroInfraccion,
      selectedImages: imagesUrl,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crear Multa</Text>

      <TextInput
        label="Dominio"
        value={dominio}
        onChangeText={text => setDominio(text)}
        style={styles.input}
      />

      <TextInput
        label="Nombre Propietario"
        value={nombrePropietario}
        onChangeText={text => setNombrePropietario(text)}
        style={styles.input}
      />

      <TextInput
        label="Número de Infracción"
        value={nroInfraccion}
        onChangeText={text => setNroInfraccion(text)}
        style={styles.input}
      />

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        style={styles.menu}
        anchor={
          <Button mode="outlined" onPress={openMenu} style={styles.menuButton}>
            ↓ Seleccionar Infracciones
          </Button>
        }>
        {/** Replace with your actual list of infracciones */}
        <Menu.Item
          onPress={() => handleInfraccionSelect('infraccion1')}
          title="Infraccion 1"
          checked={infracciones.includes('infraccion1')}
        />
        <Menu.Item
          onPress={() => handleInfraccionSelect('infraccion2')}
          title="Infraccion 2"
          checked={infracciones.includes('infraccion2')}
        />
        {/* Add more Menu.Item components for other infracciones */}
      </Menu>

      {infracciones.length > 0 && (
        <View style={styles.infraccionesContainer}>
          <Text>Infracciones Seleccionadas:</Text>
          {infracciones.map(infraccionId => (
            <View key={infraccionId} style={styles.infraccionItem}>
              <Text>{infraccionId}</Text>
              <Button onPress={() => handleRemoveInfraccion(infraccionId)}>
                Quitar
              </Button>
            </View>
          ))}
        </View>
      )}

      <Button
        mode="contained"
        onPress={handleImagePicker}
        style={styles.button}>
        Sacar foto
      </Button>

      {selectedImages.map((imageUri, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image source={{uri: imageUri}} style={styles.selectedImage} />
          <Button
            mode="outlined"
            onPress={() => handleRemoveImage(index)}
            style={styles.removeButton}>
            Eliminar Foto
          </Button>
        </View>
      ))}

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Crear Multa
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
    backgroundColor: '#FAD201',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'lightgrey',
  },
  menu: {
    marginTop: 40,
    width: '80%',
    height: 'auto',
  },
  infraccionesContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  infraccionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    marginBottom: 30,
  },
  menuButton: {
    marginTop: 4,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#3F51B5', // Customize the border color
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'lightgrey',
  },
  imageContainer: {
    marginBottom: 16,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  removeButton: {
    marginTop: 8,
  },
});

export default CrearMultaScreen;
