export interface Example {
  name: string;
  url: string;
}

export interface SupportingInfrastructureRef {
  "infrastructure-id": string;
  "capture-function": string;
  status: "active" | "planned";
}

export interface Artefact {
  id: string;
  category: string;
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

export interface InfrastructureEntry {
  id: string;
  name: string;
  url: string;
  function: string;
  "added-in-version": string;
  "last-modified-version": string;
  activeFor: ArtefactRef[];
  plannedFor: ArtefactRef[];
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
