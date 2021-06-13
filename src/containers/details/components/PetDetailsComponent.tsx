import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { assets } from '../../../../assets/images';
import { PetGender, ReportType } from '../../../redux/types';
import { colors, fonts } from '../../../styles';
import { IconComponent, TextComponent } from '../../general';
import { Popup } from 'react-native-map-link';

export default function PetDetailsComponent(props: any) {
  const [showNavigate, setShowNavigate] = useState<boolean>(false);
  const navigation = useNavigation();
  const pet = props.item;

  const closeNavigationHandler = () => {
    setShowNavigate(false);
  };

  const openNavigationHandler = () => {
    setShowNavigate(true);
  };

  const renderExternalNavigation = () => (
    <Popup
      isVisible={showNavigate}
      onCancelPressed={closeNavigationHandler}
      onAppPressed={closeNavigationHandler}
      onBackButtonPressed={closeNavigationHandler}
      modalProps={{
        animationIn: 'slideInUp'
      }}
      appsWhiteList={['google-maps', 'waze', 'uber']}
      options={{
        latitude: pet.coordinates.latitude + '',
        longitude: pet.coordinates.longitude + '',
        dialogTitle: `Navigate to ${pet.name}`,
        dialogMessage: 'Choose application',
        cancelText: 'Cancel'
      }}
    />
  );

  return (
    <View style={styles.container}>
      <TextComponent style={styles.description}>
        {pet.description}
      </TextComponent>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20
        }}>
        <View style={{ flex: 1, paddingLeft: 8, paddingVertical: 4 }}>
          <View style={styles.rowContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {pet.user.image ? (
                <Image
                  source={{ uri: pet.user.image || '' }}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={assets.placeholder}
                  style={styles.image}
                  resizeMode="cover"
                />
              )}
              <TextComponent style={styles.username}>
                {pet.user.firstname}
              </TextComponent>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <IconComponent
                type="MaterialIcons"
                name="calendar-today"
                style={styles.icon}
              />
              <TextComponent style={styles.date}>{pet.date}</TextComponent>
            </View>
          </View>
          <TextComponent style={styles.userType}>
            {pet.type === ReportType.LOST ? 'Owner' : 'Rescuer'}
          </TextComponent>
          {pet.user.email && (
            <TextComponent style={styles.userType}>
              Mail: {pet.user.email}
            </TextComponent>
          )}
          {pet.user.phone && (
            <TextComponent style={styles.userType}>
              Phone: {pet.user.phone}
            </TextComponent>
          )}
        </View>
      </View>
      {props.canNavigate ? (
        <View style={styles.navigateContainer}>
          {props.item.type === ReportType.LOST ? (
            <View style={styles.centerText}>
              <TextComponent style={styles.navigateText}>
                Have you seen {pet.name}?
              </TextComponent>
              <TextComponent style={styles.navigateText}>
                Mark {pet.gender == PetGender.FEMALE ? 'her' : 'his'} location
                on the map!
              </TextComponent>
            </View>
          ) : null}
          <TouchableOpacity
            style={styles.navigateButton}
            onPress={() => {
              navigation.navigate('GeneralMap', {
                petMode: true,
                petReport: props.item
              });
            }}>
            <TextComponent style={styles.navigateButtonText}>
              Go to map!
            </TextComponent>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.navigateButton}
          onPress={openNavigationHandler}>
          <TextComponent style={styles.navigateButtonText}>
            Navigate to {pet.name}!
          </TextComponent>
        </TouchableOpacity>
      )}
      {renderExternalNavigation()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  description: {
    color: colors.mainColor4,
    lineHeight: 20,
    fontFamily: fonts.secondFont
  },
  username: {
    fontSize: 16,
    color: colors.mainColor2,
    fontFamily: fonts.mainFont
  },
  userType: {
    marginLeft: 38,
    fontSize: 13,
    color: colors.mainColor4,
    fontFamily: fonts.secondFont
  },
  date: {
    fontSize: 14,
    color: colors.mainColor2,
    fontFamily: fonts.mainFont
  },
  icon: {
    color: colors.mainColor5,
    paddingRight: 5,
    fontSize: 12
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 20,
    marginRight: 8
  },
  centerText: {
    alignItems: 'center'
  },
  navigateContainer: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center'
  },
  navigateText: {
    fontSize: 22,
    color: colors.mainColor2
  },
  navigateButton: {
    flex: 1,
    alignSelf: 'center',
    padding: 15,
    marginTop: 10,
    backgroundColor: colors.mainColor3,
    borderRadius: 40
  },
  navigateButtonText: {
    fontSize: 24,
    color: 'white'
  }
});
