"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type NiwiOverlayPortalProps = PropsWithChildren<{
  show: boolean;
}>;

function NiwiOverlayPortal({ children, show }: NiwiOverlayPortalProps) {
  const [isMounted, setIsMounted] = useState(false);

  const [dom, setDom] = useState(() => {
    if (typeof document !== "undefined" && document) {
      return document.body;
    }
    return null;
  });

  useEffect(() => {
    if (!dom) setDom(document.body);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    show
      ? document.body.classList.add("niwi-overlay-body")
      : document.body.classList.remove("niwi-overlay-body");
  }, [show]);

  useEffect(() => {
    return () => {
      if (document.body) {
        document.body.classList.remove("niwi-overlay-body");
      }
    };
  }, []);

  if (!isMounted) return null;

  if (!dom) return null;

  return createPortal(children, dom);
}
export default NiwiOverlayPortal;
