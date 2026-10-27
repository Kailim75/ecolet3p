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

export const readAttestationPdf = async (bytes: Uint8Array): Promise<AttestationPage[]> => {
  const pdfjs = await import("pdfjs-dist");
  if (!pdfjs.GlobalWorkerOptions.workerSrc) {
    const { default: workerUrl } = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
    pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
  }
  // pdfjs transfère le buffer au worker : on lui passe une copie
  const task = pdfjs.getDocument({ data: bytes.slice() });
  const doc = await task.promise;
  const pages: AttestationPage[] = [];
  for (let n = 1; n <= doc.numPages; n++) {
    const content = await (await doc.getPage(n)).getTextContent();
    pages.push({ pageIndex: n - 1, parsed: parseAttestationText(pageTextFromItems(content.items as TextItem[])) });
  }
  await task.destroy();
  return pages;
};

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
