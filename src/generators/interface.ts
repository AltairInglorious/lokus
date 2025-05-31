import type { LokusDictionaryFile } from "../types.js";

export interface ConfigGenerator {
	generateConfig(lokusData: LokusDictionaryFile): string;
}
