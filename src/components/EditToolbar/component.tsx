import React from "react";
import { EditorState, RichUtils } from "draft-js";

import styles from './component.module.scss'
import cx from 'classnames'

type StyleButtonProps = {
  onClick?: () => void;
  onToggle?: (style: string) => void;
  active?: boolean;
  className?: string;
  style?: string;
  label: string;
  iconName?: string;
};

const StyleButton = (props: StyleButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (props?.onToggle && props?.style) {
      props.onToggle(props.style);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cx(styles.toolButton, { [styles.active] : props.active})}
    >
      {props.label}
    </button>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" }
];

const InlineStyleControls = (props: any) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className={styles.toolGroup}>
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "Section", style: "header-five" },
  { label: "Quotes", style: "blockquote" }
];
const BlockStyleControls = (props: any) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className={styles.toolGroup}>
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

type EditToolbarProps = {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

export default function EditToolbar({ editorState, setEditorState}: EditToolbarProps) {
  const toggleInlineStyle = (inlineStyle: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <div>
      <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />
      <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
    </div>
  )
}