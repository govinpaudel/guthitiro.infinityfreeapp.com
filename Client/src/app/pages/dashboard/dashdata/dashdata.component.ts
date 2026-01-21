import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexChart,
    ApexResponsive,
    ApexAxisChartSeries,
    ApexXAxis,
    ApexTitleSubtitle
} from 'ng-apexcharts';
import { GuthiService } from '../../../services/guthi.service';
import { AuthService } from '../../../services/auth.service';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title?: ApexTitleSubtitle;
};

@Component({
    selector: 'app-dashdata',
    imports: [CommonModule, NgApexchartsModule],
    templateUrl: './dashdata.component.html',
    styleUrl: './dashdata.component.css'
})
export class DashdataComponent implements OnInit {
    public userData: any;
    public landData: any;
    public revenueData: any;
    monthKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
    monthNames = ['जम्मा', 'श्रावण', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र', 'वैशाख', 'जेठ', 'असार'];

    public chartOptions: Partial<ChartOptions> = {};
    public chartOptions1: Partial<ChartOptions> = {};
    constructor(
        private guthiService: GuthiService,
        private authService: AuthService,
        private loader:NgxUiLoaderService
    ) { }
    ngOnInit(): void {
        this.userData = this.authService.getUser();
        this.getDashLandDataByOfficeId(this.userData.office_id);
        this.getDashRevenueDataByOfficeId(this.userData.office_id, this.userData.aaba_id);
    }

    getDashRevenueDataByOfficeId(id: any, id1: any) {
        this.loader.start()
        this.guthiService.getDashRevenueDataByOfficeId(id, id1).subscribe(
            {
                next: (res: any) => {
                    this.revenueData = res.data;
                    console.log('revenue data', res.data)
                    if (res.data.length > 0) {
                        this.loadDataToChart();
                    }
                },
                error: (err: any) => {
                    console.log(err);
                }
            }
        )
         this.loader.stop()
    }
    getDashLandDataByOfficeId(id: any) {
         this.loader.start()
        this.guthiService.getDashLandDataByOfficeId(id).subscribe(
            {
                next: (res: any) => {
                    this.landData = res.data;
                    console.log('land data', res.data)
                    if (res.data.length > 0) {
                        this.loadDataToChart1()
                    }

                }
            }
        )
         this.loader.stop()
    }
    loadDataToChart() {
        const row = this.revenueData[0];
        const monthlyData = this.monthKeys.map(k => Math.round(Number(row[k] ?? 0)));
        this.chartOptions = {
            series: [
                {
                    name: 'कुत/मालपोत',
                    data: monthlyData
                }
            ],
            chart: {
                type: 'bar',
                height: 350
            },
            title: {
                text: 'मासिक कुत/मालपोत संकलन विवरण',
                align: 'center',        // options: 'left', 'center', 'right'
                margin: 20,
                style: {
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#263238'
                }
            },
            xaxis: {
                categories: this.monthNames                
            }
        };
    }
    loadDataToChart1() {
        let guthiType1Sum = 0;
        let guthiType2Sum = 0;
        let guthiType3Sum = 0;
        this.landData.forEach((item: any) => {
            if (item.guthi_type_id === 1) {
                guthiType1Sum += Math.round((item.area_units) / 256);
            } else if (item.guthi_type_id === 2) {
                guthiType2Sum += Math.round((item.area_units) / 256);
            } else if (item.guthi_type_id === 3) {
                guthiType3Sum += Math.round((item.area_units) / 256);
            }

        });

        const total = guthiType1Sum + guthiType2Sum+guthiType3Sum;
        const result = [total, guthiType1Sum, guthiType2Sum,guthiType3Sum];
        this.chartOptions1 = {
            series: [
                {
                    name: 'क्षेत्रफल/रोपनी',
                    data: result
                }

            ],
            chart: {
                type: 'bar',
                height: 350
            },
            title: {
                text: 'जग्गाको विवरण',
                align: 'center',        // options: 'left', 'center', 'right'
                margin: 20,
                style: {
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#263238'
                }
            },
            xaxis: {
                categories: ['जम्मा', 'अधिनस्त', 'रैतान नम्बरी','तैनाथी']
            }
        };
    }
}
