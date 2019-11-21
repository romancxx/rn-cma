import React, { Component } from 'react';
import { Layout, Text } from 'react-native-ui-kitten';
import { IAppState } from '@states/reducer';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntl } from 'react-intl';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import InputBox from '@components/Workout/InputBox';
import InputSelect from '@components/Workout/InputSelect';
import { durationChoices } from '@states/reducers/workout';
import { FormikProps, withFormik } from 'formik';
import * as Yup from "yup";

interface Props {
    intl: InjectedIntl;
}

interface State {
    title: string;
    selectedDuration: any;
    duration: string;
}

class TitleAndDurationComponent extends Component<Props & FormikProps<State>> {

    render() {
        const {
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            errors,
            setFieldTouched, } = this.props;
        return (
            <Layout style={{
                paddingHorizontal: wp(5),
                paddingBottom: hp(2),
                borderRadius: hp(1),
            }}>
                <InputBox
                    label="Name your workout"
                    value={values.title}
                    onChangeText={handleChange('title')}
                    error={errors.title}
                    onBlur={() => setFieldTouched('title')}
                    touched={touched.title}
                />
                <InputSelect
                    selectedOption={durationChoices[0]}
                    choices={durationChoices}
                    onSelect={handleChange('selectedDuration')}
                    value={values.duration}
                    onChangeText={handleChange('duration')}
                    onBlur={() => setFieldTouched('duration')}
                    error={errors.duration}
                    touched={touched.duration}
                    placeholder="25"
                    label="Duration of your workout" />
            </Layout>
        )
    }
}

export const TitleAndDuration = withFormik<Props, State>({

    validationSchema: Yup.object().shape({
        title: Yup.string().required("Field required"),
    })

    // handleSubmit(values: State, { props }) {
    //     const { navigation, newWorkout } = props;
    //     const updatedValues = { ...values.workout }
    //     console.log('object')
    //     console.log(updatedValues)
    //     updatedValues.title = values.title;
    //     console.log(values.selectedDuration)
    //     if (values.selectedDuration !== undefined && values.duration !== "") {
    //         updatedValues.duration = {
    //             unit: values.selectedDuration.text,
    //             value: values.duration
    //         }
    //     }

    //     newWorkout(updatedValues);
    //     navigation.goBack()
    // }
})(TitleAndDurationComponent);

const mapStateToProps = (state: IAppState) => ({});

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(injectIntl(TitleAndDuration));