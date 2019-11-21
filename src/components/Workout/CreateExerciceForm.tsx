import React, { Component } from 'react'
import { View } from 'react-native'
import InputBox from './InputBox';
import { Layout, Text } from 'react-native-ui-kitten';
import { FormikProps, withFormik } from 'formik';
import * as Yup from "yup";
import SpinnerButton from '@components/SpinnerButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import InputSelect from './InputSelect';
import { IExerciceInfo, durationChoices, weightChoices } from '@states/reducers/workout';

export interface CreateExerciceFormValues {
    name: string;
    weight: string;
    duration: string;
    rest: string;
    sets: string;
    reps: string;
    selectedDuration: any;
    selectedRest: any;
    selectedWeight: any;
}


interface FormProps {
    onSubmit(form: CreateExerciceFormValues): void;
    loading: boolean;
    edit?(id: string, exercice: CreateExerciceFormValues): void;
    exercice?: IExerciceInfo;
}
// type Props = PropsForm & FormikProps<CreateExerciceFormValues>;


const findChoiceInArray = (array: any[], value: string): number => {
    var number:number = 0;
    array.forEach((element, index) => {
        if (element.text === value) {
            number = 1
        }
    });
    return number
}

export default class CreateExerciceFormComponent extends Component<FormProps & FormikProps<CreateExerciceFormValues>> {

    componentDidMount() {
    }

    render() {
        const {
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            loading,
            touched,
            errors,
            setFieldTouched,
        } = this.props;
        return (
            <View>
                <InputBox
                    label="What's your exercice ?"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    error={errors.name}
                    onBlur={() => setFieldTouched('name')}
                    touched={touched.name}
                />
                <Layout style={{ flexDirection: 'row', width: wp(80) }}>
                    <InputBox
                        label="How many sets ?"
                        value={values.sets}
                        onChangeText={handleChange('sets')}
                        onBlur={() => setFieldTouched('sets')}
                        error={errors.sets}
                        touched={touched.sets}
                        style={{ width: wp(30) }} />
                    <InputBox
                        label="Repetition ?"
                        value={values.reps}
                        onChangeText={handleChange('reps')}
                        onBlur={() => setFieldTouched('reps')}
                        error={errors.reps}
                        touched={touched.reps}
                        style={{
                            width: wp(30),
                            marginLeft: wp(10)
                        }} />
                </Layout>

                <InputSelect
                    selectedOption={values.selectedRest}
                    choices={durationChoices}
                    onSelect={handleChange('selectedDuration')}
                    value={values.rest}
                    onChangeText={handleChange('rest')}
                    onBlur={() => setFieldTouched('rest')}
                    error={errors.rest}
                    touched={touched.rest}
                    placeholder="2"
                    label="Rest between reps ?" />

                <InputSelect
                    selectedOption={values.selectedWeight}
                    choices={weightChoices}
                    onSelect={handleChange('selectedWeight')}
                    value={values.weight}
                    onChangeText={handleChange('weight')}
                    onBlur={() => setFieldTouched('weight')}
                    error={errors.weight}
                    touched={touched.weight}
                    placeholder="20"
                    label="Using weight ?" />
                <InputSelect
                    selectedOption={values.selectedDuration}
                    choices={durationChoices}
                    onSelect={handleChange('selectedDuration')}
                    value={values.duration}
                    onChangeText={handleChange('duration')}
                    onBlur={() => setFieldTouched('duration')}
                    error={errors.duration}
                    touched={touched.duration}
                    placeholder="30"
                    label="During a time ?" />

                <SpinnerButton
                    style={{ marginTop: hp(5) }}
                    loading={loading}
                    text="Add to set"
                    onPress={handleSubmit}
                />

            </View>
        )
    }
}

export const CreateExerciceForm = withFormik<FormProps, CreateExerciceFormValues>({
    mapPropsToValues: (props: FormProps) => {
        if (props.exercice) {
            const { title,
                weight = undefined,
                duration = undefined,
                rest = undefined,
                sets = undefined,
                reps = undefined } = props.exercice;
            return ({
                name: title,
                weight: weight ? weight.value : '',
                duration: duration ? duration.value : '',
                rest: rest ? rest.value : '',
                sets: sets ? sets : '',
                reps: reps ? reps : '',
                selectedDuration: duration ? durationChoices[findChoiceInArray(durationChoices, duration.unit)] : durationChoices[0],
                selectedRest: rest ? durationChoices[findChoiceInArray(durationChoices, rest.unit)] : durationChoices[0],
                selectedWeight: weight ? weightChoices[findChoiceInArray(weightChoices, weight.unit)] : weightChoices[0],

            })
        } else {
            return ({
                name: '',
                weight: '',
                duration: '',
                rest: '',
                sets: '',
                reps: '',
                selectedDuration: durationChoices[0],
                selectedWeight: weightChoices[0],
                selectedRest: durationChoices[0],
            })
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Field required"),
    }),

    handleSubmit(values: CreateExerciceFormValues, { props }) {
        if (props.edit && props.exercice) {
            props.edit(props.exercice.id, values);
        } else {
            props.onSubmit(values);
        }
    }
})(CreateExerciceFormComponent);