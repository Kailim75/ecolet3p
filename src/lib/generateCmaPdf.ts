import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  admissibiliteSessions,
  admissionSessions,
  admissionDepartements,
} from "@/data/cmaCalendarData";

// Extend jsPDF type for autotable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: { finalY: number };
  }
}

const BRAND = {
  name: "ECOLE T3P",
  baseline: "Centre de formation agréé Préfecture",
  address: "3 rue Corneille, 92120 Montrouge",
  phone: "01 88 75 05 55",
  email: "montrouge@ecolet3p.fr",
  website: "www.ecolet3p.fr",
};

const COLORS = {
  darkGreen: [27, 77, 62] as [number, number, number],
  navy: [26, 82, 118] as [number, number, number],
  orange: [211, 84, 0] as [number, number, number],
  black: [26, 26, 26] as [number, number, number],
  grey: [100, 100, 100] as [number, number, number],
  lightGrey: [200, 200, 200] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  headerBg: [27, 77, 62] as [number, number, number],
  altRow: [245, 247, 250] as [number, number, number],
};

function addHeader(doc: jsPDF) {
  const pageWidth = doc.internal.pageSize.getWidth();

  // Top accent line
  doc.setFillColor(...COLORS.darkGreen);
  doc.rect(0, 0, pageWidth, 4, "F");

  // Logo text
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...COLORS.darkGreen);
  doc.text("ÉCOLE T3P", 20, 22);

  // Baseline
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.grey);
  doc.text(BRAND.baseline, 20, 28);

  // Contact block (right)
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.black);
  const rightX = pageWidth - 20;
  doc.text(BRAND.address, rightX, 14, { align: "right" });
  doc.text(`Tél : ${BRAND.phone}`, rightX, 19, { align: "right" });
  doc.setTextColor(...COLORS.navy);
  doc.text(BRAND.email, rightX, 24, { align: "right" });
  doc.text(BRAND.website, rightX, 29, { align: "right" });

  // Separator
  doc.setDrawColor(...COLORS.lightGrey);
  doc.setLineWidth(0.5);
  doc.line(20, 34, pageWidth - 20, 34);

  return 40; // Y position after header
}

function addFooter(doc: jsPDF) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setDrawColor(...COLORS.lightGrey);
  doc.setLineWidth(0.3);
  doc.line(20, pageHeight - 18, pageWidth - 20, pageHeight - 18);

  doc.setFontSize(7);
  doc.setTextColor(...COLORS.grey);
  doc.text(
    `${BRAND.name} — ${BRAND.address} — ${BRAND.phone} — ${BRAND.website}`,
    pageWidth / 2,
    pageHeight - 12,
    { align: "center" }
  );
  doc.text(
    "Source : Chambre de Métiers et de l'Artisanat Île-de-France — Calendrier prévisionnel 2026 (sous réserve de modifications)",
    pageWidth / 2,
    pageHeight - 8,
    { align: "center" }
  );
}

