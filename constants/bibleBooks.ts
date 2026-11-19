export type BibleBook = {
  name: string;
  id: number;
  chapters: number;
};

export const bibleBooks: BibleBook[] = [
  { name: "Gênesis", id: 1, chapters: 50 },
  { name: "Êxodo", id: 2, chapters: 40 },
  { name: "Levítico", id: 3, chapters: 27 },
  { name: "Números", id: 4, chapters: 36 },
  { name: "Deuteronômio", id: 5, chapters: 34 },
  { name: "Josué", id: 6, chapters: 24 },
  { name: "Juízes", id: 7, chapters: 21 },
  { name: "Rute", id: 8, chapters: 4 },
  { name: "1 Samuel", id: 9, chapters: 31 },
  { name: "2 Samuel", id: 10, chapters: 24 },
  { name: "1 Reis", id: 11, chapters: 22 },
  { name: "2 Reis", id: 12, chapters: 25 },
  { name: "1 Crônicas", id: 13, chapters: 29 },
  { name: "2 Crônicas", id: 14, chapters: 36 },
  { name: "Esdras", id: 15, chapters: 10 },
  { name: "Neemias", id: 16, chapters: 13 },
  { name: "Ester", id: 17, chapters: 10 },
  { name: "Jó", id: 18, chapters: 42 },
  { name: "Salmos", id: 19, chapters: 150 },
  { name: "Provérbios", id: 20, chapters: 31 },
  { name: "Eclesiastes", id: 21, chapters: 12 },
  { name: "Cantares", id: 22, chapters: 8 },
  { name: "Isaías", id: 23, chapters: 66 },
  { name: "Jeremias", id: 24, chapters: 52 },
  { name: "Lamentações", id: 25, chapters: 5 },
  { name: "Ezequiel", id: 26, chapters: 48 },
  { name: "Daniel", id: 27, chapters: 12 },
  { name: "Oséias", id: 28, chapters: 14 },
  { name: "Joel", id: 29, chapters: 3 },
  { name: "Amós", id: 30, chapters: 9 },
  { name: "Obadias", id: 31, chapters: 1 },
  { name: "Jonas", id: 32, chapters: 4 },
  { name: "Miquéias", id: 33, chapters: 7 },
  { name: "Naum", id: 34, chapters: 3 },
  { name: "Habacuque", id: 35, chapters: 3 },
  { name: "Sofonias", id: 36, chapters: 3 },
  { name: "Ageu", id: 37, chapters: 2 },
  { name: "Zacarias", id: 38, chapters: 14 },
  { name: "Malaquias", id: 39, chapters: 4 },
  { name: "Mateus", id: 40, chapters: 28 },
  { name: "Marcos", id: 41, chapters: 16 },
  { name: "Lucas", id: 42, chapters: 24 },
  { name: "João", id: 43, chapters: 21 },
  { name: "Atos", id: 44, chapters: 28 },
  { name: "Romanos", id: 45, chapters: 16 },
  { name: "1 Coríntios", id: 46, chapters: 16 },
  { name: "2 Coríntios", id: 47, chapters: 13 },
  { name: "Gálatas", id: 48, chapters: 6 },
  { name: "Efésios", id: 49, chapters: 6 },
  { name: "Filipenses", id: 50, chapters: 4 },
  { name: "Colossenses", id: 51, chapters: 4 },
  { name: "1 Tessalonicenses", id: 52, chapters: 5 },
  { name: "2 Tessalonicenses", id: 53, chapters: 3 },
  { name: "1 Timóteo", id: 54, chapters: 6 },
  { name: "2 Timóteo", id: 55, chapters: 4 },
  { name: "Tito", id: 56, chapters: 3 },
  { name: "Filemom", id: 57, chapters: 1 },
  { name: "Hebreus", id: 58, chapters: 13 },
  { name: "Tiago", id: 59, chapters: 5 },
  { name: "1 Pedro", id: 60, chapters: 5 },
  { name: "2 Pedro", id: 61, chapters: 3 },
  { name: "1 João", id: 62, chapters: 5 },
  { name: "2 João", id: 63, chapters: 1 },
  { name: "3 João", id: 64, chapters: 1 },
  { name: "Judas", id: 65, chapters: 1 },
  { name: "Apocalipse", id: 66, chapters: 22 },
];

export const oldTestamentBooks = bibleBooks.slice(0, 39).map((book) => book.name);
export const newTestamentBooks = bibleBooks.slice(39).map((book) => book.name);

export function getBibleBook(name?: string | string[]) {
  const bookName = Array.isArray(name) ? name[0] : name;
  if (!bookName) return undefined;
  return bibleBooks.find((book) => book.name === bookName);
}
