import execa from 'execa'; // https://github.com/sindresorhus/execa/tree/v5.1.1

import openapitools from '../../openapitools.json';
import config from '../../release.config.json';

export const RELEASED_TAG = config.releasedTag;
export const MAIN_BRANCH = config.mainBranch;
export const OWNER = config.owner;
export const REPO = config.repo;

export type Run = (
  command: string,
  options?: Partial<
    execa.SyncOptions & {
      errorMessage: string;
    }
  >
) => execa.ExecaReturnBase<string>['stdout'];

export const run: Run = (
  command,
  { errorMessage = undefined, ...execaOptions } = {}
) => {
  let result: execa.ExecaSyncReturnValue<string>;
  try {
    result = execa.commandSync(command, execaOptions);
  } catch (err) {
    if (errorMessage) {
      throw new Error(`[ERROR] ${errorMessage}`);
    } else {
      throw err;
    }
  }
  return result.stdout;
};

export const LANGS = [
  ...new Set(
    Object.keys(openapitools['generator-cli'].generators).map(
      (key) => key.split('-')[0]
    )
  ),
];

export function getMarkdownSection(markdown: string, title: string): string {
  const levelIndicator = title.split(' ')[0]; // e.g. `##`
  const lines = markdown
    .slice(markdown.indexOf(title))
    .split('\n')
    .map((line) => line.trim());
  let endIndex = lines.length;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].startsWith(`${levelIndicator} `)) {
      endIndex = i;
      break;
    }
  }
  return lines.slice(0, endIndex).join('\n');
}