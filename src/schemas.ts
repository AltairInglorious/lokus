import { z } from "zod/v4";

export const LokusDictionarySchema = z.object({
	type: z.literal("dictionary"),
	base: z.record(z.string(), z.string()),
	baseLanguage: z.string(),
	dictionaries: z.record(z.string(), z.record(z.string(), z.string())),
	timestamp: z.number().int().positive(),
});

export const LokusTranslateSchema = z.object({
	type: z.literal("translate"),
	language: z.string(),
	dictionary: z.record(z.string(), z.string()),
	timestamp: z.number().int().positive(),
});

export const LokusFileSchema = z.discriminatedUnion("type", [
	LokusDictionarySchema,
	LokusTranslateSchema,
]);
