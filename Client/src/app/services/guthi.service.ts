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
    return this.httpclient.get(this.apiUrl + "/guthi/getAabas")
  }
  getStates() {
    return this.httpclient.get(this.apiUrl + "/guthi/getStates")
  }
  getGuthiTypes() {
    return this.httpclient.get(this.apiUrl + "/guthi/getGuthiTypes")
  }
  getTenantTypes(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getTenantTypes/" + id)
  }
  getPalikaTypes() {
    return this.httpclient.get(this.apiUrl + "/guthi/getPalikaTypes")
  }
  getLandTypes() {
    return this.httpclient.get(this.apiUrl + "/guthi/getLandTypes")
  }
  getLandSubTypes() {
    return this.httpclient.get(this.apiUrl + "/guthi/getLandSubTypes")
  }
  getAreaTypes() {
    return this.httpclient.get(this.apiUrl + "/guthi/getAreaTypes")
  }
  getAllShresta(officeid: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getAllShresta/" + officeid)
  }
  addUpdateShresta(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthi/addUpdateShresta", data)
  }
  getShrestaById(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getShresta/" + id)
  }
  getGabisaById(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getGabisaById/" + id)
  }
  getdistrictByState(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/districtByState/" + id)
  }
  getLocalTypesByDistrict(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/localtypesByDistrict/" + id)
  }
  getPalikaByDistrictAndType(id: any, type: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getPalikaByDistrictAndType/" + id + "/" + type)
  }
  gabisaByDistrictAndPalikaId(id: any, palika_id: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/gabisaByDistrictAndPalikaId/" + id + "/" + palika_id)
  }
  getWards() {
    return this.httpclient.get(this.apiUrl + "/guthi/getWards")
  }
  getLands(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getLands/" + id)
  }
  getLandByid(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getLandById/" + id)
  }
  AddOrUpdateLand(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthi/AddOrUpdateLand/", data)
  }
  addUpdateGabisa(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthi/addUpdateGabisa/", data)
  }
  getRatesByOffice(id: any, type: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getRatesByOffice/" + id + "/" + type)
  }
  getRatesById(guthi_type_id: any, id: any,) {
    return this.httpclient.get(this.apiUrl + "/guthi/getRatesById/" + guthi_type_id + "/" + id)
  }
  getInvoicesByShresta(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getInvoicesByShresta/" + id)
  }
  genInvoice(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthi/genInvoice", data)
  }
  loadInvHeaderData(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/loadInvHeaderData/" + id)
  }
  loadInvDetailData(id: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/loadInvDetailData/" + id)
  }
  updDiscounts(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthi/updatediscounts/", data)
  }
  addUpdateRates(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthi/addUpdateRates/", data)
  }
  saveTender(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthi/saveTender", data)
  }
  saveOldTender(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthi/saveOldTender", data)
  }
  getGabisas() {
    return this.httpclient.get(this.apiUrl + "/guthi/getGabisas/")
  }
  getDistricts() {
    return this.httpclient.get(this.apiUrl + "/guthi/getDistricts/")
  }
  getPalikas() {
    return this.httpclient.get(this.apiUrl + "/guthi/getPalikas/")
  }
  getTenders() {
    return this.httpclient.get(this.apiUrl + "/guthi/getTenders/")
  }
  getDashRevenueData(officeid: any, aabaid: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getDashRevenueData/" + officeid + "/" + aabaid)
  }
  getDashLandData(officeid: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getDashLandData/" + officeid)
  }
  getFineOrDiscounts() {
    return this.httpclient.get(this.apiUrl + "/guthi/getFineOrDiscounts/")
  }
  getPendingPaymentByShresta(shrestaid: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getPendingPaymentByShresta/" + shrestaid)
  }
  getOldTendersByShresta(shrestaid: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getOldTendersByShresta/" + shrestaid)
  }
  getLagatByOfficeId(officeid: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getLagatByOfficeId/" + officeid)
  }
  getInvoicesByOfficeId(officeid: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getInvoicesByOfficeId/" + officeid)
  }
  updateRatesInInvoiceByid(invoice_id: any, shresta_id: any) {
    return this.httpclient.put(this.apiUrl + "/guthi/updateRatesInInvoiceByid/" + invoice_id + "/" + shresta_id, {})
  }
  getmonthsum(office_id: any, aaba_id: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getmonthsum/" + office_id + "/" + aaba_id, {})
  }
  dupliland(land_id: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/dupliland/" + land_id, {})
  }
  getTenderById(tender_id: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getTenderById/" + tender_id, {})
  }
  getTenderByNo(tender_id: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getTenderByNo/" + tender_id, {})
  }
  updateTender(data: any) {
    return this.httpclient.post(this.apiUrl + "/guthi/updateTender", data)
  }
  getDistinctPalika(office_id: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getDistinctPalika/" + office_id)
  }
  getDistinctGabisa(palika_id: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getDistinctGabisa/" + palika_id)
  }
  getDistinctWards(gabisa_id: any) {
    return this.httpclient.get(this.apiUrl + "/guthi/getDistinctWards/" + gabisa_id)
  }
  getKittaDetails(formdata:any) {
    return this.httpclient.post(this.apiUrl + "/guthi/getKittaDetails",formdata)
  }
}
