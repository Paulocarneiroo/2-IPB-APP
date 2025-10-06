import { View, Text, StyleSheet } from "react-native";

export default function BibleScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>📖 Bíblia</Text>
            <Text>Aqui você poderá ler a Bíblia completa.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
