export interface Character {
  id: string;
  name: string;
  imageUrl: string;
  keyword?: string;
  relationScore?: number;
  color?: {
    primary: string;
    secondary: string;
    background: string;
  };
}
