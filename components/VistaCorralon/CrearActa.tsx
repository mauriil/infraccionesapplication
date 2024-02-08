import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import { CameraOptions, ImagePickerResponse, launchCamera } from 'react-native-image-picker';

const CrearActaScreen = () => {
  const navigation = useNavigation();

  const [nombreReceptor, setNombreReceptor] = useState('');
  const [nroMulta, setNroMulta] = useState('');
  const [selectedCorralon, setSelectedCorralon] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  const corralones = ['Corralón A', 'Corralón B', 'Corralón C']; // Add your corralones here

  const handleCrearActa = () => {
    // Implement your logic for creating an acta here
    console.log({ nombreReceptor, nroMulta, selectedCorralon, comentarios });

    // Optionally, navigate to another screen after creating the acta
    // navigation.navigate('SomeOtherScreen');
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
      }
    });
  };

  const handleRemoveImage = index => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Nombre Receptor"
        value={nombreReceptor}
        onChangeText={(text) => setNombreReceptor(text)}
        style={styles.input}
      />

      <TextInput
        label="Nro Multa"
        value={nroMulta}
        onChangeText={(text) => setNroMulta(text)}
        style={styles.input}
      />

      <Text style={styles.label}>Corralón</Text>
      <Picker
        selectedValue={selectedCorralon}
        onValueChange={(itemValue) => setSelectedCorralon(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccionar Corralón" value="" />
        {corralones.map((corralon, index) => (
          <Picker.Item key={index} label={corralon} value={corralon} />
        ))}
      </Picker>

      <TextInput
        label="Comentarios"
        value={comentarios}
        onChangeText={(text) => setComentarios(text)}
        style={styles.input}
      />

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

      <Button mode="contained" onPress={handleCrearActa} style={styles.button}>
        Crear Acta
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
  input: {
    marginBottom: 16,
    backgroundColor: 'lightgrey',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    height: 40,
    marginBottom: 16,
    backgroundColor: 'lightgrey',
  },
  button: {
    marginTop: 16,
    marginBottom: 16,
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

export default CrearActaScreen;
