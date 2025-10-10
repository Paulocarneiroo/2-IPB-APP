import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import hymns from "../../data/hymns.json";

export default function HymnalScreen() {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
        >
            <Text style={styles.title}>Hinário Novo Cântico</Text>

            {hymns.map((hymn) => (
                <View key={hymn.id} style={styles.card}>
                    <TouchableOpacity
                        style={styles.header}
                        onPress={() => setExpandedId(expandedId === hymn.id ? null : hymn.id)}
                    >
                        <View style={styles.headerLeft}>
                            <MaterialCommunityIcons name="music-note-outline" size={22} color="#E0E0E0" />
                            <Text style={styles.hymnTitle}>
                                {hymn.numero}. {hymn.titulo}
                            </Text>
                        </View>
                        <MaterialCommunityIcons
                            name={expandedId === hymn.id ? "chevron-up" : "chevron-down"}
                            size={24}
                            color="#E0E0E0"
                        />
                    </TouchableOpacity>

                    {expandedId === hymn.id && (
                        <Text style={styles.hymnText}>{hymn.letra}</Text>
                    )}
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f5f0",
        padding: 20,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    title: {
        fontSize: 22,
        color: "#6b5b4b",
        fontWeight: "600",
        marginBottom: 20,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#6b5b4b",
        borderRadius: 12,
        marginBottom: 12,
        padding: 14,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    hymnTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "500",
    },
    hymnText: {
        marginTop: 10,
        color: "#D6D6D6",
        fontSize: 15,
        lineHeight: 22,
    },
});
