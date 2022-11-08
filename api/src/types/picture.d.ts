import { number } from "zod";

export type PictureState = {
  id: string;
  count: number;
  data: Buffer | null;
  resetSecret: string | null;
};

export type Snapshot = {
  id: string;
  date: Date;
  data: string;
  count: number;
};
