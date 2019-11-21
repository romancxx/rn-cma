import React, { Component } from 'react'
import { Layout, Text, ThemeType, withStyles, ThemedComponentProps, List, Button, IconProps, Icon, Modal, Input } from 'react-native-ui-kitten';
import Header from '@components/Header';
import {
    ArrowIosBackFill
} from '@assets/icons';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
    ScrollView,
} from 'react-navigation';
import { newWorkout } from '@states/actions/workout';

import { CardSet } from '@components/Workout/CardSet';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ISetInfo, IWorkoutState, IWorkout, IExerciceInfo, InitialDuration, durationChoices } from '@states/reducers/workout';
import { IAppState } from '@states/reducer';
import { connect } from 'react-redux';

import uuid from 'react-native-uuid';
import { CreateExerciceFormValues } from '@components/Workout/CreateExerciceForm';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import SpinnerButton from '@components/SpinnerButton';
import InputSelect from '@components/Workout/InputSelect';
import { withFormik, FormikProps } from 'formik';
import InputBox from '@components/Workout/InputBox';
import { TitleAndDuration } from './components/TitleAndDuration';
import NavigationSerivce from '@services/navigation';

export interface State {
    modaleVisible: boolean,
    setTitle: string;
    workout: IWorkout;
    loading: boolean;
}


interface PropsComponent {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    // workout: IWorkoutState;
    newWorkout(workout: IWorkout): any;
}

type Props = ThemedComponentProps & PropsComponent;

// const findChoiceInArray = (array: any[], value: string): number => {
//     var number: number = 0;
//     array.forEach((element, index) => {
//         if (element.text === value) {
//             number = 1
//         }
//     });
//     return number
// }

class AddWorkoutComponent extends Component<Props, State> {
    state: State = {
        modaleVisible: false,
        setTitle: "",
        workout: { workoutInfo: [], title: "My Workout", duration: InitialDuration },
        loading: false,
    }

    onBack = () => {
        this.props.navigation.goBack();
    };

    renderSet = (info: any) => {
        return (
            <Layout style={{ marginTop: hp(2), backgroundColor: "transparent" }}>
                <CardSet
                    setInfo={info.item}
                    addExercice={this.addExerciceToSet}
                    navigation={this.props.navigation}
                    editTitle={this.editTitle}
                    editExercice={this.editExercice} />
            </Layout>
        )
    }
    editExercice = (id: string, form: CreateExerciceFormValues) => {
        const workoutUpdated = { ...this.state.workout }

        workoutUpdated.workoutInfo.forEach(element => {
            element.exercices.forEach(elementEx => {
                if (elementEx.id === id) {
                    elementEx.title = form.name;
                    elementEx.reps = form.reps;
                    elementEx.sets = form.sets;
                    elementEx.duration = {
                        unit: form.selectedDuration.text,
                        value: form.duration
                    }
                    elementEx.weight = {
                        unit: form.selectedWeight.text,
                        value: form.weight
                    }
                    elementEx.rest = {
                        unit: form.selectedRest.text,
                        value: form.rest
                    }
                }
            });
        });
        this.setState({
            workout: workoutUpdated
        })
    }

    renderPlusIcon() {
        return <Icon
            name="plus"
            fill="#3366ff"
            height={hp(3)}
            width={hp(3)} />;
    }

    createSet = () => {
        const workoutUpdated = { ...this.state.workout }
        const newSet: ISetInfo = {
            title: "Round " + this.state.workout.workoutInfo.length,
            exercices: [],
            id: uuid.v1(),
        }
        workoutUpdated.workoutInfo.push(newSet)

        this.setState({
            ...this.state,
            modaleVisible: false,
            workout: workoutUpdated
        })
        console.log(this.state.workout)
    }

    editTitle = (id: string, value: string) => {
        const workoutUpdated = { ...this.state.workout }
        workoutUpdated.workoutInfo.forEach(element => {
            if (element.id === id) {
                element.title = value;
            }
        });
        this.setState({
            workout: workoutUpdated
        })
    }

    addExerciceToSet = (id: string, data: CreateExerciceFormValues) => {
        const workoutUpdated = { ...this.state.workout }
        workoutUpdated.workoutInfo.forEach(element => {
            if (element.id === id) {
                element.exercices.push({
                    title: data.name,
                    duration: { unit: data.selectedDuration.text, value: data.duration },
                    weight: { unit: data.selectedWeight.text, value: data.weight },
                    sets: data.sets,
                    reps: data.reps,
                    rest: { unit: data.selectedRest.text, value: data.rest },
                    id: uuid.v1(),
                })
            }
        })
        this.setState({
            workout: workoutUpdated
        })
    }


    onSave = () => {
        this.props.newWorkout(this.state.workout)
        NavigationSerivce.goBack()
    } 



    render() {
        const {
            themedStyle } = this.props;
        const {
            workout,
            loading
        } = this.state;
        return (
            <Layout style={themedStyle.container}>
                <Header title="New workout" iconLeft={ArrowIosBackFill} iconLeftOnClick={this.onBack} />
                <ScrollView style={themedStyle.container}>
                    <Layout style={themedStyle.contentContainer}>

                        <TitleAndDuration/>

                        {workout.workoutInfo.length !== 0 ?
                            <List
                                data={workout.workoutInfo}
                                renderItem={this.renderSet}
                            /> :
                            <Text
                                appearance="hint"
                                style={{ textAlign: "center" }}>
                                No set created yet !
                            </Text>}
                        <Button
                            style={themedStyle.buttonAdd}
                            size="small"
                            appearance="outline"
                            onPress={() => this.createSet()}
                            // status="warning"
                            icon={this.renderPlusIcon}
                            textStyle={{ fontSize: 15 }}>
                        </Button>
                    </Layout>
                </ScrollView>
                <SpinnerButton
                    style={themedStyle.buttonSave}
                    onPress={this.onSave}
                    text="SAVE"
                    loading={loading} />
            </Layout>
        )
    }
}

const mapStateToProps = (state: IAppState) => ({
    // workout: state.workout,
});

const mapDispatchToProps = {
    newWorkout,
}


const AddWorkout = withStyles(AddWorkoutComponent, (theme: ThemeType) => ({
    container: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2'],
    },
    contentContainer: {
        backgroundColor: "transparent",
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    buttonAdd: {
        borderRadius: wp(11),
        width: wp(11),
        height: wp(11),
        alignSelf: "center",
        marginTop: hp(3)
    },
    buttonSave: {
        width: wp(100),
        height: hp(7),
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: wp(100),
        height: hp(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: theme['text-basic-color'],
        fontSize: hp(2.8),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: hp(3),
    }
}));



export default connect(
    mapStateToProps,
    mapDispatchToProps)(AddWorkout);

