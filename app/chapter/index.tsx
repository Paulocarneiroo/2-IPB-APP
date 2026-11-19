import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { getBibleBook } from "../../constants/bibleBooks";

export default function ChapterSelection() {
  const { book } = useLocalSearchParams<{ book: string }>();
  const router = useRouter();

  const chapters = useMemo(() => {
    const total = getBibleBook(book)?.chapters ?? 0;
    return Array.from({ length: total }, (_, i) => i + 1);
  }, [book]);

  const handleSelectChapter = (chapter: number) => {
    router.push(`/bible?book=${encodeURIComponent(book || "")}&chapter=${chapter}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.header}>{book}</Text>
      <View style={styles.grid}>
        {chapters.map((chapter) => (
          <TouchableOpacity
            key={chapter}
            style={styles.button}
            onPress={() => handleSelectChapter(chapter)}
            activeOpacity={0.8}
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
    backgroundColor: "#f8f5f0",
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4b3f2f",
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
    backgroundColor: "#eae4dc",
    paddingVertical: 12,
    marginVertical: 6,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: "#4b3f2f",
    fontWeight: "600",
  },
});
