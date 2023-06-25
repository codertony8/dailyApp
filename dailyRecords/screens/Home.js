import { Platform, ScrollView, StatusBar, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import EmployeeBox from "../components/EmployeeBox";
import { design, palette, employees as employeeCon, sites as sitesCon } from "../constants";
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import SiteBox from "../components/SiteBox";
import Option from "../components/Option";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation }) => {
    const [showAddOption, setShowAddOption] = useState(false)
    const [employees, setEmployees] = useState([])
    const [sites, setSites] = useState([])
    const handleShowOption = () => {
        setShowAddOption(!showAddOption)
    }

    const isFocused = useIsFocused()


    const getEmployees = async () => {
        const list = await AsyncStorage.getItem("@employees")
        const listJson = JSON.parse(list)
        setEmployees(listJson)
    }

    const getSites = async () => {
        const list = await AsyncStorage.getItem("@sites")
        const listJSON = await JSON.parse(list)
        setSites(listJSON)
    }


    useEffect(() => {
        if (isFocused) {
            getEmployees()
            getSites()

        }
        if(!isFocused) {
            setShowAddOption(false)
        }
    }, [isFocused])


    useEffect(() => {
        getEmployees()
        getSites()
    }, [])
    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={palette.primary}
                barStyle={'dark-content'}
            />
            <View style={styles.headerContainer}>
                <Image style={styles.ownerProfile} source={{ width: 58, height: 58, uri: 'https://fixthephoto.com/blog/images/uikit_slider/male-photo-edited-by-fixthephoto-service_1649799173.jpg' }}>
                </Image>
                {/* details */}
                <View style={{ flex: 1 }}>
                    {/* name */}
                    {/* user name should be dynamic  */}
                    <Text style={styles.userName}>
                        Nimbaram Suthar
                    </Text >
                    {/* designation */}
                    <Text style={styles.userDesignation}>
                        Contractor
                    </Text>
                </View>
                <TouchableOpacity activeOpacity={0.6} onPress={handleShowOption}>

                    <Ionicons style={styles.headerIcon} name="ios-add-circle-outline" color={palette.textColor} size={30} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate("Settings")}>

                    <Feather style={styles.headerIcon} name="settings" color={palette.textColor} size={25} />
                </TouchableOpacity>

            </View>
            <ScrollView style={styles.HomeSection} >

                {
                    showAddOption &&
                    <Option navigation={navigation} />
                }


                {/* dynamic employee */}
                <Text style={styles.sectionHeading}>Employees </Text>
                {
                    employees ?
                        employees?.map((employee) => <EmployeeBox id={employee.id} name={employee.name} profile={employee.profile} key={employee.id} currently={employee.currently} navigation={navigation} />)
                        :
                        employeeCon?.map((employee) => <EmployeeBox id={employee.id} name={employee.name} profile={employee.profile} key={employee.id} currently={employee.currently} navigation={navigation} />)

                }



                <Text style={styles.sectionHeading}>Sites  </Text>

                {/* for sites */}
                {sites ?
                    sites.map(site => <SiteBox id={site.id} key={site.id} client_name={site.client_name} address={site.address} state={site.state} navigation={navigation} />)
                    :
                    sitesCon.map(site => <SiteBox id={site.id} key={site.id} architect={site.Architect} client_name={site.client_name} address={site.address} state={site.state} navigation={navigation}  />)

                }
            </ScrollView>
        </View >
    )

}
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.secondary,
        width: "100%"
    },
    headerContainer: {
        width: "100%",
        // height:70,
        borderBottomColor: palette.borderColor,
        borderBottomWidth: 1,
        backgroundColor: palette.primary,
        padding: design.paddingSize,
        flexDirection: "row",
        alignItems: "center"
    },
    headerIcon: {
        marginRight: 10
    },
    ownerProfile: {
        resizeMode: "contain",
        borderRadius: design.borderRadiusProfile,
        marginRight: 10
    },
    userName: {
        fontSize: 20,
        fontFamily: "Inter_600SemiBold"
    },
    userDesignation: {
        fontFamily: "Inter_300Light",
        fontSize: 15
    },
    HomeSection: {
        padding: design.paddingSize,
        flex: 1

    },
    sectionHeading: {
        fontSize: 18,
        fontFamily: "Inter_400Regular",
        marginBottom: 10

    },
    SectionBox: {
        backgroundColor: palette.primary,
        borderWidth: 1,
        borderColor: palette.borderColor,
        width: "100%",
        borderRadius: design.borderRadiusProfile,
        minHeight: 100,
        padding: design.paddingSize,
        flexDirection: "row",
        marginBottom: 10
    },
    EmployeeDetails: {
    },
    employeeName: {
        fontSize: 20,
        fontFamily: "Inter_500Medium"
    },
    atPlace: {
        fontSize: 15
        ,
        fontFamily: "Inter_400Regular"
    }
})

const componentStyles = StyleSheet.create({
    badge: {
        padding: 3,
        borderRadius: 9,
        alignItems: "center",



    },
    badgeText: {
        fontSize: 15,
        fontFamily: "Inter_400Regular",
        color: palette.successTextColor,

    }
})