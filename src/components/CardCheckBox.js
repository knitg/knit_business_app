import React from 'react'

import Checkbox from "react-native-modest-checkbox";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Container, Header, Content, Card, CardItem, Text, Body, View } from 'native-base';


export const CardCheckBox = (props) => {
    return (
        <View> 
            {props.userTypeList && props.userTypeList.length > 0
                    ? props.userTypeList.map((usertype, index) => (

                        <Card  key={index}> 
                            <CardItem>
                            <Body>
                                <Checkbox
                                   
                                    containerStyle={{ marginHorizontal: 30 }}
                                    labelStyle={{ padding: 10 }}
                                    checked={props.formikProps.values.user_type.includes(
                                        usertype
                                    )}
                                    checkedComponent={
                                        <MaterialCommunityIcons
                                        name="check-all"
                                        size={50}
                                        color="green"
                                        />
                                    }
                                    uncheckedComponent={
                                        <MaterialCommunityIcons
                                        name="checkbox-blank-outline"
                                        size={50}
                                        color={props.formikProps.errors["user_type"] ? '#FF0000' : '#0564A4'}
                                        />
                                    }
                                    onChange={checked => {
                                        const selectedUserTypes =
                                        props.formikProps.values.user_type;
                                        if (selectedUserTypes.includes(usertype)) {
                                        selectedUserTypes.splice(
                                            selectedUserTypes.indexOf(usertype),
                                            1
                                        );
                                        } else {
                                        selectedUserTypes.push(usertype);
                                        }
                                        props.formikProps.setFieldValue(
                                        "user_type",
                                        selectedUserTypes
                                        );
                                    }}
                                    label={usertype.user_type}
                                    />
                                
                            </Body>
                            </CardItem> 
                        </Card>))
                        
                        : null}
                  {props.formikProps.touched["user_type"] &&
                  props.formikProps.errors["user_type"] ? (
                    <Text style={{ color: "red" }}>
                      {props.formikProps.touched["user_type"] &&
                        props.formikProps.errors["user_type"]}
                    </Text>
                  ) : null}
        </View>
    )
}
