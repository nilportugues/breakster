import { ComponentCodeGeneratorInterface } from './CodeGenerator';
import {
  ATTR_DIALECT,
  ATTR_ID,
  ATTR_JSX_LIB,
  ATTR_NAME,
  DEFAULT_COMPONENT_ATTR_NAME,
  VirtualComponentInterface
} from './VirtualComponent';


interface ReactyLibraryInterface {
  getFactoryFunctionName(): string;
  getName(): string;
  getRenderArguments?(): string;
  getGenericAfterExtend?(): string;
  getBeforeRenderReturnCode?(): string;
  getAdditionalImports?(): string;
  getComponentProperties?(): string;
  getBeforComponentDeclarationCode?(): string;
  provideDialect?(d: Dialect);
  getDialect?(): Dialect;
}

abstract class ReactyLibrary {
  // Default dialect is TypeScript
  protected dialect: Dialect = new TypeScript();

  getFactoryFunctionName() { return "" }

  getName() { return "" }

  getRenderArguments() { return "" }
  
  getGenericAfterExtend() {
    if (this.dialect instanceof TypeScript) {
      return "<Props>";
    }

    return "";
  }
  getBeforeRenderReturnCode() { return "" }

  getAdditionalImports() { return "" }

  getComponentProperties() { return "" }

  getBeforComponentDeclarationCode?(): string {
    if (this.dialect instanceof TypeScript) {
      return `
type Props = {

}
`
    }

    return "";
  };

  provideDialect(d: Dialect) {
    this.dialect = d;
  }

  public getDialect(): Dialect {
    return this.dialect;
  }
}

class ReactLibrary extends ReactyLibrary {
  getFactoryFunctionName() {
    return "React";
  }

  getName() {
    return "react";
  }
}

abstract class Dialect {
  public getFileExtension(): string {
    return "test.jsx";
  }
  public static getAttrValue(): string {
    // This is default value
    return "";
  }
}

class TypeScript extends Dialect {
  public getFileExtension(): string {
    return "test.tsx";
  }

  public static getAttrValue(): string {
    return "typescript";
  }
}

class CannotFindElementForComponentError extends Error {}
class InvalidOptionsError extends Error {}

class ComponentNotAttachedError extends Error {}


export default class TestReactyCodeGenerator implements ComponentCodeGeneratorInterface {
  // By default we use Preact library for jsx component generation
  private library: ReactyLibraryInterface;
  private component: VirtualComponentInterface;
  private componentProcessed: boolean = false;

  attachComponent(c: VirtualComponentInterface) {
    this.component = c;
  }

  private processComponent() {
    const c = this.component;

    const el = c.getEl();

    
    // Trying to find dialect from parent components

    let dialect = new TypeScript();
    const jsxLibName = el.getAttribute(ATTR_JSX_LIB);
    this.library = new ReactLibrary();
   
    if (this.library.provideDialect) {
      this.library.provideDialect(dialect);
    }

    this.componentProcessed = true;
  }

  public generate(): string {
    if (!this.componentProcessed) {
      this.processComponent();
    }

    const component = this.component;

    if (!component) {
      throw new ComponentNotAttachedError();
    }

    const componentsUsages: string[] = [];


    // We will be first replacing nodes with ids of children with our special nodes,
    // also saving component names so we will use them instead. From <some-id-123></some-id-123>
    // to <Component />
    const replacements: {search: string, replace: string}[] = [];

    let el = component.getEl();

   

    // Before making changes to element we clone it, so other children/parent
    // elements wont be affected by changed element
    el = el.cloneNode(true) as HTMLElement;

    const defaultAttrsToStrip: string[] = [
      ATTR_NAME,
      ATTR_ID,
      ATTR_DIALECT,
      ATTR_JSX_LIB,
      DEFAULT_COMPONENT_ATTR_NAME
    ];

    // Stripping default attributes
    defaultAttrsToStrip.forEach(attr => {
      el.removeAttribute(attr);
    });

    let jsx: string = el.outerHTML;

    replacements.forEach(r => {
      jsx = jsx.replace(r.search, r.replace);
    });

    const l: ReactyLibraryInterface = this.library;

    return `
import * as ${this.library.getFactoryFunctionName()} from "${this.library.getName()}";
import {${component.getName()}} from "./${component.getName()}";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { I18nextProvider } from 'react-i18next';

const i18n = undefined;

describe('${component.getName()} Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<I18nextProvider i18n={i18n}><${component.getName()} /></I18nextProvider>)
    expect(container).toMatchInlineSnapshot()
  })
})
`;
  }

  public getComponent(): VirtualComponentInterface {
    return this.component;
  }

  public getFileExtension(): string {
    if (!this.componentProcessed) {
      this.processComponent();
    }

    return this.library.getDialect().getFileExtension();
  }

}
