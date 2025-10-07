import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

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
                }}
            />
        </>
    );
}
