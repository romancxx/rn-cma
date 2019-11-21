import {
    ImageStyle,
    StyleProp,
} from 'react-native';
import {
    Icon,
    IconElement,
    IconSource,
    RemoteIcon,
} from './icon';

export const ArrowIosBackFill = (style: StyleProp<ImageStyle>): IconElement => {
    const source: IconSource = {
        imageSource: require('./arrow-ios-back.png'),
    };

    return Icon(source, style);
};

export const PlusOutline = (style: StyleProp<ImageStyle>): IconElement => {
    const source: IconSource = {
        imageSource: require('./plus-outline.png'),
    };

    return Icon(source, style);
};

