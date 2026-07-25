import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import {
  NgxEchartsDirective,
  provideEchartsCore,
} from 'ngx-echarts';

import type {
  ECharts,
  EChartsOption,
  PieSeriesOption,
} from 'echarts';

import * as echarts from 'echarts/core';

import { PieChart } from 'echarts/charts';

import {
  TooltipComponent,
} from 'echarts/components';

import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  PieChart,
  TooltipComponent,
  CanvasRenderer,
]);

interface EmployeeLegendItem {
  code: string;
  label: string;
  value: number;
  color: string;
}

@Component({
  selector: 'cxp-chart-donut-app',
  standalone: true,
  imports: [
    NgxEchartsDirective,
  ],
  providers: [
    provideEchartsCore({
      echarts,
    }),
  ],
  templateUrl: './cxp-chart-donut-app.html',
  styleUrl: './cxp-chart-donut-app.css',
})
export class CxpChartDonutApp
  implements AfterViewInit, OnChanges, OnDestroy
{
  @ViewChild('chartContainer', { static: true })
  private chartContainer!: ElementRef<HTMLElement>;

  @Input()
  title = 'Employees Summary';

  @Input()
  regular = 100;

  @Input()
  projectBased = 40;

  @Input()
  partTime = 70;

  @Input()
  contractual = 20;

  @Input()
  probationary = 60;

  employees: EmployeeLegendItem[] = [];

  chartOptions: EChartsOption = {};

  private chartInstance?: ECharts;

  private resizeObserver?: ResizeObserver;

  private themeObserver?: MutationObserver;

  private currentWidth = 0;

  private resizeFrame?: number;

  ngAfterViewInit(): void {
    this.initializeResizeObserver();
    this.initializeThemeObserver();

    const width =
      this.chartContainer.nativeElement
        .getBoundingClientRect()
        .width;

    this.currentWidth = Math.round(width);

    this.updateChart(this.currentWidth);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const hasRelevantChange =
      changes['title'] ||
      changes['regular'] ||
      changes['projectBased'] ||
      changes['partTime'] ||
      changes['contractual'] ||
      changes['probationary'];

    if (!hasRelevantChange) {
      return;
    }

    if (!this.chartContainer) {
      return;
    }

    const width =
      this.currentWidth ||
      Math.round(
        this.chartContainer.nativeElement
          .getBoundingClientRect()
          .width,
      );

    this.updateChart(width);
  }

  onChartInit(chartInstance: ECharts): void {
    this.chartInstance = chartInstance;

    requestAnimationFrame(() => {
      this.chartInstance?.resize();
    });
  }

  private initializeResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry) {
          return;
        }

        const width = Math.round(
          entry.contentRect.width,
        );

        if (
          width <= 0 ||
          width === this.currentWidth
        ) {
          return;
        }

        this.currentWidth = width;

        if (this.resizeFrame) {
          cancelAnimationFrame(
            this.resizeFrame,
          );
        }

        this.resizeFrame =
          requestAnimationFrame(() => {
            this.updateChart(width);
            this.chartInstance?.resize();
          });
      },
    );

    this.resizeObserver.observe(
      this.chartContainer.nativeElement,
    );
  }

  private initializeThemeObserver(): void {
    this.themeObserver =
      new MutationObserver(() => {
        const width =
          this.currentWidth ||
          Math.round(
            this.chartContainer.nativeElement
              .getBoundingClientRect()
              .width,
          );

        requestAnimationFrame(() => {
          this.updateChart(width);
        });
      });

    this.themeObserver.observe(
      document.body,
      {
        attributes: true,
        attributeFilter: [
          'class',
          'style',
        ],
      },
    );

    this.themeObserver.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: [
          'class',
          'style',
        ],
      },
    );
  }

  private updateChart(width: number): void {
    if (width <= 0) {
      return;
    }

    const scale = Math.max(
      0.65,
      Math.min(width / 600, 1.4),
    );

    const textPrimary =
      this.getThemeColor(
        '--color-chart-text',
        this.getThemeColor(
          '--color-text-primary',
          '#e5e5e5',
        ),
      );

    const textSecondary =
      this.getThemeColor(
        '--color-chart-text-secondary',
        this.getThemeColor(
          '--color-text-secondary',
          '#bdbdbd',
        ),
      );

    const chartBackground =
      this.getThemeColor(
        '--color-chart-background',
        'transparent',
      );

    const chartBorder =
      this.getThemeColor(
        '--color-chart-border',
        this.getThemeColor(
          '--color-border-primary',
          '#1a1a1a',
        ),
      );

    const tooltipBackground =
      this.getThemeColor(
        '--color-background-secondary',
        '#1a1a1a',
      );

    this.employees = [
      {
        code: 'RG',
        label: 'Regular',
        value: this.sanitizeValue(
          this.regular,
        ),
        color: this.getThemeColor(
          '--color-chart-01',
          '#2b2b2b',
        ),
      },
      {
        code: 'PB',
        label: 'Project Based',
        value: this.sanitizeValue(
          this.projectBased,
        ),
        color: this.getThemeColor(
          '--color-chart-02',
          '#737373',
        ),
      },
      {
        code: 'PT',
        label: 'Part Time',
        value: this.sanitizeValue(
          this.partTime,
        ),
        color: this.getThemeColor(
          '--color-chart-03',
          '#999999',
        ),
      },
      {
        code: 'CT',
        label: 'Contractual',
        value: this.sanitizeValue(
          this.contractual,
        ),
        color: this.getThemeColor(
          '--color-chart-04',
          '#d4d4d4',
        ),
      },
      {
        code: 'PR',
        label: 'Probationary',
        value: this.sanitizeValue(
          this.probationary,
        ),
        color: this.getThemeColor(
          '--color-chart-05',
          '#e5e5e5',
        ),
      },
    ];

    const labelFontSize =
      this.scaled(
        17,
        scale,
        11,
        28,
      );

    const tooltipFontSize =
      this.scaled(
        14,
        scale,
        10,
        20,
      );

    const borderWidth =
      this.scaled(
        1,
        scale,
        0,
        2,
      );

    const series: PieSeriesOption = {
      name: this.title,
      type: 'pie',

      center: [
        '50%',
        '50%',
      ],

      radius: [
        '55%',
        '82%',
      ],

      startAngle: 90,
      clockwise: true,

      avoidLabelOverlap: true,

      minAngle: 1,

      itemStyle: {
        borderColor: chartBorder,
        borderWidth,
      },

      label: {
        show: true,
        position: 'outside',

        color: textSecondary,

        fontFamily:
          'Inter, Arial, sans-serif',

        fontSize: labelFontSize,
        fontWeight: 400,

        formatter: (params) => {
          const employee =
            this.employees.find(
              (item) =>
                item.label ===
                params.name,
            );

          return (
            employee?.code ??
            params.name
          );
        },
      },

      labelLine: {
        show: false,
      },

      emphasis: {
        scale: true,

        scaleSize: this.scaled(
          8,
          scale,
          4,
          14,
        ),

        itemStyle: {
          shadowBlur: this.scaled(
            10,
            scale,
            4,
            18,
          ),

          shadowOffsetX: 0,

          shadowColor:
            'rgba(0, 0, 0, 0.35)',
        },
      },

      data: this.employees.map(
        (employee) => ({
          name: employee.label,
          value: employee.value,

          itemStyle: {
            color: employee.color,
          },
        }),
      ),
    };

    this.chartOptions = {
      backgroundColor:
        chartBackground,

      animation: true,
      animationDuration: 500,
      animationEasing:
        'cubicOut',

      tooltip: {
        trigger: 'item',
        confine: true,

        backgroundColor:
          tooltipBackground,

        borderColor:
          chartBorder,

        borderWidth: 1,

        padding: [
          this.scaled(
            8,
            scale,
            5,
            14,
          ),
          this.scaled(
            12,
            scale,
            8,
            18,
          ),
        ],

        textStyle: {
          color: textPrimary,
          fontSize:
            tooltipFontSize,
        },

        formatter:
          '{b}<br/>{c} employees ({d}%)',
      },

      series: [
        series,
      ],
    };

    requestAnimationFrame(() => {
      this.chartInstance?.resize();
    });
  }

  private scaled(
    value: number,
    scale: number,
    minimum: number,
    maximum: number,
  ): number {
    const result = Math.round(
      value * scale,
    );

    return Math.max(
      minimum,
      Math.min(
        result,
        maximum,
      ),
    );
  }

  private sanitizeValue(
    value: number,
  ): number {
    const numericValue =
      Number(value);

    if (
      !Number.isFinite(
        numericValue,
      ) ||
      numericValue < 0
    ) {
      return 0;
    }

    return numericValue;
  }

  private getThemeColor(
    variableName: string,
    fallback: string,
  ): string {
    const element =
      this.chartContainer
        ?.nativeElement;

    if (!element) {
      return fallback;
    }

    const value =
      getComputedStyle(element)
        .getPropertyValue(
          variableName,
        )
        .trim();

    return value || fallback;
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.themeObserver?.disconnect();

    if (this.resizeFrame) {
      cancelAnimationFrame(
        this.resizeFrame,
      );
    }

    this.chartInstance?.dispose();
  }
}