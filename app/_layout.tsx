import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, TouchableOpacity, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#055c43" }}>
            <StatusBar style="light" />
            <View
                style={{
                    flex: 1,
                    marginTop: Platform.OS === "android" ? 1 : 10,
                }}
            >
                <Stack
                    screenOptions={{
                        title: "IPB",
                        headerStyle: { backgroundColor: "#055c43" },
                        headerTintColor: "#fff",
                        headerTitleAlign: "left",
                        headerTitleStyle: {
                            fontSize: 22,
                            fontWeight: "bold",
                        },
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => router.push("/")}
                                style={{ marginRight: 15 }}
                            >
                                <Image
                                    source={require("../assets/images/ipb-symbol.png")}
                                    style={{
                                        width: 55,
                                        height: 55,
                                        borderRadius: 50,
                                        marginTop: 8,
                                    }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        ),
                    }}
                />
            </View>
        </SafeAreaView>
    );
}
