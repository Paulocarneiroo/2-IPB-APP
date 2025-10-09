import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function MoreScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.cardButton}
                activeOpacity={0.8}
                onPress={() => router.push("/me")}
            >
                <MaterialCommunityIcons
                    name="account-circle-outline"
                    size={36}
                    color="#4b3f2f"
                    style={styles.icon}
                />
                <Text style={styles.label}>Sobre mim</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f5f0", // tom de pergaminho
        padding: 20,
    },
    cardButton: {
        width: 220,
        height: 100,
        backgroundColor: "#fff",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4, // sombra Android
        shadowColor: "#000", // sombra iOS
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: "#e0d8c3", // tom bege leve
    },
    icon: {
        marginBottom: 8,
    },
    label: {
        fontSize: 18,
        fontWeight: "600",
        color: "#4b3f2f",
        fontFamily: "serif",
    },
});
