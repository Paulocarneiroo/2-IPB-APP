import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import MenuButton from "~/app/components/MenuButton";

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Biblioteca Reformada</Text>
            <Text style={styles.subtitle}>Central de documentos e materiais da IPB</Text>

            <ScrollView
                contentContainerStyle={styles.menuContainer}
                showsVerticalScrollIndicator={false}
            >
                <MenuButton
                    label="Bíblia Sagrada"
                    icon={<Ionicons name="book-outline" size={24} color="#4b3f2f" />}
                    route="/books"
                />

                <MenuButton
                    label="Hinário Novo Cântico"
                    icon={<MaterialCommunityIcons name="music-note-outline" size={24} color="#4b3f2f" />}
                    route="/newSong"
                />

                <MenuButton
                    label="Confissão de Fé de Westminster"
                    icon={<FontAwesome5 name="scroll" size={22} color="#4b3f2f" />}
                    route="/cfw"
                />

                <MenuButton
                    label="Catecismo Maior"
                    icon={<Ionicons name="library-outline" size={24} color="#4b3f2f" />}
                    route="/catechism"
                />

                <MenuButton
                    label="Mais"
                    icon={<MaterialCommunityIcons name="plus-circle-outline" size={26} color="#4b3f2f" />}
                    route="/more"
                />
            </ScrollView>

            <Text style={styles.footer}>Igreja Presbiteriana do Brasil</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f5f0",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 70,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#4b3f2f",
        marginBottom: 4,
        fontFamily: "serif",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        color: "#6b5b4b",
        marginBottom: 25,
        textAlign: "center",
    },
    menuContainer: {
        width: "90%",
        alignItems: "center",
        gap: 12,
        paddingBottom: 50,
    },
    footer: {
        position: "absolute",
        bottom: 20,
        fontSize: 12,
        color: "#7c6e5a",
        fontStyle: "italic",
    },
});
