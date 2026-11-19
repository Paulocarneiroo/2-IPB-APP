import { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";

export type HighlightColor = "green" | "brown";

export const HIGHLIGHT_COLORS: Record<HighlightColor, string> = {
  green: "#c5dbb3",
  brown: "#d6c3a3",
};

type UseTextSelectionOptions = {
  storageKey: string;
  getLabel: (selectedIds: string[]) => string;
  getCopyText: (selectedIds: string[]) => string;
};

export function useTextSelection({
  storageKey,
  getLabel,
  getCopyText,
}: UseTextSelectionOptions) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [highlights, setHighlights] = useState<Record<string, HighlightColor>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadHighlights() {
      try {
        const saved = await AsyncStorage.getItem(storageKey);
        if (cancelled || !saved) return;

        const parsed = JSON.parse(saved) as Record<string, HighlightColor>;
        if (parsed && typeof parsed === "object") {
          setHighlights(parsed);
        }
      } catch (error) {
        console.error("Erro ao carregar grifos:", error);
      }
    }

    loadHighlights();

    return () => {
      cancelled = true;
    };
  }, [storageKey]);

  const hasSelection = selectedIds.length > 0;

  const selectionLabel = useMemo(() => {
    if (!hasSelection) return "";
    return getLabel([...selectedIds].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })));
  }, [hasSelection, selectedIds, getLabel]);

  const selectedHighlight = useMemo(() => {
    if (!hasSelection) return undefined;

    const colors = selectedIds.map((id) => highlights[id]);
    if (colors.every((color) => color === "green")) return "green";
    if (colors.every((color) => color === "brown")) return "brown";
    return undefined;
  }, [hasSelection, selectedIds, highlights]);

  function persistHighlights(next: Record<string, HighlightColor>) {
    AsyncStorage.setItem(storageKey, JSON.stringify(next)).catch((error) => {
      console.error("Erro ao salvar grifo:", error);
    });
  }

  function toggleSelect(id: string) {
    setCopied(false);
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function clearSelection() {
    setSelectedIds([]);
    setCopied(false);
  }

  function applyHighlight(color: HighlightColor) {
    if (!hasSelection) return;

    const ids = [...selectedIds];
    const allHaveColor = ids.every((id) => highlights[id] === color);

    setHighlights((current) => {
      const next = { ...current };

      ids.forEach((id) => {
        if (allHaveColor) {
          delete next[id];
        } else {
          next[id] = color;
        }
      });

      persistHighlights(next);
      return next;
    });

    clearSelection();
  }

  async function copySelection() {
    if (!hasSelection) return;

    const sortedIds = [...selectedIds].sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true })
    );
    await Clipboard.setStringAsync(getCopyText(sortedIds));
    setCopied(true);
  }

  return {
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
  };
}
