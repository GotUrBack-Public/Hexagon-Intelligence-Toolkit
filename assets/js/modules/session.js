import { settings } from "../../../config/client-settings.js";

export const isAuthenticated = () => sessionStorage.getItem(settings.sessionKey) === "true";
export const startSession = () => sessionStorage.setItem(settings.sessionKey, "true");
export const endSession = () => sessionStorage.removeItem(settings.sessionKey);
