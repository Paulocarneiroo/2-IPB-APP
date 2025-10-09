import {ScrollView, StyleSheet, View} from "react-native";
import MenuButton from "~/app/components/MenuButton";
import {MaterialCommunityIcons} from "@expo/vector-icons";


export default function MoreScreen() {
    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.menuContainer}
                showsVerticalScrollIndicator={false}
            >
                <MenuButton
                    label="Sobre mim"
                    icon={<MaterialCommunityIcons name="account-circle-outline" size={26} color="#4b3f2f" />}
                    route="/me"
                />
             </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#cad9d4",
    },
    menuContainer: {
        width: "90%",
        alignItems: "center",
        gap: 12,
        paddingBottom: 50,
    },
})