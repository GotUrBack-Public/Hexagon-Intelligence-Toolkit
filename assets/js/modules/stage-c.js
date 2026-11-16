import { digest } from "./digest.js";

export const stageC = value => digest("HEXAGON:C:" + value);
