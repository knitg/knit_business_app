import React, {useEffect, useState} from 'react'; 
 
import { SafeAreaView, 
    RefreshControl, FlatList, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';

const FlatCardsList = (props) => {

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
                const images = [];
                item.images.forEach(obj => {
                  images.push(obj.image);
                });
                return <ProductCard listItems={props.stitch_list} key={item.id} type={item} images={images}
                                editIconClick={() => editActionItem(item)}
                                trashIconClick={() => deleteActionItem(item)}
                        ></ProductCard>
              } }
              keyExtractor={item => item.id.toString()}
              refreshing = {refreshing}
              onRefresh = {() => handleRefresh()}
            />
          </SafeAreaView> 
    )
}

export default FlatCardsList;
