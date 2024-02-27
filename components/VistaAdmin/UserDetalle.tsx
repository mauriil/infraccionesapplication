import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import { Button } from 'react-native-paper';

const UserDetalle = ({route}) => {
  // Assuming the route params contain the details of the selected violation
  const {user} = route.params;
  const navigation = useNavigation();

  const editUser = () => {
    navigation.navigate('userEdit', { user });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <Text>{user.name}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Usuario:</Text>
        <Text>{user.username}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Tipo:</Text>
        <Text>{user.tipo}</Text>
      </View>

      {user.tipo === 'Turismo' && (
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Nombre del hotel:</Text>
          <Text>{user.nombre_hotel}</Text>
        </View>
      )}

      <Button
        mode="contained"
        onPress={() => editUser()}
        style={{
          marginBottom: 15,
        }}>
        Editar datos
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

export default UserDetalle;
