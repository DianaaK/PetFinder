import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { AppStore, reduxContainer } from '../../redux';
import locationsActions from '../../redux/pet-locations/actions';
import { CoordinatesDTO } from '../../redux/types';
import GeneralMapComponent from './components/GeneralMapComponent';
import PetMapComponent from './components/PetMapComponent';

function MapContainer(props: any) {
  const route: any = useRoute();

  const [position, setPosition] = useState<CoordinatesDTO>(
    new CoordinatesDTO()
  );
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

  const addReportedLocation = (
    address: string,
    coordinates: { latitude: number; longitude: number }
  ) => {
    const reportedLocation = {
      petId: route.params?.petReport._id,
      user: props.user._id,
      address,
      coordinates
    };
    props.addPetLocationAction(reportedLocation);
  };

  const reportList = props.report_list;
  const petMode = route?.params?.petMode;

  return (
    <View style={styles.container}>
      {petMode ? (
        <PetMapComponent
          reportedLocations={props.reported_locations}
          positionPending={positionPending}
          position={route.params?.petReport.coordinates}
          petReport={route.params?.petReport}
          addPetLocationAction={addReportedLocation}
          getPetLocationsAction={props.getPetLocationsAction}
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

function mapStateToProps(state: AppStore.states) {
  return {
    user: state.user.user,
    report_list: state.petReports.report_list,
    get_report_list_pending: state.petReports.get_report_list_pending,
    reported_locations: state.petLocations.reported_locations,
    get_locations_list_pending: state.petLocations.get_locations_list_pending
  };
}

const dispatchToProps = {
  addPetLocationAction: locationsActions.addPetLocationAction,
  getPetLocationsAction: locationsActions.getPetLocationsAction
};

export default reduxContainer(MapContainer, mapStateToProps, dispatchToProps);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
