// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTypeName(obj: any): string | null {
  if (obj.constructor) {
    return obj.constructor.name;
  }
  return null;
}

export default function pickv(obj: unknown, filter: Record<string, string[]>): unknown {
  if (!obj || !filter) {
    return obj;
  }
  if (typeof obj === 'object' && !Array.isArray(obj) && obj instanceof Date === false) {
    const typedObj = obj as Record<string, unknown>;
    const type = getTypeName(typedObj);
    const keys = (type ? filter[type] : undefined) ?? Object.keys(typedObj);
    const result: Record<string, unknown> = {};
    for (const key of keys) {
      result[key] = pickv(typedObj[key], filter);
    }
    return result;
  }

  if (Array.isArray(obj)) {
    return obj.map((element) => pickv(element, filter));
  }

  return obj;
}
