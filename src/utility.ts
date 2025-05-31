import type {
	BasicDictionary,
	BasicLanguage,
	LokusDictionaryFile,
	LokusTranslateFile,
} from "./types.js";

export function extractBaseLanguage<
	DictionaryType extends BasicDictionary = BasicDictionary,
	BaseLanguageType extends BasicLanguage = BasicLanguage,
	LanguageType extends BasicLanguage = BasicLanguage,
>(
	data: LokusDictionaryFile<DictionaryType, BaseLanguageType, LanguageType>,
	timestamp: number = Date.now(),
): LokusDictionaryFile<DictionaryType, BaseLanguageType, never> {
	return {
		type: "dictionary",
		base: data.base,
		baseLanguage: data.baseLanguage,
		dictionaries: {},
		timestamp,
	};
}

export function combineTranslations<
	DictionaryType extends BasicDictionary = BasicDictionary,
	BaseLanguageType extends BasicLanguage = BasicLanguage,
	LanguagesType extends BasicLanguage = BasicLanguage,
>(
	base: LokusDictionaryFile<DictionaryType, BaseLanguageType, LanguagesType>,
	translations: LokusTranslateFile<DictionaryType, LanguagesType>[],
	timestamp = Date.now(),
): LokusDictionaryFile<DictionaryType, BaseLanguageType, LanguagesType> {
	const ret = {
		...base,
		timestamp,
	};
	for (const translation of translations) {
		if (translation.type !== "translate") {
			throw new Error("Invalid translation file type");
		}
		if (translation.language in ret.dictionaries) {
			ret.dictionaries[translation.language] = {
				...ret.dictionaries[translation.language],
				...translation.dictionary,
			};
		} else {
			ret.dictionaries[translation.language] = translation.dictionary;
		}
	}
	return ret;
}
