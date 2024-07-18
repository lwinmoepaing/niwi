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
import { Plus } from "lucide-react";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { useEditorHydrate } from "../../editor-utils/editor-hydration";
import CodeInsertIcon from "../CodeHighlightPlugin/CodeInsertIcon";
import NiwiEditorSideImageInsertIcon from "../NiwiImagePlugin/components/NiwiEditorSideImageInsertIcon";
import { $isNiwiImageNode } from "../NiwiImagePlugin/nodes/NiwiImageNode";
import NiwiLineBreakInsertIcon from "../NiwiLineBreakPlugin/components/​NiwiLineBreakInsertIcon";
import { $isNiwiLineBreakNode } from "../NiwiLineBreakPlugin/nodes/NiwiLineBreakNode";
import NiwiSplashInsertIcon from "../NiwiSplashImagePlugin/components/NiwiSplashInsertIcon";
import { $isNiwiSplashImageNode } from "../NiwiSplashImagePlugin/nodes/NiwiSplashImageNode";
import NiwiTwitterInsertIcon from "../NiwiTwitterPlugin/components/NiwiTwitterInsertIcon";
import { $isNiwiTwitterNode } from "../NiwiTwitterPlugin/nodes/NiwiTwitterNode";
import { $isNiwiTwitterText } from "../NiwiTwitterPlugin/nodes/NiwiTwitterTextNode";
import NiwiYoutubeInsertIcon from "../NiwiYoutubePlugin/components/NiwiYoutubeInsertIcon";
import { $isNiwiYoutubeNode } from "../NiwiYoutubePlugin/nodes/NiwiYoutubeNode";
import { $isNiwiYoutubeText } from "../NiwiYoutubePlugin/nodes/NiwiYoutubeTextNode";

const LowPrority = 1;

const NiwiFloatingLeftSidePlugin = () => {
  const hasHydrate = useEditorHydrate();

  const containerRef = useRef<HTMLDivElement>(null);
  const [editor] = useLexicalComposerContext();
  const [showRightSideIcons, setShowRightSideIcons] = useState<boolean>(false);

  const hideRightSideIcons = useCallback(
    () => setShowRightSideIcons(false),
    []
  );

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

    if (currentNode && $isNiwiYoutubeText(currentNode)) {
      return hide();
    }

    if (currentNode && $isNiwiYoutubeNode(currentNode)) {
      return hide();
    }

    if (currentNode && $isNiwiTwitterText(currentNode)) {
      return hide();
    }

    if (currentNode && $isNiwiTwitterNode(currentNode)) {
      return hide();
    }

    if (currentNode && $isNiwiSplashImageNode(currentNode)) {
      return hide();
    }

    if (currentNode && $isNiwiLineBreakNode(currentNode)) {
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
          <NiwiSplashInsertIcon onClick={hideRightSideIcons} />
          <CodeInsertIcon />
          <NiwiYoutubeInsertIcon onClick={hideRightSideIcons} />
          <NiwiTwitterInsertIcon onClick={hideRightSideIcons} />
          <NiwiLineBreakInsertIcon onClick={hideRightSideIcons} />
        </div>
      ) : null}
    </div>
  );
};

export default NiwiFloatingLeftSidePlugin;
