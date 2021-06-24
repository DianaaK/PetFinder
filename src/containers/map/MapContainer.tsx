import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { MAP_TYPES, PROVIDER_GOOGLE } from 'react-native-maps';
import { AppStore, reduxContainer } from '../../redux';
import locationsActions from '../../redux/pet-locations/actions';
import petReportActions from '../../redux/pet-reports/actions';
import {
  CoordinatesDTO,
  PetReportDTO,
  ReportedLocationDTO,
  UserDTO
} from '../../redux/types';
import GeneralMapComponent from './components/GeneralMapComponent';
import PetMapComponent from './components/PetMapComponent';
import { mapStyles } from './components/styles';

interface IProps {
  user: UserDTO;
  report_list: PetReportDTO[];
  reported_locations: ReportedLocationDTO[];
  addPetLocationAction(petLocation: ReportedLocationDTO): void;
  getPetLocationsAction(reportId: string): void;
  getPetReportListAction(criteria: any): void;
}

const MapContainer = (props: IProps) => {
  const route: any = useRoute();

  const [position, setPosition] = useState<CoordinatesDTO>(
    new CoordinatesDTO()
  );
  const [positionPending, setPositionPending] = useState(true);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      getCurrentPositionSuccess,
      setDefaultPosition,
      { timeout: 4000 }
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

  const setDefaultPosition = () => {
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
  const mapPreferences = {
    provider: props.user.useGoogleMaps ? PROVIDER_GOOGLE : null,
    type: props.user.useSatelliteView ? MAP_TYPES.SATELLITE : MAP_TYPES.STANDARD
  };

  return (
    <View style={mapStyles.container}>
      {petMode ? (
        <PetMapComponent
          mapPreferences={mapPreferences}
          reportedLocations={props.reported_locations}
          positionPending={positionPending}
          position={route.params?.petReport.coordinates}
          petReport={route.params?.petReport}
          addPetLocationAction={addReportedLocation}
          getPetLocationsAction={props.getPetLocationsAction}
        />
      ) : (
        <GeneralMapComponent
          mapPreferences={mapPreferences}
          data={reportList}
          position={position}
          positionPending={positionPending}
          getPetReportListAction={props.getPetReportListAction}
        />
      )}
    </View>
  );
};

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
  getPetLocationsAction: locationsActions.getPetLocationsAction,
  getPetReportListAction: petReportActions.getPetReportListAction
};

export default reduxContainer(MapContainer, mapStateToProps, dispatchToProps);
