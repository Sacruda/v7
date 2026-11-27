import type { BasicLang } from "$types/system/basic";

export const InputFn = (() => async (val, interpreter) => {
  interpreter.sendToStdout("\n");

  return await interpreter.getFromStdin(`${val}`);
}) satisfies BasicLang.TerminalBuiltinFn;
