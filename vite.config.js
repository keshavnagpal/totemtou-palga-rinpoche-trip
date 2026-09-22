import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://keshavnagpal.github.io/totemtou-palga-rinpoche-trip/,
// so the build needs that subpath as its base. Local dev stays at "/".
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/totemtou-palga-rinpoche-trip/" : "/",
  plugins: [react()],
}));
