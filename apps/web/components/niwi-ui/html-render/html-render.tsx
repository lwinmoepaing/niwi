type HtmlRendererProps = { htmlString: string; className?: string };

const HtmlRenderer = ({ htmlString, className }: HtmlRendererProps) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlString }}
      className={className}
    />
  );
};

export default HtmlRenderer;
