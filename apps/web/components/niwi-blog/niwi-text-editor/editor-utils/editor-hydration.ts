import { useEffect, useState } from "react";

export const useEditorHydrate = () => {
  const [hasEditorHydrate, setEditorHydrate] = useState(false);

  useEffect(() => setEditorHydrate(true), []);

  return hasEditorHydrate;
};
