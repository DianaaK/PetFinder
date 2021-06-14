import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { HeaderComponent } from '../general';
import { data, petLocationsList } from '../list/ListContainer';
import GeneralMapComponent from './components/GeneralMapComponent';
import PetMapComponent from './components/PetMapComponent';

export default function MapContainer(props: any) {
  const route: any = useRoute();

  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 44.4268, longitude: 26.1025 });
  const [positionPending, setPositionPending] = useState(true);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      getCurrentPositionSuccess,
      setDefaultPosition,
      { timeout: 3000 }
    );
  }, []);

  const getCurrentPositionSuccess = (position: any) => {
    const myPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
    setPosition(myPosition);
    setPositionPending(false);
  };

  const setDefaultPosition = (coordinates: any) => {
    if (coordinates && coordinates.length === 2) {
      const myPosition = {
        latitude: coordinates[1],
        longitude: coordinates[0]
      };
      setPosition(myPosition);
    }
    setPositionPending(false);
  };

  const onBack = () => {
    props.navigation.goBack();
  };

  const toggleFilters = () => {};

  const reportList = data;
  const petLocations = petLocationsList;
  const petMode = route?.params?.petMode;

  return (
    <View style={styles.container}>
      <HeaderComponent
        title={petMode ? `${route.params?.petReport.name}'s Location` : 'Map'}
        leftButtonAction={onBack}
        leftButtonIcon={{
          type: 'MaterialIcons',
          name: 'arrow-back'
        }}
        rightButtonAction={petMode ? undefined : toggleFilters}
        rightButtonIcon={
          petMode
            ? undefined
            : {
                type: 'MaterialIcons',
                name: 'filter-list'
              }
        }
      />
      {petMode ? (
        <PetMapComponent
          reportedLocations={petLocations}
          position={route.params?.petReport.coordinates}
          positionPending={positionPending}
          petReport={route.params?.petReport}
        />
      ) : (
        <GeneralMapComponent
          data={reportList}
          position={position}
          positionPending={positionPending}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
