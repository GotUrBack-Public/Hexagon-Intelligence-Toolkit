import { digest } from "./digest.js";

export const stageB = value => digest("HEXAGON:B:" + value);
