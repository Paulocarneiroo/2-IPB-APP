import { View, Text, StyleSheet } from "react-native";

export default function CatechismScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>📚 Catecismos</Text>
            <Text>Breve e Maior Catecismo de Westminster.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
