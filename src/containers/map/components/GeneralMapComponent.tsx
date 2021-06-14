import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, MAP_TYPES } from 'react-native-maps';
import { PetReportDTO, ReportType } from '../../../redux/types';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../styles';
import { ListItemComponent } from '../../list/components';

interface IProps {
  data: PetReportDTO[];
  position: {
    latitude: number;
    longitude: number;
  };
  positionPending: boolean;
}

const ASPECT_RATIO = DEVICE_WIDTH / DEVICE_HEIGHT;
const LATITUDE_DELTA = 0.007;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function GeneralMap(props: IProps) {
  let previewBottom = new Animated.Value(-200);
  const navigation = useNavigation();
  const [showPreviewCard, setShowPreviewCard] = useState<boolean>(false);
  const [pet, setPet] = useState<PetReportDTO | null>(null);

  useEffect(() => {
    if (showPreviewCard && pet) {
      showPreview();
    }
  }, [showPreviewCard, pet]);

  const showPreview = () => {
    Animated.timing(previewBottom, {
      duration: 300,
      toValue: 40,
      useNativeDriver: false
    }).start();
  };

  const hidePreview = () => {
    Animated.timing(previewBottom, {
      duration: 300,
      toValue: -200,
      useNativeDriver: false
    }).start(() => {
      setPet(null);
      setShowPreviewCard(false);
    });
  };

  const redirectToPet = (_id: string) => {
    navigation.navigate('Details', { itemId: _id, canNavigate: false });
  };

  const renderPetMarker = (item: PetReportDTO) => (
    <Marker
      key={item._id}
      coordinate={item.coordinates}
      pinColor={item.type === ReportType.LOST ? 'tomato' : 'turquoise'}
      tracksViewChanges={false}
      onPress={onMarkerPress(item)}
    />
  );

  const onPressMap = () => {
    if (showPreviewCard && pet) {
      hidePreview();
    }
  };

  const onMarkerPress = (item: PetReportDTO) => (event: any) => {
    if (item !== pet) {
      setPet(item);
      setShowPreviewCard(true);
      event.stopPropagation();
    }
  };

  const user = {
    provider: PROVIDER_GOOGLE,
    mapType: MAP_TYPES.STANDARD
  };

  return (
    <View style={{ flex: 1 }}>
      {props.positionPending ? (
        <ActivityIndicator size="large" />
      ) : (
        <MapView
          provider={user.provider}
          mapType={user.mapType}
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
          {props.data.map((item) => renderPetMarker(item))}
        </MapView>
      )}
      {showPreviewCard && pet && (
        <>
          <Animated.View style={[styles.preview, { bottom: previewBottom }]}>
            <ListItemComponent item={pet} onPress={redirectToPet} />
          </Animated.View>
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
  preview: {
    position: 'absolute',
    width: '100%',
    height: 180
  }
});
