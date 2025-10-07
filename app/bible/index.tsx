import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native";

interface Verse {
    book_name: string;
    chapter: number;
    verse: number;
    text: string;
}

export default function BibleScreen() {
    const [verses, setVerses] = useState<Verse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBibleChapter() {
            try {
                const response = await fetch("https://bible-api.com/Jo%C3%A3o+3?translation=almeida");
                const data = await response.json();
                setVerses(data.verses);
            } catch (error) {
                console.error("Erro ao buscar capítulo:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchBibleChapter();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1E293B" />
                <Text style={{ marginTop: 10 }}>Carregando capítulo...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {verses.length > 0 && (
                <Text style={styles.chapterTitle}>
                    {verses[0].book_name} {verses[0].chapter}
                </Text>
            )}
            {verses.map((v) => (
                <Text key={v.verse} style={styles.verse}>
                    <Text style={styles.verseNumber}>{v.verse} </Text>
                    {v.text}
                </Text>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
    },
    chapterTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1E293B",
        marginBottom: 12,
        textAlign: "center",
    },
    verse: {
        fontSize: 16,
        lineHeight: 26,
        color: "#0f172a",
        marginBottom: 8,
    },
    verseNumber: {
        fontWeight: "bold",
        color: "#1E293B",
    },
});
