"use client";

import HtmlRenderer from "@/components/niwi-ui/html-render/html-render";
import useHtmlTwitterLoader from "./useHtmlTwitterLoader";

function NiwiHtmlView({ htmlText }: { htmlText: string }) {
  const { containerRef } = useHtmlTwitterLoader({ htmlText });

  return (
    <div className="editor-container" ref={containerRef}>
      <div className="editor-inner">
        <HtmlRenderer htmlString={htmlText} className="editor-input" />
      </div>
    </div>
  );
}
export default NiwiHtmlView;
