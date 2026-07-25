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

/* ========================================
   Chart Data Model
   ======================================== */

export interface AttendanceBarItem {
  day: string;
  date: string;

  present: number;
  late: number;
  absent: number;
}

/* ========================================
   Internal Chart Types
   ======================================== */

interface BarSegment {
  value: number;
  color: string;
}

interface ChartColors {
  present: string;
  late: string;
  absent: string;
  axis: string;
  grid: string;
  text: string;
  textSecondary: string;
  background: string;
}

interface BarHitArea {
  item: AttendanceBarItem;

  x: number;
  y: number;
  width: number;
  height: number;
}
/* ========================================
   Component
   ======================================== */

@Component({
  selector: 'cxp-chart-bar-app',
  standalone: true,
  imports: [],
  templateUrl: './cxp-chart-bar-app.html',
  styleUrl: './cxp-chart-bar-app.css',
})
export class CxpChartBarApp implements AfterViewInit, OnChanges, OnDestroy {
  /* ========================================
     Canvas Reference
     ======================================== */

  @ViewChild('canvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  /* ========================================
     Chart Inputs
     ======================================== */
  @Input() navigationStep = 1;

  @Input()
  data: AttendanceBarItem[] = [];

  /**
   * true  = stacked bars
   * false = grouped bars
   */
  @Input()
  stacked = true;

  /**
   * Maximum number of categories displayed.
   */
  @Input()
  visibleBars = 20;

  /**
   * Percentage of empty space inside each slot.
   *
   * 0   = no spacing
   * 0.3 = 30% spacing
   * 0.6 = 60% spacing
   */
  @Input()
  barSpacing = 0.3;

  /**
   * Maximum width of one category.
   */
  @Input()
  maximumBarWidth = 30;

  /**
   * Gap between stacked segments.
   */
  @Input()
  stackGap = 2;

  /**
   * Gap between grouped bars.
   */
  @Input()
  groupGap = 3;

  /**
   * Number of horizontal grid divisions.
   */
  @Input()
  gridLineCount = 10;

  /**
   * Optional manually configured maximum value.
   */
  @Input()
  maximumValue?: number;

  @Input()
  showGridLines = true;

  @Input()
  showXAxisLabels = true;

  @Input()
  showYAxisLabels = true;

  @Input()
  showAxes = true;

  /* ========================================
     Private Properties
     ======================================== */

  private resizeObserver?: ResizeObserver;

  private viewInitialized = false;
  private hoveredIndex = -1;

  private mouseX = 0;
  private mouseY = 0;
  private startIndex = 0;
  private animationOffset = 0;
  private animationStartIndex: number | null = null;
  private animationFrameId: number | null = null;
  private lastSlotWidth = 50;

  /* ========================================
     Public Properties
     ======================================== */
  isAnimating = false;

  /* ========================================
     Angular Lifecycle
     ======================================== */

  ngAfterViewInit(): void {
    this.viewInitialized = true;

    this.observeCanvasSize();

    const canvas = this.canvasRef.nativeElement;

    canvas.addEventListener('mousemove', this.onMouseMove);

    canvas.addEventListener('mouseleave', this.onMouseLeave);

    this.renderChart();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (!this.viewInitialized) {
      return;
    }

    this.renderChart();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    const canvas = this.canvasRef.nativeElement;

    canvas.removeEventListener('mousemove', this.onMouseMove);

    canvas.removeEventListener('mouseleave', this.onMouseLeave);

    this.resizeObserver?.disconnect();
  }

  private get safeNavigationStep(): number {
    return Math.max(1, Math.floor(this.navigationStep));
  }

  private onMouseMove = (event: MouseEvent): void => {
    const canvas = this.canvasRef.nativeElement;

    const rect = canvas.getBoundingClientRect();

    this.mouseX = event.clientX - rect.left;

    this.mouseY = event.clientY - rect.top;

    this.renderChart();
  };

  private onMouseLeave = (): void => {
    this.hoveredIndex = -1;

    this.renderChart();
  };

  /* ========================================
     Next and Previous Arrow
     ======================================== */

  get canShowPrevious(): boolean {
    return this.startIndex > 0;
  }

  get canShowNext(): boolean {
    return this.startIndex + this.visibleBars < this.data.length;
  }

  showPrevious(): void {
    if (this.isAnimating || !this.canShowPrevious) {
      return;
    }

    const step = Math.min(this.safeNavigationStep, this.startIndex);

    if (step <= 0) {
      return;
    }

    const animationDistance = this.lastSlotWidth * step;

    this.animationStartIndex = this.startIndex - step;

    this.animationOffset = -animationDistance;

    this.animateHorizontalOffset(-animationDistance, 0, () => {
      this.startIndex -= step;

      this.animationStartIndex = null;
      this.animationOffset = 0;

      this.redrawChart();
    });
  }

  showNext(): void {
    if (this.isAnimating || !this.canShowNext) {
      return;
    }

    const step = Math.min(this.safeNavigationStep, this.maximumStartIndex - this.startIndex);

    if (step <= 0) {
      return;
    }

    const animationDistance = this.lastSlotWidth * step;

    this.animationStartIndex = this.startIndex;

    this.animateHorizontalOffset(0, -animationDistance, () => {
      this.startIndex += step;

      this.animationStartIndex = null;
      this.animationOffset = 0;

      this.redrawChart();
    });
  }

  private get maximumStartIndex(): number {
    const safeVisibleBars = Math.max(1, Math.floor(this.visibleBars));

    return Math.max(0, this.data.length - safeVisibleBars);
  }

  private animateHorizontalOffset(from: number, to: number, onComplete: () => void): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    const duration = 280;
    const startTime = performance.now();

    const animate = (currentTime: number): void => {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = this.easeInOutCubic(progress);

      this.animationOffset = from + (to - from) * easedProgress;

      this.renderChart();

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);

        return;
      }

