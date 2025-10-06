import { View, Text, StyleSheet } from "react-native";

export default function ConfessionScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>📜 Confissão de Fé de Westminster</Text>
            <Text>Aqui estarão os capítulos e artigos da confissão.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
