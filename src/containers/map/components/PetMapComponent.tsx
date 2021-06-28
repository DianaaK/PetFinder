import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import { Popup } from 'react-native-map-link';
import MapView, { PROVIDER_GOOGLE, Marker, MAP_TYPES } from 'react-native-maps';
import Toast from 'react-native-toast-message';
import { Header } from 'react-navigation-stack';
import {
  CoordinatesDTO,
  PetReportDTO,
  ReportedLocationDTO,
  ReportType
} from '../../../redux/types';
import {
  formatDate,
  getAddressFromCoordinates,
  getCoordinatesFromAddress
} from '../../../utils';
import { HeaderComponent, IconComponent, TextComponent } from '../../general';
import { colors, DEVICE_HEIGHT, DEVICE_WIDTH, isIOS } from '../../../styles';
import { mapStyles } from './styles';

interface IProps {
  mapPreferences: { provider: 'google' | null; type: any };
  position: CoordinatesDTO;
  positionPending: boolean;
  petReport: PetReportDTO;
  reportedLocations: ReportedLocationDTO[];
  addPetLocationAction(address: string, coordinates: CoordinatesDTO): void;
  getPetLocationsAction(reportId: string): void;
}

const ASPECT_RATIO = DEVICE_WIDTH / DEVICE_HEIGHT;
const LATITUDE_DELTA = 0.007;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function PetMapComponent(props: IProps) {
  const navigation = useNavigation();
  let navigateBottom = new Animated.Value(-200);
  const [showNavigateApps, setShowNavigateApps] = useState<boolean>(false);
  const [showNavigateButton, setShowNavigateButton] = useState<boolean>(false);
  const [addMarkerMode, setAddMarkerMode] = useState<boolean>(false);
  const [address, setAddress] = useState('');
  const [currentMarkerPosition, setCurrentMarkerPosition] =
    useState<CoordinatesDTO>(props.position);
  const [selectedLocation, setSelectedLocation] = useState<CoordinatesDTO>(
    props.position
  );
  const savedCoordinates = useRef(new CoordinatesDTO());

  useEffect(() => {
    if (props.petReport?._id) {
      props.getPetLocationsAction(props.petReport._id);
    }
  }, []);

  useEffect(() => {
    if (showNavigateButton) {
      showButton();
    }
  }, [showNavigateButton]);

  const onBack = () => {
    if (addMarkerMode) {
      setAddMarkerMode(false);
    } else {
      navigation.goBack();
    }
  };

  const showButton = () => {
    Animated.timing(navigateBottom, {
      duration: 300,
      toValue: 20,
      useNativeDriver: false
    }).start();
  };

  const hideButton = () => {
    Animated.timing(navigateBottom, {
      duration: 300,
      toValue: -200,
      useNativeDriver: false
    }).start(() => {
      setShowNavigateButton(false);
    });
  };

  const onPressMap = () => {
    if (showNavigateButton) {
      hideButton();
    }
  };

  const closeNavigationHandler = () => {
    setShowNavigateApps(false);
  };

  const openNavigationHandler = () => {
    setShowNavigateApps(true);
  };

  const toggleButtonVisible = (event: any) => {
    setShowNavigateButton(true);
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const addLocation = () => {
    setAddMarkerMode(true);
  };

  const isValid = () => {
    if (!address) {
      Toast.show({
        type: 'error',
        text1: 'Invalid address!',
        text2: 'The new address must be different from the reported one.',
        visibilityTime: 1000
      });
      return false;
    }
    return true;
  };

  const saveReportedLocation = () => {
    if (isValid()) {
      props.addPetLocationAction(address, savedCoordinates.current);
      setAddMarkerMode(false);
    }
  };

  const searchAddress = async () => {
    Keyboard.dismiss();
    getCoordinatesFromAddress(address)
      .then((result: any) => {
        const coords = result.geometry?.location;
        const address = result.formatted_address;
        setAddress(address || '');
        setCurrentMarkerPosition({
          latitude: coords.lat,
          longitude: coords.lng
        });
        savedCoordinates.current = {
          latitude: coords.lat,
          longitude: coords.lng
        };
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'We could not find any results for this location!',
          visibilityTime: 1000
        });
      });
  };

  const setMarkerPosition = async (event: any) => {
    event.persist();
    const coords = event.nativeEvent.coordinate;
    savedCoordinates.current = coords;
    setCurrentMarkerPosition({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    getAddressFromCoordinates(coords.latitude, coords.longitude)
      .then((result: any) => {
        const address = result.formatted_address;
        setAddress(address || '');
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'We could not find any results for this location!',
          visibilityTime: 1000
        });
      });
  };

  const renderExternalNavigation = () => (
    <Popup
      isVisible={showNavigateApps}
      onCancelPressed={closeNavigationHandler}
      onAppPressed={closeNavigationHandler}
      onBackButtonPressed={closeNavigationHandler}
      modalProps={{
        animationIn: 'slideInUp'
      }}
      appsWhiteList={['google-maps', 'waze', 'uber']}
      options={{
        latitude: selectedLocation.latitude + '',
        longitude: selectedLocation.longitude + '',
        dialogTitle: `Navigate to ${props.petReport?.name}`,
        dialogMessage: 'Choose application',
        cancelText: 'Cancel'
      }}
    />
  );

  const renderPetMarker = (item: ReportedLocationDTO) => (
    <Marker
      key={item._id}
      title={item.address || ''}
      description={`Reported by ${item.user.firstname} on ${formatDate(
        item.created + ''
      )}`}
      coordinate={item.coordinates}
      pinColor="violet"
      onPress={!addMarkerMode ? toggleButtonVisible : () => {}}
    />
  );

  return (
    <>
      <HeaderComponent
        title={`${props.petReport.name}'s Location`}
        leftButtonAction={onBack}
        leftButtonIcon={{
          type: 'MaterialIcons',
          name: 'arrow-back'
        }}
        rightButtonAction={addMarkerMode ? saveReportedLocation : addLocation}
        rightButtonIcon={
          addMarkerMode
            ? {
                type: 'MaterialIcons',
                name: 'done'
              }
            : {
                type: 'MaterialIcons',
                name: 'add-location'
              }
        }
      />
      <View style={{ flex: 1 }}>
        {props.positionPending ? (
          <View style={mapStyles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.mainColorLight} />
          </View>
        ) : (
          <MapView
            provider={isIOS ? props.mapPreferences?.provider : PROVIDER_GOOGLE}
            mapType={props.mapPreferences?.type || MAP_TYPES.STANDARD}
            style={mapStyles.map}
            initialRegion={{
              ...props.position,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }}
            showsUserLocation={true}
            loadingEnabled={true}
            rotateEnabled={true}
            onPress={onPressMap}>
            {props.petReport.coordinates && (
              <Marker
                title={props.petReport.name}
                description={`${
                  props.petReport.type === ReportType.LOST
                    ? 'Last seen on'
                    : 'Uploaded on'
                } ${formatDate(props.petReport.created + '')}`}
                coordinate={props.petReport.coordinates}
                pinColor={
                  props.petReport.type === ReportType.LOST
                    ? 'tomato'
                    : 'turquoise'
                }
                onPress={!addMarkerMode ? toggleButtonVisible : () => {}}
              />
            )}
            {!addMarkerMode &&
              props.reportedLocations?.map((item: ReportedLocationDTO) =>
                renderPetMarker(item)
              )}
            {addMarkerMode && (
              <Marker
                draggable
                coordinate={currentMarkerPosition}
                onDragEnd={setMarkerPosition}
                pinColor="green"
              />
            )}
          </MapView>
        )}
        {showNavigateButton && (
          <>
            <Animated.View
              style={[styles.navigateButton, { bottom: navigateBottom }]}>
              <TouchableOpacity onPress={openNavigationHandler}>
                <TextComponent style={styles.buttonText}>
                  Navigate to location
                </TextComponent>
              </TouchableOpacity>
            </Animated.View>
            {renderExternalNavigation()}
          </>
        )}
        {addMarkerMode &&
          (isIOS ? (
            <KeyboardAvoidingView
              keyboardVerticalOffset={Header.HEIGHT + 20}
              style={mapStyles.addressInputContainer}
              behavior="padding">
              <TextInput
                placeholder={'Write an address'}
                value={address}
                onChangeText={setAddress}
                style={mapStyles.addressInput}
                placeholderTextColor={colors.mainColor}
              />
              <TouchableOpacity
                style={mapStyles.sendAddressButton}
                onPress={searchAddress}>
                <IconComponent
                  type="Ionicons"
                  name="send"
                  style={mapStyles.icon}
                />
              </TouchableOpacity>
            </KeyboardAvoidingView>
          ) : (
            <View style={mapStyles.addressInputContainer}>
              <TextInput
                placeholder={'Write an address'}
                value={address}
                onChangeText={setAddress}
                style={mapStyles.addressInput}
                placeholderTextColor={colors.mainColor}
              />
              <TouchableOpacity
                style={mapStyles.sendAddressButton}
                onPress={searchAddress}>
                <IconComponent
                  type="Ionicons"
                  name="send"
                  style={mapStyles.icon}
                />
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  navigateButton: {
    alignSelf: 'center',
    position: 'absolute',
    width: '80%',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mainColor3,
    opacity: 0.8,
    borderRadius: 40
  },
  buttonText: {
    fontSize: 24,
    color: 'white'
  }
});
