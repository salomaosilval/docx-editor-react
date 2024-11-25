import _ from "lodash";

/**
 * Substitui placeholders no formato {{placeholder}} dentro de um texto.
 * @param text Texto com placeholders.
 * @param values Valores a serem substituídos.
 * @returns Texto processado.
 */
export const processPlaceholders = (text: string, values: Record<string, string> = {}): string => {
  const template = _.template(text);
  return template(values);
};
