import React from 'react';
import { Component } from 'react';
import { Animated, StyleSheet, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { RadioButton } from 'react-native-paper';
import { PetGender, PetSpecies, ReportType } from '../../../redux/types';
import { colors, fonts } from '../../../styles';
import { IconComponent, TextComponent } from '../../general';

interface IProps {
  initialFilters: {
    type: ReportType | null;
    species: PetSpecies | null;
    gender: PetGender | null;
  };
  initialSearch: string;
  saveQuery(search: string, filters: any): void;
}
interface IState {
  filtersHeight: any;
  textOpacity: any;
  showFilterMenu: boolean;
  search: string;
  filters: {
    type: ReportType | null;
    species: PetSpecies | null;
    gender: PetGender | null;
  };
}
export class SearchComponent extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      filtersHeight: new Animated.Value(0),
      textOpacity: new Animated.Value(0),
      showFilterMenu: false,
      search: props.initialSearch || '',
      filters: {
        type: props.initialFilters.type || null,
        species: props.initialFilters.species || null,
        gender: props.initialFilters.gender || null
      }
    };
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.initialSearch !== this.props.initialSearch) {
      this.setState({ search: this.props.initialSearch });
    }
    if (
      Object.keys(prevProps.initialFilters).length &&
      !Object.keys(this.props.initialFilters).length
    ) {
      this.setState({ filters: this.props.initialFilters });
    }
  }

  toggleFilters = () => {
    Animated.parallel([
      Animated.timing(this.state.filtersHeight, {
        duration: 500,
        toValue: this.state.showFilterMenu ? 0 : 340,
        useNativeDriver: false
      }),
      Animated.timing(this.state.textOpacity, {
        duration: 300,
        toValue: this.state.showFilterMenu ? 0 : 1,
        useNativeDriver: false
      })
    ]).start(() => {
      this.setState({ showFilterMenu: !this.state.showFilterMenu });
    });
  };

  handleRadio = (value: string, field: string) => {
    const filters: any = { ...this.state.filters };
    if (filters[field] !== value) {
      filters[field] = value;
    } else {
      filters[field] = null;
    }
    this.setState({ filters });
  };

  handleSearch = (value: string) => {
    this.setState({ search: value });
  };

  setQuery = () => {
    this.props.saveQuery(this.state.search, this.state.filters);
    if (this.state.showFilterMenu) {
      this.toggleFilters();
    }
  };

  showBadge = () => {
    return Object.values(this.props.initialFilters).filter(
      (item) => item !== null
    );
  };

  render() {
    const { filters, search } = this.state;
    const fitlersLength = this.showBadge().length;
    return (
      <>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <TextInput
              value={search}
              onChangeText={this.handleSearch}
              placeholder="Search pets"
              style={styles.searchInput}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={this.setQuery}>
              <IconComponent
                type="Ionicons"
                name="search"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.filterButtonContainer}>
            {fitlersLength > 0 && (
              <View style={styles.badge}>
                <TextComponent style={styles.badgeText}>
                  {fitlersLength}
                </TextComponent>
              </View>
            )}
            <TouchableOpacity
              style={styles.filterButton}
              onPress={this.toggleFilters}>
              <IconComponent
                type="Ionicons"
                name="filter-outline"
                style={styles.filterIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View style={{ height: this.state.filtersHeight }}>
          <LinearGradient
            colors={[colors.lightGray, colors.mainColorLight3]}
            style={styles.linearGradient}>
            <Animated.View style={{ opacity: this.state.textOpacity }}>
              <TextComponent style={styles.radioText}>
                Report Type:
              </TextComponent>
              <RadioButton.Group
                onValueChange={(value) => {
                  this.handleRadio(value, 'type');
                }}
                value={filters.type + ''}>
                <View
                  style={[
                    styles.rowContainer,
                    { justifyContent: 'space-around' }
                  ]}>
                  <View style={styles.rowContainer}>
                    <RadioButton
                      value={ReportType.LOST + ''}
                      color={colors.mainColor2}
                      uncheckedColor={colors.mainColor2}
                    />
                    <TextComponent>Lost</TextComponent>
                  </View>
                  <View style={styles.rowContainer}>
                    <RadioButton
                      value={ReportType.FOUND + ''}
                      color={colors.mainColor2}
                      uncheckedColor={colors.mainColor2}
                    />
                    <TextComponent>Found</TextComponent>
                  </View>
                </View>
              </RadioButton.Group>

              <TextComponent style={styles.radioText}>
                Pet Species:
              </TextComponent>
              <RadioButton.Group
                onValueChange={(value) => {
                  this.handleRadio(value, 'species');
                }}
                value={filters.species + ''}>
                <View style={styles.rowContainer}>
                  <RadioButton
                    value={PetSpecies.CAT + ''}
                    color={colors.mainColor2}
                    uncheckedColor={colors.mainColor2}
                  />
                  <TextComponent>Cat</TextComponent>
                </View>
                <View style={styles.rowContainer}>
                  <RadioButton
                    value={PetSpecies.DOG + ''}
                    color={colors.mainColor2}
                    uncheckedColor={colors.mainColor2}
                  />
                  <TextComponent>Dog</TextComponent>
                </View>
                <View style={styles.rowContainer}>
                  <RadioButton
                    value={PetSpecies.OTHER + ''}
                    color={colors.mainColor2}
                    uncheckedColor={colors.mainColor2}
                  />
                  <TextComponent>Other</TextComponent>
                </View>
              </RadioButton.Group>

              <TextComponent style={styles.radioText}>
                Pet Gender:
              </TextComponent>
              <RadioButton.Group
                onValueChange={(value) => {
                  this.handleRadio(value, 'gender');
                }}
                value={filters.gender + ''}>
                <View
                  style={[
                    styles.rowContainer,
                    { justifyContent: 'space-around' }
                  ]}>
                  <View style={styles.rowContainer}>
                    <RadioButton
                      value={PetGender.MALE + ''}
                      color={colors.mainColor2}
                      uncheckedColor={colors.mainColor2}
                    />
                    <TextComponent>Male</TextComponent>
                  </View>
                  <View style={styles.rowContainer}>
                    <RadioButton
                      value={PetGender.FEMALE + ''}
                      color={colors.mainColor2}
                      uncheckedColor={colors.mainColor2}
                    />
                    <TextComponent>Female</TextComponent>
                  </View>
                </View>
              </RadioButton.Group>

              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={this.setQuery}>
                  <TextComponent
                    style={{
                      textTransform: 'uppercase',
                      color: colors.mainColor3,
                      fontSize: 16
                    }}>
                    Done
                  </TextComponent>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </LinearGradient>
        </Animated.View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    margin: 10
  },
  searchContainer: {
    flex: 6,
    height: 45,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderRadius: 15,
    borderColor: colors.mainColorLight,
    borderWidth: 1
  },
  searchInput: {
    marginLeft: 5,
    fontFamily: fonts.mainFont,
    width: '85%'
  },
  searchButton: {
    padding: 8
  },
  filterButtonContainer: {
    flex: 1,
    height: 45,
    marginLeft: 20,
    backgroundColor: colors.mainColorLight3,
    borderRadius: 15,
    borderColor: colors.mainColorLight2,
    borderWidth: 1
  },
  filterButton: {
    paddingVertical: 10
  },
  icon: {
    color: colors.mainColor3,
    fontSize: 20
  },
  filterIcon: {
    color: 'white'
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: 0,
    zIndex: 2,
    backgroundColor: colors.mainColor5,
    height: 20,
    width: 20,
    borderRadius: 10
  },
  badgeText: {
    fontSize: 14,
    color: colors.mainColorLight,
    textAlign: 'center'
  },
  linearGradient: {
    height: '100%',
    paddingHorizontal: 15
  },
  radioText: {
    marginVertical: 8
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  doneButton: {
    width: 100,
    borderRadius: 15,
    borderColor: colors.mainColorLight2,
    backgroundColor: colors.mainColorLight,
    borderWidth: 1,
    padding: 8,
    alignItems: 'center'
  }
});
