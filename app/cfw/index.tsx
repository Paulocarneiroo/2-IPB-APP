import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import confissao from "../../data/wesminster.json";

export default function WestminsterScreen() {
    const [expanded, setExpanded] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        setExpanded(expanded === id ? null : id);
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
        >
            {confissao.map((item) => (
                <View key={item.id} style={styles.card}>
                    <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                        <Text style={styles.title}>{item.titulo}</Text>
                    </TouchableOpacity>
                    {expanded === item.id && (
                        <Text style={styles.text}>{item.texto}</Text>
                    )}
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        padding: 10,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    card: {
        backgroundColor: "#fff",
        marginVertical: 6,
        padding: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#055c43",
    },
    text: {
        marginTop: 8,
        fontSize: 15,
        lineHeight: 22,
        color: "#333",
    },
});
