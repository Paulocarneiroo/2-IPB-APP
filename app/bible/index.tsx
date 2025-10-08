import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native";

interface Verse {
    book_name: string;
    chapter: number;
    verse: number;
    text: string;
}

export default function BibleScreen() {
    const { book, chapter } = useLocalSearchParams<{ book: string; chapter: string }>();
    const [verses, setVerses] = useState<Verse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!book || !chapter) return;

        async function fetchBibleChapter() {
            try {
                setLoading(true);
                const formattedBook = encodeURIComponent(book);
                const response = await fetch(
                    `https://bible-api.com/${formattedBook}%20${chapter}?translation=almeida&single_chapter_book_matching=indifferent`
                );
                const data = await response.json();

                if (data.verses) {
                    setVerses(data.verses);
                } else {
                    setVerses([]);
                }
            } catch (error) {
                console.error("Erro ao buscar capítulo:", error);
                setVerses([]);
            } finally {
                setLoading(false);
            }
        }

        fetchBibleChapter();
    }, [book, chapter]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1E293B" />
                <Text style={{ marginTop: 10 }}>
                    Carregando {book} {chapter}...
                </Text>
            </View>
        );
    }

    if (verses.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Não foi possível carregar {book} {chapter}.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.chapterTitle}>
                {verses[0].book_name} {verses[0].chapter}
            </Text>
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
