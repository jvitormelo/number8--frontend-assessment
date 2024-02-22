export function slugify(text: string, id: number): string {
  return text.toLowerCase().replace(/ /g, "-") + "-" + id;
}

export const allowNumbersRegex = /^\d*$/;
