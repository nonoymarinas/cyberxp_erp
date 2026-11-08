
import {
  Component,
  computed,
  input,
} from '@angular/core';

export type CxpClassificationLevel =
  | 'high'
  | 'medium'
  | 'low'
  | 'neutral';

@Component({
  selector: 'cxp-classification-badge',
  standalone: true,
  templateUrl: './cxp-classification-badge.html',
  styleUrl: './cxp-classification-badge.css',
})
export class CxpClassificationBadge {

  // ========================================
  // Inputs
  // ========================================

  readonly classification =
    input<CxpClassificationLevel>('neutral');

  readonly label =
    input<string>('');


  // ========================================
  // Display Label
  // ========================================

  readonly displayLabel = computed(() => {

    const customLabel = this.label().trim();

    if (customLabel) {
      return customLabel;
    }

    switch (this.classification()) {
      case 'high':
        return 'High';

      case 'medium':
        return 'Medium';

      case 'low':
        return 'Low';

      default:
        return 'Unclassified';
    }
  });
}
