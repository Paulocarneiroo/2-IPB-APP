import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import MenuButton from "~/app/components/MenuButton";

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>2° IPB</Text>

            <MenuButton label="📖 Bíblia Sagrada" route="/books" />

            <MenuButton label="🎹 Hinário Novo Canto" route="/books" />

            <MenuButton label="📜Confissão de Fé de Westminster" route="/books" />

            <MenuButton label="📚Catecismo Maior" route="/books" />

            <MenuButton label="➕ Mais" route="/books" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#cad9d4",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1E293B",
        marginBottom: 30,
    }
});
