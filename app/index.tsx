import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import MenuButton, { MenuButtonVariant } from "~/app/components/MenuButton";

const VIEW_MODE_KEY = "home_view_mode";

type MenuItem = {
    label: string;
    icon: React.ReactNode;
    route?: string;
    onPress?: () => void;
};

export default function HomeScreen() {
    const [viewMode, setViewMode] = useState<MenuButtonVariant>("list");

    useEffect(() => {
        let cancelled = false;

        async function loadViewMode() {
            try {
                const saved = await AsyncStorage.getItem(VIEW_MODE_KEY);
                if (!cancelled && (saved === "list" || saved === "grid")) {
                    setViewMode(saved);
                }
            } catch (error) {
                console.error("Erro ao carregar modo de visualização:", error);
            }
        }

        loadViewMode();

        return () => {
            cancelled = true;
        };
    }, []);

    const openManual = async () => {
        const url = "https://www.executivaipb.com.br/arquivos/manual_presbiteriano_2024.pdf";
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            alert("Não foi possível abrir o link: " + url);
        }
    };

    async function changeViewMode(mode: MenuButtonVariant) {
        setViewMode(mode);
        try {
            await AsyncStorage.setItem(VIEW_MODE_KEY, mode);
        } catch (error) {
            console.error("Erro ao salvar modo de visualização:", error);
        }
    }

    const menuItems: MenuItem[] = [
        {
            label: "Bíblia Sagrada",
            icon: <Ionicons name="book-outline" size={24} color="#4b3f2f" />,
            route: "/books",
        },
        {
            label: "Hinário Novo Cântico",
            icon: <MaterialCommunityIcons name="music-note-outline" size={24} color="#4b3f2f" />,
            route: "/newSong",
        },
        {
            label: "Credo Apostólico",
            icon: <MaterialCommunityIcons name="cross" size={24} color="#4b3f2f" />,
            route: "/creed",
        },
        {
            label: "Confissão de Fé de Westminster",
            icon: <FontAwesome5 name="scroll" size={22} color="#4b3f2f" />,
            route: "/cfw",
        },
        {
            label: "Catecismo Maior",
            icon: <Ionicons name="library-outline" size={24} color="#4b3f2f" />,
            route: "/catechism",
        },
        {
            label: "Manual Presbiteriano",
            icon: (
                <MaterialCommunityIcons
                    name="book-open-page-variant"
                    size={24}
                    color="#4b3f2f"
                />
            ),
            onPress: openManual,
        },
        {
            label: "Mais",
            icon: <MaterialCommunityIcons name="plus-circle-outline" size={26} color="#4b3f2f" />,
            route: "/more",
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Biblioteca Reformada</Text>

                <View style={styles.viewToggle}>
                    <TouchableOpacity
                        style={[styles.toggleButton, viewMode === "list" && styles.toggleButtonActive]}
                        onPress={() => changeViewMode("list")}
                        accessibilityLabel="Visualização em lista"
                    >
                        <Ionicons
                            name="list"
                            size={18}
                            color={viewMode === "list" ? "#f8f5f0" : "#4b3f2f"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.toggleButton, viewMode === "grid" && styles.toggleButtonActive]}
                        onPress={() => changeViewMode("grid")}
                        accessibilityLabel="Visualização em blocos"
                    >
                        <Ionicons
                            name="grid-outline"
                            size={16}
                            color={viewMode === "grid" ? "#f8f5f0" : "#4b3f2f"}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={[
                    styles.menuContainer,
                    viewMode === "grid" && styles.menuContainerGrid,
                ]}
                showsVerticalScrollIndicator={false}
            >
                {menuItems.map((item) => (
                    <MenuButton
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        route={item.route}
                        onPress={item.onPress}
                        variant={viewMode}
                    />
                ))}

                <Text
                    style={[
                        styles.footer,
                        viewMode === "grid" && styles.footerGrid,
                    ]}
                >
                    Igreja Presbiteriana do Brasil
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f5f0",
        justifyContent: "flex-start",
        paddingTop: 16,
    },
    header: {
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
        position: "relative",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "500",
        color: "#4b3f2f",
        fontFamily: "serif",
        textAlign: "center",
        paddingHorizontal: 48,
    },
    viewToggle: {
        position: "absolute",
        right: 20,
        top: 4,
        flexDirection: "row",
        backgroundColor: "#eae4dc",
        borderRadius: 10,
        padding: 3,
        gap: 2,
    },
    toggleButton: {
        width: 30,
        height: 30,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    toggleButtonActive: {
        backgroundColor: "#4b3f2f",
    },
    scroll: {
        flex: 1,
        width: "100%",
    },
    menuContainer: {
        width: "100%",
        paddingHorizontal: 20,
        paddingTop: 4,
        paddingBottom: 50,
        gap: 12,
    },
    menuContainerGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "stretch",
        rowGap: 12,
    },
    footer: {
        marginTop: 8,
        fontSize: 12,
        color: "#7c6e5a",
        fontStyle: "italic",
        textAlign: "center",
        width: "100%",
    },
    footerGrid: {
        marginTop: 16,
    },
});
