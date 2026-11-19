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
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Hinário Novo Cântico</Text>

            {hymns.map((hymn) => (
                <View key={hymn.id} style={styles.card}>
                    <TouchableOpacity
                        style={styles.header}
                        onPress={() => setExpandedId(expandedId === hymn.id ? null : hymn.id)}
                        activeOpacity={0.8}
                    >
                        <View style={styles.headerLeft}>
                            <MaterialCommunityIcons name="music-note-outline" size={22} color="#4b3f2f" />
                            <Text style={styles.hymnTitle}>
                                {hymn.numero}. {hymn.titulo}
                            </Text>
                        </View>
                        <MaterialCommunityIcons
                            name={expandedId === hymn.id ? "chevron-up" : "chevron-down"}
                            size={24}
                            color="#4b3f2f"
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
        color: "#4b3f2f",
        fontWeight: "600",
        marginBottom: 20,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#eae4dc",
        borderRadius: 12,
        marginBottom: 12,
        padding: 14,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerLeft: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginRight: 8,
    },
    hymnTitle: {
        flex: 1,
        color: "#4b3f2f",
        fontSize: 16,
        fontWeight: "500",
    },
    hymnText: {
        marginTop: 10,
        color: "#6b5b4b",
        fontSize: 15,
        lineHeight: 22,
    },
});
