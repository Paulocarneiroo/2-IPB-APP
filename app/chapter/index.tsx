import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function ChapterSelection() {
    const { book } = useLocalSearchParams<{ book: string }>();
    const router = useRouter();
    const [chapters, setChapters] = useState<number[]>([]);

    useEffect(() => {
        const chaptersCount: Record<string, number> = {
            "Gênesis": 50, "Êxodo": 40, "Levítico": 27,
            "Números": 36, "Deuteronômio": 34,
            "Mateus": 28, "Marcos": 16, "Lucas": 24, "João": 21,
            "Atos": 28, "Romanos": 16, // etc.
        };

        const total = chaptersCount[book || ""] || 10;
        setChapters(Array.from({ length: total }, (_, i) => i + 1));
    }, [book]);

    const handleSelectChapter = (chapter: number) => {
        router.push(`/bible?book=${encodeURIComponent(book || "")}&chapter=${chapter}`);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>{book}</Text>
            <View style={styles.grid}>
                {chapters.map((chapter) => (
                    <TouchableOpacity
                        key={chapter}
                        style={styles.button}
                        onPress={() => handleSelectChapter(chapter)}
                    >
                        <Text style={styles.buttonText}>{chapter}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        padding: 16,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1E293B",
        textAlign: "center",
        marginBottom: 20,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    button: {
        width: "30%",
        backgroundColor: "#055c43",
        paddingVertical: 12,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
});
