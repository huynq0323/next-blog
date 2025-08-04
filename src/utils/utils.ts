import { DEFAULT_PAGINATION, MAX_SIZE } from "@/constants/constant";

export function cleanParams(input: Record<string, any>): Record<string, any> {
  const params: Record<string, any> = {};

  const newInput = {
    ...DEFAULT_PAGINATION,
    ...input,
  };

  Object.entries(newInput).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      !(typeof value === "string" && (value as string).trim() === "")
    ) {
      params[key] = value;
    }
  });

  return { params };
}

export function cleanParamsMaxSize(input: Record<string, any>) {
  const params: Record<string, any> = {
    ...cleanParams(input).params,
    pageSize: MAX_SIZE,
  };
  return { params };
}

export function getSerialNumber(index: number, page?: number, pageSize?: number): number {
  if (!page || !pageSize) return index + 1;
  return (page - 1) * pageSize + index + 1;
}
