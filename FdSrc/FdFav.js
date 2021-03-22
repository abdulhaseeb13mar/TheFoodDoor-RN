/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native';
import {
  FdremoveFavAction,
  FdsetFavAction,
  FdsetCurrentProductAction,
} from '../FdRedux/FdActions';
import Entypo from 'react-native-vector-icons/Entypo';
import UseHeader from '../FdComp/FdHeader';
import WrapperScreen from '../FdComp/FdWrapperScreen';
import NavigationRef from '../FdComp/FdRefNavigation';
import {FdHorizontalTile} from './FdHome';

const FdFavourites = (props) => {
  const FdGoToSingleProduct = (item) => {
    props.FdsetCurrentProductAction(item);
    NavigationRef.Navigate('FdSP');
  };

  const FdGoBack = () => NavigationRef.Navigate('FdHome');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Entypo}
        leftIconName="chevron-left"
        leftIconColor="black"
        leftIconAction={FdGoBack}
        Title={
          <Text
            style={{
              color: 'black',
              fontSize: 22,
            }}>
            {props.FdFavs.length} Favourites
          </Text>
        }
      />
      {props.FdFavs.map((item, index) => (
        <FdHorizontalTile
          key={index}
          item={item}
          FdGoToSingleProduct={FdGoToSingleProduct}
        />
      ))}
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    FdFavs: state.FdToggleFav,
  };
};

export default connect(mapStateToProps, {
  FdsetFavAction,
  FdsetCurrentProductAction,
  FdremoveFavAction,
})(FdFavourites);
