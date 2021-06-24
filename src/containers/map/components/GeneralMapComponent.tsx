import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { PROVIDER_GOOGLE, Marker, MAP_TYPES } from 'react-native-maps';
import { CoordinatesDTO, PetReportDTO, ReportType } from '../../../redux/types';
import {
  colors,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  navbarStyles
} from '../../../styles';
import { HeaderComponent } from '../../general';
import { ListItemComponent } from '../../list/components';
import { SearchForm } from '../../list/components/SearchForm';
import { mapStyles } from './styles';

interface IProps {
  mapPreferences: { provider: 'google' | null; type: any };
  data: PetReportDTO[];
  position: CoordinatesDTO;
  positionPending: boolean;
  getPetReportListAction(criteria?: any): void;
}

const ASPECT_RATIO = DEVICE_WIDTH / DEVICE_HEIGHT;
const LATITUDE_DELTA = 0.007;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function GeneralMap(props: IProps) {
  const navigation = useNavigation();
  const route: any = useRoute();

  const [showPreviewCard, setShowPreviewCard] = useState<boolean>(false);
  const [pet, setPet] = useState<PetReportDTO | null>(null);
  const [previewBottom, setPreview] = useState(new Animated.Value(-200));

  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);
  const [filtersHeight, setFiltersHeight] = useState(new Animated.Value(0));
  const [textOpacity, setTextOpacity] = useState(new Animated.Value(0));
  const [filters, setFilters] = useState(
    route.params?.filters || {
      type: null,
      species: null,
      gender: null
    }
  );

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

  const onBack = () => {
    navigation.navigate('List', { filters });
  };

  const toggleFilters = () => {
    Animated.parallel([
      Animated.timing(filtersHeight, {
        duration: 500,
        toValue: showFilterMenu ? 0 : 340,
        useNativeDriver: false
      }),
      Animated.timing(textOpacity, {
        duration: 200,
        delay: showFilterMenu ? 0 : 250,
        toValue: showFilterMenu ? 0 : 1,
        useNativeDriver: false
      })
    ]).start(() => {
      setShowFilterMenu(!showFilterMenu);
    });
  };

  const setQuery = () => {
    if (showFilterMenu) {
      toggleFilters();
    }
    props.getPetReportListAction({ filters });
  };

  const handleRadio = (value: string, field: string) => {
    const newFilters: any = { ...filters };
    if (newFilters[field] !== value) {
      newFilters[field] = value;
    } else {
      newFilters[field] = null;
    }
    setFilters(newFilters);
  };

  const showBadge = () => {
    return Object.values(filters).filter((item) => item !== null);
  };

  const renderPetMarker = (item: PetReportDTO) => {
    if (item.coordinates) {
      return (
        <Marker
          key={item._id}
          coordinate={item.coordinates}
          pinColor={item.type === ReportType.LOST ? 'tomato' : 'turquoise'}
          tracksViewChanges={false}
          onPress={onMarkerPress(item)}
        />
      );
    }
  };

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

  const fitlersLength = showBadge().length;
  return (
    <>
      <HeaderComponent
        title="Map"
        leftButtonAction={onBack}
        leftButtonIcon={{
          type: 'MaterialIcons',
          name: 'arrow-back'
        }}
        rightButtonAction={toggleFilters}
        rightButtonIcon={{
          type: 'MaterialIcons',
          name: 'filter-list'
        }}
        rightButtonBadge={fitlersLength > 0 ? fitlersLength + '' : ''}
      />
      <Animated.View
        style={[styles.animatedContainer, { height: filtersHeight }]}>
        <LinearGradient
          colors={[colors.lightGray, colors.mainColorLight3]}
          style={styles.linearGradient}>
          <Animated.View style={{ opacity: textOpacity }}>
            <SearchForm
              filters={filters}
              handleRadio={handleRadio}
              setQuery={setQuery}
            />
          </Animated.View>
        </LinearGradient>
      </Animated.View>
      <View style={{ flex: 1 }}>
        {props.positionPending ? (
          <View style={mapStyles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.mainColorLight} />
          </View>
        ) : (
          <MapView
            provider={props.mapPreferences?.provider || PROVIDER_GOOGLE}
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
    </>
  );
}

const styles = StyleSheet.create({
  preview: {
    position: 'absolute',
    width: '100%',
    height: 180
  },
  animatedContainer: {
    top: navbarStyles.height - 5,
    position: 'absolute',
    width: '100%',
    zIndex: 3,
    opacity: 0.95
  },
  linearGradient: {
    height: '100%',
    paddingHorizontal: 15
  }
});
