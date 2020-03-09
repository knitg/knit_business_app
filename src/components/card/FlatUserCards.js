import React, {useEffect, useState} from 'react'; 
 
import { SafeAreaView, RefreshControl, FlatList, StyleSheet, Image, TouchableHighlight } from 'react-native';
import ProductCard from './ProductCard';

import { Card, CardItem, Text, Left, Body, Right, View } from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImageSwiper from "../ImageSwiper";


const FlatUserCards = (props) => {

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setRefreshing(false);
    }, []); 
    
    const handleRefresh = () => {
        console.log(" \n\n\n\n REFRESH Called \n\n\n");
        setRefreshing(true);
        if(props.listMethod) props.listMethod();        
    }
    const editActionItem = (selected) => {
        props.editAction(selected);
    }
    const deleteActionItem = (selected) => {
        props.deleteAction(selected.id);
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <FlatList
              data={props.list}
              renderItem={({ item }) => {
                  console.log("INSIDE RENDER", item);
                const images = [];
                if(item.images && item.images.length >= 1){
                    item.images.forEach(obj => {
                    images.push(obj.image);
                    });
                }
                // return <ProductCard listItems={props.list} key={item.id} type={item} images={images}
                //                 editIconClick={() => editActionItem(item)}
                //                 trashIconClick={() => deleteActionItem(item)}
                //         ></ProductCard>
                return (<Card>
                            <CardItem>
                                <Left>
                                <Body>
                                    <Text>{item.user_type}</Text>
                                    <Text note>{item.description}</Text>
                                </Body>
                                </Left>
                                <Right>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <TouchableHighlight onPress={() => editActionItem(item)}>
                                    <FontAwesome style={{ padding: 10, alignSelf: 'center' }} name="edit" size={32} color="grey"
                                        onPress={props.editIcon}
                                    />
                                    </TouchableHighlight>
                                    <TouchableHighlight onPress={props.deleteAction}>
                                    <FontAwesome style={{ padding: 10, alignSelf: 'center' }} name="trash" size={32} color="red" />
                                    </TouchableHighlight>
                                </View>
                                </Right>
                            </CardItem>
                            { images.length >= 1 ? 
                                <CardItem cardBody >
                                    <ImageSwiper images={images}></ImageSwiper>
                                </CardItem>
                                : <CardItem cardBody>
                                    
                                </CardItem>
                            }
                            </Card>)
              } }
              keyExtractor={(item, index) => index.toString()}
              refreshing = {refreshing}
              onRefresh = {() => handleRefresh()}
            />
          </SafeAreaView> 
    )
}

export default FlatUserCards;
