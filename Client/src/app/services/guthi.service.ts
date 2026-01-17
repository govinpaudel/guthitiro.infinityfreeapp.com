import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GuthiService {
  apiUrl: any = environment.apiUrl
  constructor(private httpclient: HttpClient, private router: Router) { }
  //get all masters//
  getAll(data:any){
    return this.httpclient.post(this.apiUrl + "/guthitiro/getAll",data)
  }  
  getAllShrestaByOfficeId(officeid: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getAllShrestaByOfficeId/" + officeid)
  }
  addUpdateShresta(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthitiro/addUpdateShresta", data)
  }
  getOneShrestaById(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getOneShrestaById/" + id)
  }
  getGabisaById(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getGabisaById/" + id)
  }
  getdistrictByState(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/districtByState/" + id)
  }
  getLocalTypesByDistrict(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/localtypesByDistrict/" + id)
  }
  getPalikaByDistrictAndType(id: any, type: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getPalikaByDistrictAndType/" + id + "/" + type)
  }
  gabisaByDistrictAndPalikaId(id: any, palika_id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/gabisaByDistrictAndPalikaId/" + id + "/" + palika_id)
  }  
  getLandsByShrestaId(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getLandsByShrestaId/" + id)
  }  
  AddOrUpdateLand(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthitiro/AddOrUpdateLand/", data)
  }
  addUpdateGabisa(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthitiro/addUpdateGabisa/", data)
  }
  getRatesByOffice(id: any, type: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getRatesByOffice/" + id + "/" + type)
  }
  getRatesById(guthi_type_id: any, id: any,) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getRatesById/" + guthi_type_id + "/" + id)
  }
  getInvoicesByShrestaId(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getInvoicesByShrestaId/" + id)
  }
  getPendingInvoicesByOfficeId(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getPendingInvoicesByOfficeId/" + id)
  }

  genInvoice(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthitiro/genInvoice", data)
  }
  loadInvHeaderData(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/loadInvHeaderData/" + id)
  }
  loadInvDetailData(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/loadInvDetailData/" + id)
  }
  updDiscounts(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthitiro/updatediscounts/", data)
  }
  addUpdateRRates(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthitiro/addUpdateRRates/", data)
  }
  addUpdateARates(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthitiro/addUpdateARates/", data)
  }
  saveTender(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthitiro/saveTender", data)
  }
  saveOldTender(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthitiro/saveOldTender", data)
  }
  getGabisas() {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getGabisas/")
  }
  getDistricts() {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getDistricts/")
  }
  getPalikas() {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getPalikas/")
  }
  getTenders() {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getTenders/")
  }
  getDashRevenueDataByOfficeId(officeid: any, aabaid: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getDashRevenueDataByOfficeId/" + officeid + "/" + aabaid)
  }
  getDashLandDataByOfficeId(officeid: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getDashLandDataByOfficeId/" + officeid)
  }
  getFineOrDiscounts() {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getFineOrDiscounts/")
  }
  getPendingPaymentByShrestaId(shrestaid: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getPendingPaymentByShrestaId/" + shrestaid)
  }
  getOldTendersByShrestaId(shrestaid: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getOldTendersByShrestaId/" + shrestaid)
  }
  getLagatByOfficeId(officeid: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getLagatByOfficeId/" + officeid)
  }
  getInvoicesByOfficeId(officeid: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getInvoicesByOfficeId/" + officeid)
  }
  updateRatesInInvoiceByid(data:any) {
    return this.httpclient.post(this.apiUrl + "/guthitiro/updateRatesInInvoiceByid",data)
  }
  getmonthsum(office_id: any, aaba_id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getmonthsum/" + office_id + "/" + aaba_id, {})
  }
  getmonthsuminvoice(office_id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getmonthsuminvoice/" + office_id , {})
  }

  dupliland(land_id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/dupliland/" + land_id, {})
  }
  getTenderById(tender_id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getTenderById/" + tender_id, {})
  }
  getTenderByNo(tender_id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getTenderByNo/" + tender_id, {})
  }
  updateTender(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthitiro/updateTender", data)
  }
  updateVoucher(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthitiro/updateVoucher", data)
  }
  getDistinctPalika(office_id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getDistinctPalika/" + office_id)
  }
  getDistinctGabisa(palika_id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getDistinctGabisa/" + palika_id)
  }
  getDistinctWards(gabisa_id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getDistinctWards/" + gabisa_id)
  }
  getVouchers(aaba_id:any,office_id:any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getVouchers/" + aaba_id+"/"+office_id)
  }
  getKittaDetails(formdata:any) {
    return this.httpclient.post(this.apiUrl + "/guthitiro/getKittaDetails",formdata)
  }
  downloadRecords(formdata:any){
    return this.httpclient.post(this.apiUrl + "/guthitiro/downloadrecords",formdata)
  }
  deleteLand(formdata:any){
    return this.httpclient.post(this.apiUrl + "/guthitiro/deleteland",formdata)
  }
  updateRecords(formdata:any){
    return this.httpclient.post(`http://${formdata.ipaddress}` + "/api/sync/guthitiro.php",formdata)
  }

}
