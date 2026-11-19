import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, TouchableOpacity, View, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function HeaderLogo() {
    return (
        <TouchableOpacity
            onPress={() => {
                if (router.canDismiss()) {
                    router.dismissAll();
                }
            }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.logoButton}
        >
            <Image
                source={require("../assets/images/ipb-symbol-white.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.underline} />
        </TouchableOpacity>
    );
}

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
                        title: "",
                        headerStyle: {
                            backgroundColor: "#055c43",
                            height: Platform.OS === "ios" ? 118 : 98,
                        },
                        headerTintColor: "#fff",
                        headerTitleAlign: "center",
                        headerTitleContainerStyle: {
                            paddingBottom: 28,
                        },
                        headerTitle: () => <HeaderLogo />,
                        headerBackVisible: false,
                        headerLeft: () => null,
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logoButton: {
        alignItems: "center",
        justifyContent: "center",
        transform: [{ translateY: -10 }],
    },
    logo: {
        width: 56,
        height: 56,
    },
    underline: {
        width: 48,
        height: 1.5,
        backgroundColor: "#fff",
        marginTop: -10,
        borderRadius: 1,
    },
});
