import { ComponentCodeGeneratorInterface } from './CodeGenerator';
import * as fs from "async-file";
interface FileSaverInterface {
  save(dir: string, g: ComponentCodeGeneratorInterface  , t: ComponentCodeGeneratorInterface );
}

class FolderCannotBeAccessedError extends Error {}
class SavingToFileError extends Error {}

export class ComponentFileSaver implements FileSaverInterface {
  async save(dir: string, g: ComponentCodeGeneratorInterface  , t: ComponentCodeGeneratorInterface ) {
    let originalDir = dir;

    if (originalDir[originalDir.length - 1] === "/") {
      originalDir = originalDir.slice(0, originalDir.length - 1);
    }

    const saveToDir = `${originalDir}/components`;

    try {
      await fs.stat(originalDir);

      const folderExists = await fs.exists(`${originalDir}/components`);

      if (!folderExists) {
        await fs.mkdir(`${originalDir}/components`);
      }
    } catch (e) {
      console.error(e);

      throw new FolderCannotBeAccessedError(
        `Tried to access folder ${saveToDir}, but apparently it doesn't exist or not accessible. More info: above`
      );
    }

    const fileName = `${g.getComponent().getName()}.${g.getFileExtension()}`;
    const testFileName = `${t.getComponent().getName()}.${t.getFileExtension()}`;

    const filePath = `${saveToDir}/${fileName}`;
    const testFilePath = `${saveToDir}/${testFileName}`;

    try {
      await fs.writeFile(filePath, g.generate());
      await fs.writeFile(testFilePath, t.generate());

      console.log(`Saved ${filePath}`);
    } catch (e) {
      console.error(e);

      throw new SavingToFileError(
        `Error saving to ${filePath}. More - above this error.`
      );
    }
  }
}
