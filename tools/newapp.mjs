import { program } from "commander";
import fs from "fs";
import path from "path";
import { AppScaffoldingTemplates } from "./apptemplates.mjs";

const AREAS = ["admin", "user", "components", "core"];

function Main() {
  const flags = program
    .name("tools/newapp.mjs")
    .description("Create first-party Sacruda app in style")
    .requiredOption("-n, --name <name>", "Name of the app")
    .requiredOption("-i, --id <id>", "ID of the app")
    .requiredOption("-a, --area <area>", "Area (core, admin, components, user)")
    .parse()
    .opts();

  const { name, id, area } = flags;

  if (!AREAS.includes(area)) throw new Error("Invalid area");
  if (!/^[A-Z][A-Za-z0-9]*$/.test(id)) throw new Error("Invalid ID: must be alphanumeric and start with a capital letter");

  const appDir = path.join("src", "apps", area, id.toLowerCase());
  const interfaceFile = path.join("src", "interfaces", "runtimes", `I${id}Runtime.ts`);
  const cssFile = path.join("src", "css", "apps", area, `${id.toLowerCase()}.css`);

  if (fs.existsSync(appDir) || fs.existsSync(cssFile) || fs.existsSync(interfaceFile))
    throw new Error(`App ${id} already exists`);

  const files = {
    [path.join(appDir, `${id}.ts`)]: AppScaffoldingTemplates.MetadataTemplate(name, id, area),
    [path.join(appDir, "runtime.ts")]: AppScaffoldingTemplates.RuntimeTemplate(id),
    [path.join(appDir, `${id}.svelte`)]: AppScaffoldingTemplates.ComponentTemplate(id),
    [interfaceFile]: AppScaffoldingTemplates.InterfaceTemplate(id),
    [cssFile]: AppScaffoldingTemplates.CssTemplate(id),
  };

  for (const [file, content] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
    console.log(`Created ${file}`);
  }
}

Main();
