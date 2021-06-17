import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { assets } from '../../../../assets/images';
import { PetGender, ReportType } from '../../../redux/types';
import { IconComponent, TextComponent } from '../../general';
import { Popup } from 'react-native-map-link';
import { formatDate, requestLocationPermission } from '../../../utils';
import { styles } from './styles';
import { colors } from '../../../styles';

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

  const navigateToMap = async () => {
    await requestLocationPermission();
    navigation.navigate('GeneralMap', {
      petMode: true,
      petReport: props.item
    });
  };

  const goToEdit = () => {
    navigation.navigate('Add', {
      editMode: true,
      reportId: props.item._id
    });
  };

  const deleteReport = () => {
    console.log('to be deleted');
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
        latitude: pet.coordinates?.latitude + '',
        longitude: pet.coordinates?.longitude + '',
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
              {pet.user.profileImage ? (
                <Image
                  source={{ uri: pet.user.profileImage || '' }}
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
              <TextComponent style={styles.date}>
                {formatDate(pet.created)}
              </TextComponent>
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
            <TextComponent style={styles.navigateText}>
              Have you seen {pet.name}?{'\n'}
              Mark {pet.gender == PetGender.FEMALE ? 'her' : 'his'} location on
              the map!
            </TextComponent>
          ) : null}
          <TouchableOpacity
            style={styles.navigateButton}
            onPress={navigateToMap}>
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
      {props.isUserOwner && (
        <View style={styles.ownerSection}>
          <TextComponent style={[styles.navigateText, { paddingVertical: 10 }]}>
            Author options:
          </TextComponent>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={[styles.ownerButtons, { borderColor: colors.green }]}
              onPress={goToEdit}>
              <TextComponent
                style={[styles.ownerButtonText, { color: colors.green }]}>
                Edit
              </TextComponent>
              <IconComponent
                type="MaterialIcons"
                name="edit"
                style={[styles.buttonIcon, { color: colors.green }]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ownerButtons, { borderColor: colors.red }]}
              onPress={deleteReport}>
              <TextComponent
                style={[styles.ownerButtonText, { color: colors.red }]}>
                Delete
              </TextComponent>
              <IconComponent
                type="MaterialIcons"
                name="delete"
                style={[styles.buttonIcon, { color: colors.red }]}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {renderExternalNavigation()}
    </View>
  );
}
