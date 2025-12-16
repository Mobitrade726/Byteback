import React, {useEffect} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBanners} from '../../redux/slices/homeSlice';

const HeroCarousel = ({data = [], navigation}) => {
  // Get carouselData from Redux
  const dispatch = useDispatch();
  const carouselData = useSelector(state => state.home.carouselData);
  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  if (!data || data.length === 0) {
    return (
      <View
        style={{height: 200, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No Carousel Data</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#FFFBFA', '#666666', '#1C9C48', '#EAE6E5']}
      locations={[1, 1, 0.3, 1]}>
      <Swiper
        showsPagination={false}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        autoplay
        loop
        style={styles.swiper}>
        {carouselData.map((item, index) => (
          <View
            key={index}
            >
            <ImageBackground
              source={{uri: item.banner_image}}
              style={styles.card_Top}
              imageStyle={styles.image1}>
              <View style={styles.textContainer}>
                {item.banner_description && (
                  <Text
                    style={[
                      styles.subtitleT,
                      item.id === 2 && {color: '#fff', fontSize: 12, marginTop:"25%", marginLeft:50, marginVertical:10},
                      item.id === 3 && {color: '#333333',marginTop:"25%",marginLeft:20,},
                      item.id === 4 && {color: '#666666', fontSize:12, marginLeft:10, marginVertical:15},
                    ]}>
                    {item.banner_description}
                  </Text>
                )}
                <Text
                  style={[
                    styles.titleT,
                    item.id === 2 && {fontSize: 10, color: '#fff', marginLeft:50, width:"50%"}, // only for id=2
                    item.id === 3 && {fontSize: 22, color: '#666666', marginLeft:20, fontWeight:"bold"}, // only for id=3
                    item.id === 4 && {fontSize: 18, color: '#333333', fontWeight:"bold",marginTop:"28%", alignSelf:"flex-end"}, // only for id=4
                  ]}>
                  {item.banner_title}
                </Text>
              </View>
            </ImageBackground>
          </View>
        ))}
      </Swiper>
    </LinearGradient>
  );
};

export default HeroCarousel;
