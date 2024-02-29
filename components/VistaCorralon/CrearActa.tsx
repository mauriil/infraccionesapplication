import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, Alert, ToastAndroid} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {Button, TextInput} from 'react-native-paper';
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';
import {getAllCorralones} from '../../api/corralones';
import {infraccionByNumero} from '../../api/infracciones';
import {uploadImagesToS3} from '../../api/aws';
import {newActaRequest} from '../../api/actas';

const CrearActaScreen = () => {
  const navigation = useNavigation();

  const [nombreReceptor, setNombreReceptor] = useState('');
  const [nroMulta, setNroMulta] = useState('');
  const [selectedCorralon, setSelectedCorralon] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImagesToUpload, setSelectedImagesToUpload] = useState([]);
  const [corralones, setCorralones] = useState([]);
  const [infraccionError, setInfraccionError] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadImages = async () => {
    return await uploadImagesToS3(selectedImagesToUpload);
  };

  const handleCrearActa = async () => {
    if (nroMulta === '') {
      Alert.alert('Error', 'Debe ingresar el número de multa');
      setInfraccionError(true);
      return;
    }
    if (nombreReceptor === '' || nombreReceptor.length < 4) {
      Alert.alert('Error', 'Debe ingresar un nombre receptor válido');
      return;
    }
    const infraccionExists = await infraccionByNumero(nroMulta);
    if (!infraccionExists) {
      Alert.alert('Error', 'La multa ingresada no existe');
      setInfraccionError(true);
      return;
    }
    setInfraccionError(false);
    if (selectedImages.length === 0) {
      Alert.alert('Error', 'Debe sacar al menos una foto');
      return;
    }
    setLoading(true);
    const imagesUrl = await uploadImages();
    console.log({
      nombre_receptor: nombreReceptor,
      infraccion: infraccionExists.id,
      corralon: selectedCorralon,
      fotos: imagesUrl,
    });

    try {
      await newActaRequest({
        nombre_receptor: nombreReceptor,
        infraccion: infraccionExists.id,
        corralon: selectedCorralon,
        fotos: imagesUrl,
      });
      ToastAndroid.showWithGravity(
        'Acta creada con éxito',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setLoading(false);
      navigation.navigate('VistaCorralon');
    } catch (error) {
      console.error('Error al crear acta', error);
      setLoading(false);
      Alert.alert('Error', 'Error al crear acta');
    }
  };

  const fetchCorralones = async () => {
    const response = await getAllCorralones();
    setCorralones(response);
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
  };

  useEffect(() => {
    fetchCorralones();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Nombre Receptor"
        value={nombreReceptor}
        onChangeText={text => setNombreReceptor(text)}
        style={styles.input}
        error={nombreReceptor.length < 4}
      />

      <TextInput
        label="Nro Multa"
        value={nroMulta}
        onChangeText={text => setNroMulta(text)}
        style={styles.input}
        error={infraccionError}
      />

      <Text style={styles.label}>Corralón</Text>
      <Picker
        selectedValue={selectedCorralon}
        onValueChange={itemValue => setSelectedCorralon(itemValue)}
        style={styles.picker}>
        {corralones.map((corralon, index) => (
          <Picker.Item
            key={index}
            label={corralon.nombre}
            value={corralon.id}
          />
        ))}
      </Picker>

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

      <Button mode="contained" onPress={handleCrearActa} style={styles.button} disabled={loading}>
        {loading ? 'Creando...' : 'Crear Acta'}
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
