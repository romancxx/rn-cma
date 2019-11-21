import React, { Component } from 'react'
import { Layout, Text, Button, Icon, ThemeType, withStyles, ThemedComponentProps, List } from 'react-native-ui-kitten';
import { SafeAreaView, StyleSheet, Linking } from 'react-native';
import { injectIntl, InjectedIntl } from 'react-intl';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
    ScrollView,
} from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Header from '@components/Header';
import { PlusIcon } from '@components/Icons';
import { IWorkoutState, IWorkout } from '@states/reducers/workout';
import { connect } from 'react-redux';
import { IAppState } from '@states/reducer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Workout from '@screens/BottomTab/components/Workout';
import NavigationService from '@services/navigation'

interface IPropsHome {
    intl: InjectedIntl
    workout: IWorkoutState;
}

type IProps = ThemedComponentProps & IPropsHome;


class HomeComponent extends Component<IProps> {

    onPlus = () => {
        NavigationService.navigate('AddWorkout');
    };

    openWorkout = (workout: any) => {
        // console.log(workout)
        NavigationService.navigate('ViewWorkout', {workoutData:workout.item})
    }

    renderSet = (item: any) => {
        // console.log("item")
        // console.log(item)
        return (
            <TouchableOpacity
                onPress={() => this.openWorkout(item)}>
                <Workout data={item.item}/>
            </TouchableOpacity>
        )
    }

    render() {
        const { intl, themedStyle, workout } = this.props;
        return (
            <Layout style={{ flex: 1 }}>
                <Header
                    title={intl.formatMessage({ id: "home.title" })}
                    iconRight={PlusIcon}
                    iconRightOnClick={this.onPlus}
                />


                <ScrollView style={themedStyle.container}>
                    <Layout style={themedStyle.contentContainer}>
                        {workout.workouts.length !== 0 ?
                            <List
                                data={workout.workouts}
                                renderItem={this.renderSet}
                            /> : <Text appearance="hint" style={{ textAlign: "center" }}>
                                No workout created yet !
                            </Text>}
                    </Layout>
                </ScrollView>
            </Layout>


        )
    }
}

const mapStateToProps = (state: IAppState) => ({
    workout: state.workout,
});

const mapDispatchToProps = {
}

const Home = withStyles(HomeComponent, (theme: ThemeType) => ({
    container: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2'],

    },
    contentContainer: {
        backgroundColor: "transparent",
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
}));



export default connect(
    mapStateToProps,
    mapDispatchToProps)(injectIntl(Home));