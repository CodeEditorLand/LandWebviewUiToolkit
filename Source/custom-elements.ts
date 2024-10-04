// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Container } from "@microsoft/fast-foundation";

// Don't delete these. They're needed so that API-extractor doesn't add import types
// with improper pathing
/* eslint-disable @typescript-eslint/no-unused-vars */
import { vsCodeBadge, type Badge } from "./badge/index.js";
import { vsCodeButton, type Button } from "./button/index.js";
import { vsCodeCheckbox, type Checkbox } from "./checkbox/index.js";
import {
	vsCodeDataGrid,
	vsCodeDataGridCell,
	vsCodeDataGridRow,
	type DataGrid,
	type DataGridCell,
	type DataGridRow,
} from "./data-grid/index.js";
import { vsCodeDivider, type Divider } from "./divider/index.js";
import { vsCodeDropdown, type Dropdown } from "./dropdown/index.js";
import { vsCodeLink, type Link } from "./link/index.js";
import { vsCodeOption, type Option } from "./option/index.js";
import {
	vsCodePanels,
	vsCodePanelTab,
	vsCodePanelView,
	type Panels,
	type PanelTab,
	type PanelView,
} from "./panels/index.js";
import {
	vsCodeProgressRing,
	type ProgressRing,
} from "./progress-ring/index.js";
import { vsCodeRadioGroup, type RadioGroup } from "./radio-group/index.js";
import { vsCodeRadio, type Radio } from "./radio/index.js";
import { vsCodeTag, type Tag } from "./tag/index.js";
import { vsCodeTextArea, type TextArea } from "./text-area/index.js";
import { vsCodeTextField, type TextField } from "./text-field/index.js";

// export all components
export {
	vsCodeBadge,
	vsCodeButton,
	vsCodeCheckbox,
	vsCodeDataGrid,
	vsCodeDataGridCell,
	vsCodeDataGridRow,
	vsCodeDivider,
	vsCodeDropdown,
	vsCodeLink,
	vsCodeOption,
	vsCodePanels,
	vsCodePanelTab,
	vsCodePanelView,
	vsCodeProgressRing,
	vsCodeRadioGroup,
	vsCodeRadio,
	vsCodeTag,
	vsCodeTextArea,
	vsCodeTextField,
};

/**
 * All VSCode Web Components
 * @public
 * @remarks
 * This object can be passed directly to the Design System's `register` method to
 * statically link and register all available components.
 */
export const allComponents = {
	vsCodeBadge,
	vsCodeButton,
	vsCodeCheckbox,
	vsCodeDataGrid,
	vsCodeDataGridCell,
	vsCodeDataGridRow,
	vsCodeDivider,
	vsCodeDropdown,
	vsCodeLink,
	vsCodeOption,
	vsCodePanels,
	vsCodePanelTab,
	vsCodePanelView,
	vsCodeProgressRing,
	vsCodeRadioGroup,
	vsCodeRadio,
	vsCodeTag,
	vsCodeTextArea,
	vsCodeTextField,
	register(container?: Container, ...rest: any[]) {
		if (!container) {
			// preserve backward compatibility with code that loops through
			// the values of this object and calls them as funcs with no args
			return;
		}

		for (const key in this) {
			if (key === "register") {
				continue;
			}

			(this as any)[key]().register(container, ...rest);
		}
	},
};
