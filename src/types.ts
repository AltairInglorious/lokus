export type LokusFileType = "dictionary" | "translate";
export type BasicDictionary = Record<string, string>;
export type BasicLanguage = string;

export type LokusDictionaryFile<
	DictionaryType extends BasicDictionary = BasicDictionary,
	BaseLanguageType extends BasicLanguage = BasicLanguage,
	LanguagesType extends BasicLanguage = BasicLanguage,
> = {
	type: "dictionary";
	base: DictionaryType;
	baseLanguage: BaseLanguageType;
	dictionaries: Record<LanguagesType, Partial<DictionaryType>>;
	timestamp: number;
};

export type LokusTranslateFile<
	DictionaryType extends BasicDictionary = BasicDictionary,
	LanguageType extends BasicLanguage = BasicLanguage,
> = {
	type: "translate";
	language: LanguageType;
	dictionary: Partial<DictionaryType>;
	timestamp: number;
};

export type LokusFile<
	DictionaryType extends BasicDictionary = BasicDictionary,
	LanguageType extends BasicLanguage = BasicLanguage,
	BaseLanguageType extends LanguageType = LanguageType,
> =
	| LokusDictionaryFile<DictionaryType, LanguageType, BaseLanguageType>
	| LokusTranslateFile<DictionaryType, LanguageType>;
