import { Stereotype } from './Stereotype';
import { EABaseClass } from './EABaseClass';
import { Package } from './Package';
import { Classification } from './Classification';

import * as D3 from 'app/d3.bundle';

export interface IModelContainer {
  modelBase: Model;
}
/**
 * Top node of the EA xml tree
 */
export class Model extends EABaseClass {
  static umlId = 'uml:Model';

  packagedElement: any;

  private _isVisible: boolean;
  private _lastSearch: string;
  public isVisible(): boolean {
    const str = EABaseClass.service.searchString;
    if (str && str.length > 0) {
      if (str == this._lastSearch) { return this._isVisible; }
      const meVisible = super.isVisible();
      const pkgVisible = this.packages.some(pkg => pkg.isVisible());

      this._lastSearch = str;
      this._isVisible = (meVisible || pkgVisible);
      return this._isVisible;
    }
    return true;
  }

  _stereotypes: Stereotype[];
  get stereotypes() {
    if (!this._stereotypes) {
      const retArr = [];
      const pkgs = this.packagedElement[0].packagedElement;
      pkgs.forEach(elements => {
        elements.packagedElement.forEach(pkg => {
          if (pkg instanceof Stereotype) {
            retArr.push(pkg);
          }
        });
      });
      this._stereotypes = retArr.sort(EABaseClass.service.sortNodes);
    }
    return this._stereotypes;
  }

  _packages: Package[];
  get packages() {
    if (!this._packages) {
      const retArr = [];
      const pkgs = this.packagedElement[0].packagedElement;
      pkgs.forEach(elements => {
        elements.packagedElement.forEach(pkg => {
          if (pkg instanceof Package) {
            retArr.push(pkg);
          }
        });
      });
      this._packages = retArr.sort(EABaseClass.service.sortNodes);
    }
    return this._packages;
  }

  constructor() {
    super();
  }
}
