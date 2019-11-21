import React, { Component } from 'react'
import { ThemedComponentProps, Button, Layout, Text, InputProps, Select, SelectOptionType } from 'react-native-ui-kitten';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import InputBox from './InputBox';

interface IProps extends InputProps {
    choices:SelectOptionType[],
    selectedOption:any;
    onSelect(field:any):void;
    error?: string;
    touched?: boolean;
    label:string;
}

export default class InputSelect extends Component<IProps> {
    render() {
        const { choices, selectedOption, onSelect, error, touched, label, ...rest } = this.props;
        return (
            <React.Fragment>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: hp(2.2),
                        lineHeight: hp(4)
                    }}>
                    {label}
                    </Text>
                <Layout
                    style={{
                        flexDirection: "row",
                        justifyContent: 'center'
                    }}>
                    <InputBox
                        style={{
                            width: wp(30),
                            marginTop: hp(1)
                        }}
                        {...rest}
                        error={error}
                        touched={touched}
                         />
                    <Select
                        style={{
                            width: wp(30),
                            marginLeft: wp(5),
                            marginTop: hp(0.5)
                        }}
                        data={choices}
                        selectedOption={selectedOption}
                        onSelect={onSelect}
                    />
                </Layout>
            </React.Fragment>
        )
    }
}
