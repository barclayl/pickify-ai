import { Game, Player, PropBet, HistoricalBet, User, Subscription, BillingRecord, SelectableTeam } from './types';

// Players
const PLAYERS: { [key: string]: Player } = {
  mahomes: { id: 'p1', name: 'Patrick Mahomes', team: 'Kansas City Chiefs', position: 'QB', photoUrl: 'https://picsum.photos/seed/mahomes/100/100' },
  pacheco: { id: 'p2', name: 'Isiah Pacheco', team: 'Kansas City Chiefs', position: 'RB', photoUrl: 'https://picsum.photos/seed/pacheco/100/100' },
  kelce: { id: 'p3', name: 'Travis Kelce', team: 'Kansas City Chiefs', position: 'TE', photoUrl: 'https://picsum.photos/seed/kelce/100/100' },
  jackson: { id: 'p4', name: 'Lamar Jackson', team: 'Baltimore Ravens', position: 'QB', photoUrl: 'https://picsum.photos/seed/jackson/100/100' },
  henry: { id: 'p5', name: 'Derrick Henry', team: 'Baltimore Ravens', position: 'RB', photoUrl: 'https://picsum.photos/seed/henry/100/100' },
  andrews: { id: 'p6', name: 'Mark Andrews', team: 'Baltimore Ravens', position: 'TE', photoUrl: 'https://picsum.photos/seed/andrews/100/100' },
  stroud: { id: 'p7', name: 'C.J. Stroud', team: 'Houston Texans', position: 'QB', photoUrl: 'https://picsum.photos/seed/stroud/100/100' },
  dell: { id: 'p8', name: 'Tank Dell', team: 'Houston Texans', position: 'WR', photoUrl: 'https://picsum.photos/seed/dell/100/100' },
};

// Prop Bets
const GAME1_PROPS: PropBet[] = [
  { id: 'b1', player: PLAYERS.mahomes, stat: 'Passing Touchdowns', line: 2.5, type: 'Over', odds: '+120', aiConfidence: 88, aiReasoning: ["Mahomes has thrown 3+ TDs in 4 of his last 5 games against the Ravens.", "Ravens' secondary has allowed multiple passing TDs in 3 straight games."] },
  { id: 'b2', player: PLAYERS.pacheco, stat: 'Rushing Yards', line: 87.5, type: 'Over', odds: '-110', aiConfidence: 92, aiReasoning: ["Pacheco is averaging 22 carries over the last 3 games.", "Opponent's defense ranks 25th against the run, giving up 130 yards/game."] },
  { id: 'b3', player: PLAYERS.kelce, stat: 'Receptions', line: 6.5, type: 'Under', odds: '+150', aiConfidence: 75, aiReasoning: ["Ravens have an elite linebacker corps known for covering TEs.", "Kelce's target share has decreased slightly in the last two weeks."] },
  { id: 'b4', player: PLAYERS.jackson, stat: 'Rushing Yards', line: 65.5, type: 'Over', odds: '-105', aiConfidence: 85, aiReasoning: ["Jackson has exceeded this line in 60% of his games this season.", "The Chiefs' defense is geared to stop the pass, potentially opening up running lanes."] },
  { id: 'b5', player: PLAYERS.henry, stat: 'Rushing Touchdowns', line: 0.5, type: 'Over', odds: '-150', aiConfidence: 95, aiReasoning: ["Henry leads the league in red-zone carries.", "The Chiefs have allowed a rushing TD to a primary back in 4 of the last 5 games."] },
];

const GAME2_PROPS: PropBet[] = [
  { id: 'b6', player: PLAYERS.stroud, stat: 'Passing Yards', line: 280.5, type: 'Over', odds: '-115', aiConfidence: 91, aiReasoning: ["Stroud has the highest yards-per-attempt in the league.", "The opposing defense has a weak pass rush, giving him time in the pocket."] },
  { id: 'b7', player: PLAYERS.dell, stat: 'Receiving Yards', line: 75.5, type: 'Over', odds: '+110', aiConfidence: 86, aiReasoning: ["Dell has become Stroud's primary deep threat.", "Opponent's top cornerback is questionable with an injury."] },
];

// Today's Top 3 (can be any from any game)
export const TOP_BETS: PropBet[] = [
    GAME1_PROPS[4],
    GAME1_PROPS[1],
    GAME2_PROPS[0],
];

// Historical Bets for Performance Page
export const HISTORICAL_BETS: HistoricalBet[] = [
  { ...GAME1_PROPS[0], id: 'h1', result: 'Win' },
  { ...GAME1_PROPS[1], id: 'h2', result: 'Win' },
  { ...GAME1_PROPS[2], id: 'h3', result: 'Loss' },
  { ...GAME1_PROPS[3], id: 'h4', result: 'Win' },
  { ...GAME1_PROPS[4], id: 'h5', result: 'Win' },
  { ...GAME2_PROPS[0], id: 'h6', result: 'Loss' },
  { ...GAME2_PROPS[1], id: 'h7', result: 'Win' },
  { id: 'h8', player: PLAYERS.mahomes, stat: 'Passing Yards', line: 305.5, type: 'Over', odds: '-110', aiConfidence: 82, aiReasoning: ["Historical performance supports this."], result: 'Win' },
  { id: 'h9', player: PLAYERS.kelce, stat: 'Receiving Yards', line: 70.5, type: 'Over', odds: '-115', aiConfidence: 78, aiReasoning: ["Favorable matchup."], result: 'Loss' },
  { id: 'h10', player: PLAYERS.henry, stat: 'Rushing Yards', line: 95.5, type: 'Over', odds: '-120', aiConfidence: 90, aiReasoning: ["High volume expected."], result: 'Win' },
];

