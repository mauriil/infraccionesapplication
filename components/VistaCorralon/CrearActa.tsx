import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';

const CrearActaScreen = () => {
  const navigation = useNavigation();

  const [nombreReceptor, setNombreReceptor] = useState('');
  const [nroMulta, setNroMulta] = useState('');
  const [selectedCorralon, setSelectedCorralon] = useState('');
  const [comentarios, setComentarios] = useState('');

  const corralones = ['Corralón A', 'Corralón B', 'Corralón C']; // Add your corralones here

  const handleCrearActa = () => {
    // Implement your logic for creating an acta here
    console.log({ nombreReceptor, nroMulta, selectedCorralon, comentarios });

    // Optionally, navigate to another screen after creating the acta
    // navigation.navigate('SomeOtherScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crear Acta</Text>

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
});

export default CrearActaScreen;
