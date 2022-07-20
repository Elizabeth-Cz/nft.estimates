import { useRouter } from "next/router";

interface GlobalQueryInterface {
  slug?: string;
  primeSlug?: string;
}

export const useQuery = (): GlobalQueryInterface => {
  const { query } = useRouter();
  return query;
};
export const useQueryField = (
  field: keyof GlobalQueryInterface
): string | undefined => {
  const { [field]: fieldValue } = useQuery();
  return fieldValue;
};
