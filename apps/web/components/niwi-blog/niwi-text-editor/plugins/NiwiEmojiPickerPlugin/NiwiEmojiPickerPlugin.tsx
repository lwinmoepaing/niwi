import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";
import {
  $createTextNode,
  $getSelection,
  $isRangeSelection,
  TextNode,
} from "lexical";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as ReactDOM from "react-dom";

class EmojiOption extends MenuOption {
  title: string;
  emoji: string;
  keywords: Array<string>;
  emojiType: "text" | "img";
  src: string;

  constructor(
    title: string,
    emoji: string,
    options: {
      type: "text" | "img";
      src: string;
      keywords?: Array<string>;
    }
  ) {
    super(title);
    this.title = title;
    this.emoji = emoji;
    this.keywords = options.keywords || [];
    this.emojiType = options.type;
    this.src = options.src;
  }
}
function EmojiMenuItem({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: {
  index: number;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  option: EmojiOption;
}) {
  let className = "item";
  if (isSelected) {
    className += " selected";
  }
  return (
    <button
      key={option.key}
      tabIndex={-1}
      className={className}
      ref={option.setRefElement}
      role="option"
      aria-selected={isSelected}
      id={"typeahead-item-" + index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {option.emojiType === "text" ? (
        <span className="text">{option.emoji}</span>
      ) : (
        <span
          className="img"
          style={{ backgroundImage: `url(${option.src})` }}
        >
          {" "}
        </span>
      )}
    </button>
  );
}

type Emoji = {
  title: string;
  emoji: string;
  type: "text" | "img";
  src: string;
};

export default function NiwiEmojiPickerPlugin() {
  const [editor] = useLexicalComposerContext();
  const [, setQueryString] = useState<string | null>(null);
  const [emojis, setEmojis] = useState<Array<Emoji>>([]);

  useEffect(() => {
    import("./config/emoji-picker-config").then((file) => {
      setEmojis(file.default);
    });
  }, []);

  const emojiOptions = useMemo(
    () =>
      emojis != null
        ? emojis.map(
            ({ emoji, title, type, src }) =>
              new EmojiOption(title, emoji, {
                keywords: [title],
                type,
                src,
              })
          )
        : [],
    [emojis]
  );

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch(":", {
    minLength: 0,
    maxLength: 1,
  });

  const onSelectOption = useCallback(
    (
      selectedOption: EmojiOption,
      nodeToRemove: TextNode | null,
      closeMenu: () => void
    ) => {
      editor.update(() => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection) || selectedOption == null) {
          return;
        }

        if (nodeToRemove) {
          nodeToRemove.remove();
        }

        selection.insertNodes([$createTextNode(selectedOption.emoji)]);

        closeMenu();
      });
    },
    [editor]
  );

  return (
    <LexicalTypeaheadMenuPlugin
      onQueryChange={setQueryString}
      onSelectOption={onSelectOption}
      triggerFn={checkForTriggerMatch}
      options={emojiOptions}
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }
      ) => {
        if (anchorElementRef.current == null || emojiOptions.length === 0) {
          return null;
        }

        return anchorElementRef.current && emojiOptions.length
          ? ReactDOM.createPortal(
              <div className="niwi-editor-emoji-popover">
                {emojiOptions.map((option: EmojiOption, index) => (
                  <EmojiMenuItem
                    key={option.key}
                    index={index}
                    isSelected={selectedIndex === index}
                    onClick={() => {
                      setHighlightedIndex(index);
                      selectOptionAndCleanUp(option);
                    }}
                    onMouseEnter={() => {
                      setHighlightedIndex(index);
                    }}
                    option={option}
                  />
                ))}
              </div>,
              anchorElementRef.current
            )
          : null;
      }}
    />
  );
}
