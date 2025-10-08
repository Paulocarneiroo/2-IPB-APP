import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const oldTestament = [
    "Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio", "Josué", "Juízes", "Rute",
    "1 Samuel", "2 Samuel", "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas", "Esdras",
    "Neemias", "Ester", "Jó", "Salmos", "Provérbios", "Eclesiastes", "Cantares",
    "Isaías", "Jeremias", "Lamentações", "Ezequiel", "Daniel", "Oséias", "Joel",
    "Amós", "Obadias", "Jonas", "Miquéias", "Naum", "Habacuque", "Sofonias", "Ageu",
    "Zacarias", "Malaquias"
];

const newTestament = [
    "Mateus", "Marcos", "Lucas", "João", "Atos", "Romanos", "1 Coríntios", "2 Coríntios",
    "Gálatas", "Efésios", "Filipenses", "Colossenses", "1 Tessalonicenses",
    "2 Tessalonicenses", "1 Timóteo", "2 Timóteo", "Tito", "Filemom", "Hebreus",
    "Tiago", "1 Pedro", "2 Pedro", "1 João", "2 João", "3 João", "Judas", "Apocalipse"
];

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
                {oldTestament.map((book) => (
                    <TouchableOpacity
                        key={book}
                        style={styles.button}
                        onPress={() => handleSelectBook(book)}
                    >
                        <Text style={styles.buttonText}>{book}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.header}>Novo Testamento</Text>
            <View style={styles.grid}>
                {newTestament.map((book) => (
                    <TouchableOpacity
                        key={book}
                        style={styles.button}
                        onPress={() => handleSelectBook(book)}
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
        backgroundColor: "#F8FAFC",
        paddingHorizontal: 16,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1E293B",
        marginVertical: 12,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    button: {
        width: "48%",
        backgroundColor: "#055c43",
        paddingVertical: 10,
        marginVertical: 5,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "500",
    },
});
