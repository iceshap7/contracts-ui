// Copyright 2022 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { createContext, useState } from 'react';

export const EditorContext = createContext({code: {}, setCode: (code) => {}});
export const EditorConsumer = EditorContext.Consumer;
export const EditorProvider = EditorContext.Provider;
