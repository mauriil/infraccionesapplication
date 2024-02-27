import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, ToastAndroid} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import {request, PERMISSIONS} from 'react-native-permissions';
import Spinner from 'react-native-loading-spinner-overlay';
import {Picker} from '@react-native-picker/picker';
import { CameraOptions, ImagePickerResponse, launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { updateTaxiRemis } from '../../api/taxis';
import { singleUploadToS3 } from '../../api/aws';

const TaxiDetalle = ({route}) => {
  const navigation = useNavigation();
  const {taxiRemis} = route.params;
  const [taxi, setTaxi] = useState(taxiRemis);
  const [fotoVehiculoToUpload, setFotoVehiculoToUpload] = useState('');
  const [fotoConductorToUpload, setFotoConductorToUpload] = useState('');
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

  const checkErrors = () => {
    if (taxi.numero_legajo.length < 4) {
      ToastAndroid.showWithGravity(
        'El número de legajo debe tener al menos 4 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    if (taxi.dominio_vehiculo.length < 4) {
      ToastAndroid.showWithGravity(
        'El dominio del vehículo debe tener al menos 4 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    if (taxi.numero_motor.length < 4) {
      ToastAndroid.showWithGravity(
        'El número de motor debe tener al menos 4 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    if (taxi.numero_chasis.length < 4) {
      ToastAndroid.showWithGravity(
        'El número de chasis debe tener al menos 4 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    if (taxi.marca_vehiculo.length < 4) {
      ToastAndroid.showWithGravity(
        'La marca del vehículo debe tener al menos 4 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    if (taxi.modelo_vehiculo.length < 4) {
      ToastAndroid.showWithGravity(
        'El modelo del vehículo debe tener al menos 4 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    if (taxi.nombre_titular.length < 4) {
      ToastAndroid.showWithGravity(
        'El nombre del titular debe tener al menos 4 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    if (taxi.numero_licencia_conductor.length < 7) {
      ToastAndroid.showWithGravity(
        'El número de licencia del conductor debe tener al menos 7 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    if (taxi.nombre_conductor.length < 4) {
      ToastAndroid.showWithGravity(
        'El nombre del conductor debe tener al menos 4 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    if (taxi.poliza_seguro.length < 4) {
      ToastAndroid.showWithGravity(
        'La póliza de seguro debe tener al menos 4 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    return false;
  };

  const handleVehicleImage = () => {
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
        setTaxi({
          ...taxi,
          foto_vehiculo: response.assets[0].uri,
        });
        setFotoVehiculoToUpload(response.assets[0]);
      }
    });
  };
  const handleRemoveVehicleImage = () => {
    setTaxi({...taxi, foto_vehiculo: ''});
    setFotoVehiculoToUpload('');
  };

  const handleDriverImage = () => {
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
        setTaxi({
          ...taxi,
          foto_titular: response.assets[0].uri,
        });
        setFotoConductorToUpload(response.assets[0]);
      }
    });
  };
  const handleRemoveDriverImage = () => {
    setTaxi({...taxi, foto_titular: ''});
    setFotoConductorToUpload('');
  };

  const uploadPhoto = async (image, folder) => {
    return await singleUploadToS3(image, folder);
  };

  const editTaxiRemis = async () => {
    if (checkErrors()) {
      return;
    }

    setLoading(true);
    let urlVehiclePhoto = '';
    let urlDriverPhoto = '';
    if (taxi.foto_vehiculo !== '') {
      const url = await uploadPhoto(fotoVehiculoToUpload, 'taxiremis-vehicles');
      urlVehiclePhoto = url;
    }
    if (taxi.foto_titular !== '') {
      const url = await uploadPhoto(fotoConductorToUpload, 'taxiremis-drivers');
      urlDriverPhoto = url;
    }
    try {
      await updateTaxiRemis({
        ...taxi,
        foto_vehiculo: urlVehiclePhoto,
        foto_titular: urlDriverPhoto,
      });
      ToastAndroid.showWithGravity(
        'Taxi-Remis editado',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setLoading(false);
      navigation.navigate('taxiRemisDetalle', {taxiRemis: taxi});
    } catch (error) {
      console.error('Error adding taxiRemis:', error);
      ToastAndroid.showWithGravity(
        'Error al editar el Taxi-Remis',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setLoading(false);
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
        <Text style={styles.label}>Tipo</Text>
        <Picker
          selectedValue={taxi.tipo}
          onValueChange={itemValue =>
            setTaxi({
              ...taxi,
              tipo: itemValue,
            })
          }
          style={styles.picker}>
          <Picker.Item label="Taxi" value="Taxi" />
          <Picker.Item label="Remis" value="Remis" />
        </Picker>
        <TextInput
          label="Número de Legajo"
          value={taxi.numero_legajo}
          onChangeText={value => setTaxi({...taxi, numero_legajo: value})}
          style={styles.input}
          error={taxi.numero_legajo.length < 4}
        />
        <TextInput
          label="Dominio del Vehículo"
          value={taxi.dominio_vehiculo}
          onChangeText={value => setTaxi({...taxi, dominio_vehiculo: value})}
          style={styles.input}
          error={taxi.dominio_vehiculo.length < 4}
        />
        <TextInput
          label="Número de Motor"
          value={taxi.numero_motor}
          onChangeText={value => setTaxi({...taxi, numero_motor: value})}
          style={styles.input}
          error={taxi.numero_motor.length < 4}
        />
        <TextInput
          label="Número de Chasis"
          value={taxi.numero_chasis}
          onChangeText={value => setTaxi({...taxi, numero_chasis: value})}
          style={styles.input}
          error={taxi.numero_chasis.length < 4}
        />
        <TextInput
          label="Marca del Vehículo"
          value={taxi.marca_vehiculo}
          onChangeText={value => setTaxi({...taxi, marca_vehiculo: value})}
          style={styles.input}
          error={taxi.marca_vehiculo.length < 4}
        />
        <TextInput
          label="Modelo del Vehículo"
          value={taxi.modelo_vehiculo}
          onChangeText={value => setTaxi({...taxi, modelo_vehiculo: value})}
          style={styles.input}
          error={taxi.modelo_vehiculo.length < 4}
        />
        <Button
          mode="contained"
          onPress={handleVehicleImage}
          style={styles.button}>
          Foto del Vehículo (Opcional)
        </Button>
        {taxi.foto_vehiculo !== '' && (
          <>
            <Image
              source={{uri: taxi.foto_vehiculo}}
              style={styles.selectedImage}
            />
            <Button
              mode="outlined"
              onPress={() => handleRemoveVehicleImage()}
              style={styles.removeButton}>
              Eliminar Foto
            </Button>
          </>
        )}
        <TextInput
          label="Nombre del Titular"
          value={taxi.nombre_titular}
          onChangeText={value =>
            setTaxi({
              ...taxi,
              nombre_titular: value,
            })
          }
          style={styles.input}
          error={taxi.nombre_titular.length < 4}
        />
        <TextInput
          label="Número de Licencia del Conductor"
          value={taxi.numero_licencia_conductor}
          onChangeText={value =>
            setTaxi({
              ...taxi,
              numero_licencia_conductor: value,
            })
          }
          style={styles.input}
          error={taxi.numero_licencia_conductor.length < 7}
        />
        <TextInput
          label="Nombre del Conductor"
          value={taxi.nombre_conductor}
          onChangeText={value => setTaxi({...taxi, nombre_conductor: value})}
          style={styles.input}
          error={taxi.nombre_conductor.length < 4}
        />
        <Button
          mode="contained"
          onPress={handleDriverImage}
          style={styles.button}>
          Foto del Titular (Opcional)
        </Button>
        {taxi.foto_titular !== '' && (
          <>
            <Image
              source={{uri: taxi.foto_titular}}
              style={styles.selectedImage}
            />
            <Button
              mode="outlined"
              onPress={() => handleRemoveDriverImage()}
              style={styles.removeButton}>
              Eliminar Foto
            </Button>
          </>
        )}
        <TextInput
          label="Póliza de Seguro"
          value={taxi.poliza_seguro}
          onChangeText={value => setTaxi({...taxi, poliza_seguro: value})}
          style={styles.input}
          error={taxi.poliza_seguro.length < 4}
        />
        <Text style={styles.label}>VTV</Text>
        <Picker
          selectedValue={taxi.vtv}
          onValueChange={itemValue =>
            setTaxi({
              ...taxi,
              vtv: itemValue,
            })
          }
          style={styles.picker}>
          <Picker.Item label="Vigente" value="Vigente" />
          <Picker.Item label="Vencida" value="Vencida" />
        </Picker>
        <Text style={styles.label}>Revisión de Salud</Text>
        <Picker
          selectedValue={taxi.revision_salud}
          onValueChange={itemValue =>
            setTaxi({
              ...taxi,
              revision_salud: itemValue,
            })
          }
          style={styles.picker}>
          <Picker.Item label="Vigente" value="Vigente" />
          <Picker.Item label="Pendiente" value="Pendiente" />
        </Picker>
        <Text style={styles.label}>Desinfección Vehicular</Text>
        <Picker
          selectedValue={taxi.desinfeccion_vehicular}
          onValueChange={itemValue =>
            setTaxi({
              ...taxi,
              desinfeccion_vehicular: itemValue,
            })
          }
          style={styles.picker}>
          <Picker.Item label="Regular" value="Regular" />
          <Picker.Item label="Pendiente" value="Pendiente" />
        </Picker>
        <TextInput
          label="Taxímetro"
          value={taxi.taximetro}
          onChangeText={value => setTaxi({...taxi, taximetro: value})}
          style={styles.input}
        />
        <TextInput
          label="Observaciones"
          value={taxi.observaciones}
          onChangeText={value => setTaxi({...taxi, observaciones: value})}
          style={styles.input}
        />
      </View>

      <Button
        mode="contained"
        onPress={() => editTaxiRemis()}
        style={{
          marginBottom: 100,
        }}>
        Guardar
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
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
  selectedImage: {
    width: '100%',
    height: 250,
    marginBottom: 16,
  },
  removeButton: {
    marginBottom: 16,
  },
  picker: {
    marginBottom: 16,
  },
});

export default TaxiDetalle;
