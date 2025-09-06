
export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace spaces/special chars with "-"
    .replace(/(^-|-$)+/g, '')   // trim leading/trailing "-"
}
