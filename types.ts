import React from 'react';

export type Region = 'Europe' | 'South America' | 'Asia' | 'Central & North America';
export type ResearchTopicLabel = 'Financing' | 'Risk Management' | 'Cost-Benefit' | 'Governance';

export type MapCoordinates = [number, number][];

export type CommunityStatus = 'incubacion' | 'activa' | 'estancada' | 'abandonada';

export interface EnergyCommunity {
  id: string;
  name: string;
  region: Region;
  countries: string[];
  summary: string;
  mapCoordinates: [number, number]; // Singular coordinate for Scatterplot (Lng, Lat)
  status: CommunityStatus;
  
  // Taxonomía de 4 Dimensiones + Frameworks Académicos
  dimensionTE: {
    technology: string;
    capacityMW?: number;
    description: string;
    tisScore?: number[]; // 7 Funciones TIS (1-5)
  };
  dimensionGO: {
    model: string;
    membersCount?: number;
    description: string;
    ostromChecklist?: boolean[]; // 8 Principios de Ostrom
  };
  dimensionRF: {
    legalStatus: string;
    financingMechanism: string;
    description: string;
    isRegulatoryDivideAffected: boolean;
    regulatoryNotes?: string;
  };
  dimensionAS: {
    localImpact: string;
    description: string;
    emancipationLevel: number; // 1-5 (RIPCEL Scale)
  };
}

export interface ResearchTopic {
  id: string;
  topic: string;
  summary: string;
  icon: React.ElementType;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  date: string;
  link: string;
  // Fix: Add optional 'region' and 'topic' properties to align with data in `data/news.ts`.
  // These are made optional to avoid breaking `NewsFeed.tsx`, which fetches data that lacks these fields.
  region?: string;
  topic?: string;
}

export interface AcademicPublication {
  id: string;
  title: string;
  authors: string[];
  year: number | null;
  abstract: string | null;
  link: string;
  journal: string | null;
}

export interface NetworkMember {
  name: string;
  institution: string;
  country: string;
  role: string;
  email: string;
}