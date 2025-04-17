"use client";

import React from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

type MonacoEditorWrapperProps = {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  height?: string;
};

const MonacoEditorWrapper: React.FC<MonacoEditorWrapperProps> = ({
  value,
  onChange,
  language = "markdown",
  height = "700px",
}) => {
  return (
    <Editor
      height={height}
      defaultLanguage={language}
      defaultValue={value}
      onChange={(val) => onChange?.(val ?? "")}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: "on",
      }}
    />
  );
};

export default MonacoEditorWrapper;
