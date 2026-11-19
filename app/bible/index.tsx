import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { getBibleBook } from "../../constants/bibleBooks";
import { fetchChapterVerses } from "../../services/bibleApi";

interface Verse {
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

type HighlightColor = "green" | "brown";

const FONT_STORAGE_KEY = "bible_font_size";
const HIGHLIGHTS_STORAGE_KEY = "bible_highlights";
const DEFAULT_FONT_SIZE = 16;
const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 32;
const FONT_STEP = 2;

const HIGHLIGHT_COLORS: Record<HighlightColor, string> = {
  green: "#c5dbb3",
  brown: "#d6c3a3",
};

function verseKey(bookName: string, chapter: number, verse: number) {
  return `${bookName}:${chapter}:${verse}`;
}

function formatVerseReference(bookName: string, chapter: number, verseNumbers: number[]) {
  const sorted = [...verseNumbers].sort((a, b) => a - b);
  if (sorted.length === 0) return "";
  if (sorted.length === 1) return `${bookName} ${chapter}:${sorted[0]}`;

  const parts: string[] = [];
  let start = sorted[0];
  let prev = sorted[0];

  for (let i = 1; i <= sorted.length; i++) {
    const current = sorted[i];
    if (current === prev + 1) {
      prev = current;
      continue;
    }

    parts.push(start === prev ? `${start}` : `${start}-${prev}`);
    start = current;
    prev = current;
  }

  return `${bookName} ${chapter}:${parts.join(", ")}`;
}

export default function BibleScreen() {
  const { book, chapter, verse } = useLocalSearchParams<{
    book: string;
    chapter: string;
    verse?: string;
  }>();
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [selectedVerses, setSelectedVerses] = useState<number[]>([]);
  const [highlights, setHighlights] = useState<Record<string, HighlightColor>>({});
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const verseLayouts = useRef<Record<number, { y: number; height: number }>>({});
  const pendingScrollVerse = useRef<number | null>(null);
  const currentScrollY = useRef(0);
  const viewportHeight = useRef(0);
  const scrollAnimationFrame = useRef<number | null>(null);
  const fontAnchor = useRef<{
    verse: number;
    mode: "center" | "relative";
    relativeOffset: number;
  } | null>(null);

  const SCROLL_DURATION_MS = 1100;

  useEffect(() => {
    let cancelled = false;

    async function loadPreferences() {
      try {
        const [savedFont, savedHighlights] = await Promise.all([
          AsyncStorage.getItem(FONT_STORAGE_KEY),
          AsyncStorage.getItem(HIGHLIGHTS_STORAGE_KEY),
        ]);

        if (cancelled) return;

        if (savedFont) {
          const parsed = Number(savedFont);
          if (Number.isFinite(parsed)) {
            setFontSize(Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, parsed)));
          }
        }

        if (savedHighlights) {
          const parsed = JSON.parse(savedHighlights) as Record<string, HighlightColor>;
          if (parsed && typeof parsed === "object") {
            setHighlights(parsed);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar preferências da Bíblia:", error);
      }
    }

    loadPreferences();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!book || !chapter) return;

    let cancelled = false;

    async function fetchBibleChapter() {
      try {
        setLoading(true);
        setSelectedVerses([]);
        verseLayouts.current = {};
        pendingScrollVerse.current = null;
        fontAnchor.current = null;

        const bibleBook = getBibleBook(book);
        const chapterNumber = Number(chapter);

        if (!bibleBook || !Number.isFinite(chapterNumber)) {
          if (!cancelled) setVerses([]);
          return;
        }

        const data = await fetchChapterVerses(bibleBook.id, chapterNumber);

        if (cancelled) return;

        setVerses(
          data.map((item) => ({
            book_name: bibleBook.name,
            chapter: chapterNumber,
            verse: item.verse,
            text: item.text,
          }))
        );

        const targetVerse = Number(verse);
        if (Number.isFinite(targetVerse) && targetVerse > 0) {
          setSelectedVerses([targetVerse]);
          pendingScrollVerse.current = targetVerse;
        }
      } catch (error) {
        console.error("Erro ao buscar capítulo:", error);
        if (!cancelled) setVerses([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchBibleChapter();

    return () => {
      cancelled = true;
    };
  }, [book, chapter, verse]);

  const selected = useMemo(
    () =>
      verses
        .filter((verse) => selectedVerses.includes(verse.verse))
        .sort((a, b) => a.verse - b.verse),
    [verses, selectedVerses]
  );

  const hasSelection = selected.length > 0;

  const selectionLabel = useMemo(() => {
    if (!hasSelection) return "";
    return formatVerseReference(
      selected[0].book_name,
      selected[0].chapter,
      selected.map((verse) => verse.verse)
    );
  }, [hasSelection, selected]);

  const selectedHighlight = useMemo(() => {
    if (!hasSelection) return undefined;

    const colors = selected.map(
      (verse) => highlights[verseKey(verse.book_name, verse.chapter, verse.verse)]
    );

    if (colors.every((color) => color === "green")) return "green";
    if (colors.every((color) => color === "brown")) return "brown";
    return undefined;
  }, [hasSelection, selected, highlights]);

  function findVisibleAnchorVerse() {
    const focusY = currentScrollY.current + (viewportHeight.current || 400) * 0.35;
    let bestVerse = verses[0]?.verse ?? 1;
    let bestDistance = Number.POSITIVE_INFINITY;

    Object.entries(verseLayouts.current).forEach(([verseNumber, layout]) => {
      const mid = layout.y + layout.height / 2;
      const distance = Math.abs(mid - focusY);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestVerse = Number(verseNumber);
      }
    });

    return bestVerse;
  }

  function changeFontSize(delta: number) {
    const next = Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, fontSize + delta));
    if (next === fontSize) return;

    const hasMarkedVerse = selectedVerses.length > 0;
    const anchorVerse = hasMarkedVerse
      ? Math.min(...selectedVerses)
      : findVisibleAnchorVerse();
    const layout = verseLayouts.current[anchorVerse];

    fontAnchor.current = {
      verse: anchorVerse,
      mode: hasMarkedVerse ? "center" : "relative",
      relativeOffset: layout ? layout.y - currentScrollY.current : 12,
    };

    setFontSize(next);
    AsyncStorage.setItem(FONT_STORAGE_KEY, String(next)).catch((error) => {
      console.error("Erro ao salvar tamanho da fonte:", error);
    });
  }

  function persistHighlights(next: Record<string, HighlightColor>) {
    AsyncStorage.setItem(HIGHLIGHTS_STORAGE_KEY, JSON.stringify(next)).catch((error) => {
      console.error("Erro ao salvar grifo:", error);
    });
  }

  function handleSelectVerse(verseNumber: number) {
    setCopied(false);
    setSelectedVerses((current) =>
      current.includes(verseNumber)
        ? current.filter((verse) => verse !== verseNumber)
        : [...current, verseNumber]
    );
  }

  function clearSelection() {
    setSelectedVerses([]);
    setCopied(false);
  }

  function handleHighlight(color: HighlightColor) {
    if (!hasSelection) return;

    const keys = selected.map((verse) =>
      verseKey(verse.book_name, verse.chapter, verse.verse)
    );
    const allHaveColor = keys.every((key) => highlights[key] === color);

    setHighlights((current) => {
      const next = { ...current };

      keys.forEach((key) => {
        if (allHaveColor) {
          delete next[key];
        } else {
          next[key] = color;
        }
      });

      persistHighlights(next);
      return next;
    });

    clearSelection();
  }

  async function handleCopy() {
    if (!hasSelection) return;

    const reference = selectionLabel;
    const body = selected.map((verse) => `${verse.verse} ${verse.text}`).join("\n");
    await Clipboard.setStringAsync(`${reference}\n${body}`);
    setCopied(true);
  }

  function cancelSmoothScroll() {
    if (scrollAnimationFrame.current != null) {
      cancelAnimationFrame(scrollAnimationFrame.current);
      scrollAnimationFrame.current = null;
    }
  }

  function easeInOutCubic(progress: number) {
    return progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
  }

  function smoothScrollTo(targetY: number) {
    const startY = currentScrollY.current;
    const distance = targetY - startY;

    if (Math.abs(distance) < 2) {
      currentScrollY.current = targetY;
      scrollRef.current?.scrollTo({ y: targetY, animated: false });
      return;
    }

    cancelSmoothScroll();
    const startedAt = Date.now();

    const step = () => {
      const elapsed = Date.now() - startedAt;
      const progress = Math.min(elapsed / SCROLL_DURATION_MS, 1);
      const nextY = startY + distance * easeInOutCubic(progress);

      currentScrollY.current = nextY;
      scrollRef.current?.scrollTo({ y: nextY, animated: false });

      if (progress < 1) {
        scrollAnimationFrame.current = requestAnimationFrame(step);
      } else {
        scrollAnimationFrame.current = null;
      }
    };

    scrollAnimationFrame.current = requestAnimationFrame(step);
  }

  function restoreFontAnchor(verseNumber: number) {
    const anchor = fontAnchor.current;
    if (!anchor || anchor.verse !== verseNumber) return false;

    const layout = verseLayouts.current[verseNumber];
    if (!layout) return false;

    const viewH = viewportHeight.current || 400;
    const targetY =
      anchor.mode === "center"
        ? layout.y + layout.height / 2 - viewH / 2
        : layout.y - anchor.relativeOffset;

    const nextY = Math.max(0, targetY);
    cancelSmoothScroll();
    scrollRef.current?.scrollTo({ y: nextY, animated: false });
    currentScrollY.current = nextY;
    fontAnchor.current = null;
    return true;
  }

  function scrollToVerse(verseNumber: number) {
    const layout = verseLayouts.current[verseNumber];
    if (!layout) return false;

    smoothScrollTo(Math.max(0, layout.y - 12));
    return true;
  }

  function handleVerseLayout(verseNumber: number, y: number, height: number) {
    verseLayouts.current[verseNumber] = { y, height };

    if (fontAnchor.current?.verse === verseNumber) {
      requestAnimationFrame(() => {
        restoreFontAnchor(verseNumber);
      });
      return;
    }

    if (pendingScrollVerse.current === verseNumber) {
      requestAnimationFrame(() => {
        if (scrollToVerse(verseNumber)) {
          pendingScrollVerse.current = null;
        }
      });
    }
  }

  useEffect(() => {
    if (loading || verses.length === 0) return;

    const targetVerse = Number(verse);
    if (!Number.isFinite(targetVerse) || targetVerse <= 0) return;

    pendingScrollVerse.current = targetVerse;

    const timers = [80, 220, 450].map((delay) =>
      setTimeout(() => {
        if (pendingScrollVerse.current !== targetVerse) return;
        if (scrollToVerse(targetVerse)) {
          pendingScrollVerse.current = null;
        }
      }, delay)
    );

    return () => {
      timers.forEach(clearTimeout);
      cancelSmoothScroll();
    };
  }, [loading, verses, verse, book, chapter]);

  useEffect(() => {
    const anchor = fontAnchor.current;
    if (!anchor) return;

    const timers = [16, 48, 120].map((delay) =>
      setTimeout(() => {
        if (fontAnchor.current?.verse !== anchor.verse) return;
        restoreFontAnchor(anchor.verse);
      }, delay)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [fontSize]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4b3f2f" />
        <Text style={{ marginTop: 10, color: "#4b3f2f" }}>
          Carregando {book} {chapter}...
        </Text>
      </View>
    );
  }

  if (verses.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: "#4b3f2f" }}>
          Não foi possível carregar {book} {chapter}.
        </Text>
      </View>
    );
  }

  const titleSize = Math.max(18, fontSize + 6);
  const lineHeight = Math.round(fontSize * 1.6);

  return (
    <View style={styles.screen}>
      <ScrollView
        ref={scrollRef}
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          hasSelection && styles.scrollContentWithActions,
        ]}
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={16}
        onLayout={(event) => {
          viewportHeight.current = event.nativeEvent.layout.height;
        }}
        onScroll={(event) => {
          currentScrollY.current = event.nativeEvent.contentOffset.y;
        }}
      >
        <Text style={[styles.chapterTitle, { fontSize: titleSize }]}>
          {verses[0].book_name} {verses[0].chapter}
        </Text>

        {verses.map((v) => {
          const key = verseKey(v.book_name, v.chapter, v.verse);
          const highlight = highlights[key];
          const isSelected = selectedVerses.includes(v.verse);

          return (
            <Pressable
              key={v.verse}
              onPress={() => handleSelectVerse(v.verse)}
              onLayout={(event) =>
                handleVerseLayout(
                  v.verse,
                  event.nativeEvent.layout.y,
                  event.nativeEvent.layout.height
                )
              }
              style={[
                styles.verseRow,
                highlight ? { backgroundColor: HIGHLIGHT_COLORS[highlight] } : null,
                isSelected && styles.verseSelected,
              ]}
            >
              <Text style={[styles.verse, { fontSize, lineHeight }]}>
                <Text style={styles.verseNumber}>{v.verse} </Text>
                {v.text}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.fontControls} pointerEvents="box-none">
        <TouchableOpacity
          style={[styles.fontButton, fontSize <= MIN_FONT_SIZE && styles.fontButtonDisabled]}
          onPress={() => changeFontSize(-FONT_STEP)}
          disabled={fontSize <= MIN_FONT_SIZE}
          activeOpacity={0.7}
          accessibilityLabel="Diminuir fonte"
        >
          <Text style={styles.fontButtonTextSmall}>A</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.fontButton, fontSize >= MAX_FONT_SIZE && styles.fontButtonDisabled]}
          onPress={() => changeFontSize(FONT_STEP)}
          disabled={fontSize >= MAX_FONT_SIZE}
          activeOpacity={0.7}
          accessibilityLabel="Aumentar fonte"
        >
          <Text style={styles.fontButtonTextLarge}>A</Text>
        </TouchableOpacity>
      </View>

      {hasSelection && (
        <View style={styles.actionBar}>
          <View style={styles.actionHeader}>
            <Text style={styles.actionLabel}>{selectionLabel}</Text>
            <TouchableOpacity onPress={clearSelection} accessibilityLabel="Limpar seleção">
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
              onPress={() => handleHighlight("green")}
              accessibilityLabel="Grifar de verde"
            />

            <TouchableOpacity
              style={[
                styles.colorButton,
                styles.colorBrown,
                selectedHighlight === "brown" && styles.colorButtonActive,
              ]}
              onPress={() => handleHighlight("brown")}
              accessibilityLabel="Grifar de marrom"
            />

            <TouchableOpacity
              style={styles.copyButton}
              onPress={handleCopy}
              accessibilityLabel="Copiar versículos"
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
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 100,
    paddingRight: 28,
  },
  scrollContentWithActions: {
    paddingBottom: 140,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f5f0",
  },
  fontControls: {
    position: "absolute",
    right: 10,
    top: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  fontButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(248, 245, 240, 0.92)",
    borderWidth: 1,
    borderColor: "rgba(75, 63, 47, 0.18)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  fontButtonDisabled: {
    opacity: 0.35,
  },
  fontButtonTextSmall: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4b3f2f",
  },
  fontButtonTextLarge: {
    fontSize: 17,
    fontWeight: "600",
    color: "#4b3f2f",
  },
  chapterTitle: {
    fontWeight: "bold",
    color: "#4b3f2f",
    marginBottom: 12,
    textAlign: "center",
  },
  verseRow: {
    marginBottom: 6,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "transparent",
  },
  verseSelected: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#4b3f2f",
    borderStyle: "dashed",
    backgroundColor: "rgba(234, 228, 220, 0.55)",
  },
  verse: {
    color: "#3b3228",
    fontWeight: "500",
  },
  verseNumber: {
    fontWeight: "bold",
    color: "#4b3f2f",
  },
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
