import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

interface MenuButtonProps {
    label: string;
    route?: string;          // Agora opcional
    onPress?: () => void;    // Nova prop opcional
    icon?: React.ReactNode;
}

export default function MenuButton({ label, route, onPress, icon }: MenuButtonProps) {
    const router = useRouter();

    const handlePress = () => {
        if (onPress) {
            onPress(); // Executa função personalizada
        } else if (route) {
            router.push(route); // Navega para a rota
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <View style={styles.content}>
                {icon && <View style={styles.iconContainer}>{icon}</View>}
                <Text style={styles.text}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        backgroundColor: "#eae4dc",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        marginRight: 12,
    },
    text: {
        fontSize: 16,
        fontWeight: "500",
        color: "#4b3f2f",
    },
});
