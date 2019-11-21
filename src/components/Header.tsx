import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { TopNavigation, TopNavigationAction } from 'react-native-ui-kitten';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    withNavigation,
    NavigationInjectedProps,
} from 'react-navigation';

interface IHeaderProps {
    title: string;
    iconRight?: any
    iconLeft?: any
    iconLeftOnClick?: any
    iconRightOnClick?: any;
}

type IProps = IHeaderProps & NavigationInjectedProps;

class Header extends Component<IProps> {

    renderLeftControl() {
        const { iconLeft = null, iconLeftOnClick } = this.props
        if (iconLeft) {
            return (
                <TopNavigationAction
                    icon={iconLeft}
                    onPress={iconLeftOnClick}
                />
            )
        }

    }
    renderRightControl() {
        const { iconRight = null, iconRightOnClick } = this.props
        if (iconRight) {
            return (
                <TopNavigationAction
                    icon={iconRight}
                    onPress={iconRightOnClick}
                />
            )
        }
    }

    render() {
        const { title } = this.props
        return (
            <SafeAreaView>
                <TopNavigation
                    title={title}
                    titleStyle={{ fontSize: wp(5) }}
                    alignment='center'
                    leftControl={this.renderLeftControl()}
                    rightControls={this.renderRightControl()}
                />
            </SafeAreaView>
        )
    }
}

export default withNavigation(Header)