// Copyright 2022 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { DocumentAddIcon, CollectionIcon, ChipIcon } from '@heroicons/react/outline';
import { NavLink } from './NavLink';

export function Navigation() {
  return (
    <div className="navigation">
      <NavLink icon={ChipIcon} to={`/create-own-contract`}>
        Create Own Contract
      </NavLink>
      <NavLink to={`/add-contract`} icon={DocumentAddIcon}>
        Add New Contract
      </NavLink>
      <NavLink icon={CollectionIcon} to={`/`} end>
        All Contracts
      </NavLink>
    </div>
  );
}
