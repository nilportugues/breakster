
import { ComponentFileSaver } from './FileSaver';
import * as fs from "async-file";
import * as jsdom from "jsdom";
import VirtualComponent, {
  DEFAULT_COMPONENT_ATTR_NAME,
  VirtualComponentInterface
} from './VirtualComponent';

import * as path from 'path'
import { transformFile } from './i18n/index';
import { walk } from './i18n/walker'
import { LutManager } from './i18n/lut'


class BuilderError extends Error {
  constructor(message: string) {
    super(`[project-builder]: ${message}`);
  }
}

export const TYPE_LAYOUT = "layout";
export const TYPE_LAYOUT_CONTENT = "layout-content";

const ALLOWED_LANGUAGES = [
  "javascript",
  "typescript"
];

class Builder {
  private inputFile: string;
  private outputFolder: string;
  private debug: boolean = false;

  constructor(inputFile: string, outputFolder: string, debug = true) {
    if (!(inputFile && outputFolder)) {
      throw new BuilderError("You must pass inputFile and outputFolder in Builder constructor");
    }

    this.inputFile = inputFile;
    this.outputFolder = outputFolder;
    this.debug = debug;
  }

  public setLanguage(lang: string) {
    if (!ALLOWED_LANGUAGES.find(l => l === lang)) {
      throw new BuilderError(
        `Language ${lang} is not supported`
      );
    }
  }

  public async build() {
    await this.checkPrerequisites();

    // Getting string content from file
    const fileContents: string = await fs.readFile(this.inputFile, {
      encoding: "utf8"
    });

    // Wrapper so async/await can work
    const window: Window = await new Promise<Window>(function(resolve) {
      jsdom.env(fileContents, {
        done: function(error, window) {
          if (error) {
            console.error(error);
          } else {
            resolve(window);
          }
        }
      });
    });

    const document: Document = window.document

    // Finding first occurence of component element
    const rootComponentElement = document.body.querySelector(`[${DEFAULT_COMPONENT_ATTR_NAME}]`);

    if (!rootComponentElement) {
      throw new BuilderError("Could not find single element suited for component creation. Check your html.");
    }

    try {
      const rootComponent = new VirtualComponent(
        (rootComponentElement as HTMLElement),
        DEFAULT_COMPONENT_ATTR_NAME
      );

      const components: VirtualComponentInterface[] = rootComponent.collectAllSubChildrenAndItself();

      const fileSaver = new ComponentFileSaver();

      for (let i = 0, size = components.length; i < size; i++) {
        const c = components[i];

        await await fileSaver.save(this.outputFolder, c.getCodeGenerator(), c.getTestCodeGenerator());
      }
    } catch (e) {
      console.error(e);

      throw new BuilderError("There was an error while build process was active. Above - more info on error.");
    }


      const inputDir = path.dirname(this.inputFile)
      const transsourceDir = '.'; 

      /*
      // If running this script for the second time, it should not
      // discard the table generated from the first run
      if (await fs.exists(path.join(path.resolve(this.outputFolder), `${transsourceDir}/i18n/english.js`))) {
        console.log('english.js exists');
        // eslint-disable-next-line
        const oldLut = require(path.join(path.resolve(this.outputFolder), `${transsourceDir}/i18n/english`));
        (LutManager as any).setLut(oldLut);
      }
      */

      const allFiles = walk(path.join(path.resolve(inputDir), transsourceDir));
     
      allFiles.forEach(fileName => {
        transformFile(inputDir, '.', path.resolve(this.outputFolder+"/../"), false, fileName)
      });
  }

  private async checkPrerequisites() {
    try {
      await fs.stat(this.inputFile);
    } catch (e) {
      throw new BuilderError(
        `File ${this.inputFile} does not exist or not available for read`
      );
    }

    try {
      await fs.stat(this.outputFolder);
    } catch (e) {
      throw new BuilderError(
        `Folder ${this.outputFolder} is not available for writing or does not exist`
      );
    }

    return true;
  }
}

export default Builder;