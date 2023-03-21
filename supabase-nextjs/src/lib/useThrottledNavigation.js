import { useRouter } from "next/router";
import { useCallback, useRef } from "react";

export const useThrottledNavigation = (delay = 500) => {
  const router = useRouter();
  const timeoutRef = useRef(null);

  const navigate = useCallback(
    (destination, options) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        router.push(destination, options);
      }, delay);
    },
    [router, delay]
  );

  return navigate;
};
