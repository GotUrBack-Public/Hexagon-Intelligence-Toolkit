import { stageA } from "./stage-a.js";
import { stageB } from "./stage-b.js";
import { stageC } from "./stage-c.js";
import { stageD } from "./stage-d.js";

export async function calculateKey(value) {
  const first = await stageA(value);
  const second = await stageB(first);
  const third = await stageC(second);
  return stageD(third);
}
