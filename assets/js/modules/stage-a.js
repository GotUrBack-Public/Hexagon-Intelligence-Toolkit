import { digest } from "./digest.js";

export const stageA = value => digest("HEXAGON:A:" + value);
