import { View, Text, StyleSheet } from "react-native";

export default function MoreScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>⚙️ Mais</Text>
            <Text>Aqui você encontrará Credo Apostólico e Configurações.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