export function generateAdmissibilitePdf() {
  const doc = new jsPDF("portrait", "mm", "a4");
  let y = addHeader(doc);

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...COLORS.navy);
  doc.text("Calendrier des examens CMA 2026", 20, y + 4);

  doc.setFontSize(12);
  doc.setTextColor(...COLORS.darkGreen);
  doc.text("Épreuves d'admissibilité (théorique)", 20, y + 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.grey);
  doc.text("Île-de-France — Cartes professionnelles Taxi, VTC et VMDTR", 20, y + 19);

  y += 26;

  // Table
  doc.autoTable({
    startY: y,
    margin: { left: 20, right: 20 },
    head: [["Session", "Date limite d'inscription", "Convocations", "Places"]],
    body: admissibiliteSessions.map((s) => [
      s.session,
      s.inscriptionDeadline,
      s.convocations,
      s.places,
    ]),
    headStyles: {
      fillColor: COLORS.headerBg,
      textColor: COLORS.white,
      fontStyle: "bold",
      fontSize: 9,
    },
    bodyStyles: {
      fontSize: 9,
      textColor: COLORS.black,
    },
    alternateRowStyles: {
      fillColor: COLORS.altRow,
    },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 28 },
      1: { textColor: COLORS.orange, cellWidth: 55 },
    },
  });

  // CTA block
  const finalY = doc.lastAutoTable.finalY + 12;
  const pageWidth = doc.internal.pageSize.getWidth();
  const boxW = pageWidth - 40;

  doc.setFillColor(245, 250, 248);
  doc.roundedRect(20, finalY, boxW, 30, 3, 3, "F");
  doc.setDrawColor(...COLORS.darkGreen);
  doc.setLineWidth(0.3);
  doc.roundedRect(20, finalY, boxW, 30, 3, 3, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.darkGreen);
  doc.text("Préparez votre examen avec ECOLE T3P", pageWidth / 2, finalY + 10, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.grey);
  doc.text("94% de réussite dès le 1er passage — Formations Taxi, VTC et VMDTR", pageWidth / 2, finalY + 17, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.orange);
  doc.text(`Inscriptions : ${BRAND.phone} — ${BRAND.email}`, pageWidth / 2, finalY + 24, { align: "center" });

  addFooter(doc);
  doc.save("calendrier-admissibilite-cma-2026-ecole-t3p.pdf");
}

export function generateAdmissionPdf() {
  const doc = new jsPDF("landscape", "mm", "a4");
  let y = addHeader(doc);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...COLORS.navy);
  doc.text("Calendrier des examens CMA 2026", 20, y + 4);

  doc.setFontSize(12);
  doc.setTextColor(...COLORS.darkGreen);
  doc.text("Épreuves d'admission (pratique)", 20, y + 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.grey);
  doc.text("Départements 75 (Paris), 92 (Hauts-de-Seine), 93 (Seine-Saint-Denis), 94 (Val-de-Marne)", 20, y + 19);

  y += 26;

  const headers = ["Session", ...admissionDepartements.map((d) => `Dept ${d}`), "Clôture inscription"];

  doc.autoTable({
    startY: y,
    margin: { left: 20, right: 20 },
    head: [headers],
    body: admissionSessions.map((s) => [
      s.session,
      ...admissionDepartements.map(() => s.dates),
      s.inscriptionDeadline,
    ]),
    headStyles: {
      fillColor: COLORS.headerBg,
      textColor: COLORS.white,
      fontStyle: "bold",
      fontSize: 9,
      halign: "center",
    },
    bodyStyles: {
      fontSize: 9,
      textColor: COLORS.black,
      halign: "center",
    },
    alternateRowStyles: {
      fillColor: COLORS.altRow,
    },
    columnStyles: {
      0: { fontStyle: "bold", halign: "left" },
      5: { textColor: COLORS.orange },
    },
  });

  // CTA block
  const finalY = doc.lastAutoTable.finalY + 12;
  const pageWidth = doc.internal.pageSize.getWidth();
  const boxW = pageWidth - 40;

  doc.setFillColor(245, 250, 248);
  doc.roundedRect(20, finalY, boxW, 30, 3, 3, "F");
  doc.setDrawColor(...COLORS.darkGreen);
  doc.setLineWidth(0.3);
  doc.roundedRect(20, finalY, boxW, 30, 3, 3, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.darkGreen);
  doc.text("Préparez votre examen avec ECOLE T3P", pageWidth / 2, finalY + 10, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.grey);
  doc.text("94% de réussite dès le 1er passage — Formations Taxi, VTC et VMDTR", pageWidth / 2, finalY + 17, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.orange);
  doc.text(`Inscriptions : ${BRAND.phone} — ${BRAND.email}`, pageWidth / 2, finalY + 24, { align: "center" });

  addFooter(doc);
  doc.save("calendrier-admission-cma-2026-ecole-t3p.pdf");
}
