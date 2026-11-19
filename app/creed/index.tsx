import React from "react";
import {Text, ScrollView, StyleSheet } from "react-native";

export default function ApostlesCreedScreen() {
    return (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
            <Text style={styles.title}>Credo Apostólico</Text>

            <Text style={styles.paragraph}>
                Creio em Deus Pai todo-poderoso, criador do céu e da terra;
                e em Jesus Cristo, seu único Filho, nosso Senhor; que foi concebido pelo poder do Espírito Santo, nasceu da virgem Maria; padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus, está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos;
                Creio no Espírito Santo; na santa Igreja universal; na comunhão dos santos; na remissão dos pecados; na ressurreição da carne; na vida eterna. Amém.
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: "#f8f5f0",
    },
    container: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 100,
        backgroundColor: "#f8f5f0",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#4b3f2f",
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: "justify",
        fontWeight: "400",
        color: "#3b3228",
    },
});
