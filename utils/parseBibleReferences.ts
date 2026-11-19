import { resolveBibleBook } from "../constants/bibleAbbreviations";

export type BibleReference = {
  raw: string;
  book: string;
  chapter: number;
  verse?: number;
};

export type TextSegment =
  | { type: "text"; value: string }
  | { type: "ref"; value: string; reference: BibleReference };

const BOOK_TOKEN =
  "(?:(?:III|II|IV|I|3|2|1)\\s*)?[A-Za-zÀ-ÿ]{2,14}";

const FULL_REF_REGEX = new RegExp(
  `((?:${BOOK_TOKEN})\\.?)\\s*(\\d+)(?:\\s*[:：]\\s*(\\d{1,3})(?:\\s*-\\s*\\d{1,3})?)?`,
  "gi"
);

const CONTINUATION_REGEX =
  /(?:[,;]\s*|\s+)(?:e\s+)?(\d{1,3})\s*[:：]\s*(\d{1,3})(?:\s*-\s*\d{1,3})?/gi;

function pushText(segments: TextSegment[], value: string) {
  if (!value) return;
  const last = segments[segments.length - 1];
  if (last?.type === "text") {
    last.value += value;
  } else {
    segments.push({ type: "text", value });
  }
}

function pushRef(
  segments: TextSegment[],
  raw: string,
  book: string,
  chapter: number,
  verse?: number
) {
  segments.push({
    type: "ref",
    value: raw,
    reference: { raw, book, chapter, verse },
  });
}

export function parseBibleReferences(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let cursor = 0;
  let lastBook: string | undefined;

  FULL_REF_REGEX.lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = FULL_REF_REGEX.exec(text)) !== null) {
    const [raw, bookToken, chapterText, verseText] = match;
    const book = resolveBibleBook(bookToken);

    if (!book) {
      continue;
    }

    const start = match.index;
    const end = start + raw.length;

    if (start > cursor) {
      const gap = text.slice(cursor, start);
      parseContinuations(gap, lastBook, segments);
    }

    const chapter = Number(chapterText);
    const verse = verseText ? Number(verseText) : undefined;

    pushRef(segments, raw, book, chapter, Number.isFinite(verse) ? verse : undefined);
    lastBook = book;
    cursor = end;
  }

  if (cursor < text.length) {
    parseContinuations(text.slice(cursor), lastBook, segments);
  }

  return segments.length > 0 ? segments : [{ type: "text", value: text }];
}

function parseContinuations(
  chunk: string,
  lastBook: string | undefined,
  segments: TextSegment[]
) {
  if (!chunk) return;

  if (!lastBook) {
    pushText(segments, chunk);
    return;
  }

  CONTINUATION_REGEX.lastIndex = 0;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = CONTINUATION_REGEX.exec(chunk)) !== null) {
    const [raw, chapterText, verseText] = match;
    const start = match.index;

    // Evita capturar números soltos no meio do texto doutrinário
    const prefix = chunk.slice(Math.max(0, start - 1), start);
    const looksLikeContinuation = /[,;e\s]/.test(raw[0]) || prefix === "" || /[,;\s]/.test(prefix);
    if (!looksLikeContinuation) continue;

    if (start > cursor) {
      pushText(segments, chunk.slice(cursor, start));
    }

    pushRef(
      segments,
      raw,
      lastBook,
      Number(chapterText),
      Number(verseText)
    );
    cursor = start + raw.length;
  }

  if (cursor < chunk.length) {
    pushText(segments, chunk.slice(cursor));
  }
}
