import React, { Component } from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  Dimensions,
  StyleSheet
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { DEVICE_WIDTH } from '../../styles';

interface IProps {
  images: Array<string>;
  imageComponentStyle?: { [key: string]: string | number };
  imageLoadingColor?: string;
  customDotColor?: string;
  customInactiveDotColor?: string;
}

interface IState {
  currentImage: number;
  loading: any;
}

const width = Dimensions.get('window').width;

export class SliderBox extends Component<IProps, IState> {
  _ref: any;
  constructor(props: any) {
    super(props);
    this.state = {
      currentImage: 0,
      loading: []
    };
  }

  onSnap(index: number) {
    this.setState({ currentImage: index });
  }

  renderItem({ item, index }: any) {
    const { imageComponentStyle, imageLoadingColor } = this.props;
    return (
      <View
        style={{
          position: 'relative',
          justifyContent: 'center'
        }}>
        <Image
          style={[
            {
              width: '100%',
              alignSelf: 'center'
            },
            imageComponentStyle || {}
          ]}
          source={typeof item === 'string' ? { uri: item } : item}
          onLoadEnd={() => {
            let t = this.state.loading;
            t[index] = true;
            this.setState({ loading: t });
          }}
          {...this.props}
        />
        {!this.state.loading[index] && (
          <ActivityIndicator
            size="large"
            color={imageLoadingColor || 'black'}
            style={{
              position: 'absolute',
              alignSelf: 'center'
            }}
          />
        )}
      </View>
    );
  }

  get pagination() {
    const { currentImage } = this.state;
    const { images, customDotColor, customInactiveDotColor } = this.props;
    return (
      <Pagination
        dotsLength={images.length}
        activeDotIndex={currentImage}
        dotStyle={styles.dotStyle}
        dotColor={customDotColor || colors.dotColors}
        inactiveDotColor={customInactiveDotColor || colors.white}
        inactiveDotScale={0.8}
        carouselRef={this._ref}
        inactiveDotOpacity={0.8}
        containerStyle={styles.paginationBoxStyle}
        {...this.props}
      />
    );
  }

  render() {
    const { images } = this.props;
    return (
      <View>
        <Carousel
          layout="default"
          useScrollView
          data={images}
          ref={(c) => (this._ref = c)}
          loop={false}
          enableSnap={true}
          itemWidth={width}
          sliderWidth={width}
          renderItem={(item: any) => this.renderItem(item)}
          onSnapToItem={(index) => this.onSnap(index)}
          {...this.props}
        />
        {images.length > 1 && this.pagination}
      </View>
    );
  }
}

const colors = {
  dotColors: '#BDBDBD',
  white: '#FFFFFF'
};

const styles = StyleSheet.create({
  paginationBoxStyle: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  dotStyle: {
    marginTop: -40,
    width: 12,
    height: 12,
    borderRadius: 8
  }
});
