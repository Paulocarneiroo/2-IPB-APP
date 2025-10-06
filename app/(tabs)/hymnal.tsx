import { View, Text, StyleSheet } from "react-native";

export default function HymnalScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎵 Hinário Novo Cântico</Text>
            <Text>Em breve: letras, cifras e busca por hinos.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
