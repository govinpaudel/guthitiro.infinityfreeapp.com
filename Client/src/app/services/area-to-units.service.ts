import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AreaToUnitsService {
  constructor() { }
  sanitizeNumber(x: any) {
    if (isNaN(x)) {
      return 0;
    }
    return x * 1
  }

  areaToUnits(data: any, type: any) {
    const myArray = data.split("-");
    tot = 0;
    if (type == 1) {
      // if ropani
      var r = this.sanitizeNumber(parseInt(myArray[0]))
      var a = this.sanitizeNumber(parseInt(myArray[1]))
      var p = this.sanitizeNumber(parseInt(myArray[2]))
      var d = this.sanitizeNumber(parseInt(myArray[3]))
      var tot = r * 16 * 16 + a * 16 + p * 4 + d
      return tot;
    }
    else if (type == 2) {
      //if bigha
      var b = this.sanitizeNumber(parseInt(myArray[0]))
      var k = this.sanitizeNumber(parseInt(myArray[1]))
      var d = this.sanitizeNumber(parseInt(myArray[2]))
      var kn = this.sanitizeNumber(parseInt(myArray[3]))
      var tot = b * 20 * 20 * 4 + k * 20 * 4 + d * 4 + kn
      return tot;
    }
    else if (type == 3) {
      var tot = this.sanitizeNumber(parseInt(myArray))
      return tot;
    }
    return tot;
  }
  unitsToArea(type: any, data: any) {
    console.log(type, data);
    let totarea = "";
    if (type == 1) {
      let x = data;
      let sqm=x*(508.74/256);
      let ur = 0;
      let bd = 0;
      let ua = 0;
      let ud = 0;
      ur = Math.floor(x / 256);
      bd = x - (ur * 256);
      ua = Math.floor(bd / 16)
      bd = bd - (ua * 16);
      ud = Math.floor(bd / 4)
      bd = bd - (ud * 4);
      totarea = ur + " रोपनी " + ua + " आना " + ud + " पैसा " + bd + " दाम" + sqm + " वर्ग मिटर";
      return totarea;
    }
    else {

    }
    return totarea;
  }
}
