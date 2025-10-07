import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

interface MenuButtonProps {
    label: string;
    route: string;
}

export default function MenuButton({ label, route }: MenuButtonProps) {
    const router = useRouter();

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => router.push(route)}
        >
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1E293B",
        marginBottom: 30,
    },
    button: {
        backgroundColor: "#055c43",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});
