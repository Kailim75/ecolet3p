// Lecture et découpage du PDF d'attestations CMA (une page = un candidat).
// pdfjs-dist et pdf-lib sont chargés à la demande : uniquement dans l'admin.
import { parseAttestationText, type ParsedAttestation } from "@/lib/examResults";

export interface AttestationPage {
  pageIndex: number; // 0-based
  parsed: ParsedAttestation | null;
}

type TextItem = { str?: string; hasEOL?: boolean };

export const pageTextFromItems = (items: TextItem[]) =>
  items.map((i) => (i.str ?? "") + (i.hasEOL ? "\n" : "")).join("");

/** Texte de chaque page du PDF, dans l'ordre */
export const readPdfPageTexts = async (bytes: Uint8Array): Promise<string[]> => {
  const pdfjs = await import("pdfjs-dist");
  if (!pdfjs.GlobalWorkerOptions.workerSrc) {
    const { default: workerUrl } = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
    pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
  }
  // pdfjs transfère le buffer au worker : on lui passe une copie
  const task = pdfjs.getDocument({ data: bytes.slice() });
  const doc = await task.promise;
  const texts: string[] = [];
  for (let n = 1; n <= doc.numPages; n++) {
    const content = await (await doc.getPage(n)).getTextContent();
    texts.push(pageTextFromItems(content.items as TextItem[]));
  }
  await task.destroy();
  return texts;
};

export const readAttestationPdf = async (bytes: Uint8Array): Promise<AttestationPage[]> =>
  (await readPdfPageTexts(bytes)).map((text, pageIndex) => ({ pageIndex, parsed: parseAttestationText(text) }));

/** PDF d'une seule page extrait du document source */
export const extractPdfPage = async (bytes: Uint8Array, pageIndex: number): Promise<Uint8Array> => {
  const { PDFDocument } = await import("pdf-lib");
  const source = await PDFDocument.load(bytes);
  const out = await PDFDocument.create();
  const [page] = await out.copyPages(source, [pageIndex]);
  out.addPage(page);
  out.setTitle("Attestation de réussite aux épreuves d'admissibilité");
  return out.save();
};

/** PDF composé des pages indiquées (0-based) du document source */
export const extractPdfPages = async (bytes: Uint8Array, pageIndexes: number[], title: string): Promise<Uint8Array> => {
  const { PDFDocument } = await import("pdf-lib");
  const source = await PDFDocument.load(bytes);
  const out = await PDFDocument.create();
  for (const page of await out.copyPages(source, pageIndexes)) out.addPage(page);
  out.setTitle(title);
  return out.save();
};
