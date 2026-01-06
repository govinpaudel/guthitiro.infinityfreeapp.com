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
  getAabas() {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getAabas")
  }
  getStates() {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getStates")
  }
  getGuthiTypes() {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getGuthiTypes")
  }
  getTenantTypes(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getTenantTypes/" + id)
  }
  getPalikaTypes() {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getPalikaTypes")
  }
  getLandTypes() {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getLandTypes")
  }
  getLandSubTypes() {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getLandSubTypes")
  }
  getAreaTypes() {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getAreaTypes")
  }
  getAllShresta(officeid: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getAllShresta/" + officeid)
  }
  addUpdateShresta(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthitiro/addUpdateShresta", data)
  }
  getShrestaById(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getShresta/" + id)
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
  getWards() {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getWards")
  }
  getLands(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getLands/" + id)
  }
  getLandByid(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getLandById/" + id)
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
  getInvoicesByShresta(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getInvoicesByShresta/" + id)
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
  addUpdateRates(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthitiro/addUpdateRates/", data)
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
  getDashRevenueData(officeid: any, aabaid: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getDashRevenueData/" + officeid + "/" + aabaid)
  }
  getDashLandData(officeid: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getDashLandData/" + officeid)
  }
  getFineOrDiscounts() {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getFineOrDiscounts/")
  }
  getPendingPaymentByShresta(shrestaid: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getPendingPaymentByShresta/" + shrestaid)
  }
  getOldTendersByShresta(shrestaid: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getOldTendersByShresta/" + shrestaid)
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
  getmonthsuminvoice(office_id: any, aaba_id: any) {
    return this.httpclient.get(this.apiUrl + "/guthitiro/getmonthsuminvoice/" + office_id + "/" + aaba_id, {})
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
