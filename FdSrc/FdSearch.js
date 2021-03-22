/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import WrapperScreen from '../FdComp/FdWrapperScreen';
import {H_W} from '../FdComp/FdDim';
import NavigationRef from '../FdComp/FdRefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Data from '../FdData';
import {connect} from 'react-redux';
import {FdsetCurrentProductAction} from '../FdRedux/FdActions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FdSearchBar from '../FdComp/FdSearchBar';
import UseHeader from '../FdComp/FdHeader';
import {FdHorizontalTile} from './FdHome';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const RenderSearchedResult = () => {
    var SearchedItems = Data.product.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Nothing Found...
      </Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const FdGoToSingleProduct = (item) => {
    props.FdsetCurrentProductAction(item);
    NavigationRef.Navigate('FdSP');
  };

  const CardRender = (Arr) => {
    return Arr.map((item, index) => (
      <FdHorizontalTile
        key={index}
        item={item}
        FdGoToSingleProduct={FdGoToSingleProduct}
      />
    ));
  };
  const FdGoBack = () => NavigationRef.GoBack();

  const changeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Entypo}
        leftIconName="chevron-left"
        leftIconAction={FdGoBack}
        rightIconAction={() => props.FdresetCart()}
        leftIconColor="black"
        Title={<Text style={{color: 'black', fontSize: 22}}>Search</Text>}
      />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={{width: '85%', margin: 'auto'}}>
          <FdSearchBar changeSearchText={changeSearchText} />
        </View>
      </View>
      <KeyboardAwareScrollView
        style={{
          flex: 1,
        }}>
        {searchText !== '' ? RenderSearchedResult() : CardRender(Data.product)}
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => ({
  FdFavs: state.FdToggleFav,
});

export default connect(mapStateToProps, {
  FdsetCurrentProductAction,
})(Search);
