import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ToastAndroid,
  Image,
  RefreshControl,
} from 'react-native';
import {Button, Card, Paragraph, TextInput, Title} from 'react-native-paper';
import axios from 'axios';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {createNewTaxiRemis, getAllTaxiRemises} from '../../api/taxis';
import {Picker} from '@react-native-picker/picker';
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';
import {singleUploadToS3} from '../../api/aws';
import Spinner from 'react-native-loading-spinner-overlay';

const TaxiRemisManagement: React.FC = () => {
  const navigation = useNavigation();
  const [taxiRemises, setTaxiRemises] = useState([]);
  const [newTaxiRemis, setNewTaxiRemis] = useState({
    tipo: 'Taxi',
    numero_legajo: '',
    dominio_vehiculo: '',
    numero_motor: '',
    numero_chasis: '',
    marca_vehiculo: '',
    modelo_vehiculo: '',
    nombre_titular: '',
    numero_licencia_conductor: '',
    nombre_conductor: '',
    poliza_seguro: '',
    vtv: 'Vigente',
    revision_salud: 'Vigente',
    desinfeccion_vehicular: 'Regular',
    taximetro: 'En condiciones',
    observaciones: '',
    foto_vehiculo: '',
    foto_titular: '',
  });
  const [fotoVehiculoToUpload, setFotoVehiculoToUpload] = useState('');
  const [fotoConductorToUpload, setFotoConductorToUpload] = useState('');
  const [showAddTaxiRemisFields, setShowAddTaxiRemisFields] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTaxiRemises = async () => {
    setLoading(true);
    try {
      const response = await getAllTaxiRemises();
      setTaxiRemises(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching taxiRemises:', error);
    }
  };

  const uploadPhoto = async (image, folder) => {
    return await singleUploadToS3(image, folder);
  };

  const checkErrors = () => {
    if (newTaxiRemis.numero_legajo.length < 4) {
      ToastAndroid.showWithGravity(
        'El número de legajo debe tener al menos 4 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    if (newTaxiRemis.dominio_vehiculo.length < 4) {
      ToastAndroid.showWithGravity(
        'El dominio del vehículo debe tener al menos 4 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    if (newTaxiRemis.numero_motor.length < 4) {
      ToastAndroid.showWithGravity(
        'El número de motor debe tener al menos 4 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    if (newTaxiRemis.numero_chasis.length < 4) {
      ToastAndroid.showWithGravity(
        'El número de chasis debe tener al menos 4 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    if (newTaxiRemis.marca_vehiculo.length < 4) {
      ToastAndroid.showWithGravity(
        'La marca del vehículo debe tener al menos 4 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    if (newTaxiRemis.modelo_vehiculo.length < 4) {
      ToastAndroid.showWithGravity(
        'El modelo del vehículo debe tener al menos 4 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    if (newTaxiRemis.nombre_titular.length < 4) {
      ToastAndroid.showWithGravity(
        'El nombre del titular debe tener al menos 4 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    if (newTaxiRemis.numero_licencia_conductor.length < 7) {
      ToastAndroid.showWithGravity(
        'El número de licencia del conductor debe tener al menos 7 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    if (newTaxiRemis.nombre_conductor.length < 4) {
      ToastAndroid.showWithGravity(
        'El nombre del conductor debe tener al menos 4 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    if (newTaxiRemis.poliza_seguro.length < 4) {
      ToastAndroid.showWithGravity(
        'La póliza de seguro debe tener al menos 4 caracteres',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    }
    return false;
  };

  const addTaxiRemis = async () => {
    if (checkErrors()) {
      return;
    }

    setLoading(true);
    let urlVehiclePhoto = '';
    let urlDriverPhoto = '';
    if (newTaxiRemis.foto_vehiculo !== '') {
      const url = await uploadPhoto(fotoVehiculoToUpload, 'taxiremis-vehicles');
      urlVehiclePhoto = url;
    }
    if (newTaxiRemis.foto_titular !== '') {
      const url = await uploadPhoto(fotoConductorToUpload, 'taxiremis-drivers');
      setNewTaxiRemis({...newTaxiRemis, foto_titular: url});
      urlDriverPhoto = url;
    }
    try {
      await createNewTaxiRemis({
        ...newTaxiRemis,
        foto_vehiculo: urlVehiclePhoto,
        foto_titular: urlDriverPhoto,
      });
      ToastAndroid.showWithGravity(
        'Taxi-Remis creado',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setNewTaxiRemis({
        tipo: 'Taxi',
        numero_legajo: '',
        dominio_vehiculo: '',
        numero_motor: '',
        numero_chasis: '',
        marca_vehiculo: '',
        modelo_vehiculo: '',
        nombre_titular: '',
        numero_licencia_conductor: '',
        nombre_conductor: '',
        poliza_seguro: '',
        vtv: 'Vigente',
        revision_salud: 'Vigente',
        desinfeccion_vehicular: 'Regular',
        taximetro: 'En condiciones',
        observaciones: '',
        foto_vehiculo: '',
        foto_titular: '',
      });
      getTaxiRemises();
      setShowAddTaxiRemisFields(false); // Close the taxiRemis creation fields after adding
      setLoading(false);
    } catch (error) {
      console.error('Error adding taxiRemis:', error);
    }
  };

  const deleteTaxiRemis = async (taxiRemisId: string) => {
    try {
      await axios.delete(`/api/taxiRemises/${taxiRemisId}`); // Replace with your backend API endpoint
      getTaxiRemises();
    } catch (error) {
      console.error('Error deleting taxiRemis:', error);
    }
  };

  const handlePress = (taxiRemis: any) => {
    navigation.navigate('taxiRemisDetalle', {taxiRemis});
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
        setNewTaxiRemis({
          ...newTaxiRemis,
          foto_vehiculo: response.assets[0].uri,
        });
        setFotoVehiculoToUpload(response.assets[0]);
      }
    });
  };
  const handleRemoveVehicleImage = () => {
    setNewTaxiRemis({...newTaxiRemis, foto_vehiculo: ''});
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
        setNewTaxiRemis({
          ...newTaxiRemis,
          foto_titular: response.assets[0].uri,
        });
        setFotoConductorToUpload(response.assets[0]);
      }
    });
  };
  const handleRemoveDriverImage = () => {
    setNewTaxiRemis({...newTaxiRemis, foto_titular: ''});
    setFotoConductorToUpload('');
  };

  useEffect(() => {
    getTaxiRemises();
  }, []); // Fetch taxiRemises on component mount

  return (
    <View style={styles.container}>
      {/* Toggle Button */}
      <Button
        onPress={() => setShowAddTaxiRemisFields(!showAddTaxiRemisFields)}>
        {showAddTaxiRemisFields ? 'Cancelar' : 'Añadir TaxiRemis'}
      </Button>

      {loading && (
        <Spinner
          visible={loading}
          textContent="Cargando"
          textStyle={{
            color: 'white',
          }}
        />
      )}

      {/* Add TaxiRemis Form (conditionally rendered based on showAddTaxiRemisFields state) */}
      {showAddTaxiRemisFields && (
        <ScrollView>
          <Text style={styles.label}>Tipo</Text>
          <Picker
            selectedValue={newTaxiRemis.tipo}
            onValueChange={itemValue =>
              setNewTaxiRemis({
                ...newTaxiRemis,
                tipo: itemValue,
              })
            }
            style={styles.picker}>
            <Picker.Item label="Taxi" value="Taxi" />
            <Picker.Item label="Remis" value="Remis" />
          </Picker>
          <TextInput
            label="Número de Legajo"
            value={newTaxiRemis.numero_legajo}
            onChangeText={value =>
              setNewTaxiRemis({...newTaxiRemis, numero_legajo: value})
            }
            style={styles.input}
            error={newTaxiRemis.numero_legajo.length < 4}
          />
          <TextInput
            label="Dominio del Vehículo"
            value={newTaxiRemis.dominio_vehiculo}
            onChangeText={value =>
              setNewTaxiRemis({...newTaxiRemis, dominio_vehiculo: value})
            }
            style={styles.input}
            error={newTaxiRemis.dominio_vehiculo.length < 4}
          />
          <TextInput
            label="Número de Motor"
            value={newTaxiRemis.numero_motor}
            onChangeText={value =>
              setNewTaxiRemis({...newTaxiRemis, numero_motor: value})
            }
            style={styles.input}
            error={newTaxiRemis.numero_motor.length < 4}
          />
          <TextInput
            label="Número de Chasis"
            value={newTaxiRemis.numero_chasis}
            onChangeText={value =>
              setNewTaxiRemis({...newTaxiRemis, numero_chasis: value})
            }
            style={styles.input}
            error={newTaxiRemis.numero_chasis.length < 4}
          />
          <TextInput
            label="Marca del Vehículo"
            value={newTaxiRemis.marca_vehiculo}
            onChangeText={value =>
              setNewTaxiRemis({...newTaxiRemis, marca_vehiculo: value})
            }
            style={styles.input}
            error={newTaxiRemis.marca_vehiculo.length < 4}
          />
          <TextInput
            label="Modelo del Vehículo"
            value={newTaxiRemis.modelo_vehiculo}
            onChangeText={value =>
              setNewTaxiRemis({...newTaxiRemis, modelo_vehiculo: value})
            }
            style={styles.input}
            error={newTaxiRemis.modelo_vehiculo.length < 4}
          />
          <Button
            mode="contained"
            onPress={handleVehicleImage}
            style={styles.button}>
            Foto del Vehículo (Opcional)
          </Button>
          {newTaxiRemis.foto_vehiculo !== '' && (
            <>
              <Image
                source={{uri: newTaxiRemis.foto_vehiculo}}
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
            value={newTaxiRemis.nombre_titular}
            onChangeText={value =>
              setNewTaxiRemis({
                ...newTaxiRemis,
                nombre_titular: value,
              })
            }
            style={styles.input}
            error={newTaxiRemis.nombre_titular.length < 4}
          />
          <TextInput
            label="Número de Licencia del Conductor"
            value={newTaxiRemis.numero_licencia_conductor}
            onChangeText={value =>
              setNewTaxiRemis({
                ...newTaxiRemis,
                numero_licencia_conductor: value,
              })
            }
            style={styles.input}
            error={newTaxiRemis.numero_licencia_conductor.length < 7}
          />
          <TextInput
            label="Nombre del Conductor"
            value={newTaxiRemis.nombre_conductor}
            onChangeText={value =>
              setNewTaxiRemis({...newTaxiRemis, nombre_conductor: value})
            }
            style={styles.input}
            error={newTaxiRemis.nombre_conductor.length < 4}
          />
          <Button
            mode="contained"
            onPress={handleDriverImage}
            style={styles.button}>
            Foto del Titular (Opcional)
          </Button>
          {newTaxiRemis.foto_titular !== '' && (
            <>
              <Image
                source={{uri: newTaxiRemis.foto_titular}}
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
            value={newTaxiRemis.poliza_seguro}
            onChangeText={value =>
              setNewTaxiRemis({...newTaxiRemis, poliza_seguro: value})
            }
            style={styles.input}
            error={newTaxiRemis.poliza_seguro.length < 4}
          />
          <Text style={styles.label}>VTV</Text>
          <Picker
            selectedValue={newTaxiRemis.vtv}
            onValueChange={itemValue =>
              setNewTaxiRemis({
                ...newTaxiRemis,
                vtv: itemValue,
              })
            }
            style={styles.picker}>
            <Picker.Item label="Vigente" value="Vigente" />
            <Picker.Item label="Vencida" value="Vencida" />
          </Picker>
          <Text style={styles.label}>Revisión de Salud</Text>
          <Picker
            selectedValue={newTaxiRemis.revision_salud}
            onValueChange={itemValue =>
              setNewTaxiRemis({
                ...newTaxiRemis,
                revision_salud: itemValue,
              })
            }
            style={styles.picker}>
            <Picker.Item label="Vigente" value="Vigente" />
            <Picker.Item label="Pendiente" value="Pendiente" />
          </Picker>
          <Text style={styles.label}>Desinfección Vehicular</Text>
          <Picker
            selectedValue={newTaxiRemis.desinfeccion_vehicular}
            onValueChange={itemValue =>
              setNewTaxiRemis({
                ...newTaxiRemis,
                desinfeccion_vehicular: itemValue,
              })
            }
            style={styles.picker}>
            <Picker.Item label="Regular" value="Regular" />
            <Picker.Item label="Pendiente" value="Pendiente" />
          </Picker>
          <TextInput
            label="Taxímetro"
            value={newTaxiRemis.taximetro}
            onChangeText={value =>
              setNewTaxiRemis({...newTaxiRemis, taximetro: value})
            }
            style={styles.input}
          />
          <TextInput
            label="Observaciones"
            value={newTaxiRemis.observaciones}
            onChangeText={value =>
              setNewTaxiRemis({...newTaxiRemis, observaciones: value})
            }
            style={styles.input}
          />
          {/* Add more fields as needed */}
          <Button
            mode="contained"
            onPress={() => addTaxiRemis()}
            style={{
              marginBottom: 100,
            }}>
            Guardar
          </Button>
        </ScrollView>
      )}

      <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} />

      {taxiRemises.length === 0 && !showAddTaxiRemisFields && (
        <Text
          style={{
            textAlign: 'center',
            marginTop: 16,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          No hay Taxis-Remises
        </Text>
      )}

      {/* TaxiRemis List */}
      {!showAddTaxiRemisFields && taxiRemises.length > 0 && (
        <View style={{marginTop: 16}}>
          <FlatList
            style={{height: '100%'}}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={getTaxiRemises} />
            }
            data={taxiRemises}
            keyExtractor={taxiRemis => taxiRemis._id}
            renderItem={({item: taxiRemis}) => (
              <TouchableOpacity onPress={() => handlePress(taxiRemis)}>
                <Card style={styles.card}>
                  <Card.Content>
                    <Title>{taxiRemis.nombre_titular}</Title>
                    <Paragraph>
                      {taxiRemis.dominio_vehiculo} - {taxiRemis.tipo_transporte}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFAF9',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'lightgrey',
  },
  card: {
    marginVertical: 8,
  },
  picker: {
    height: 40,
    marginBottom: 16,
    backgroundColor: 'lightgrey',
  },
  label: {
    marginBottom: 8,
  },
  button: {
    marginBottom: 16,
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  removeButton: {
    marginBottom: 16,
  },
});

export default TaxiRemisManagement;
