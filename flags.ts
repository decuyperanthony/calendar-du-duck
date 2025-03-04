import { flag } from "flags/next";

export const isPassationEnabled = flag({
  key: "is-passation-enabled",
  description: "Active ou désactive l'accès à la route /passation",
  decide() {
    return true;
  },
  defaultValue: true,
});
