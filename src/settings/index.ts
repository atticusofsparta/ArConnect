import Setting from "./setting";

export const PREFIX = "setting_";

/** All settings */
const settings: Setting[] = [
  new Setting({
    name: "fee_multiplier",
    displayName: "Fee multiplier",
    description: "Control the fees payed after transactions",
    type: "number",
    defaultValue: 1
  }),
  new Setting({
    name: "currency",
    displayName: "Currency",
    description: "Fiat display currency",
    type: "pick",
    options: ["usd", "eur", "gbp"],
    defaultValue: "usd"
  }),
  new Setting({
    name: "arverify",
    displayName: "ArVerify treshold",
    description: "Set the verification threshold used",
    type: "number",
    defaultValue: 60
  }),
  new Setting({
    name: "arconfetti",
    displayName: "ArConfetti effect",
    description: "Show animation on wallet usage",
    type: "pick",
    options: [false, "arweave", "hedgehog", "usd"],
    defaultValue: "arweave"
  }),
  new Setting({
    name: "sign_notification",
    displayName: "Sign notification",
    description: "Notify when signing a transaction",
    type: "boolean",
    defaultValue: true
  })
];

/**
 * Get a setting instance
 */
export function getSetting(name: string) {
  return settings.find((setting) => setting.name === name);
}

export default settings;
