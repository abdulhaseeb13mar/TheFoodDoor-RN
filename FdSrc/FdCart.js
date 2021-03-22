/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
  FdremoveCartAction,
  FdaddCartAction,
  FdsetCurrentProductAction,
  FdsetFavAction,
  FdremoveFavAction,
  FdresetCart,
} from '../FdRedux/FdActions';
import WrapperScreen from '../FdComp/FdWrapperScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, textFont} from '../FdComp/FdColor';
import {H_W} from '../FdComp/FdDim';
import RefNavigation from '../FdComp/FdRefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {Button} from 'react-native-elements';
import Loop from '../FdComp/FdFlatList';
import UseHeader from '../FdComp/FdHeader';

export const Cart = (props) => {
  useEffect(() => {
    convertObjectToArray();
  }, [props.FdCart]);

  const [HorizontalCartArray, setHorizontalCartArray] = useState([]);

  const convertObjectToArray = () => {
    const CartArray = Object.keys(props.FdCart);
    let UsArr = [];
    CartArray.forEach((element) => {
      UsArr.push(props.FdCart[element]);
    });
    setHorizontalCartArray(UsArr);
  };

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const FdGoBack = () => RefNavigation.GoBack();

  const FdGoToSingleProduct = (item) => {
    props.FdsetCurrentProductAction(item);
    RefNavigation.Navigate('FdSP');
  };
  const FdAddToCart = (item) => {
    props.FdaddCartAction({...item});
  };

  const FdRemoveFromCart = (item) => {
    props.FdCart[item.id].added !== 0 && props.FdremoveCartAction(item);
  };
  const FdinfoScreen = () => RefNavigation.Navigate('FdContact');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Entypo}
        leftIconName="chevron-left"
        leftIconAction={FdGoBack}
        rightIconAction={() => props.FdresetCart()}
        leftIconColor="black"
        rightIcon={AntDesign}
        rightIconName="delete"
        rightIconColor="black"
        Title={<Text style={{color: 'black', fontSize: 22}}>Cart</Text>}
      />

      <View style={{marginTop: HEIGHT * 0.04, flex: 1}}>
        {HorizontalCartArray.length > 0 ? (
          <Loop
            horizontal={false}
            data={HorizontalCartArray}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => FdGoToSingleProduct(item)}
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <View
                  style={{
                    width: '90%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderBottomColor: colors.lightGrey3,
                    paddingBottom: HEIGHT * 0.03,
                    marginBottom: HEIGHT * 0.02,
                  }}>
                  <ImageBackground
                    source={item.images}
                    style={{
                      width: H_W.width * 0.27,
                      height: HEIGHT * 0.18,
                      backgroundColor: 'rgba(0,0,0, 0.25)',
                      borderRadius: 19,
                    }}
                    resizeMode="contain"
                  />
                  <View style={{width: H_W.width * 0.55}}>
                    <View>
                      <Text
                        numberOfLines={2}
                        style={{
                          color: 'black',
                          width: H_W.width * 0.5,
                          fontFamily: textFont.FuturaMedium,
                          fontSize: 18.5,
                        }}>
                        {item.name}
                      </Text>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          alignSelf: 'flex-start',
                          marginTop: HEIGHT * 0.01,
                        }}>
                        <AntDesign
                          name="star"
                          color="#ffce33"
                          size={H_W.width * 0.04}
                        />
                        <Text
                          style={{
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: 15.5,
                          }}>
                          {item.rating}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: HEIGHT * 0.02,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderWidth: 1,
                          borderColor: colors.lightGrey1,
                          borderRadius: 8,
                          height: HEIGHT * 0.04,
                        }}>
                        <TouchableOpacity
                          onPress={() => FdRemoveFromCart(item)}
                          style={{
                            alignSelf: 'stretch',
                            width: H_W.width * 0.07,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Feather name="minus" color="black" size={17} />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginHorizontal: H_W.width * 0.04,
                          }}>
                          {item.added}
                        </Text>
                        <TouchableOpacity
                          onPress={() => FdAddToCart(item)}
                          style={{
                            alignSelf: 'stretch',
                            width: H_W.width * 0.07,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Feather name="plus" color="black" size={17} />
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 20,
                          fontFamily: textFont.DINAlternate,
                        }}>
                        ${item.price}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text
            style={{
              width: '100%',
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
            }}>
            Your Cart is empty...
          </Text>
        )}
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: H_W.width * 0.05,
            marginBottom: HEIGHT * 0.02,
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 28,
              fontFamily: textFont.DINAlternate,
            }}>
            Total
          </Text>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 25,
              fontFamily: textFont.FuturaMedium,
            }}>
            ${props.FdTotal}
          </Text>
        </View>
        <Button
          raised
          onPress={FdinfoScreen}
          title="Checkout"
          titleStyle={{
            fontWeight: 'bold',
            fontFamily: textFont.FuturaMedium,
            fontSize: 20,
            textAlign: 'center',
          }}
          disabled={props.FdTotal < 1}
          buttonStyle={{
            backgroundColor: colors.primary,
            paddingVertical: HEIGHT * 0.015,
            borderRadius: 50,
          }}
          containerStyle={{
            borderRadius: 50,
            width: '80%',
          }}
        />
      </View>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => ({
  FdCart: state.FdCartReducer.items,
  FdTotal: state.FdCartReducer.totalAmount,
  FdFavs: state.FdToggleFav,
});

export default connect(mapStateToProps, {
  FdremoveCartAction,
  FdaddCartAction,
  FdsetCurrentProductAction,
  FdsetFavAction,
  FdremoveFavAction,
  FdresetCart,
})(Cart);
