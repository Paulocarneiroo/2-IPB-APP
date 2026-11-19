import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

export type MenuButtonVariant = "list" | "grid";

interface MenuButtonProps {
    label: string;
    route?: string;
    onPress?: () => void;
    icon?: React.ReactNode;
    variant?: MenuButtonVariant;
}

export default function MenuButton({
    label,
    route,
    onPress,
    icon,
    variant = "list",
}: MenuButtonProps) {
    const router = useRouter();
    const isGrid = variant === "grid";

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else if (route) {
            router.push(route);
        }
    };

    return (
        <TouchableOpacity
            style={[styles.button, isGrid ? styles.buttonGrid : styles.buttonList]}
            onPress={handlePress}
            activeOpacity={0.8}
        >
            <View style={[styles.content, isGrid && styles.contentGrid]}>
                {icon && (
                    <View style={[styles.iconContainer, isGrid && styles.iconContainerGrid]}>
                        {icon}
                    </View>
                )}
                <Text
                    style={[styles.text, isGrid && styles.textGrid]}
                    numberOfLines={isGrid ? 3 : 2}
                >
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#eae4dc",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    buttonList: {
        width: "100%",
        minHeight: 52,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    buttonGrid: {
        width: "48%",
        minHeight: 92,
        paddingHorizontal: 10,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    contentGrid: {
        flexDirection: "column",
        justifyContent: "center",
    },
    iconContainer: {
        width: 32,
        marginRight: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    iconContainerGrid: {
        width: "auto",
        marginRight: 0,
        marginBottom: 6,
    },
    text: {
        flex: 1,
        fontSize: 15,
        fontWeight: "500",
        color: "#4b3f2f",
    },
    textGrid: {
        flex: 0,
        fontSize: 12,
        textAlign: "center",
        lineHeight: 16,
    },
});
