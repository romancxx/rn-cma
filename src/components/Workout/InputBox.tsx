import React, { Component } from 'react'
import { Layout, Text, Input, InputProps } from 'react-native-ui-kitten';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FormikTouched, FormikErrors } from 'formik';

interface IProps extends InputProps {
    error?: string;
    touched?: boolean
    width?: number;
}

export default class InputBox extends Component<IProps> {
    render() {
        const { label, error, touched, ...rest } = this.props
        return (
            <Layout style={styles.container}>
                {label !== undefined ? <Text
                    style={styles.inputTitle}>
                    {label}
                </Text>
                    :
                    <React.Fragment></React.Fragment>
                }
                <Input
                    caption={touched && error ? error : ""}
                    status={touched && error ? 'danger' : ''}
                    // style={{width:wp(width )}}
                    {...rest}
                />
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },

    inputTitle: {
        marginBottom: hp(1),
        fontSize: hp(2.2),
        lineHeight: hp(4)
    },
});
