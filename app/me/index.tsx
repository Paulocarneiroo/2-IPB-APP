import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

export default function PresentationScreen() {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image
                    source={require("../../assets/images/me.jpg")} // coloque sua imagem aqui
                    style={styles.profileImage}
                />

                <Text style={styles.name}>Paulo Carneiro</Text>
                <Text style={styles.subtitle}>Engenheiro de Software</Text>

                <Text style={styles.text}>
                    Sou servo do Senhor Jesus Cristo.
                    Como reformado e presbiteriano, acredito que toda habilidade
                    que temos deve ser usada para a glória de Deus.
                    Este aplicativo nasceu do desejo de servir à 2° Igreja Presbiteriana
                    de Patos-PB, tornando seus documentos e materiais mais acessíveis a
                    todos os irmãos.
                    Minha oração é que este projeto possa, de alguma forma, edificar a Igreja e glorificar
                    o nome do nosso Senhor.
                    {"\n"}<Text style={styles.highlight}>Soli Deo Glória</Text>
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e5f0eb",
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    container: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 25,
        width: "100%",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 4,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: "#055c43",
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#055c43",
        marginBottom: 5,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#333",
        marginBottom: 15,
        textAlign: "center",
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        color: "#333",
        textAlign: "center",
    },
    highlight: {
        fontWeight: "bold",
        color: "#055c43",
        fontSize: 18,
    },
});
