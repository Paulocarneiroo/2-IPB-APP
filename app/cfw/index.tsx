import { useCallback, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import confissao from "../../data/wesminster.json";
import LinkedBibleText from "../components/LinkedBibleText";
import SelectionActionBar from "../components/SelectionActionBar";
import { HIGHLIGHT_COLORS, useTextSelection } from "../../hooks/useTextSelection";

type ConfessionItem = {
  id: number;
  titulo: string;
  texto: string;
};

const chapters = confissao as ConfessionItem[];

function getParagraphs(texto: string) {
  return texto
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function paragraphKey(chapterId: number, paragraphIndex: number) {
  return `${chapterId}:${paragraphIndex}`;
}

function parseParagraphKey(key: string) {
  const [chapterId, paragraphIndex] = key.split(":").map(Number);
  return { chapterId, paragraphIndex };
}

function formatSelectedLabel(selectedIds: string[]) {
  const grouped = new Map<number, number[]>();

  selectedIds.forEach((key) => {
    const { chapterId, paragraphIndex } = parseParagraphKey(key);
    const list = grouped.get(chapterId) ?? [];
    list.push(paragraphIndex + 1);
    grouped.set(chapterId, list);
  });

  return [...grouped.entries()]
    .sort(([a], [b]) => a - b)
    .map(([chapterId, paragraphs]) => {
      const sorted = paragraphs.sort((a, b) => a - b);
      return `Cap. ${chapterId} §${sorted.join(", ")}`;
    })
    .join(" · ");
}

export default function WestminsterScreen() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const paragraphsByChapter = useMemo(() => {
    const map = new Map<number, string[]>();
    chapters.forEach((chapter) => {
      map.set(chapter.id, getParagraphs(chapter.texto));
    });
    return map;
  }, []);

  const getLabel = useCallback((selectedIds: string[]) => formatSelectedLabel(selectedIds), []);

  const getCopyText = useCallback(
    (selectedIds: string[]) => {
      return selectedIds
        .map((key) => {
          const { chapterId, paragraphIndex } = parseParagraphKey(key);
          const chapter = chapters.find((entry) => entry.id === chapterId);
          const paragraph = paragraphsByChapter.get(chapterId)?.[paragraphIndex];
          if (!chapter || !paragraph) return "";
          return `${chapter.titulo}\n§${paragraphIndex + 1}\n\n${paragraph}`;
        })
        .filter(Boolean)
        .join("\n\n");
    },
    [paragraphsByChapter]
  );

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
    storageKey: "cfw_highlights",
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
        {chapters.map((item) => {
          const isExpanded = expanded === item.id;
          const paragraphs = paragraphsByChapter.get(item.id) ?? [];

          return (
            <View key={item.id} style={styles.card}>
              <TouchableOpacity
                style={styles.header}
                onPress={() => toggleExpand(item.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.title}>{item.titulo}</Text>
                <MaterialCommunityIcons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={24}
                  color="#4b3f2f"
                />
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.paragraphs}>
                  {paragraphs.map((paragraph, index) => {
                    const key = paragraphKey(item.id, index);
                    const isSelected = selectedIds.includes(key);
                    const highlight = highlights[key];

                    return (
                      <Pressable
                        key={key}
                        onPress={() => toggleSelect(key)}
                        style={[
                          styles.paragraph,
                          highlight ? { backgroundColor: HIGHLIGHT_COLORS[highlight] } : null,
                          isSelected && styles.selected,
                        ]}
                      >
                        <LinkedBibleText text={paragraph} style={styles.text} />
                      </Pressable>
                    );
                  })}
                </View>
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
  paragraphs: {
    marginTop: 10,
    gap: 8,
  },
  paragraph: {
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
