import React, { useState, useEffect } from 'react';
import {
    View, Text, SafeAreaView, ScrollView, TextInput, Alert
} from 'react-native';
import { db } from '../config/config';
import { Button, Card } from 'react-native-elements';

ViewData = () => {
    let dataFirebase = db.ref('items');
    const [data, setData] = useState();
    const [key, setKey] = useState();
    let [name, setName] = useState("");

    const deleteData = (key) => {

        dataFirebase.orderByChild('name').equalTo(key).once('value', snapshot => {
            const updates = {};
            snapshot.forEach(child => updates[child.key] = null);
            dataFirebase.update(updates);
        }).then(() => {
            console.log("Data successfully deleted!");

        }).catch((error) => {
            console.error("Error removing document: ", error);

        });
    }

    const updateItem = (id,param) => {
        console.log('Ini keynya: ' + id);
        console.log('Param: ' + param);
        let dataUpdate = db.ref('items/' + id + '/' + 'name');
        console.log(dataUpdate.orderByChild('name'));
        
        dataFirebase.orderByChild('name').equalTo(param).once('value', snapshot => {
            const updates = {};
            snapshot.forEach(function (child) {
                updates[child.key + '/' + 'name'] = name;
                console.log('key dalam : ' + child.key);
                console.log('val dalam : ' + child.val()['name']);
            });
            dataFirebase.update(updates);
        }).then(() => {
            console.log("Data successfully Updated!");

        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }


    let handleUpdate = (id, name) => {
        updateItem(id, name);
        Alert.alert('Data Sudah Di Update ');
    }

    let handleDelete = (key) => {
        deleteData(key);
        Alert.alert('Data ' + key + ' Sudah di Delete!')
    }

    
    useEffect(() => {
        dataFirebase.on('value', snapshot => {
            let data = snapshot.val();
            let items = Object.values(data);
            let key = Object.keys(data);
            setData(items);
            setKey(key);
        })
    }, [setData], [setKey]);
    let test = [];
    if (data != null) {
        for (let i = 0; i < data.length; i++) {
            // test.push(<Text>{data[i].name}</Text>);
            test.push(<Card
                title={data[i].name}>
                <TextInput placeholder="Masukkan Nama"
                    onChangeText={value => setName(value)}></TextInput>
                <View style={{ marginTop: 10 }}>
                    <Button onPress={() => handleUpdate(key[i], data[i].name)}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'grey' }}
                        title='Update' />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Button onPress={() => handleDelete(data[i].name)}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'red' }}
                        title='delete' />
                </View>
            </Card>)
        }
    } else {
        test.push(<Text>loading...</Text>);
    }

    return (

        <SafeAreaView >
            <ScrollView>
                {test}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ViewData;