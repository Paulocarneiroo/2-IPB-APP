export type DocumentType =
    | 'bible'
    | 'hymnal'
    | 'confession'
    | 'catechism'
    | 'creed'
    | 'other';

export interface SacredDocument {
    _id?: string;
    type: DocumentType;
    title: string;
    content?: string;
    pdfUrl?: string;
    audioUrl?: string;
    updatedAt?: string;
}
