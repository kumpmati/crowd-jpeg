import { SNAPSHOT_INTERVAL } from "../config/state";
import { saveSnapshot } from "./database";
import { getCurrentState } from "./state";

export const startBackupService = () => {
  console.log("started backup service");

  setInterval(async () => {
    console.log("backing up current state...");
    const state = getCurrentState();
    const result = await saveSnapshot(state);
    console.log(`backed up ${result.id} at count: ${result.count}`);
  }, SNAPSHOT_INTERVAL * 1000);
};
