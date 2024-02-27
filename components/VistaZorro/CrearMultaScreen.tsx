import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Text, TextInput, Button, Menu } from 'react-native-paper';
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';
import { uploadImagesToS3 } from '../../api/aws';
import { getAllInfracciones, nuevaInfraccion } from '../../api/infracciones';
import { getAllNomencladores } from '../../api/nomencladores';
import Spinner from 'react-native-loading-spinner-overlay';
import MapView from 'react-native-maps';

const CrearMultaScreen = ({ navigation }) => {
  const [dominio, setDominio] = useState('');
  const [nombrePropietario, setNombrePropietario] = useState('');
  const [nombreConductor, setNombreConductor] = useState('');
  const [domicilioConductor, setDomicilioConductor] = useState('');
  const [marcaVehiculo, setMarcaVehiculo] = useState('');
  const [modeloVehiculo, setModeloVehiculo] = useState('');
  const [colorVehiculo, setColorVehiculo] = useState('');
  const [nroLicenciaConducir, setNroLicenciaConducir] = useState('');
  const [ubicacion_infraccion, setUbicacionInfraccion] = useState('');
  const [referenciaUbicacion, setReferenciaUbicacion] = useState('');
  const [listaInfracciones, setListaInfracciones] = useState([]);
  const [infracciones, setInfracciones] = useState([]);
  const [nroInfraccion, setNroInfraccion] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImagesToUpload, setSelectedImagesToUpload] = useState([]);
  const [loading, setLoading] = useState(false);

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
        setSelectedImagesToUpload([
          ...selectedImagesToUpload,
          response.assets[0],
        ]);
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
    setLoading(true);
    if (dominio.length < 6 || nombrePropietario.length < 4 || nombreConductor.length < 4 || domicilioConductor.length < 4 || marcaVehiculo.length < 4 || modeloVehiculo.length < 4 || colorVehiculo.length < 4 || nroLicenciaConducir.length < 7 || referenciaUbicacion.length < 4 || infracciones.length === 0 || selectedImages.length === 0) {
      setLoading(false);
      Alert.alert('Atención', 'Por favor, revise todos los campos y asegúrese de seleccionar al menos una infracción y una foto.');
      return;
    }
    const imagesUrl = await uploadImages();
    const infraccionBoddy = {
      dominio,
      nombre_propietario: nombrePropietario,
      nombre_conductor: nombreConductor,
      domicilio_conductor: domicilioConductor,
      marca_vehiculo: marcaVehiculo,
      modelo_vehiculo: modeloVehiculo,
      color_vehiculo: colorVehiculo,
      numero_licencia_conductor: nroLicenciaConducir,
      ubicacion_infraccion,
      referencia_ubicacion: referenciaUbicacion,
      id_nomenclador: infracciones,
      numero_infraccion: nroInfraccion,
      foto: imagesUrl,
      creado_por: global.loggedUser.user.id,
    };
    console.log('infraccionBoddy', infraccionBoddy);
    await nuevaInfraccion(infraccionBoddy);
    setLoading(false);
    navigation.navigate('VistaZorro');
  };

  const loadListaInfracciones = async () => {
    const response = await getAllNomencladores();
    setListaInfracciones(response);
  };

  useEffect(() => {
    void loadListaInfracciones();
  }, []);

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
      <Text style={styles.title}>Crear Multa</Text>

      <TextInput
        label="Número de Infracción"
        value={nroInfraccion}
        onChangeText={text => setNroInfraccion(text)}
        style={styles.input}
      />

      <TextInput
        label="Dominio"
        value={dominio}
        onChangeText={text => setDominio(text)}
        style={styles.input}
        error={dominio.length < 6}
      />

      <TextInput
        label="Nombre Propietario"
        value={nombrePropietario}
        onChangeText={text => setNombrePropietario(text)}
        style={styles.input}
        error={nombrePropietario.length < 4}
      />

      <TextInput
        label="Nombre Conductor"
        value={nombreConductor}
        onChangeText={text => setNombreConductor(text)}
        style={styles.input}
        error={nombreConductor.length < 4}
      />

      <TextInput
        label="Domicilio Conductor"
        value={domicilioConductor}
        onChangeText={text => setDomicilioConductor(text)}
        style={styles.input}
        error={domicilioConductor.length < 4}
      />

      <TextInput
        label="Marca Vehículo"
        value={marcaVehiculo}
        onChangeText={text => setMarcaVehiculo(text)}
        style={styles.input}
        error={marcaVehiculo.length < 4}
      />

      <TextInput
        label="Modelo Vehículo"
        value={modeloVehiculo}
        onChangeText={text => setModeloVehiculo(text)}
        style={styles.input}
        error={modeloVehiculo.length < 4}
      />

      <TextInput
        label="Color Vehículo"
        value={colorVehiculo}
        onChangeText={text => setColorVehiculo(text)}
        style={styles.input}
        error={colorVehiculo.length < 4}
      />

      <TextInput
        label="Número de Licencia de Conducir"
        value={nroLicenciaConducir}
        onChangeText={text => setNroLicenciaConducir(text)}
        style={styles.input}
        error={nroLicenciaConducir.length < 7}
      />

      <TextInput
        label="Calle y Número de Ubicación"
        value={ubicacion_infraccion}
        onChangeText={text => setUbicacionInfraccion(text)}
        style={styles.input}
        error={ubicacion_infraccion.length < 4}
      />

      <TextInput
        label="Referencia de Ubicación"
        value={referenciaUbicacion}
        onChangeText={text => setReferenciaUbicacion(text)}
        style={styles.input}
        error={referenciaUbicacion.length < 4}
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
        {listaInfracciones.map(infraccion => (
          <Menu.Item
            key={infraccion.id}
            onPress={() => handleInfraccionSelect(infraccion.id)}
            title={infraccion.nombre}
            checked={infracciones.includes(infraccion.id)}
          />
        ))}
      </Menu>

      {infracciones.length > 0 && (
        <View style={styles.infraccionesContainer}>
          <Text>Infracciones Seleccionadas:</Text>
          {infracciones.map(infraccionId => (
            <View key={infraccionId} style={styles.infraccionItem}>
              <Text>
                {
                  listaInfracciones.find(
                    infraccion => infraccion.id === infraccionId,
                  ).nombre
                }
              </Text>
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
          <Image source={{ uri: imageUri }} style={styles.selectedImage} />
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
    backgroundColor: '#FFFAF9',
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
