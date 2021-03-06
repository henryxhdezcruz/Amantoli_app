import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { getSearchHistoryApi } from '../../api/search';
import { map } from "lodash";
import AwesomeIcon from "react-native-vector-icons/FontAwesome"
import colors from '../../styles/colors';

export default function SearchHistory(props) {

    const {showHistory, containerHeight, onSearch} = props;

    const [history, setHistory] = useState(null)

    useEffect(() => {
        if(showHistory) {
            (async () => {
                const response = await getSearchHistoryApi();
                setHistory(response);
            })()
        }
    }, [showHistory])
    

    return (
        
        <View 
        
        /*style={[
            showHistory ? styles.history : styles.hidden,
            { top: containerHeight },
          ]}*/
        >
            {history &&
                map(history, (item, index) => (
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={() => onSearch(item.search)}
                    >
                        <View style={styles.historyItem}>
                            <View style={styles.row}>
                                <AwesomeIcon name="history" size={16} />
                                <Text style={styles.text}>
                                    {item.search}
                                </Text>
                            </View>
                            <AwesomeIcon name="chevron-right" size={16} />
                        </View>
                    </TouchableWithoutFeedback>
                ))}
        </View>
    )
}

const styles = StyleSheet.create({
    hidden:{
        display: "none"
    },
    history:{
        position: "absolute",
        //zIndex: 3,
        backgroundColor: "white",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height 
    },
    historyItem:{
        paddingVertical: 15,
        paddingHorizontal: 20,
        /*borderWidth: 0.2,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,*/
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white"
    },
    text:{
        color: "#64748B",
        fontSize: 15,
        marginLeft: 15
        //fontWeight: "bold"
    },
    row:{
        flexDirection: "row",
        alignItems: "center",
    }
})
