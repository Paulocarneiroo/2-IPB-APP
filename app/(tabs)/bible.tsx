import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import bibleData from "../data/bible.json";

export default function BibleScreen() {
    const [selectedBook, setSelectedBook] = useState(bibleData.books[0]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📖 Bíblia</Text>

            <View style={styles.bookList}>
                <FlatList
                    horizontal
                    data={bibleData.books}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.bookButton,
                                item.name === selectedBook.name && styles.bookSelected
                            ]}
                            onPress={() => setSelectedBook(item)}
                        >
                            <Text style={styles.bookText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.name}
                />
            </View>

            <View style={styles.chapterContainer}>
                {selectedBook.chapters.map((chapter) => (
                    <View key={chapter.number}>
                        <Text style={styles.chapterTitle}>Capítulo {chapter.number}</Text>
                        {chapter.verses.map((verse, index) => (
                            <Text key={index} style={styles.verseText}>
                                <Text style={styles.verseNumber}>{index + 1}. </Text>
                                {verse}
                            </Text>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fafafa", padding: 16 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
    bookList: { flexDirection: "row", marginBottom: 20 },
    bookButton: {
        backgroundColor: "#eee",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        marginRight: 8
    },
    bookSelected: { backgroundColor: "#c1e1c1" },
    bookText: { fontSize: 16, color: "#333" },
    chapterContainer: { marginTop: 8 },
    chapterTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 8 },
    verseText: { fontSize: 16, lineHeight: 22, marginBottom: 4 },
    verseNumber: { fontWeight: "bold" }
});
