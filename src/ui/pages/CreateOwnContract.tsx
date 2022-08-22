// Copyright 2022 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: GPL-3.0-only
import { useState } from "react";
import Editor from "ui/components/flow/Editor";
import { EditorContext } from "ui/contexts/EditorContext";

export function CreateOwnContract() {
  const [code, setCode] = useState({});
  console.log(code);

  return (
    <EditorContext.Provider value={{ code, setCode }}>
      <Editor />
    </EditorContext.Provider>
  );
}
