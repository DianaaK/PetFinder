import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { Popup } from 'react-native-map-link';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
  PetReportDTO,
  ReportedLocationDTO,
  ReportType
} from '../../../redux/types';
import { colors, DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../styles';
import { formatDate } from '../../../utils';
import { TextComponent } from '../../general';

interface IProps {
  position: {
    latitude: number;
    longitude: number;
  };
  positionPending: boolean;
  petReport: PetReportDTO;
  reportedLocations: ReportedLocationDTO[];
}

const ASPECT_RATIO = DEVICE_WIDTH / DEVICE_HEIGHT;
const LATITUDE_DELTA = 0.007;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function PetMapComponent(props: IProps) {
  const [showNavigateApps, setShowNavigateApps] = useState<boolean>(false);
  let navigateBottom = new Animated.Value(-200);
  const [showNavigateButton, setShowNavigateButton] = useState<boolean>(false);

  useEffect(() => {
    if (showNavigateButton) {
      showButton();
    }
  }, [showNavigateButton]);

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

  const toggleButtonVisible = () => {
    setShowNavigateButton(true);
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
        latitude: props.position.latitude + '',
        longitude: props.position.longitude + '',
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
      description={`Reported by ${item.user} on ${item.date}`}
      coordinate={item.coordinates}
      pinColor="violet"
      onPress={toggleButtonVisible}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      {props.positionPending ? (
        <ActivityIndicator size="large" />
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
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
              onPress={toggleButtonVisible}
            />
          )}
          {props.reportedLocations.map((item: ReportedLocationDTO) =>
            renderPetMarker(item)
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
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
