import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function ChapterSelection() {
    const { book } = useLocalSearchParams<{ book: string }>();
    const router = useRouter();
    const [chapters, setChapters] = useState<number[]>([]);

    useEffect(() => {
        const chaptersCount: Record<string, number> = {
            // 📘 Antigo Testamento
            "Gênesis": 50, "Êxodo": 40, "Levítico": 27, "Números": 36,
            "Deuteronômio": 34, "Josué": 24, "Juízes": 21, "Rute": 4,
            "1 Samuel": 31, "2 Samuel": 24, "1 Reis": 22, "2 Reis": 25,
            "1 Crônicas": 29, "2 Crônicas": 36, "Esdras": 10, "Neemias": 13,
            "Ester": 10, "Jó": 42, "Salmos": 150, "Provérbios": 31, "Eclesiastes": 12,
            "Cantares": 8, "Isaías": 66, "Jeremias": 52, "Lamentações": 5,
            "Ezequiel": 48, "Daniel": 12, "Oséias": 14, "Joel": 3, "Amós": 9,
            "Obadias": 1, "Jonas": 4, "Miquéias": 7, "Naum": 3, "Habacuque": 3, "Sofonias": 3,
            "Ageu": 2, "Zacarias": 14, "Malaquias": 4,

            // 📗 Novo Testamento
            "Mateus": 28, "Marcos": 16, "Lucas": 24, "João": 21,
            "Atos": 28, "Romanos": 16, "1 Coríntios": 16, "2 Coríntios": 13,
            "Gálatas": 6, "Efésios": 6, "Filipenses": 4, "Colossenses": 4,
            "1 Tessalonicenses": 5, "2 Tessalonicenses": 3, "1 Timóteo": 6, "2 Timóteo": 4,
            "Tito": 3, "Filemom": 1, "Hebreus": 13, "Tiago": 5,
            "1 Pedro": 5, "2 Pedro": 3, "1 João": 5, "2 João": 1,
            "3 João": 1, "Judas": 1, "Apocalipse": 22
        };


        const total = chaptersCount[book || ""] || 10;
        setChapters(Array.from({ length: total }, (_, i) => i + 1));
    }, [book]);

    const handleSelectChapter = (chapter: number) => {
        router.push(`/bible?book=${encodeURIComponent(book || "")}&chapter=${chapter}`);
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
        >
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
    scrollContent: {
        paddingBottom: 100,
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
