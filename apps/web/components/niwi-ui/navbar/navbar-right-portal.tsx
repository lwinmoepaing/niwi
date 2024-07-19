"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type NavbarRightPortalProps = PropsWithChildren;

const PORTAL_ID = "niwi-navbar-right-portal";

function NavbarRightPortal({ children }: NavbarRightPortalProps) {
  const [isMounted, setIsMounted] = useState(false);

  const [dom, setDom] = useState(() => {
    if (typeof document !== "undefined" && document) {
      return document?.getElementById?.(PORTAL_ID);
    }
    return null;
  });

  useEffect(() => {
    if (!dom) setDom(document.getElementById(PORTAL_ID));
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (!dom) return null;

  return createPortal(children, dom);
}
export default NavbarRightPortal;
