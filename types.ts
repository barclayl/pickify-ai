// Core Types & Enums
export type League = 'NFL' | 'NCAA';
export type LeagueFilter = 'ALL' | League;

export enum View {
  HOME,
  GAME,
  SUBSCRIPTION,
  PERFORMANCE,
  ACCOUNT,
  TEAM_TRACKER,
  AI_ANALYST,
}

// Sports Entities
export interface Player {
  id: string;
  name: string;
  team: string;
  position: 'QB' | 'RB' | 'WR' | 'TE';
  photoUrl: string;
}

export interface Game {
  id: string;
  league: League;
  teamA: { name: string; logoUrl: string; };
  teamB: { name: string; logoUrl: string; };
  time: string;
  aiEdge: string;
  props: PropBet[];
}

export interface SelectableTeam {
  id: string;
  name: string;
  logoUrl: string;
  league: League;
}

// Betting Entities
export interface PropBet {
  id: string;
  player: Player;
  stat: string;
  line: number;
  type: 'Over' | 'Under';
  odds: string;
  aiReasoning: string[];
  aiConfidence: number; // 0-100
}

export interface HistoricalBet extends PropBet {
  result: 'Win' | 'Loss';
}

// User & Account Entities
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Subscription {
    status: 'Free' | 'Unlimited';
    renewalDate?: string;
}

export interface BillingRecord {
    id: string;
    date: string;
    description: string;
    amount: string;
}

// AI Analyst
export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}
