import { digest } from "./digest.js";

export const stageD = value => digest("HEXAGON:FINAL:" + value);