// Selectable Teams
export const NFL_TEAMS: SelectableTeam[] = [
  { id: 'nfl1', name: 'Kansas City Chiefs', logoUrl: 'https://picsum.photos/seed/chiefs/50/50', league: 'NFL' },
  { id: 'nfl2', name: 'Baltimore Ravens', logoUrl: 'https://picsum.photos/seed/ravens/50/50', league: 'NFL' },
  { id: 'nfl3', name: 'Houston Texans', logoUrl: 'https://picsum.photos/seed/texans/50/50', league: 'NFL' },
  { id: 'nfl4', name: 'Green Bay Packers', logoUrl: 'https://picsum.photos/seed/packers/50/50', league: 'NFL' },
  { id: 'nfl5', name: 'Detroit Lions', logoUrl: 'https://picsum.photos/seed/lions/50/50', league: 'NFL' },
  { id: 'nfl6', name: 'San Francisco 49ers', logoUrl: 'https://picsum.photos/seed/49ers/50/50', league: 'NFL' },
];

export const NCAA_TEAMS: SelectableTeam[] = [
  { id: 'ncaa1', name: 'Michigan Wolverines', logoUrl: 'https://picsum.photos/seed/wolverines/50/50', league: 'NCAA' },
  { id: 'ncaa2', name: 'Alabama Crimson Tide', logoUrl: 'https://picsum.photos/seed/tide/50/50', league: 'NCAA' },
  { id: 'ncaa3', name: 'Georgia Bulldogs', logoUrl: 'https://picsum.photos/seed/bulldogs/50/50', league: 'NCAA' },
  { id: 'ncaa4', name: 'Ohio State Buckeyes', logoUrl: 'https://picsum.photos/seed/buckeyes/50/50', league: 'NCAA' },
  { id: 'ncaa5', name: 'Texas Longhorns', logoUrl: 'https://picsum.photos/seed/longhorns/50/50', league: 'NCAA' },
  { id: 'ncaa6', name: 'USC Trojans', logoUrl: 'https://picsum.photos/seed/trojans/50/50', league: 'NCAA' },
];

export const SELECTABLE_TEAMS: SelectableTeam[] = [...NFL_TEAMS, ...NCAA_TEAMS];

// NCAA Game
const NCAA_GAME: Game = {
    id: 'g4',
    league: 'NCAA',
    teamA: { name: 'Michigan Wolverines', logoUrl: 'https://picsum.photos/seed/wolverines/50/50' },
    teamB: { name: 'Ohio State Buckeyes', logoUrl: 'https://picsum.photos/seed/buckeyes/50/50' },
    time: 'Saturday @ 12:00 PM',
    aiEdge: "A classic rivalry. The AI projects a defensive battle, with player props for sacks and interceptions being favorable.",
    props: [],
};

// Games
export const GAMES: Game[] = [
  { 
    id: 'g1', 
    league: 'NFL',
    teamA: { name: 'Kansas City Chiefs', logoUrl: 'https://picsum.photos/seed/chiefs/50/50' }, 
    teamB: { name: 'Baltimore Ravens', logoUrl: 'https://picsum.photos/seed/ravens/50/50' }, 
    time: 'Today @ 8:20 PM',
    aiEdge: "The AI believes the Chiefs will focus on their running game, so look for Isiah Pacheco to have a big day. The model predicts a close, high-scoring affair.",
    props: GAME1_PROPS
  },
  { 
    id: 'g2', 
    league: 'NFL',
    teamA: { name: 'Houston Texans', logoUrl: 'https://picsum.photos/seed/texans/50/50' }, 
    teamB: { name: 'Green Bay Packers', logoUrl: 'https://picsum.photos/seed/packers/50/50' }, 
    time: 'Sunday @ 1:00 PM',
    aiEdge: "Our model highlights a significant mismatch in the Texans' passing attack versus the Packers' secondary. Expect C.J. Stroud to exploit this matchup.",
    props: GAME2_PROPS
  },
  { 
    id: 'g3', 
    league: 'NFL',
    teamA: { name: 'Detroit Lions', logoUrl: 'https://picsum.photos/seed/lions/50/50' }, 
    teamB: { name: 'San Francisco 49ers', logoUrl: 'https://picsum.photos/seed/49ers/50/50' }, 
    time: 'Sunday @ 4:30 PM',
    aiEdge: "The AI predicts a ground-and-pound game from both sides. This could suppress passing stats but elevate rushing props for key running backs.",
    props: [] // No props for this game in mock data
  },
];

export const ALL_GAMES: Game[] = [...GAMES, NCAA_GAME];

// Account Data
export const USER: User = {
    id: 'u1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
};

export const SUBSCRIPTION: Subscription = {
    status: 'Unlimited',
    renewalDate: 'October 25, 2024',
};

// Or for a free user:
// export const SUBSCRIPTION: Subscription = {
//     status: 'Free',
// };

export const BILLING_HISTORY: BillingRecord[] = [
    { id: 'bh1', date: 'Sep 25, 2024', description: 'Monthly Subscription', amount: '$29.99' },
    { id: 'bh2', date: 'Aug 25, 2024', description: 'Monthly Subscription', amount: '$29.99' },
    { id: 'bh3', date: 'Jul 25, 2024', description: 'Monthly Subscription', amount: '$29.99' },
    { id: 'bh4', date: 'Jun 12, 2024', description: 'Single Game Pack', amount: '$9.99' },
];