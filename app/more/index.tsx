import {StyleSheet, View} from "react-native";
import MenuButton from "~/app/components/MenuButton";


export default function MoreScreen() {
    return (
        <View style={styles.container}>

            <MenuButton label="📖 Sobre mim" route="/me" />

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
})