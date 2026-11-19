import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { newTestamentBooks, oldTestamentBooks } from "../../constants/bibleBooks";

export default function BookSelection() {
  const router = useRouter();

  const handleSelectBook = (book: string) => {
    router.push(`/chapter?book=${encodeURIComponent(book)}`);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>Antigo Testamento</Text>
      <View style={styles.grid}>
        {oldTestamentBooks.map((book) => (
          <TouchableOpacity
            key={book}
            style={styles.button}
            onPress={() => handleSelectBook(book)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>{book}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.header}>Novo Testamento</Text>
      <View style={styles.grid}>
        {newTestamentBooks.map((book) => (
          <TouchableOpacity
            key={book}
            style={styles.button}
            onPress={() => handleSelectBook(book)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>{book}</Text>
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
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4b3f2f",
    marginVertical: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    width: "48%",
    backgroundColor: "#eae4dc",
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: "#4b3f2f",
    fontWeight: "500",
  },
});
