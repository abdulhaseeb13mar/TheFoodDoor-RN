/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import WrapperScreen from '../FdComp/FdWrapperScreen';
import {colors, textFont} from '../FdComp/FdColor';
import {H_W} from '../FdComp/FdDim';
import Data from '../FdData';
import Loop from '../FdComp/FdFlatList';
import RefNavigation from '../FdComp/FdRefNavigation';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  FdsetCurrentProductAction,
  FdremoveFavAction,
  FdsetFavAction,
} from '../FdRedux/FdActions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FdSearchBar from '../FdComp/FdSearchBar';
import FdHeader from '../FdComp/FdHeader';

function FdHome(props) {
  useEffect(() => {
    // FdchangeTab(Data.category[0]);
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [Fdcategories, setFdCategories] = useState(Data.category);
  const [FdcurrentCat, setFdCurrentCat] = useState(Data.category[0]);
  const [FdtabProducts, setFdTabProducts] = useState([]);

  const FdchangeTab = (tab) => {
    setFdCurrentCat(tab);
    const filteredProducts = Data.product.filter(
      (item) => item.categoryId === tab.id,
    );
    setFdTabProducts(filteredProducts);
  };

  const FdGotoFav = () => RefNavigation.Navigate('FdFav');
  const FdGotoCart = () => RefNavigation.Navigate('FdCart');
  const FdGotoSearch = () => RefNavigation.Navigate('FdSearch');
  const FdGoToSingleProduct = (item) => {
    props.FdsetCurrentProductAction(item);
    RefNavigation.Navigate('FdSP');
  };
  return (
    <WrapperScreen
      style={{backgroundColor: 'white'}}
      barStyle="light-content"
      statusColor={colors.primary}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            backgroundColor: colors.primary,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            paddingVertical: HEIGHT * 0.03,
          }}>
          <FdHeader
            leftIcon={Feather}
            rightIcon={FontAwesome}
            rightIconName="heart"
            leftIconName="shopping-cart"
            leftIconColor="white"
            rightIconColor="white"
            rightIconAction={FdGotoFav}
            leftIconAction={FdGotoCart}
            Title={
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  fontFamily: 'Verdana-Bold',
                  color: 'white',
                }}>
                THE{' '}
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    fontFamily: 'Verdana-Bold',
                    fontStyle: 'italic',
                    color: 'white',
                  }}>
                  FOOD
                </Text>{' '}
                DOOR
              </Text>
            }
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              // onPress={QsGotoSearch}
              style={{
                width: '85%',
                marginTop: HEIGHT * 0.025,
                marginBottom: -HEIGHT * 0.05,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.25,
                shadowRadius: 17.11,
                // ...border,
              }}>
              <FdSearchBar editable={false} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </WrapperScreen>
  );
}

export const FdVerticalTile = ({
  item,
  FdGoToSingleProduct,
  FdFavs,
  FdremoveFav,
  FdsetFav,
}) => {
  useEffect(() => {
    checkIfFav();
  }, []);
  const [fav, setFav] = useState(false);

  const checkIfFav = () => {
    for (let us = 0; us < FdFavs.length; us++) {
      if (FdFavs[us].id === item.id) {
        setFav(true);
        break;
      }
    }
  };
  const toggleFav = () => {
    fav ? FdremoveFav(item.id) : FdsetFav(item);
    setFav(!fav);
  };
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      onPress={() => FdGoToSingleProduct(item)}
      style={{
        marginRight: H_W.width * 0.1,
        width: H_W.width * 0.47,
        borderRadius: 15,
        margin: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
      }}>
      <View
        style={{
          borderRadius: 15,
          paddingVertical: HEIGHT * 0.015,
          backgroundColor: `rgba(${colors.rgb_Primary}, 0.8)`,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: H_W.width * 0.02,
            paddingRight: H_W.width * 0.02,
            marginBottom: HEIGHT * 0.015,
          }}>
          <Text
            numberOfLines={2}
            style={{
              width: '70%',
              fontSize: 23,
              fontWeight: 'bold',
              color: 'black',
            }}>
            {item.name}
          </Text>
          <TouchableOpacity onPress={toggleFav}>
            <Ionicons
              name={fav ? 'heart' : 'heart-outline'}
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <ImageBackground
          source={item.images}
          resizeMode="contain"
          imageStyle={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,
            transform: [{rotate: '-13deg'}],
          }}
          style={{
            marginLeft: H_W.width * 0.13,
            width: H_W.width * 0.4,
            height: HEIGHT * 0.25,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export const TabList = ({item, FdchangeTab, FdcurrentCat}) => {
  return (
    <View
      style={{
        borderColor: 'blue',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: H_W.height * 0.02,
        // transform: [{rotate: '-90deg'}],
      }}>
      <TouchableOpacity
        style={styles.HomeTabsWrapper}
        onPress={() => FdchangeTab(item)}>
        <Text
          style={{
            ...styles.HomeTabsText,
            color:
              item.category === FdcurrentCat.category
                ? colors.primary
                : colors.secondary,
          }}>
          {item.category}
        </Text>
        {item.category === FdcurrentCat.category ? (
          <View style={styles.tabIndicator} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};
const border = {
  borderWidth: 1,
  borderColor: 'red',
};
const styles = StyleSheet.create({
  FdHome21: {},
  FdHome20: {},
  FdHome19: {},
  FdHome18: {},
  FdHome17: {},
  FdHome16: {},
  FdHome15: {},
  FdHome14: {},
  FdHome13: {},
  FdHome12: {},
  FdHome11: {},
  FdHome10: {},
  FdHome9: {},
  FdHome8: {},
  FdHome7: {},
  FdHome6: {},
  FdHome5: {},
  FdHome4: {},
  FdHome3: {},
  FdHome2: {},
  FdHome1: {},
  tabIndicator: {
    width: 30,
    borderWidth: 1.8,
    borderRadius: 10,
    marginTop: 4,
    backgroundColor: colors.primary,
  },
  HomeTabsText: {
    fontSize: 16,
    fontWeight: '700',
  },
  HomeTabsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: H_W.height * 0.03,
    height: H_W.width * 0.1,
    paddingHorizontal: H_W.width * 0.02,
    transform: [{rotate: '-90deg'}],
    paddingTop: H_W.width * 0.02,
  },
});

const mapStateToProps = (state) => {
  return {
    FdtotalItems: state.FdCartReducer.totalItems,
    FdFavs: state.FdToggleFav,
  };
};

export default connect(mapStateToProps, {
  FdsetCurrentProductAction,
  FdremoveFavAction,
  FdsetFavAction,
})(FdHome);
