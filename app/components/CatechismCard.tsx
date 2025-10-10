import { View, Text, StyleSheet } from "react-native";

interface Props {
  pergunta: string;
  resposta: string;
  id: number;
}

export default function CatechismCard({ id, pergunta, resposta }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.id}>Pergunta {id}</Text>
      <Text style={styles.pergunta}>{pergunta}</Text>
      <Text style={styles.resposta}>{resposta}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1f2937",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  id: {
    color: "#9ca3af",
    fontSize: 14,
    marginBottom: 6,
  },
  pergunta: {
    color: "#f3f4f6",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  resposta: {
    color: "#d1d5db",
    fontSize: 15,
    lineHeight: 22,
  },
});
