import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HighlightColor } from "../../hooks/useTextSelection";

type SelectionActionBarProps = {
  label: string;
  selectedHighlight?: HighlightColor;
  copied: boolean;
  onHighlight: (color: HighlightColor) => void;
  onCopy: () => void;
  onClear: () => void;
};

export default function SelectionActionBar({
  label,
  selectedHighlight,
  copied,
  onHighlight,
  onCopy,
  onClear,
}: SelectionActionBarProps) {
  return (
    <View style={styles.actionBar}>
      <View style={styles.actionHeader}>
        <Text style={styles.actionLabel}>{label}</Text>
        <TouchableOpacity onPress={onClear} accessibilityLabel="Limpar seleção">
          <Text style={styles.clearSelectionText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[
            styles.colorButton,
            styles.colorGreen,
            selectedHighlight === "green" && styles.colorButtonActive,
          ]}
          onPress={() => onHighlight("green")}
          accessibilityLabel="Grifar de verde"
        />

        <TouchableOpacity
          style={[
            styles.colorButton,
            styles.colorBrown,
            selectedHighlight === "brown" && styles.colorButtonActive,
          ]}
          onPress={() => onHighlight("brown")}
          accessibilityLabel="Grifar de marrom"
        />

        <TouchableOpacity
          style={styles.copyButton}
          onPress={onCopy}
          accessibilityLabel="Copiar seleção"
        >
          <Ionicons
            name={copied ? "checkmark" : "copy-outline"}
            size={18}
            color="#4b3f2f"
          />
          <Text style={styles.copyButtonText}>{copied ? "Copiado" : "Copiar"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actionBar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 24,
    backgroundColor: "#eae4dc",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  actionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 12,
  },
  actionLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: "#4b3f2f",
  },
  clearSelectionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#7a6a55",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  colorButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "transparent",
  },
  colorButtonActive: {
    borderColor: "#4b3f2f",
  },
  colorGreen: {
    backgroundColor: "#6b8f5e",
  },
  colorBrown: {
    backgroundColor: "#4b3f2f",
  },
  copyButton: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#f8f5f0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  copyButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4b3f2f",
  },
});
