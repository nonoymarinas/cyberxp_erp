import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
  forwardRef,
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export interface CxpSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export type CxpSelectValue =
  | string
  | number
  | null;

export type CxpSelectSize =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

@Component({
  selector: 'cxp-input-select',
  standalone: true,
  templateUrl: './cxp-input-select.html',
  styleUrl: './cxp-input-select.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => CxpInputSelect,
      ),
      multi: true,
    },
  ],
})
export class CxpInputSelect
  implements ControlValueAccessor
{
  @ViewChild('searchInput')
  searchInput?: ElementRef<HTMLInputElement>;

  private _options: CxpSelectOption[] = [];

  private _value: CxpSelectValue = null;

  @Input()
  set options(
    options: CxpSelectOption[] | null | undefined,
  ) {
    this._options = options ?? [];
    this.syncSearchTextWithValue();
  }

  get options(): CxpSelectOption[] {
    return this._options;
  }

  /**
   * Allows property binding:
   *
   * [value]="selectedTheme"
   *
   * and two-way binding:
   *
   * [(value)]="selectedTheme"
   */
  @Input()
  set value(value: CxpSelectValue) {
    this._value = value;
    this.syncSearchTextWithValue();
  }

  get value(): CxpSelectValue {
    return this._value;
  }

  @Input() name = '';

  @Input() placeholder = 'Select an option';

  @Input() size: CxpSelectSize = 'md';

  @Input() disabled = false;

  @Input() readonly = false;

  @Input() required = false;

  @Input() invalid = false;

  @Input() noResultsText =
    'No matching results';

  @Input() allowCustomValue = false;

  @Output()
  valueChange =
    new EventEmitter<CxpSelectValue>();

  @Output()
  selectedChange =
    new EventEmitter<CxpSelectOption | null>();

  @Output()
  focused = new EventEmitter<void>();

  @Output()
  blurred = new EventEmitter<void>();

  searchText = '';

  isOpen = false;

  activeIndex = -1;

  readonly listboxId =
    `cxp-select-${Math.random()
      .toString(36)
      .slice(2, 10)}`;

  private onChange:
    (value: CxpSelectValue) => void =
      () => {};

  private onTouched: () => void =
    () => {};

  constructor(
    private readonly elementRef:
      ElementRef<HTMLElement>,
  ) {}

  get filteredOptions():
    CxpSelectOption[] {
    const search = this.searchText
      .trim()
      .toLowerCase();

    const selectedOption =
      this.getSelectedOption();

    /*
     * When the current selected label is displayed,
     * opening the dropdown shows all options.
     */
    if (
      selectedOption &&
      selectedOption.label === this.searchText
    ) {
      return this.options;
    }

    if (!search) {
      return this.options;
    }

    return this.options.filter((option) =>
      option.label
        .toLowerCase()
        .includes(search),
    );
  }

  get selectedOption():
    CxpSelectOption | null {
    return this.getSelectedOption();
  }

  get activeOptionId():
    string | null {
    const activeOption =
      this.filteredOptions[
        this.activeIndex
      ];

    if (
      !this.isOpen ||
      this.activeIndex < 0 ||
      !activeOption
    ) {
      return null;
    }

    return (
      `${this.listboxId}` +
      `-option-${this.activeIndex}`
    );
  }

  onSearchInput(event: Event): void {
    if (this.disabled || this.readonly) {
      return;
    }

    const input =
      event.target as HTMLInputElement;

    this.searchText = input.value;
    this.isOpen = true;

    /*
     * Once the user types something different,
     * the previous selection is cleared.
     *
     * We update _value directly here so that
     * searchText is not reset while typing.
     */
    const selected =
      this.getSelectedOption();

    if (
      this._value !== null &&
      this.searchText !== selected?.label
    ) {
      this.setValue(null);
    }

    this.activeIndex =
      this.findFirstEnabledOptionIndex();
  }

  onFocus(): void {
    if (this.disabled || this.readonly) {
      return;
    }

    this.isOpen = true;

    this.setActiveOptionFromCurrentValue();

    this.focused.emit();
  }

  onBlur(): void {
    this.isOpen = false;
    this.activeIndex = -1;

    if (!this.allowCustomValue) {
      this.restoreSelectedLabel();
    } else if (this.searchText.trim()) {
      this.commitCustomValue();
    }

    this.onTouched();
    this.blurred.emit();
  }

  toggleDropdown(): void {
    if (this.disabled || this.readonly) {
      return;
    }

    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.setActiveOptionFromCurrentValue();

      queueMicrotask(() => {
        this.searchInput
          ?.nativeElement
          .focus();
      });

      return;
    }

    this.activeIndex = -1;
  }

  openDropdown(): void {
    if (this.disabled || this.readonly) {
      return;
    }

    this.isOpen = true;

    this.setActiveOptionFromCurrentValue();
  }

  closeDropdown(): void {
    this.isOpen = false;
    this.activeIndex = -1;
  }

  selectOption(
    option: CxpSelectOption,
    event?: MouseEvent,
  ): void {
    event?.preventDefault();
    event?.stopPropagation();

    if (
      this.disabled ||
      this.readonly ||
      option.disabled
    ) {
      return;
    }

    this.searchText = option.label;

    this.setValue(
      option.value,
      option,
    );

    this.closeDropdown();

    queueMicrotask(() => {
      this.searchInput
        ?.nativeElement
        .focus();
    });
  }

  onKeydown(
    event: KeyboardEvent,
  ): void {
    if (this.disabled || this.readonly) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();

        if (!this.isOpen) {
          this.openDropdown();
        }

        this.moveActiveIndex(1);
        break;

      case 'ArrowUp':
        event.preventDefault();

        if (!this.isOpen) {
          this.openDropdown();
        }

        this.moveActiveIndex(-1);
        break;

      case 'Enter':
        event.preventDefault();

        if (!this.isOpen) {
          this.openDropdown();
          return;
        }

        this.selectActiveOption();
        break;

      case 'Escape':
        event.preventDefault();

        this.closeDropdown();
        this.restoreSelectedLabel();
        break;

      case 'Tab':
        if (this.allowCustomValue) {
          this.commitCustomValue();
        } else {
          this.restoreSelectedLabel();
        }

        this.closeDropdown();
        break;

      case 'Home':
        if (this.isOpen) {
          event.preventDefault();

          this.activeIndex =
            this.findFirstEnabledOptionIndex();
        }
        break;

      case 'End':
        if (this.isOpen) {
          event.preventDefault();

          this.activeIndex =
            this.findLastEnabledOptionIndex();
        }
        break;
    }
  }

  trackOption(
    _index: number,
    option: CxpSelectOption,
  ): string | number {
    return option.value;
  }

  /**
   * ControlValueAccessor:
   * receives a value from ngModel or FormControl.
   */
  writeValue(
    value: CxpSelectValue,
  ): void {
    this._value = value;
    this.syncSearchTextWithValue();
  }

  registerOnChange(
    fn: (
      value: CxpSelectValue,
    ) => void,
  ): void {
    this.onChange = fn;
  }

  registerOnTouched(
    fn: () => void,
  ): void {
    this.onTouched = fn;
  }

  setDisabledState(
    isDisabled: boolean,
  ): void {
    this.disabled = isDisabled;

    if (isDisabled) {
      this.closeDropdown();
    }
  }

  @HostListener(
    'document:mousedown',
    ['$event'],
  )
  onDocumentMouseDown(
    event: MouseEvent,
  ): void {
    const target =
      event.target as Node;

    const clickedInside =
      this.elementRef
        .nativeElement
        .contains(target);

    if (clickedInside) {
      return;
    }

    this.closeDropdown();

    if (!this.allowCustomValue) {
      this.restoreSelectedLabel();
    }
  }

  private selectActiveOption(): void {
    const option =
      this.filteredOptions[
        this.activeIndex
      ];

    if (option && !option.disabled) {
      this.selectOption(option);
      return;
    }

    if (this.allowCustomValue) {
      this.commitCustomValue();
      this.closeDropdown();
    }
  }

  private moveActiveIndex(
    direction: 1 | -1,
  ): void {
    const options =
      this.filteredOptions;

    if (options.length === 0) {
      this.activeIndex = -1;
      return;
    }

    let nextIndex =
      this.activeIndex;

    for (
      let count = 0;
      count < options.length;
      count++
    ) {
      nextIndex += direction;

      if (
        nextIndex >= options.length
      ) {
        nextIndex = 0;
      }

      if (nextIndex < 0) {
        nextIndex =
          options.length - 1;
      }

      if (
        !options[nextIndex].disabled
      ) {
        this.activeIndex =
          nextIndex;

        return;
      }
    }

    this.activeIndex = -1;
  }

  private setActiveOptionFromCurrentValue():
    void {
    const selectedIndex =
      this.filteredOptions.findIndex(
        (option) =>
          option.value ===
            this._value &&
          !option.disabled,
      );

    if (selectedIndex >= 0) {
      this.activeIndex =
        selectedIndex;

      return;
    }

    this.activeIndex =
      this.findFirstEnabledOptionIndex();
  }

  private findFirstEnabledOptionIndex():
    number {
    return this.filteredOptions.findIndex(
      (option) => !option.disabled,
    );
  }

  private findLastEnabledOptionIndex():
    number {
    for (
      let index =
        this.filteredOptions.length - 1;
      index >= 0;
      index--
    ) {
      if (
        !this.filteredOptions[index]
          .disabled
      ) {
        return index;
      }
    }

    return -1;
  }

  private getSelectedOption():
    CxpSelectOption | null {
    return (
      this.options.find(
        (option) =>
          option.value === this._value,
      ) ?? null
    );
  }

  private syncSearchTextWithValue():
    void {
    const selected =
      this.getSelectedOption();

    if (selected) {
      this.searchText =
        selected.label;

      return;
    }

    if (
      this.allowCustomValue &&
      this._value !== null
    ) {
      this.searchText =
        String(this._value);

      return;
    }

    this.searchText = '';
  }

  private restoreSelectedLabel():
    void {
    this.syncSearchTextWithValue();
  }

  private commitCustomValue():
    void {
    const customValue =
      this.searchText.trim();

    if (!customValue) {
      this.setValue(null);
      return;
    }

    const matchingOption =
      this.options.find(
        (option) =>
          option.label
            .toLowerCase() ===
          customValue.toLowerCase(),
      );

    if (
      matchingOption &&
      !matchingOption.disabled
    ) {
      this.searchText =
        matchingOption.label;

      this.setValue(
        matchingOption.value,
        matchingOption,
      );

      return;
    }

    this.setValue(
      customValue,
      null,
    );
  }

  private setValue(
    value: CxpSelectValue,
    option:
      CxpSelectOption | null = null,
  ): void {
    this._value = value;

    this.onChange(value);
    this.valueChange.emit(value);
    this.selectedChange.emit(option);
  }
}