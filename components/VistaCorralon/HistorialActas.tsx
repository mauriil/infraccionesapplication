import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

const HistorialActasScreen = () => {
  const navigation = useNavigation();

  const [historialActas, setHistorialActas] = useState([
    // Your historical violations data here
    { id: '1', date: '2022-02-01 (0034)', description: 'Ingreso de FIAT' },
    { id: '2', date: '2022-01-15 (0035)', description: 'Ingreso Ferrari' },
    // Add more historical violations as needed
  ]);

  const handleActaPress = (acta) => {
    // Navigate to DetalleActascreen with the selected acta details
    navigation.navigate('DetalleActaScreen', { acta });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleActaPress(item)}>
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
      {historialActas.length > 0 ? (
        <FlatList
          data={historialActas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text>No hay Actas en el historial.</Text>
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
    backgroundColor: '#00AF5A',
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

export default HistorialActasScreen;
