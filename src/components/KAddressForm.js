import React from 'react';
import { View } from 'native-base';
import { TextInput, Text } from 'react-native';


const KAddressForm = ({label, formikKey, formikProps, style, values, onUpdateValue, ...rest}) => {
    const inputStyles = {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 25,
        paddingHorizontal: 25,
        marginBottom: 5,
        borderRadius:5
    }
    if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
        inputStyles.borderColor = 'red';
    }
    return (
        <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
            { label ? (<Text style={{ marginBottom: 3 }}>{label}</Text>) : null }
            
            <TextInput
                style={[inputStyles, style]}
                onChangeText={formikProps.handleChange(formikKey)}
                onChange = {e => {
                    console.log("ON CHANGE ", e);
                    onUpdateValue(formikProps.values[formikKey]);
                }}
                onBlur={formikProps.handleBlur(formikKey)}
                value = {formikProps.values[formikKey]}
                {...rest}
            />
            { 
                (formikProps.touched[formikKey] && formikProps.errors[formikKey]) 
                ? 
                <Text style={{ color: 'red' }} >
                    {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
                </Text>
                :
                null  
              }
        </View>
    )
}

export default KAddressForm
