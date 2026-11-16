import { calculateKey } from "./engine.js";
import { keyring } from "./keyring.js";

export async function verifyKey(value) {
  const candidate = await calculateKey(value.trim().toUpperCase());
  return keyring.includes(candidate);
}
