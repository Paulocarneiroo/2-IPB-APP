type BibleJsonBook = {
  abbrev: string;
  name: string;
  chapters: string[][];
};

type ChapterVerse = {
  verse: number;
  text: string;
};

const BIBLE_JSON_URL =
  "https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/pt_ara.json";

let biblePromise: Promise<BibleJsonBook[]> | null = null;

async function loadBible(): Promise<BibleJsonBook[]> {
  if (!biblePromise) {
    biblePromise = (async () => {
      const response = await fetch(BIBLE_JSON_URL);

      if (!response.ok) {
        biblePromise = null;
        throw new Error(`Falha ao carregar Bíblia (${response.status})`);
      }

      return (await response.json()) as BibleJsonBook[];
    })().catch((error) => {
      biblePromise = null;
      throw error;
    });
  }

  return biblePromise;
}

export async function fetchChapterVerses(
  bookId: number,
  chapter: number
): Promise<ChapterVerse[]> {
  const bible = await loadBible();
  const book = bible[bookId - 1];
  const verses = book?.chapters?.[chapter - 1];

  if (!verses?.length) {
    return [];
  }

  return verses.map((text, index) => ({
    verse: index + 1,
    text: text.trim(),
  }));
}
