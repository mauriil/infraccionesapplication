import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  DatePicker,
  Menu,
  Divider,
  Checkbox,
} from 'react-native-paper';
import ImagePicker, {
  ImagePickerResponse,
  ImagePickerOptions,
  launchCamera,
} from 'react-native-image-picker';

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

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleInfraccionSelect = infraccionId => {
    // Add the selected infraction to the array
    setInfracciones([...infracciones, infraccionId]);
  };

  const handleRemoveInfraccion = infraccionId => {
    // Remove the selected infraction from the array
    setInfracciones(infracciones.filter(id => id !== infraccionId));
  };

  const handleDateTimeChange = date => {
    setDateTime(date);
  };

  const handleImagePicker = () => {
    const options: ImagePickerOptions = {
      mediaType: 'photo',
      quality: 0.7,
      includeBase64: false,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      console.log(
        '🚀 ~ launchCamera ~ response.assets[0].uri:',
        response.assets[0].uri,
      );
      if (response.didCancel) {
        console.log('Camera cancelled');
      } else if (response.error) {
        console.error('Camera error:', response.error);
      } else {
        setSelectedImages([...selectedImages, response.assets[0].uri]);
      }
    });
  };

  const handleSubmit = () => {
    // Implement your form submission logic here
    console.log({
      dominio,
      dateTime,
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

      {/* Add other TextInput components for the remaining fields */}

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Seleccionar Infracciones</Button>}>
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

      <TextInput
        label="Número de Infracción"
        value={nroInfraccion}
        onChangeText={text => setNroInfraccion(text)}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleImagePicker}
        style={styles.button}>
        Select Images
      </Button>

      {selectedImages.map((imageUri, index) => (
        <>
          <Text>Foto 1</Text>
          <Image
            key={index}
            source={{uri: imageUri}}
            style={styles.selectedImage}
          />
        </>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
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
  },
});

export default CrearMultaScreen;
