import { Directive, Input, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input() text: string = '';  // Tooltip text
  private tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.createTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.destroyTooltip();
  }

  private createTooltip() {
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.appendChild(this.tooltipElement, this.renderer.createText(this.text));
    this.renderer.addClass(this.tooltipElement, 'tooltip');
    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);

    const rect = this.el.nativeElement.getBoundingClientRect();
    const top = -(rect.height/2) + 'px';
    const left = (rect.width + 4) + 'px';
    this.renderer.setStyle(this.tooltipElement, 'top', top);
    this.renderer.setStyle(this.tooltipElement, 'left', left);
  }

  private destroyTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
