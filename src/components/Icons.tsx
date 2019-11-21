import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-ui-kitten';
import React from 'react'
// import { IconElement } from '@assets/icons/icon';


export const PlusIcon = (style:any)  => (
    <Icon name='plus' width={wp(7)} height={hp(7)} fill="#fff" {...style}/>
);