import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HymnCardProps {
    titulo: string;
    numero: number;
    onPress?: () => void;
}

export default function HymnCard({ titulo, numero, onPress }: HymnCardProps) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
            <View style={styles.numberContainer}>
                <Text style={styles.number}>{numero}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{titulo}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginVertical: 6,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#e0d8c3",
    },
    numberContainer: {
        backgroundColor: "#f8f5f0",
        borderRadius: 10,
        padding: 10,
        marginRight: 14,
    },
    number: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4b3f2f",
    },
    textContainer: {
        flexShrink: 1,
    },
    title: {
        fontSize: 17,
        fontWeight: "600",
        color: "#4b3f2f",
        fontFamily: "serif",
    },
});
