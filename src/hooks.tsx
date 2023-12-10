import { useMediaQuery } from "@mantine/hooks";

const MOBILE_SIZE = "62em";

export function useIsMobile(): boolean {
  const is_mobile = useMediaQuery(`(max-width: ${MOBILE_SIZE})`);

  return is_mobile ?? false;
}