      this.animationFrameId = null;

      onComplete();
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  private easeInOutCubic(value: number): number {
    return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
  }
  /* ========================================
     Resize Observer
     ======================================== */

  private observeCanvasSize(): void {
    const canvas = this.canvasRef.nativeElement;

    const container = canvas.parentElement;

    if (!container) {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.renderChart();
    });

    this.resizeObserver.observe(container);
  }

  /* ========================================
     Main Render Method
     ======================================== */

  private renderChart(): void {
    const canvas = this.canvasRef.nativeElement;

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    const canvasWidth = canvas.clientWidth;

    const canvasHeight = canvas.clientHeight;

    if (canvasWidth <= 0 || canvasHeight <= 0) {
      return;
    }

    this.resizeCanvas(canvas, context, canvasWidth, canvasHeight);

    this.drawChart(context, canvasWidth, canvasHeight);
  }

  /* ========================================
     Retina Canvas Scaling
     ======================================== */

  private resizeCanvas(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
  ): void {
    const pixelRatio = window.devicePixelRatio || 1;

    const requiredWidth = Math.round(width * pixelRatio);

    const requiredHeight = Math.round(height * pixelRatio);

    if (canvas.width !== requiredWidth || canvas.height !== requiredHeight) {
      canvas.width = requiredWidth;

      canvas.height = requiredHeight;
    }

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  /* ========================================
     Draw Entire Chart
     ======================================== */

  private drawChart(
    context: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
  ): void {
    const colors = this.getChartColors();

    context.clearRect(0, 0, canvasWidth, canvasHeight);

    if (colors.background !== 'transparent') {
      context.fillStyle = colors.background;

      context.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    const leftPadding = this.showYAxisLabels ? 76 : 16;

    const rightPadding = 56;

    const topPadding = 20;

    const bottomPadding = this.showXAxisLabels ? 56 : 16;

    const chartLeft = leftPadding;

    const chartRight = canvasWidth - rightPadding;

    const chartTop = topPadding;

    const chartBottom = canvasHeight - bottomPadding;

    const chartWidth = chartRight - chartLeft;

    const chartHeight = chartBottom - chartTop;

    if (chartWidth <= 0 || chartHeight <= 0) {
      return;
    }

    const visibleData = this.getVisibleData();

    const chartMaximum = this.getMaximumValue(visibleData);

    if (this.showGridLines) {
      this.drawGridLines(
        context,
        chartLeft,
        chartRight,
        chartTop,
        chartBottom,
        chartMaximum,
        colors,
      );
    }

    if (this.showAxes) {
      this.drawAxes(context, chartLeft, chartRight, chartTop, chartBottom, colors.axis);
    }

    if (visibleData.length === 0) {
      this.drawEmptyState(
        context,
        chartLeft,
        chartTop,
        chartWidth,
        chartHeight,
        colors.textSecondary,
      );

      return;
    }

    if (this.stacked) {
      this.drawStackedBars(
        context,
        visibleData,
        chartLeft,
        chartBottom,
        chartWidth,
        chartHeight,
        chartMaximum,
        colors,
      );
    } else {
      this.drawGroupedBars(
        context,
        visibleData,
        chartLeft,
        chartBottom,
        chartWidth,
        chartHeight,
        chartMaximum,
        colors,
      );
    }

    if (this.showXAxisLabels) {
      this.drawXAxisLabels(context, visibleData, chartLeft, chartBottom, chartWidth, colors);
    }
  }

  private redrawChart(): void {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    this.drawChart(context, canvas.clientWidth, canvas.clientHeight);
  }
  /* ========================================
     Draw Stacked Bars
     ======================================== */

  private drawStackedBars(
    context: CanvasRenderingContext2D,
    visibleData: AttendanceBarItem[],
    chartLeft: number,
    chartBottom: number,
    chartWidth: number,
    chartHeight: number,
    maximumValue: number,
    colors: ChartColors,
  ): void {
    if (visibleData.length === 0) {
      return;
    }

    const chartTop = chartBottom - chartHeight;

    const safeVisibleBars = Math.max(1, Math.floor(this.visibleBars));
    const slotWidth = chartWidth / safeVisibleBars;

    this.lastSlotWidth = slotWidth;

    const barWidth = this.getCategoryWidth(slotWidth);

    const requestedGap = Math.max(0, this.stackGap);

    // Clear the previous hovered bar before checking again.
    this.hoveredIndex = -1;

    context.save();

    visibleData.forEach((item, index) => {
      const barX =
        chartLeft + index * slotWidth + (slotWidth - barWidth) / 2 + this.animationOffset;

      const isHovered =
        this.mouseX >= barX &&
        this.mouseX <= barX + barWidth &&
        this.mouseY >= chartTop &&
        this.mouseY <= chartBottom;

      if (isHovered) {
        this.hoveredIndex = index;
      }

      const segments: BarSegment[] = [
        {
          value: this.toPositiveNumber(item.present),
          color: colors.present,
        },
        {
          value: this.toPositiveNumber(item.late),
          color: colors.late,
        },
        {
          value: this.toPositiveNumber(item.absent),
          color: colors.absent,
        },
      ].filter((segment) => segment.value > 0);

      let currentY = chartBottom;

      segments.forEach((segment, segmentIndex) => {
        const rawHeight = (segment.value / maximumValue) * chartHeight;

        const segmentHeight = Math.max(1, rawHeight);

        const hasSegmentAbove = segmentIndex < segments.length - 1;

        const gap = hasSegmentAbove ? Math.min(requestedGap, Math.max(0, segmentHeight - 1)) : 0;

        const visibleHeight = Math.max(1, segmentHeight - gap);

        currentY -= segmentHeight;

        this.drawBar(
          context,
          barX,
          currentY,
          barWidth,
          visibleHeight,
          segment.color,
          index === this.hoveredIndex,
        );
      });
    });

    context.restore();
  }

  /* ========================================
     Draw Grouped Bars
     ======================================== */

  private drawGroupedBars(
    context: CanvasRenderingContext2D,
    visibleData: AttendanceBarItem[],
    chartLeft: number,
    chartBottom: number,
    chartWidth: number,
    chartHeight: number,
    maximumValue: number,
    colors: ChartColors,
  ): void {
    if (visibleData.length === 0) {
      return;
    }

    const safeVisibleBars = Math.max(1, Math.floor(this.visibleBars));

    const slotWidth = chartWidth / safeVisibleBars;

    this.lastSlotWidth = slotWidth;

    const categoryWidth = this.getCategoryWidth(slotWidth);

    const seriesCount = 3;

    const safeGroupGap = Math.max(0, this.groupGap);

    const totalGap = safeGroupGap * (seriesCount - 1);

    const availableWidth = Math.max(seriesCount, categoryWidth - totalGap);

    const barWidth = Math.max(1, availableWidth / seriesCount);

    this.hoveredIndex = -1;

    context.save();

    visibleData.forEach((item, index) => {
      const categoryX = chartLeft + index * slotWidth + (slotWidth - categoryWidth) / 2;

      const segments: BarSegment[] = [
        {
          value: this.toPositiveNumber(item.present),
          color: colors.present,
        },
        {
          value: this.toPositiveNumber(item.late),
          color: colors.late,
        },
        {
          value: this.toPositiveNumber(item.absent),
          color: colors.absent,
        },
      ];

      segments.forEach((segment, segmentIndex) => {
        if (segment.value <= 0) {
          return;
        }

        const barHeight = Math.max(1, (segment.value / maximumValue) * chartHeight);

        const barX = categoryX + segmentIndex * (barWidth + safeGroupGap) + this.animationOffset;

        const barY = chartBottom - barHeight;

        const isHovered =
          this.mouseX >= barX &&
          this.mouseX <= barX + barWidth &&
          this.mouseY >= barY &&
          this.mouseY <= chartBottom;

        if (isHovered) {
          this.hoveredIndex = index;
        }

        this.drawBar(
          context,
          barX,
          barY,
          barWidth,
          barHeight,
          segment.color,
          index === this.hoveredIndex,
        );
      });
    });

    context.restore();
  }

  /* ========================================
     Draw Individual Bar
     ======================================== */

  private drawBar(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    hovered = false,
  ): void {
    context.save();

    context.fillStyle = color;

    if (hovered) {
      context.globalAlpha = 1;

      context.shadowColor = 'rgba(255, 255, 255, 0.35)';

      context.shadowBlur = 8;

      context.strokeStyle = 'rgba(255, 255, 255, 0.65)';

      context.lineWidth = 1;
    } else {
      context.globalAlpha = 0.8;
    }

    context.fillRect(x, y, width, height);

    if (hovered) {
      context.strokeRect(x, y, width, height);
    }

    context.restore();
  }
  /* ========================================
     Draw Grid Lines
     ======================================== */

  private drawGridLines(
    context: CanvasRenderingContext2D,
    chartLeft: number,
    chartRight: number,
    chartTop: number,
    chartBottom: number,
    maximumValue: number,
    colors: ChartColors,
  ): void {
    const lineCount = Math.max(1, Math.floor(this.gridLineCount));

    const chartHeight = chartBottom - chartTop;

    context.save();

    context.strokeStyle = colors.grid;

    context.fillStyle = colors.textSecondary;

    context.lineWidth = 1;

    context.setLineDash([4, 4]);

    context.font = '11px Inter, Arial, sans-serif';

    context.textAlign = 'right';

    context.textBaseline = 'middle';

    for (let index = 0; index <= lineCount; index++) {
      const ratio = index / lineCount;

      const y = chartBottom - chartHeight * ratio;

      const alignedY = Math.round(y) + 0.5;

      context.beginPath();

      context.moveTo(chartLeft, alignedY);

      context.lineTo(chartRight, alignedY);

      context.stroke();

      if (this.showYAxisLabels) {
        const value = maximumValue * ratio;

        context.fillText(this.formatAxisValue(value), chartLeft - 10, alignedY);
      }
    }

    context.setLineDash([]);

    context.restore();
  }

  /* ========================================
     Draw Axes
     ======================================== */

  private drawAxes(
    context: CanvasRenderingContext2D,
    chartLeft: number,
    chartRight: number,
    chartTop: number,
    chartBottom: number,
    axisColor: string,
  ): void {
    context.save();

    context.strokeStyle = axisColor;

    context.lineWidth = 1;

    context.setLineDash([]);

    context.beginPath();

    context.moveTo(Math.round(chartLeft) + 0.5, chartTop);

    context.lineTo(Math.round(chartLeft) + 0.5, chartBottom);

    context.lineTo(chartRight, Math.round(chartBottom) + 0.5);

    context.stroke();

    context.restore();
  }

  /* ========================================
     Draw X-Axis Labels
     ======================================== */

  private drawXAxisLabels(
    context: CanvasRenderingContext2D,
    visibleData: AttendanceBarItem[],
    chartLeft: number,
    chartBottom: number,
    chartWidth: number,
    colors: ChartColors,
  ): void {
    if (visibleData.length === 0) {
      return;
    }

    const safeVisibleBars = Math.max(1, Math.floor(this.visibleBars));

    const slotWidth = chartWidth / safeVisibleBars;

    context.save();

    context.textAlign = 'center';
    context.textBaseline = 'top';

    visibleData.forEach((item, index) => {
      const labelX = chartLeft + index * slotWidth + slotWidth / 2 + this.animationOffset;

      const maximumTextWidth = Math.max(20, slotWidth - 4);

      // Day
      context.fillStyle = colors.text;
      context.font = '600 11px Inter, Arial, sans-serif';

      context.fillText(item.day, labelX, chartBottom + 7, maximumTextWidth);

      // Date
      context.fillStyle = colors.textSecondary;

      context.font = '10px Inter, Arial, sans-serif';

      context.fillText(item.date, labelX, chartBottom + 22, maximumTextWidth);
    });

    context.restore();
  }

  /* ========================================
     Empty State
     ======================================== */

  private drawEmptyState(
    context: CanvasRenderingContext2D,
    chartLeft: number,
    chartTop: number,
    chartWidth: number,
    chartHeight: number,
    textColor: string,
  ): void {
    context.save();

    context.fillStyle = textColor;

    context.font = '12px Inter, Arial, sans-serif';

    context.textAlign = 'center';

    context.textBaseline = 'middle';

    context.fillText('No chart data', chartLeft + chartWidth / 2, chartTop + chartHeight / 2);

    context.restore();
  }

  /* ========================================
     Visible Data
     ======================================== */

  private getVisibleData(): AttendanceBarItem[] {
    const safeVisibleBars = Math.max(1, Math.floor(this.visibleBars));

    const start = this.animationStartIndex ?? this.startIndex;

    const extraBars = this.isAnimating ? this.safeNavigationStep : 0;

    return this.data.slice(start, start + safeVisibleBars + extraBars);
  }

  /* ========================================
     Category Width
     ======================================== */

  private getCategoryWidth(slotWidth: number): number {
    const safeSpacing = Math.min(0.95, Math.max(0, this.barSpacing));

    const calculatedWidth = slotWidth * (1 - safeSpacing);

    const safeMaximumWidth = Math.max(1, this.maximumBarWidth);

    return Math.max(1, Math.min(calculatedWidth, safeMaximumWidth));
  }

  /* ========================================
     Maximum Chart Value
     ======================================== */

  private getMaximumValue(visibleData: AttendanceBarItem[]): number {
    const configuredMaximum = Number(this.maximumValue);

    if (Number.isFinite(configuredMaximum) && configuredMaximum > 0) {
      return configuredMaximum;
    }

    let highestValue = 0;

    visibleData.forEach((item) => {
      const present = this.toPositiveNumber(item.present);

      const late = this.toPositiveNumber(item.late);

      const absent = this.toPositiveNumber(item.absent);

      const currentValue = this.stacked ? present + late + absent : Math.max(present, late, absent);

      highestValue = Math.max(highestValue, currentValue);
    });

    if (highestValue <= 0) {
      return 1;
    }

    return this.getRoundedMaximum(highestValue);
  }

  /* ========================================
     Convert Input to Positive Number
     ======================================== */

  private toPositiveNumber(value: unknown): number {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue) || numericValue < 0) {
      return 0;
    }

    return numericValue;
  }

  /* ========================================
     Rounded Maximum
     ======================================== */

  private getRoundedMaximum(value: number): number {
    if (value <= 0) {
      return 1;
    }

    const magnitude = 10 ** Math.floor(Math.log10(value));

    const normalized = value / magnitude;

    let roundedValue: number;

    if (normalized <= 1) {
      roundedValue = 1;
    } else if (normalized <= 2) {
      roundedValue = 2;
    } else if (normalized <= 5) {
      roundedValue = 5;
    } else {
      roundedValue = 10;
    }

    return roundedValue * magnitude;
  }

  /* ========================================
     Axis Value Formatter
     ======================================== */

  private formatAxisValue(value: number): string {
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}M`;
    }

    if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1)}K`;
    }

    return `${Math.round(value)}`;
  }

  /* ========================================
     Chart Theme Colors
     ======================================== */

  private getChartColors(): ChartColors {
    return {
      present: this.resolveCssColor('--color-chart-present', '--color-chart-01', '#f5f5f5'),

      late: this.resolveCssColor('--color-chart-late', '--color-chart-03', '#737373'),

      absent: this.resolveCssColor('--color-chart-absent', '--color-chart-04', '#404040'),

      axis: this.resolveCssColor('--color-chart-axis', '--color-chart-border', '#737373'),

      grid: this.resolveCssColor('--color-chart-grid', '--color-chart-border', '#404040'),

      text: this.resolveCssColor('--color-chart-text', '--color-text-primary', '#e0e0e0'),

      textSecondary: this.resolveCssColor(
        '--color-chart-text-secondary',
        '--color-text-secondary',
        '#999999',
      ),

      background: this.resolveCssColor(
        '--color-chart-background',
        '--color-background-primary',
        'transparent',
      ),
    };
  }

  /* ========================================
     Resolve Nested CSS Variables
     ======================================== */

  private resolveCssColor(
    primaryVariable: string,
    fallbackVariable: string,
    defaultColor: string,
  ): string {
    const probe = document.createElement('span');

    probe.style.position = 'fixed';

    probe.style.left = '-9999px';

    probe.style.top = '-9999px';

    probe.style.visibility = 'hidden';

    probe.style.pointerEvents = 'none';

    probe.style.color = `var(${primaryVariable}, var(${fallbackVariable}, ${defaultColor}))`;

    document.body.appendChild(probe);

    const resolvedColor = getComputedStyle(probe).color;

    probe.remove();

    return resolvedColor || defaultColor;
  }
}
