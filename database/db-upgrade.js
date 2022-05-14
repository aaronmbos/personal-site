import { exec } from "child_process";

const migrationRootDir = "/database";

function isMigrationDirectory(cwd) {
  return cwd.endsWith() === migrationRootDir;
}

if (!isMigrationDirectory(process.cwd())) {
  try {
    process.chdir(`${process.cwd()}/database`);

    console.log("Directory changed to migrations root");
  } catch (e) {
    console.log(
      `An error occurred navigation to migrations dir. Script should be run from the migrations root or project root. Message: ${e}`
    );
  }
}
