import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { globalstyles } from '../constants/styles'
import Header from '../components/Header'
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react'
import { NavigationHelpersContext } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { timeline } from '../constants';


const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
export default Day = ({navigation,route}) => {
    const [attendance, setAttendance] = useState("present")
    const [date,setDate]=useState("")
    const [storage,setStorage] =useState([])
    const day = route.params.day
    const employee = route.params.employee

    useEffect(() => {
        setDate(day.dateString)
    },[day])

    const getDayBgColor = () => {
        return attendance == "present" ? timeline.present : timeline.absent
    }

    const handleSaveDay =() =>{
        navigation.goBack()

        let data= storage
        let newData = { ...data, [date]: { disable: false, color: getDayBgColor(), startingDay: true, endingDay: true, textColor: "white" }}
        
        addDayToStorage(newData)
    }

    const addDayToStorage = async (day) => {
        const location= `@days-${employee}`
        const dayString = JSON.stringify(day)
        await AsyncStorage.setItem(location,dayString)
    }

    const getDayData = async () => {
        const location= `@days-${employee}`
        const data = await AsyncStorage.getItem(location)
        const dataJson = JSON.parse(data)
        setStorage(dataJson)
    }


    useEffect(() => {
        getDayData()
    },[])




    return (
        <View style={globalstyles.container}>
            <Header title={date} navigation={navigation} />
            <View style={globalstyles.Section}>

                <View style={globalstyles.box}>
                    <TextInput required onChangeText={setAttendance} placeholder="Attendance"></TextInput>
                    <Picker
                        selectedValue={attendance}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => setAttendance(itemValue)}
                    >
                        <Picker.Item label="Present" value="present" />
                        <Picker.Item label="Absent" value="absent" />
                    </Picker>
                </View>
                {/* <View style={globalstyles.box}>
                    <TextInput onChangeText={setSite} placeholder="Site Name"></TextInput>
                </View> */}

                {/* <View style={globalstyles.box}>
                    <TextInput onChangeText={setTime} placeholder="Time"></TextInput>
                </View> */}
                <TouchableOpacity activeOpacity={0.8} style={globalstyles.button} onPress={handleSaveDay} >
                    <Text style={globalstyles.buttonText}>
                        Save Day
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

