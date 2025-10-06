import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet } from "react-native";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerStyle: { backgroundColor: "#055c43" },
                headerTintColor: "#fff",
                tabBarStyle: { backgroundColor: "#055c43" },
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#94a3b8",
                headerRight: () => (
                    <Image
                        source={require("../../assets/images/ipb-symbol.png")} // caminho do PNG
                        style={styles.logo}
                        resizeMode="contain"
                    />
                ),
            }}
        >
            <Tabs.Screen
                name="bible"
                options={{
                    title: "Bíblia",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="hymnal"
                options={{
                    title: "Hinário",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="musical-notes-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="confession"
                options={{
                    title: "Confissão",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="document-text-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="catechism"
                options={{
                    title: "Catecismo",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="school-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="more"
                options={{
                    title: "Mais",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ellipsis-horizontal" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 60,    // ajuste conforme o tamanho desejado
        height: 60,
        marginRight: 20,
        borderRadius: 50,
        borderColor: "#055c43",
    },
});
