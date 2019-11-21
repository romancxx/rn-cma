import React, { Component } from 'react';
import { Layout, Text, withStyles, ThemedComponentProps, ThemeType, List } from 'react-native-ui-kitten';
import { IAppState } from '@states/reducer';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntl } from 'react-intl';
import SafeAreaView from 'react-native-safe-area-view';
import Header from '@components/Header';
import { ArrowIosBackFill } from '@assets/icons';
import NavigationService from '@services/navigation';
import { IWorkout } from '@states/reducers/workout';
import { NavigationScreenProps, NavigationParams } from 'react-navigation';
import { CardSet } from '@components/Workout/CardSet';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface PropsComponent {
    intl: InjectedIntl;
    workoutData: IWorkout;
}

interface State { }

type Props = ThemedComponentProps & PropsComponent;

class ViewWorkoutComponent extends Component<Props & NavigationScreenProps<NavigationParams>, State> {

    onBack = () => {
        NavigationService.goBack();
    }

    renderSet = (info: any) => {
        return (
            <Layout style={{ marginTop: hp(2), backgroundColor: "transparent" }}>
                <CardSet
                    setInfo={info.item}
                />
            </Layout>
        )
    }

    render() {
        const {
            navigation: {
                state: { params },
            },
            themedStyle,
        } = this.props;

        const workoutData: IWorkout = params && params.workoutData;
        return (
            <SafeAreaView style={themedStyle.container}>
                <Header
                    title={workoutData.title}
                    iconLeft={ArrowIosBackFill}
                    iconLeftOnClick={this.onBack} />
                <Layout style={themedStyle.contentContainer}>
                    <List
                        data={workoutData.workoutInfo}
                        renderItem={this.renderSet}
                    />
                </Layout>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state: IAppState) => ({});

const mapDispatchToProps = {}

const ViewWorkout = withStyles(ViewWorkoutComponent, (theme: ThemeType) => ({
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
    mapDispatchToProps)(injectIntl(ViewWorkout));