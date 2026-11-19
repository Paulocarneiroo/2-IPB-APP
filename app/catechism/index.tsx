import { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import catechism from "../../data/catechism.json";
import LinkedBibleText from "../components/LinkedBibleText";
import SelectionActionBar from "../components/SelectionActionBar";
import { HIGHLIGHT_COLORS, useTextSelection } from "../../hooks/useTextSelection";

type CatechismItem = {
  id: number;
  question: string;
  answer: string;
};

const items = catechism as CatechismItem[];

function formatSelectedLabel(selectedIds: string[]) {
  const numbers = selectedIds.map(Number).sort((a, b) => a - b);
  if (numbers.length === 1) return `Pergunta ${numbers[0]}`;
  return `Perguntas ${numbers.join(", ")}`;
}

export default function CatechismScreen() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const getLabel = useCallback((selectedIds: string[]) => formatSelectedLabel(selectedIds), []);

  const getCopyText = useCallback((selectedIds: string[]) => {
    return selectedIds
      .map(Number)
      .sort((a, b) => a - b)
      .map((id) => {
        const item = items.find((entry) => entry.id === id);
        if (!item) return "";
        return `Pergunta ${item.id}. ${item.question}\n\n${item.answer}`;
      })
      .filter(Boolean)
      .join("\n\n");
  }, []);

  const {
    selectedIds,
    highlights,
    copied,
    hasSelection,
    selectionLabel,
    selectedHighlight,
    toggleSelect,
    clearSelection,
    applyHighlight,
    copySelection,
  } = useTextSelection({
    storageKey: "catechism_highlights",
    getLabel,
    getCopyText,
  });

  const toggleExpand = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          hasSelection && styles.scrollContentWithActions,
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {items.map((item) => {
          const key = String(item.id);
          const isExpanded = expanded === item.id;
          const isSelected = selectedIds.includes(key);
          const highlight = highlights[key];

          return (
            <View key={item.id} style={styles.card}>
              <TouchableOpacity
                style={styles.header}
                onPress={() => toggleExpand(item.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.title}>
                  {item.id}. {item.question}
                </Text>
                <MaterialCommunityIcons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={24}
                  color="#4b3f2f"
                />
              </TouchableOpacity>

              {isExpanded && (
                <Pressable
                  onPress={() => toggleSelect(key)}
                  style={[
                    styles.answerContainer,
                    highlight ? { backgroundColor: HIGHLIGHT_COLORS[highlight] } : null,
                    isSelected && styles.selected,
                  ]}
                >
                  <LinkedBibleText text={item.answer} style={styles.text} />
                </Pressable>
              )}
            </View>
          );
        })}
      </ScrollView>

      {hasSelection && (
        <SelectionActionBar
          label={selectionLabel}
          selectedHighlight={selectedHighlight}
          copied={copied}
          onHighlight={applyHighlight}
          onCopy={copySelection}
          onClear={clearSelection}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8f5f0",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f5f0",
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  scrollContentWithActions: {
    paddingBottom: 140,
  },
  card: {
    backgroundColor: "#eae4dc",
    marginBottom: 12,
    padding: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#4b3f2f",
  },
  answerContainer: {
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selected: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#4b3f2f",
    borderStyle: "dashed",
    backgroundColor: "rgba(248, 245, 240, 0.7)",
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: "#6b5b4b",
  },
});
