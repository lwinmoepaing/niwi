import { cn } from "@/libs/utils";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getRoot,
  $getSelection,
  KEY_ENTER_COMMAND,
  NodeKey,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { CodeXml, Plus } from "lucide-react";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { useEditorHydrate } from "../../editor-utils/editor-hydration";
import NiwiEditorSideImageInsertIcon from "../NiwiImagePlugin/components/NiwiEditorSideImageInsertIcon";
import { $isNiwiImageNode } from "../NiwiImagePlugin/nodes/NiwiImageNode";

const LowPrority = 1;

const NiwiFloatingLeftSidePlugin = () => {
  const hasHydrate = useEditorHydrate();

  const containerRef = useRef<HTMLDivElement>(null);
  const [editor] = useLexicalComposerContext();
  const [showRightSideIcons, setShowRightSideIcons] = useState<boolean>(false);

  const handleToggleFloatingComponentMenu = useCallback(() => {
    setShowRightSideIcons((prev) => !prev);
  }, []);

  const [positionStyle, setPositionStyle] = useState<CSSProperties>({
    display: "none",
    visibility: "hidden",
    opacity: 0,
  });

  const handleLeftSideIcon = useCallback(() => {
    const selection = $getSelection();

    const topLevelNodeKeys = editor
      .getEditorState()
      .read(() => $getRoot().getChildrenKeys());
    const allNodes = selection?.getNodes();
    const selectionFirstNode = allNodes?.[0]?.__key || "";
    const selectionNodeIndex = topLevelNodeKeys.indexOf(
      selectionFirstNode as string
    );
    const currentNodeKey = topLevelNodeKeys[selectionNodeIndex];
    const focusNode = editor.getElementByKey(currentNodeKey as NodeKey);

    const hide = () =>
      setPositionStyle((prev) => ({
        ...prev,
        display: "none",
        opacity: 0,
        visibility: "hidden",
      }));

    const currentNode = selection?.getNodes()?.[0];
    if (currentNode && $isNiwiImageNode(currentNode)) {
      return hide();
    }

    if (focusNode !== null) {
      const offsetTop = focusNode.offsetTop;
      setPositionStyle({
        top: offsetTop - 8,
        opacity: 1,
        visibility: "visible",
      });
    } else {
      hide();
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          handleLeftSideIcon();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          setShowRightSideIcons(false);
          handleLeftSideIcon();
          return false;
        },
        LowPrority
      ),
      editor.registerCommand(
        KEY_ENTER_COMMAND,
        () => {
          setShowRightSideIcons(false);
          handleLeftSideIcon();
          return false;
        },
        LowPrority
      )
    );
  }, [editor, handleLeftSideIcon, setShowRightSideIcons]);

  if (!hasHydrate) return null;

  return (
    <div
      ref={containerRef}
      className="editor-side-actions-container"
      style={{
        position: "absolute",
        left: -40,
        ...positionStyle,
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleToggleFloatingComponentMenu();
        }}
        type="button"
        className={cn(
          "editor-side-actions-button",
          showRightSideIcons && "active"
        )}
      >
        <Plus size={20} />
      </button>

      {showRightSideIcons ? (
        <div className="editor-side-actions-container">
          <NiwiEditorSideImageInsertIcon />

          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="editor-side-right-actions-button"
            type="button"
          >
            <CodeXml size={20} />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default NiwiFloatingLeftSidePlugin;
