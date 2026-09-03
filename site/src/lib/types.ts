export interface Example {
  name: string;
  url: string;
}

export interface SupportingInfrastructureRef {
  "infrastructure-id": string;
  "capture-function": string;
  status: "active";
}

export type OpusRafDomain = "Research" | "Education" | "Leadership" | "Valorisation";

// CoARA OI4RRA's four-tier reference architecture (https://doi.org/10.5281/zenodo.15297695).
// A platform can hold more than one — ORCID is both the researcher PID (Tier 0)
// and the record an assessment panel reads (Tier 3).
export type CoaraTier = "Tier 0" | "Tier 1" | "Tier 2" | "Tier 3";

export interface Artefact {
  id: string;
  category: string;
  "opus-raf-domain"?: OpusRafDomain;
  artefact: string;
  explanation: string;
  activities: string[];
  examples: Example[];
  "supporting-infrastructure": SupportingInfrastructureRef[];
  "added-in-version": string;
  "last-modified-version": string;
}

export interface CatalogueData {
  catalogueVersion: string;
  artefacts: Artefact[];
}

export interface ArtefactRef {
  id: string;
  artefact: string;
  category: string;
  captureFunction: string;
}

// How a platform's logo is sourced for the Infrastructure page. The LOGOS map
// itself stays in infrastructure.astro, where contributors are told to add to
// it; only the shape lives here, so InfraCard.astro can be typed against it.
export type LogoEntry =
  | { type: "img"; src: string; scale?: number; width?: number }
  | { type: "svg"; markup: string }
  | { type: "icon"; key: string; color: string };

export interface InfrastructureEntry {
  id: string;
  name: string;
  url: string;
  function: string;
  "coara-tiers"?: CoaraTier[];
  // Present on every platform outside "Publishing & PID provision", whose
  // cards show their active credit mappings instead.
  usability?: string;
  "added-in-version": string;
  "last-modified-version": string;
  activeFor: ArtefactRef[];
}

export interface ReformInitiative {
  id: string;
  initiative: string;
  year: number;
  "core-philosophy": string;
  "relevance-to-ntos": string;
  url: string;
  "added-in-version": string;
  "last-modified-version": string;
}

export interface Stats {
  catalogueVersion: string;
  artefactCount: number;
  categoryCount: number;
  infrastructureCount: number;
  reformInitiativeCount: number;
  categories: string[];
}
