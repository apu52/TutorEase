export interface Tutor {
    _id: string;
    name: string;
    email: string;
    location: string;
    subject: string;
    rating?: number;
    preferredMode?: "online" | "offline";
    fees: number;
    description?: string;
    experience?: number;
    verified?: boolean;
  }
  