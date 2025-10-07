import {router, Stack} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, TouchableOpacity } from "react-native";

export default function Layout() {
    return (
        <>
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    title: "2°IPB",
                    headerStyle: { backgroundColor: "#055c43" },
                    headerTintColor: "#fff",
                    headerTitleAlign: "left",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => router.push("/")}
                            style={{ marginRight: 10 }}
                        >
                            <Image
                                source={require("../assets/images/ipb-symbol.png")} // coloque sua imagem aqui
                                style={{
                                    width: 55,
                                    height: 55,
                                    borderRadius: 20,
                                }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
        </>
    );
}
