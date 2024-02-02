import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

const HistorialMultasScreen = () => {
  const navigation = useNavigation();

  const [historialMultas, setHistorialMultas] = useState([
    // Your historical violations data here
    { id: '1', date: '2022-02-01', description: 'Exceso de velocidad' },
    { id: '2', date: '2022-01-15', description: 'Estacionamiento prohibido' },
    { id: '1', date: '2022-02-01', description: 'Exceso de velocidad' },
    { id: '2', date: '2022-01-15', description: 'Estacionamiento prohibido' },
    { id: '1', date: '2022-02-01', description: 'Exceso de velocidad' },
    { id: '2', date: '2022-01-15', description: 'Estacionamiento prohibido' },
    { id: '1', date: '2022-02-01', description: 'Exceso de velocidad' },
    { id: '2', date: '2022-01-15', description: 'Estacionamiento prohibido' },
    { id: '1', date: '2022-02-01', description: 'Exceso de velocidad' },
    { id: '2', date: '2022-01-15', description: 'Estacionamiento prohibido' },
    { id: '1', date: '2022-02-01', description: 'Exceso de velocidad' },
    { id: '2', date: '2022-01-15', description: 'Estacionamiento prohibido' },
    { id: '1', date: '2022-02-01', description: 'Exceso de velocidad' },
    { id: '2', date: '2022-01-15', description: 'Estacionamiento prohibido' },
    // Add more historical violations as needed
  ]);

  const handleMultaPress = (multa) => {
    // Navigate to DetalleMultaScreen with the selected multa details
    navigation.navigate('DetalleMultaScreen', { multa });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleMultaPress(item)}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{item.date}</Title>
          <Paragraph>{item.description}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {historialMultas.length > 0 ? (
        <FlatList
          data={historialMultas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text>No hay multas en el historial.</Text>
      )}

      <Button mode="contained" onPress={() => console.log('View more')}>
        Cargar Más
      </Button>
    </View>
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
  card: {
    marginVertical: 8,
  },
});

export default HistorialMultasScreen;
