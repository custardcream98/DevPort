import { useEffect, useState } from "react";

const useMountedState = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (mounted) {
      return;
    }
    setMounted(true);
  }, [mounted]);

  return mounted;
};

export default useMountedState;
