
export interface GameItem {
  id: number;
  title: string;
  image: string;
  playerCount: number;
  provider: string;
  exclusive?: boolean;
}

export interface CasinoItem {
  id: number;
  name: string;
  logo: string;
  safetyIndex: "HIGH" | "VERY HIGH" | "MEDIUM" | "LOW";
}

export interface PromoSpace {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  position: "sidebar" | "header" | "footer" | "inline";
  active: boolean;
}
