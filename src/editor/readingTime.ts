/** Clés techniques ignorées, comme `BlocContent::IGNORED_SEARCH_KEYS` côté API. */
export const READING_TIME_IGNORED_KEYS = ['id', 'url', 'src', 'icon', 'language', 'variant', 'aspectRatio'];

const collectStrings = (value: unknown, ignored: readonly string[], acc: string[]): void => {
  if (typeof value === 'string') {
    acc.push(value);
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectStrings(item, ignored, acc));
  } else if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => {
      if (!ignored.includes(key)) collectStrings(item, ignored, acc);
    });
  }
};

/**
 * Temps de lecture estimé (minutes, arrondi, minimum 1) à partir du contenu textuel des blocs.
 * `null` si les blocs ne contiennent aucun mot.
 */
export const computeReadingTime = (
  blocks: readonly { data: unknown }[],
  { wordsPerMinute = 200, ignoredKeys = READING_TIME_IGNORED_KEYS } = {},
): number | null => {
  const strings: string[] = [];
  blocks.forEach((block) => collectStrings(block.data, ignoredKeys, strings));

  const words = strings.join(' ').split(/\s+/).filter(Boolean).length;
  return words === 0 ? null : Math.max(1, Math.round(words / wordsPerMinute));
};
