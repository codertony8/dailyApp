import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { design, palette } from "../constants"

const Option = ({navigation}) => {
    const handleEmployee =() => {
        navigation.navigate("AddEmployee")
    }
    const handleSite =() => {
        navigation.navigate("AddSite")
    }
    return (
        <View style={[styles.container, styles.elevation]}>
            <TouchableOpacity style={styles.optionContainer} onPress={handleEmployee}>
                <Text style={styles.optionText}>
                    Employee
                </Text>
            </TouchableOpacity>
            <View style={styles.seperator}>

            </View>
            <TouchableOpacity style={styles.optionContainer} onPress={handleSite}>
                <Text style={styles.optionText}>
                    Site
                </Text>
            </TouchableOpacity>

        </View>

    )
}
export default Option


const styles = StyleSheet.create({
    container: {
        minWidth: 150,
        backgroundColor: palette.primary,
        borderRadius: design.borderRadius,
        position: "absolute",
        top: 1,
        right: 50,
        borderWidth: 1.5,
        borderColor: palette.borderColor,
        minHeight: 100,
        zIndex: 1,
        padding: 10,
        alignItems: "center",
    },
    elevation: {
        shadowColor: '#D5D5D5',
        elevation: 20,
    },
    optionContainer: {
        width: "100%",
        alignItems: "center",
        margin: 3,
        padding: 5

    },
    optionText: {
        fontSize:18
    },
    seperator: {
        width: "100%",
        height: 1,
        backgroundColor: palette.borderColor
    }
})