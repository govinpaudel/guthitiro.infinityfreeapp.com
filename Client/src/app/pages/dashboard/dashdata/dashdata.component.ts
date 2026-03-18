import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
    ApexChart,
    ApexAxisChartSeries,
    ApexXAxis,
    ApexTitleSubtitle,
    ApexDataLabels,
    ApexPlotOptions,
    ApexStroke
} from 'ng-apexcharts';
import { GuthiService } from '../../../services/guthi.service';
import { AuthService } from '../../../services/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MaterialModule } from '../../../shared/material';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    stroke: ApexStroke;
};

@Component({
    selector: 'app-dashdata',
    standalone: true,
    imports: [CommonModule, NgApexchartsModule, MaterialModule],
    templateUrl: './dashdata.component.html',
    styleUrl: './dashdata.component.css'
})
export class DashdataComponent implements OnInit {
    public userData: any;
    public landData: any[] = [];
    public revenueData: any[] = [];
    public depositData:any[]=[];
    
    // Monthly Mapping for Revenue Chart
    monthKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
    monthNames = ['जम्मा', 'श्रावण', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र', 'वैशाख', 'जेठ', 'असार'];

    // Chart Configuration Objects
    public chartOptions: Partial<ChartOptions> = {};
    public chartOptions1: Partial<ChartOptions> = {};
    public chartOptions2: Partial<ChartOptions> = {};

    constructor(
        private guthiService: GuthiService,
        private authService: AuthService,
        private loader: NgxUiLoaderService
    ) { }

    ngOnInit(): void {
        this.userData = this.authService.getUser();
        if (this.userData) {
            this.getDashLandDataByOfficeId(this.userData.office_id);
            this.getDashRevenueDataByOfficeId(this.userData.office_id, this.userData.aaba_id);
            this.getDashDepositDataByOfficeId(this.userData.office_id, this.userData.aaba_id)
        }
    }

    getDashRevenueDataByOfficeId(id: any, id1: any) {
        this.loader.start();
        this.guthiService.getDashRevenueDataByOfficeId(id, id1).subscribe({
            next: (res: any) => {
                this.revenueData = res.data;
                if (this.revenueData && this.revenueData.length > 0) {
                    this.loadDataToChart();
                }
                this.loader.stop();
            },
            error: (err: any) => {
                console.error('Revenue API Error:', err);
                this.loader.stop();
            }
        });
    }
   getDashDepositDataByOfficeId(id: any, id1: any) {
        this.loader.start();
        this.guthiService.getDashDepositDataByOfficeId(id, id1).subscribe({
            next: (res: any) => {
                this.depositData = res.data;
                if (this.depositData && this.depositData.length > 0) {
                    this.loadDataToChart2();
                }
                this.loader.stop();
            },
            error: (err: any) => {
                console.error('Revenue API Error:', err);
                this.loader.stop();
            }
        });
    }
    getDashLandDataByOfficeId(id: any) {
        this.loader.start();
        this.guthiService.getDashLandDataByOfficeId(id).subscribe({
            next: (res: any) => {
                this.landData = res.data;
                if (this.landData && this.landData.length > 0) {
                    this.loadDataToChart1();
                }
                this.loader.stop();
            },
            error: (err: any) => {
                console.error('Land API Error:', err);
                this.loader.stop();
            }
        });
    }

    loadDataToChart() {
        const row = this.revenueData[0];
        const monthlyData = this.monthKeys.map(k => Math.round(Number(row[k] ?? 0)));

        this.chartOptions = {
            series: [{
                name: 'कुत/मालपोत',
                data: monthlyData
            }],
            chart: {
                type: 'bar',
                height: 350,
                fontFamily: 'Sanskrit, Arial, sans-serif'
            },
            plotOptions: {
                bar: {
                    dataLabels: { position: 'top' }
                }
            },
            dataLabels: {
                enabled: true,
                offsetY: -20,
                style: { fontSize: '12px', colors: ["#304758"] }
            },
            title: {
                text: 'मासिक कुत/मालपोत संकलन विवरण',
                align: 'center',
                style: { fontSize: '20px', fontWeight: 'bold' }
            },
            xaxis: {
                categories: this.monthNames,
                position: 'bottom'
            }
        };
    }
loadDataToChart2() {
        const row = this.depositData[0];
        const monthlyData = this.monthKeys.map(k => Math.round(Number(row[k] ?? 0)));

        this.chartOptions2 = {
            series: [{
                name: 'बैंक जम्मा',
                data: monthlyData
            }],
            chart: {
                type: 'bar',
                height: 350,
                fontFamily: 'Sanskrit, Arial, sans-serif'
            },
            plotOptions: {
                bar: {
                    dataLabels: { position: 'top' }
                }
            },
            dataLabels: {
                enabled: true,
                offsetY: -20,
                style: { fontSize: '12px', colors: ["#304758"] }
            },
            title: {
                text: 'बैंक जम्मा विवरण',
                align: 'center',
                style: { fontSize: '20px', fontWeight: 'bold' }
            },
            xaxis: {
                categories: this.monthNames,
                position: 'bottom'
            }
        };
    }
    loadDataToChart1() {
        let guthiType1Sum = 0;
        let guthiType2Sum = 0;
        let guthiType3Sum = 0;

        this.landData.forEach((item: any) => {
            const area = Number(item.area_units || 0);
            const typeId = Number(item.guthi_type_id);

            if (typeId === 1) {
                guthiType1Sum += Math.round(area / 256);
            } else if (typeId === 2) {
                guthiType2Sum += Math.round(area / 256);
            } else if (typeId === 3) {
                guthiType3Sum += Math.round(area / 256);
            }
        });

        const total = guthiType1Sum + guthiType2Sum + guthiType3Sum;
        const result = [total, guthiType1Sum, guthiType2Sum, guthiType3Sum];

        // Complete object re-assignment triggers chart refresh
        this.chartOptions1 = {
            series: [{
                name: 'क्षेत्रफल (रोपनी)',
                data: result
            }],
            chart: {
                type: 'bar',
                height: 350,
                toolbar: { show: true }
            },
            plotOptions: {
                bar: {
                    distributed: true, // Different colors for each bar
                    dataLabels: { position: 'top' }
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val + " रोपनी";
                },
                offsetY: -20,
                style: { fontSize: '12px', colors: ["#304758"] }
            },
            title: {
                text: 'जग्गाको विवरण (रोपनीमा)',
                align: 'center',
                style: { fontSize: '20px', fontWeight: 'bold' }
            },
            xaxis: {
                categories: ['जम्मा', 'अधिनस्त', 'रैतान नम्बरी', 'तैनाथी']
            }
        };
    }
}