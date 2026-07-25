import { DecimalPipe } from '@angular/common';
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

import { CxpChartDonutItem } from 'cyberxp-ui';

interface ChartDimensions {
  width: number;
  height: number;
  size: number;
  centerX: number;
  centerY: number;
  radius: number;
  lineWidth: number;
  hoverOffset: number;
}

@Component({
  selector: 'cxp-chart-donut-app',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './cxp-chart-donut-app.html',
  styleUrl: './cxp-chart-donut-app.css',
})
export class CxpChartDonutApp implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('canvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input()
  items: CxpChartDonutItem[] = [];

  @Input()
  centerLabel = 'Employees';

  @Input()
  showCenterText = true;

  @Input()
  centerValueFontSize = 36;

  @Input()
  centerLabelFontSize = 14;

  @Input()
  radiusRatio = 0.32;

  @Input()
  thicknessRatio = 0.40;

  @Input()
  hoverOffsetRatio = 0.04;

  @Input()
  labelOffset = 28;

  /*
   * Public because the HTML legend needs to read this value.
   */
  hoveredIndex: number | null = null;

  private context: CanvasRenderingContext2D | null = null;

  private resizeObserver: ResizeObserver | null = null;

  private viewInitialized = false;

  constructor(private readonly hostElement: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;

    this.context = canvas.getContext('2d');

    if (!this.context) {
      return;
    }

    this.viewInitialized = true;

    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas();
    });

    this.resizeObserver.observe(this.hostElement.nativeElement);

    this.resizeCanvas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.viewInitialized) {
      return;
    }

    if (
      changes['items'] ||
      changes['centerLabel'] ||
      changes['showCenterText'] ||
      changes['centerValueFontSize'] ||
      changes['centerLabelFontSize'] ||
      changes['radiusRatio'] ||
      changes['thicknessRatio'] ||
      changes['hoverOffsetRatio'] ||
      changes['labelOffset']
    ) {
      this.drawDonut();
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();

    this.resizeObserver = null;
  }

  onMouseMove(event: MouseEvent): void {
    const total = this.getTotal();

    if (total <= 0 || this.items.length === 0) {
      this.setHoveredIndex(null);
      return;
    }

    const canvas = this.canvasRef.nativeElement;

    const rectangle = canvas.getBoundingClientRect();

    if (rectangle.width <= 0 || rectangle.height <= 0) {
      return;
    }

    const mouseX = (event.clientX - rectangle.left) * (canvas.width / rectangle.width);

    const mouseY = (event.clientY - rectangle.top) * (canvas.height / rectangle.height);

    const dimensions = this.getChartDimensions();

    const deltaX = mouseX - dimensions.centerX;

    const deltaY = mouseY - dimensions.centerY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const innerRadius = dimensions.radius - dimensions.lineWidth / 2 - dimensions.hoverOffset;

    const outerRadius = dimensions.radius + dimensions.lineWidth / 2 + dimensions.hoverOffset;

    if (distance < innerRadius || distance > outerRadius) {
      this.setHoveredIndex(null);
      return;
    }

    let mouseAngle = Math.atan2(deltaY, deltaX) + Math.PI / 2;

    if (mouseAngle < 0) {
      mouseAngle += Math.PI * 2;
    }

    let currentAngle = 0;

    for (let index = 0; index < this.items.length; index++) {
      const item = this.items[index];

      const value = Math.max(item.value, 0);

      const sliceAngle = (value / total) * Math.PI * 2;

      const endAngle = currentAngle + sliceAngle;

      if (mouseAngle >= currentAngle && mouseAngle < endAngle) {
        this.setHoveredIndex(index);
        return;
      }

      currentAngle = endAngle;
    }

    this.setHoveredIndex(null);
  }

  onMouseLeave(): void {
    this.setHoveredIndex(null);
  }

  /*
   * Public because the HTML legend calls this method.
   */
  setHoveredIndex(index: number | null): void {
    if (this.hoveredIndex === index) {
      return;
    }

    this.hoveredIndex = index;

    this.drawDonut();
  }

  /*
   * Public because the HTML legend uses this method
   * for the legend color indicator.
   */
  getThemeColor(color: string): string {
    if (!color.startsWith('--')) {
      return color;
    }

    const resolvedColor = getComputedStyle(document.body).getPropertyValue(color).trim();

    return resolvedColor || color;
  }

  private resizeCanvas(): void {
    const context = this.context;

    if (!context) {
      return;
    }

    const canvas = this.canvasRef.nativeElement;

    const rectangle = canvas.getBoundingClientRect();

    const cssWidth = Math.max(Math.floor(rectangle.width), 1);

    const cssHeight = Math.max(Math.floor(rectangle.height), 1);

    const pixelRatio = window.devicePixelRatio || 1;

    const canvasWidth = Math.floor(cssWidth * pixelRatio);

    const canvasHeight = Math.floor(cssHeight * pixelRatio);

    if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
      canvas.width = canvasWidth;

      canvas.height = canvasHeight;
    }

    this.drawDonut();
  }

  private drawDonut(): void {
    const context = this.context;

    if (!context) {
      return;
    }

    const canvas = this.canvasRef.nativeElement;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const dimensions = this.getChartDimensions();

    const total = this.getTotal();

    if (total <= 0) {
      if (this.showCenterText) {
        this.drawCenterText(context, dimensions, 0);
      }

      return;
    }

    let startAngle = -Math.PI / 2;

    for (let index = 0; index < this.items.length; index++) {
      const item = this.items[index];

      const value = Math.max(item.value, 0);

      if (value === 0) {
        continue;
      }

      const sliceAngle = (value / total) * Math.PI * 2;

      const endAngle = startAngle + sliceAngle;

      const middleAngle = (startAngle + endAngle) / 2;

      const offset = index === this.hoveredIndex ? dimensions.hoverOffset : 0;

      const drawCenterX = dimensions.centerX + Math.cos(middleAngle) * offset;

      const drawCenterY = dimensions.centerY + Math.sin(middleAngle) * offset;

      context.beginPath();

      context.arc(drawCenterX, drawCenterY, dimensions.radius, startAngle, endAngle);

      context.lineWidth = dimensions.lineWidth + 2;
      context.lineCap = 'butt';
      context.strokeStyle = this.getThemeColor('--color-border-primary');

      context.stroke();

      // Draw colored slice
      context.beginPath();

      context.arc(drawCenterX, drawCenterY, dimensions.radius, startAngle, endAngle);

      context.lineWidth = dimensions.lineWidth - 2;
      context.lineCap = 'butt';
      context.strokeStyle = this.getThemeColor(item.color);

      context.stroke();

      this.drawAlias(context, dimensions, middleAngle, item.alias);

      startAngle = endAngle;
    }

    if (this.showCenterText) {
      this.drawCenterText(context, dimensions, total);
    }
  }

  private drawCenterText(
    context: CanvasRenderingContext2D,
    dimensions: ChartDimensions,
    total: number,
  ): void {
    const hoveredItem = this.hoveredIndex !== null ? this.items[this.hoveredIndex] : null;

    const value = hoveredItem?.value ?? total;

    const label = hoveredItem?.label ?? this.centerLabel;

    const scale = dimensions.size / 400;

    const valueFontSize = Math.max(this.centerValueFontSize * scale, 12);

    const labelFontSize = Math.max(this.centerLabelFontSize * scale, 9);

    const verticalOffset = Math.max(dimensions.size * 0.04, 8);

    context.save();

    context.textAlign = 'center';

    context.textBaseline = 'middle';

    context.fillStyle = this.getThemeColor('--color-text-primary') || '#1a1a1a';

    context.font = `600 ${valueFontSize}px ` + 'Inter, Arial, sans-serif';

    context.fillText(
      value.toLocaleString(),
      dimensions.centerX,
      dimensions.centerY - verticalOffset,
    );

    context.fillStyle = this.getThemeColor('--color-text-secondary') || '#737373';

    context.font = `500 ${labelFontSize}px ` + 'Inter, Arial, sans-serif';

    context.fillText(label, dimensions.centerX, dimensions.centerY + verticalOffset);

    context.restore();
  }

  private drawAlias(
    context: CanvasRenderingContext2D,
    dimensions: ChartDimensions,
    middleAngle: number,
    alias: string,
  ): void {
    const labelRadius = dimensions.radius + dimensions.lineWidth / 2 + this.labelOffset;

    const x = dimensions.centerX + Math.cos(middleAngle) * labelRadius;

    const y = dimensions.centerY + Math.sin(middleAngle) * labelRadius;

    context.save();

    context.textAlign = 'center';

    context.textBaseline = 'middle';

    context.fillStyle = this.getThemeColor('--color-text-primary') || '#1a1a1a';

    const fontSize = Math.max(dimensions.size * 0.05, 10);

    context.font = `600 ${fontSize}px ` + 'Inter, Arial, sans-serif';

    context.fillText(alias, x, y);

    context.restore();
  }

  private getChartDimensions(): ChartDimensions {
    const canvas = this.canvasRef.nativeElement;

    const width = canvas.width;

    const height = canvas.height;

    const size = Math.min(width, height);

    const safeRadiusRatio = Math.min(Math.max(this.radiusRatio, 0.1), 0.45);

    const safeThicknessRatio = Math.min(Math.max(this.thicknessRatio, 0.05), 1);

    const safeHoverOffsetRatio = Math.max(this.hoverOffsetRatio, 0);

    const radius = size * safeRadiusRatio;

    const lineWidth = radius * safeThicknessRatio;

    const hoverOffset = lineWidth * safeHoverOffsetRatio;

    return {
      width,
      height,
      size,
      centerX: width / 2,
      centerY: height / 2,
      radius,
      lineWidth,
      hoverOffset,
    };
  }

  private getTotal(): number {
    return this.items.reduce((total, item) => total + Math.max(item.value, 0), 0);
  }
}
