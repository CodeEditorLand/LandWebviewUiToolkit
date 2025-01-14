// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { exec } from "child_process";
import { existsSync } from "fs";
import process from "process";
import { promisify } from "util";

import { color, copyDir, createDir, delDir } from "./helpers.js";

const execShellCommand = promisify(exec);

async function main() {
	// Empty print line to pretty-ify command line output
	console.log();

	// Copy webview test environment locally if it does not already exist
	if (!existsSync("./test-webview-react")) {
		try {
			console.log(
				color(["dim"], "Copying webview test environment locally..."),
			);
			await execShellCommand(
				"npx degit microsoft/vscode-webview-ui-toolkit-samples/frameworks/component-gallery-react test-webview-react",
			);
		} catch (err) {
			console.log(
				`${color(["red"], "Error: Could not copy webview test environment locally")}\n    ${err}`,
			);
			process.exit();
		}
	}

	// Install the webview test environment dependencies if they do not exist
	if (!existsSync("./test-webview-react/node_modules")) {
		try {
			console.log(
				color(
					["dim"],
					"Installing webview test environment dependencies...",
				),
			);
			await execShellCommand(
				"cd ./test-webview-react && npm run install:all",
			);
		} catch (err) {
			console.log(
				`${color(["red"], "Error: Could not install webview test environment dependencies")}\n    ${err}`,
			);
			process.exit();
		}
	}

	// Copy latest toolkit build into the webview test environment
	try {
		console.log(
			color(
				["dim"],
				"Copying latest toolkit build into webview test environment...",
			),
		);
		// Copy web component build directory
		delDir(
			"./test-webview-react/webview-ui/node_modules/@vscode/webview-ui-toolkit/dist",
		);
		createDir(
			"./test-webview-react/webview-ui/node_modules/@vscode/webview-ui-toolkit/dist",
		);
		copyDir(
			"./dist",
			"./test-webview-react/webview-ui/node_modules/@vscode/webview-ui-toolkit",
		);
		// Copy react build directory
		delDir(
			"./test-webview-react/webview-ui/node_modules/@vscode/webview-ui-toolkit/react",
		);
		createDir(
			"./test-webview-react/webview-ui/node_modules/@vscode/webview-ui-toolkit/react",
		);
		copyDir(
			"./react",
			"./test-webview-react/webview-ui/node_modules/@vscode/webview-ui-toolkit",
		);
	} catch (err) {
		console.log(
			`${color(["red"], "Error: Failed to copy latest toolkit build into webview test environment")}\n    ${err}`,
		);
		process.exit();
	}

	// Build the React webview
	try {
		console.log(color(["dim"], "Building React webview..."));
		await execShellCommand(
			"cd ./test-webview-react && npm run build:webview",
		);
	} catch (err) {
		console.log(
			`${color(["red"], "Error: Could not build React webview")}\n    ${err}`,
		);
		process.exit();
	}

	// Print success and next steps messages
	console.log();
	console.log(
		color(
			["bold", "green"],
			"Webview test environment successfully configured!",
		),
	);
	console.log();
	console.log("Next steps:");
	console.log(
		`  1. Open the ${color(["cyan"], "test-webview-react")} folder in a new VS Code window`,
	);
	console.log(
		`  2. Press ${color(["cyan"], "F5")} to open the webview test extension with the most recent toolkit build loaded`,
	);
	console.log(
		`  3. Run the "${color(["cyan"], "Component Gallery (React): Show")}" command using the VS Code command palette`,
	);
	console.log();
}

main();
