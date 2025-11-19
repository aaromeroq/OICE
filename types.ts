import React from 'react';

export type Region = 'Europe' | 'South America' | 'Asia' | 'Central & North America';
export type ResearchTopicLabel = 'Financing' | 'Risk Management' | 'Cost-Benefit' | 'Governance';

export type MapCoordinates = [number, number][];

export interface Project {
  id: string;
  name: string;
  region: Region;
  countries: string[];
  modelType: string;
  summary: string;
  keyFeatures: string[];
  challenges: string[];
  mapCoordinates: MapCoordinates;
  // New technical details for rich visualization
  technology: 'AC' | 'HVDC';
  capacityMW: number;
  voltageKV: number;
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