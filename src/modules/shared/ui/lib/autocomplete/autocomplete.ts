import {
  animate,
  AnimationEvent,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { CommonModule, NgIfContext } from '@angular/common';
import {
  AfterContentInit,
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  IterableDiffers,
  NgModule,
  OnDestroy,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayService } from './overlayservice';
import { ConnectedOverlayScrollHandler, DomHandler } from './dom';
import { ObjectUtils, UniqueComponentId, ZIndexUtils } from './utils';

export const AUTOCOMPLETE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutoComplete),
  multi: true,
};

@Component({
  selector: 'p-autoComplete',
  template: `
    <span
      #container
      [ngClass]="{
        'p-autocomplete p-component': true,
        'p-autocomplete-multiple': multiple
      }"
      [ngStyle]="style"
      [class]="styleClass"
    >
      <i
        *ngIf="multiple && value && filled && !disabled && showClear"
        class="p-autocomplete-clear-icon pi pi-times"
        (click)="clear()"
      ></i>
      <ul
        *ngIf="multiple"
        #multiContainer
        class="p-autocomplete-multiple-container p-component p-inputtext"
        [ngClass]="{ 'p-disabled': disabled, 'p-focus': focus }"
        (click)="multiIn.focus()"
      >
        <li #token *ngFor="let val of value" class="p-autocomplete-token">
          <ng-container
            *ngTemplateOutlet="
              selectedItemTemplate;
              context: { $implicit: val }
            "
          ></ng-container>
          <span
            *ngIf="!selectedItemTemplate"
            class="p-autocomplete-token-label"
            >{{ resolveFieldData(val) }}</span
          >
          <span
            class="p-autocomplete-token-icon pi pi-times-circle"
            (click)="removeItem(token)"
            *ngIf="!disabled && !readonly"
          ></span>
        </li>
        <li class="p-autocomplete-input-token">
          <input
            #multiIn
            [attr.type]="type"
            [attr.id]="inputId"
            [disabled]="disabled"
            [attr.placeholder]="value && value.length ? null : placeholder"
            [attr.tabindex]="tabindex"
            [attr.maxlength]="maxlength"
            (input)="onInput($event)"
            (click)="onInputClick($event)"
            (keydown)="onKeydown($event)"
            [readonly]="readonly"
            (keyup)="onKeyup($event)"
            [attr.autofocus]="autofocus"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            (change)="onInputChange($event)"
            (paste)="onInputPaste($event)"
            [autocomplete]="autocomplete"
            [ngStyle]="inputStyle"
            [class]="inputStyleClass"
            [attr.aria-label]="ariaLabel"
            [attr.aria-labelledby]="ariaLabelledBy"
            [attr.aria-required]="required"
            aria-autocomplete="list"
            [attr.aria-controls]="listId"
            role="searchbox"
            [attr.aria-expanded]="overlayVisible"
            aria-haspopup="true"
            [attr.aria-activedescendant]="'p-highlighted-option'"
          />
        </li>
      </ul>
      <i
        *ngIf="loading"
        class="p-autocomplete-loader pi pi-spinner pi-spin"
      ></i>
      <div
        #panel
        *ngIf="overlayVisible"
        (click)="onOverlayClick($event)"
        [ngClass]="['p-autocomplete-panel p-component']"
        [style.max-height]="virtualScroll ? 'auto' : scrollHeight"
        [ngStyle]="panelStyle"
        [class]="panelStyleClass"
        [@overlayAnimation]="{
          value: 'visible',
          params: {
            showTransitionParams: showTransitionOptions,
            hideTransitionParams: hideTransitionOptions
          }
        }"
        (@overlayAnimation.start)="onOverlayAnimationStart($event)"
        (@overlayAnimation.done)="onOverlayAnimationEnd($event)"
      >
        <ul
          role="listbox"
          [attr.id]="listId"
          class="p-autocomplete-items"
          [ngClass]="{
            'p-autocomplete-virtualscroll': virtualScroll
          }"
        >
          <ng-container *ngIf="group">
            <ng-template ngFor let-optgroup [ngForOf]="suggestions">
              <li class="p-autocomplete-item-group">
                <span *ngIf="!groupTemplate">{{
                  getOptionGroupLabel(optgroup) || 'empty'
                }}</span>
                <ng-container
                  *ngTemplateOutlet="
                    groupTemplate;
                    context: { $implicit: optgroup }
                  "
                ></ng-container>
              </li>
              <ng-container
                *ngTemplateOutlet="
                  itemslist;
                  context: {
                    $implicit: getOptionGroupChildren(optgroup)
                  }
                "
              ></ng-container>
            </ng-template>
          </ng-container>
          <ng-container *ngIf="!group">
            <ng-container
              *ngTemplateOutlet="itemslist; context: { $implicit: suggestions }"
            ></ng-container>
          </ng-container>
          <ng-template #itemslist let-suggestionsToDisplay>
            <ng-container *ngIf="!virtualScroll; else virtualScrollList">
              <li
                role="option"
                *ngFor="let option of suggestionsToDisplay; let idx = index"
                class="p-autocomplete-item"
                pRipple
                [ngClass]="{
                  'p-highlight': option === highlightOption
                }"
                [id]="highlightOption == option ? 'p-highlighted-option' : ''"
                (click)="selectItem(option)"
              >
                <span *ngIf="!itemTemplate">{{
                  resolveFieldData(option)
                }}</span>
                <ng-container
                  *ngTemplateOutlet="
                    itemTemplate;
                    context: {
                      $implicit: option,
                      index: idx
                    }
                  "
                ></ng-container>
              </li>
            </ng-container>
            <ng-template #virtualScrollList>
              <cdk-virtual-scroll-viewport
                [ngStyle]="{ height: scrollHeight }"
                [itemSize]="itemSize"
                *ngIf="virtualScroll && !noResults"
              >
                <ng-container
                  *cdkVirtualFor="
                    let option of suggestionsToDisplay;
                    let i = index;
                    let c = count;
                    let f = first;
                    let l = last;
                    let e = even;
                    let o = odd
                  "
                >
                  <li
                    role="option"
                    class="p-autocomplete-item"
                    pRipple
                    [ngClass]="{
                      'p-highlight': option === highlightOption
                    }"
                    [ngStyle]="{ height: itemSize + 'px' }"
                    [id]="
                      highlightOption == option ? 'p-highlighted-option' : ''
                    "
                    (click)="selectItem(option)"
                  >
                    <span *ngIf="!itemTemplate">{{
                      resolveFieldData(option)
                    }}</span>
                    <ng-container
                      *ngTemplateOutlet="
                        itemTemplate;
                        context: {
                          $implicit: option,
                          index: i
                        }
                      "
                    ></ng-container>
                  </li>
                </ng-container>
              </cdk-virtual-scroll-viewport>
            </ng-template>
            <li
              *ngIf="noResults && showEmptyMessage"
              class="p-autocomplete-empty-message"
            >
              <ng-container *ngIf="!emptyTemplate">
                {{ emptyMessageLabel }}
              </ng-container>
            </li>
          </ng-template>
        </ul>
        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
      </div>
    </span>
  `,
  animations: [
    trigger('overlayAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scaleY(0.8)' }),
        animate('{{showTransitionParams}}'),
      ]),
      transition(':leave', [
        animate('{{hideTransitionParams}}', style({ opacity: 0 })),
      ]),
    ]),
  ],
  host: {
    class: 'p-element p-inputwrapper',
    '[class.p-inputwrapper-filled]': 'filled',
    '[class.p-inputwrapper-focus]': '(focus && !disabled) || overlayVisible',
    '[class.p-autocomplete-clearable]': 'showClear && !disabled',
  },
  providers: [AUTOCOMPLETE_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./autocomplete.css'],
})
export class AutoComplete
  implements
    AfterViewChecked,
    AfterContentInit,
    OnDestroy,
    ControlValueAccessor
{
  @Input() minLength: number = 1;

  @Input() delay: number = 300;

  @Input() style: any;

  @Input() panelStyle: any;

  @Input() styleClass: string;

  @Input() panelStyleClass: string;

  @Input() inputStyle: any;

  @Input() inputId: string;

  @Input() inputStyleClass: string;

  @Input() placeholder: string;

  @Input() readonly: boolean;

  @Input() disabled: boolean;

  @Input() virtualScroll: boolean;

  @Input() itemSize: number;

  @Input() maxlength: number;

  @Input() name: string;

  @Input() required: boolean;

  @Input() size: number;

  @Input() appendTo: any;

  @Input() autoHighlight: boolean;

  @Input() forceSelection: boolean;

  @Input() type: string = 'text';

  @Input() autoZIndex: boolean = true;

  @Input() baseZIndex: number = 0;

  @Input() ariaLabel: string;

  @Input() dropdownAriaLabel: string;

  @Input() ariaLabelledBy: string;

  @Input() dropdownIcon: string = 'pi pi-chevron-down';

  @Input() unique: boolean = true;

  @Input() group: boolean;

  @Input() completeOnFocus: boolean = false;

  @Input() showClear: boolean = false;

  @Output() completeMethod: EventEmitter<any> = new EventEmitter();

  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  @Output() onUnselect: EventEmitter<any> = new EventEmitter();

  @Output() onFocus: EventEmitter<any> = new EventEmitter();

  @Output() onBlur: EventEmitter<any> = new EventEmitter();

  @Output() onDropdownClick: EventEmitter<any> = new EventEmitter();

  @Output() onClear: EventEmitter<any> = new EventEmitter();

  @Output() onKeyUp: EventEmitter<any> = new EventEmitter();

  @Output() onShow: EventEmitter<any> = new EventEmitter();

  @Output() onHide: EventEmitter<any> = new EventEmitter();

  @Input() field: string;

  @Input() scrollHeight: string = '200px';

  @Input() dropdown: boolean;

  @Input() showEmptyMessage: boolean;

  @Input() dropdownMode: string = 'blank';

  @Input() multiple: boolean;

  @Input() tabindex: number;

  @Input() dataKey: string;

  @Input() emptyMessage: string;

  @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';

  @Input() hideTransitionOptions: string = '.1s linear';

  @Input() autofocus: boolean;

  @Input() autocomplete: string = 'off';

  @Input() optionGroupChildren: string;

  @Input() optionGroupLabel: string;

  @ViewChild('container') containerEL: ElementRef;

  @ViewChild('in') inputEL: ElementRef;

  @ViewChild('multiIn') multiInputEL: ElementRef;

  @ViewChild('multiContainer') multiContainerEL: ElementRef;

  @ViewChild('ddBtn') dropdownButton: ElementRef;
  
  @ViewChild('empty') empty: ElementRef<NgIfContext<boolean>>;

  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;

  overlay: HTMLDivElement | null;

  itemsWrapper: HTMLDivElement;

  itemTemplate: TemplateRef<any>;

  emptyTemplate: TemplateRef<any>;

  headerTemplate: TemplateRef<any>;

  footerTemplate: TemplateRef<any>;

  selectedItemTemplate: TemplateRef<any>;

  groupTemplate: TemplateRef<any>;

  value: any;

  _suggestions: any[];

  onModelChange: Function = () => {};

  onModelTouched: Function = () => {};

  timeout: any;

  overlayVisible: boolean = false;

  documentClickListener: any;

  suggestionsUpdated: boolean;

  highlightOption: any;

  highlightOptionChanged: boolean;

  focus: boolean = false;

  filled: boolean;

  inputClick: boolean;

  inputKeyDown: boolean;

  noResults: boolean;

  differ: any;

  inputFieldValue: string | null = null;

  loading: boolean;

  scrollHandler: any;

  documentResizeListener: any;

  forceSelectionUpdateModelTimeout: any;

  listId: string;

  itemClicked: boolean;

  virtualScrollSelectedIndex: number;

  inputValue: string | null = null;

  constructor(
    public el: ElementRef,
    public renderer: Renderer2,
    public cd: ChangeDetectorRef,
    public differs: IterableDiffers,
    public overlayService: OverlayService
  ) {
    this.differ = differs.find([]).create(undefined);
    this.listId = UniqueComponentId() + '_list';
  }

  @Input() get suggestions(): any[] {
    return this._suggestions;
  }

  set suggestions(val: any[]) {
    this._suggestions = val;
    this.handleSuggestionsChange();
  }

  ngAfterViewChecked() {
    //Use timeouts as since Angular 4.2, AfterViewChecked is broken and not called after panel is updated
    if (this.suggestionsUpdated && this.overlay && this.overlay.offsetParent) {
      setTimeout(() => {
        if (this.overlay) {
          this.alignOverlay();
        }
      }, 1);
      this.suggestionsUpdated = false;
    }

    if (this.highlightOptionChanged) {
      setTimeout(() => {
        if (this.overlay && this.itemsWrapper) {
          let listItem = DomHandler.findSingle(this.overlay, 'li.p-highlight');

          if (listItem) {
            DomHandler.scrollInView(this.itemsWrapper, listItem);
          }

          if (this.virtualScroll && this.viewPort) {
            let range = this.viewPort.getRenderedRange();
            this.updateVirtualScrollSelectedIndex();

            if (
              range.start > this.virtualScrollSelectedIndex ||
              range.end < this.virtualScrollSelectedIndex
            ) {
              this.viewPort.scrollToIndex(this.virtualScrollSelectedIndex);
            }
          }
        }
      }, 1);
      this.highlightOptionChanged = false;
    }
  }

  handleSuggestionsChange() {
    if (this._suggestions != null && this.loading) {
      this.highlightOption = null;
      if (this._suggestions.length) {
        this.noResults = false;
        this.show();
        this.suggestionsUpdated = true;

        if (this.autoHighlight) {
          this.highlightOption = this._suggestions[0];
        }
      } else {
        this.noResults = true;

        if (this.showEmptyMessage) {
          this.show();
          this.suggestionsUpdated = true;
        } else {
          this.hide();
        }
      }

      this.loading = false;
    }
  }

  ngAfterContentInit() {}

  updateVirtualScrollSelectedIndex() {
    if (this.highlightOption && this.suggestions && this.suggestions.length) {
      this.virtualScrollSelectedIndex = this.findOptionIndex(
        this.highlightOption,
        this.suggestions
      );
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this.filled = this.value && this.value != '';
    this.updateInputField();
    this.cd.markForCheck();
  }

  getOptionGroupChildren(optionGroup: any) {
    return this.optionGroupChildren
      ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren)
      : optionGroup.items;
  }

  getOptionGroupLabel(optionGroup: any) {
    return this.optionGroupLabel
      ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel)
      : optionGroup.label != undefined
      ? optionGroup.label
      : optionGroup;
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
    this.cd.markForCheck();
  }

  onInput(event: Event) {
    // When an input element with a placeholder is clicked, the onInput event is invoked in IE.
    if (!this.inputKeyDown && DomHandler.isIE()) {
      return;
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    let value = (<HTMLInputElement>event.target).value;
    this.inputValue = value;
    if (!this.multiple && !this.forceSelection) {
      this.onModelChange(value);
    }

    if (value.length === 0 && !this.multiple) {
      this.hide();
      this.onClear.emit(event);
      this.onModelChange(value);
    }

    if (value.length >= this.minLength) {
      this.timeout = setTimeout(() => {
        this.search(event, value);
      }, this.delay);
    } else {
      this.hide();
    }
    this.updateFilledState();
    this.inputKeyDown = false;
  }

  onInputClick(event: MouseEvent) {
    if (this.documentClickListener) {
      this.inputClick = true;
    }
  }

  search(event: any, query: string) {
    //allow empty string but not undefined or null
    if (query === undefined || query === null) {
      return;
    }

    this.loading = true;

    this.completeMethod.emit({
      originalEvent: event,
      query: query,
    });
  }

  selectItem(option: any, focus: boolean = true) {
    if (this.forceSelectionUpdateModelTimeout) {
      clearTimeout(this.forceSelectionUpdateModelTimeout);
      this.forceSelectionUpdateModelTimeout = null;
    }

    if (this.multiple) {
      this.multiInputEL.nativeElement.value = '';
      this.value = this.value || [];
      if (!this.isSelected(option) || !this.unique) {
        this.value = [...this.value, option];
        this.onModelChange(this.value);
      }
    } else {
      this.inputEL.nativeElement.value = this.resolveFieldData(option);
      this.value = option;
      this.onModelChange(this.value);
    }

    this.onSelect.emit(option);
    this.updateFilledState();

    if (focus) {
      this.itemClicked = true;
      this.focusInput();
    }
  }

  show() {
    if (this.multiInputEL || this.inputEL) {
      let hasFocus = this.multiple
        ? this.multiInputEL.nativeElement.ownerDocument.activeElement ==
          this.multiInputEL.nativeElement
        : this.inputEL.nativeElement.ownerDocument.activeElement ==
          this.inputEL.nativeElement;

      if (!this.overlayVisible && hasFocus) {
        this.overlayVisible = true;
      }
    }
  }

  clear() {
    if (this.multiple) {
      this.value = null;
    } else {
      this.inputValue = null;
      this.inputEL.nativeElement.value = '';
    }
    this.onModelChange(this.value);
    this.onClear.emit();
  }

  onOverlayAnimationStart(event: AnimationEvent) {
    switch (event.toState) {
      case 'visible':
        this.overlay = event.element;
        this.itemsWrapper = this.virtualScroll
          ? DomHandler.findSingle(this.overlay, '.cdk-virtual-scroll-viewport')
          : this.overlay;
        this.appendOverlay();

        if (this.autoZIndex) {
          ZIndexUtils.set('overlay', this.overlay, this.baseZIndex);
        }

        this.alignOverlay();
        this.bindDocumentClickListener();
        this.bindDocumentResizeListener();
        this.bindScrollListener();
        this.onShow.emit(event);
        break;

      case 'void':
        this.onOverlayHide();
        break;
    }
  }

  onOverlayAnimationEnd(event: AnimationEvent) {
    switch (event.toState) {
      case 'void':
        if (this.autoZIndex) {
          ZIndexUtils.clear(event.element);
        }
        break;
    }
  }

  onOverlayClick(event: any) {
    this.overlayService.add({
      originalEvent: event,
      target: this.el.nativeElement,
    });
  }

  appendOverlay() {
    if (this.appendTo) {
      if (this.appendTo === 'body') document.body.appendChild(this.overlay!);
      else DomHandler.appendChild(this.overlay, this.appendTo);

      if (!this.overlay!.style.minWidth) {
        this.overlay!.style.minWidth =
          DomHandler.getWidth(this.el.nativeElement.children[0]) + 'px';
      }
    }
  }

  resolveFieldData(value: any) {
    let data = this.field
      ? ObjectUtils.resolveFieldData(value, this.field)
      : value;
    return data !== (null || undefined) ? data : '';
  }

  restoreOverlayAppend() {
    if (this.overlay && this.appendTo) {
      this.el.nativeElement.appendChild(this.overlay);
    }
  }

  alignOverlay() {
    if (this.appendTo)
      DomHandler.absolutePosition(
        this.overlay,
        this.multiple
          ? this.multiContainerEL.nativeElement
          : this.inputEL.nativeElement
      );
    else
      DomHandler.relativePosition(
        this.overlay,
        this.multiple
          ? this.multiContainerEL.nativeElement
          : this.inputEL.nativeElement
      );
  }

  hide() {
    this.overlayVisible = false;
    this.cd.markForCheck();
  }

  handleDropdownClick(event: any) {
    if (!this.overlayVisible) {
      this.focusInput();
      let queryValue = this.multiple
        ? this.multiInputEL.nativeElement.value
        : this.inputEL.nativeElement.value;

      if (this.dropdownMode === 'blank') this.search(event, '');
      else if (this.dropdownMode === 'current') this.search(event, queryValue);

      this.onDropdownClick.emit({
        originalEvent: event,
        query: queryValue,
      });
    } else {
      this.hide();
    }
  }

  focusInput() {
    if (this.multiple) this.multiInputEL.nativeElement.focus();
    else this.inputEL.nativeElement.focus();
  }

  get emptyMessageLabel(): string {
    return this.emptyMessage;
  }

  removeItem(item: any) {
    let itemIndex = DomHandler.index(item);
    let removedValue = this.value[itemIndex];
    this.value = this.value.filter((_: any, i: number) => i != itemIndex);
    this.onModelChange(this.value);
    this.updateFilledState();
    this.onUnselect.emit(removedValue);
  }

  onKeydown(event: any) {
    if (this.overlayVisible) {
      let highlightItemIndex;
      switch (event.which) {
        //down
        case 40:
          highlightItemIndex = this.findOptionIndex(
            this.highlightOption,
            this.suggestions
          );

          if (highlightItemIndex != -1) {
            var nextItemIndex = highlightItemIndex + 1;
            if (nextItemIndex != this.suggestions.length) {
              this.highlightOption = this.suggestions[nextItemIndex];
              this.highlightOptionChanged = true;
            }
          } else {
            this.highlightOption = this.suggestions[0];
          }

          event.preventDefault();
          break;

        //up
        case 38:
          highlightItemIndex = this.findOptionIndex(
            this.highlightOption,
            this.suggestions
          );

          if (highlightItemIndex > 0) {
            let prevItemIndex = highlightItemIndex - 1;
            this.highlightOption = this.suggestions[prevItemIndex];
            this.highlightOptionChanged = true;
          }

          event.preventDefault();
          break;

        //enter
        case 13:
          if (this.highlightOption) {
            this.selectItem(this.highlightOption);
            this.hide();
          }
          event.preventDefault();
          break;

        //escape
        case 27:
          this.hide();
          event.preventDefault();
          break;

        //tab
        case 9:
          if (this.highlightOption) {
            this.selectItem(this.highlightOption);
          }
          this.hide();
          break;
      }
    } else {
      if (event.which === 40 && this.suggestions) {
        this.search(event, event.target.value);
      } else if (event.ctrlKey && event.key === 'z' && !this.multiple) {
        this.inputEL.nativeElement.value = this.resolveFieldData(null);
        this.value = '';
        this.onModelChange(this.value);
      } else if (event.ctrlKey && event.key === 'z' && this.multiple) {
        this.value.pop();
        this.onModelChange(this.value);
        this.updateFilledState();
      }
    }

    if (this.multiple) {
      switch (event.which) {
        //backspace
        case 8:
          if (
            this.value &&
            this.value.length &&
            !this.multiInputEL.nativeElement.value
          ) {
            this.value = [...this.value];
            const removedValue = this.value.pop();
            this.onModelChange(this.value);
            this.updateFilledState();
            this.onUnselect.emit(removedValue);
          }
          break;
      }
    }

    this.inputKeyDown = true;
  }

  onKeyup(event: any) {
    this.onKeyUp.emit(event);
  }

  onInputFocus(event: any) {
    if (!this.itemClicked && this.completeOnFocus) {
      let queryValue = this.multiple
        ? this.multiInputEL.nativeElement.value
        : this.inputEL.nativeElement.value;
      this.search(event, queryValue);
    }

    this.focus = true;
    this.onFocus.emit(event);
    this.itemClicked = false;
  }

  onInputBlur(event: any) {
    this.focus = false;
    this.onModelTouched();
    this.onBlur.emit(event);
  }

  onInputChange(event: any) {
    if (this.forceSelection) {
      let valid = false;
      let inputValue = event.target.value.trim();

      if (this.suggestions) {
        for (let suggestion of this.suggestions) {
          let itemValue = this.field
            ? ObjectUtils.resolveFieldData(suggestion, this.field)
            : suggestion;
          if (itemValue && inputValue === itemValue.trim()) {
            valid = true;
            this.forceSelectionUpdateModelTimeout = setTimeout(() => {
              this.selectItem(suggestion, false);
            }, 250);
            break;
          }
        }
      }

      if (!valid) {
        if (this.multiple) {
          this.multiInputEL.nativeElement.value = '';
        } else {
          this.value = null;
          this.inputEL.nativeElement.value = '';
        }

        this.onClear.emit(event);
        this.onModelChange(this.value);
        this.updateFilledState();
      }
    }
  }

  onInputPaste(event: ClipboardEvent) {
    this.onKeydown(event);
  }

  isSelected(val: any): boolean {
    let selected: boolean = false;
    if (this.value && this.value.length) {
      for (let i = 0; i < this.value.length; i++) {
        if (ObjectUtils.equals(this.value[i], val, this.dataKey)) {
          selected = true;
          break;
        }
      }
    }
    return selected;
  }

  findOptionIndex(option: any, suggestions: any): number {
    let index: number = -1;
    if (suggestions) {
      for (let i = 0; i < suggestions.length; i++) {
        if (ObjectUtils.equals(option, suggestions[i])) {
          index = i;
          break;
        }
      }
    }

    return index;
  }

  findOptionGroupIndex(val: any, opts: any[]): any {
    let groupIndex, itemIndex;

    if (opts) {
      for (let i = 0; i < opts.length; i++) {
        groupIndex = i;
        itemIndex = this.findOptionIndex(
          val,
          this.getOptionGroupChildren(opts[i])
        );

        if (itemIndex !== -1) {
          break;
        }
      }
    }

    if (itemIndex !== -1) {
      return { groupIndex: groupIndex, itemIndex: itemIndex };
    } else {
      return -1;
    }
  }

  updateFilledState() {
    if (this.multiple)
      this.filled =
        (this.value && this.value.length) ||
        (this.multiInputEL &&
          this.multiInputEL.nativeElement &&
          this.multiInputEL.nativeElement.value != '');
    else
      this.filled =
        (this.inputFieldValue && this.inputFieldValue != '') ||
        (this.inputEL &&
          this.inputEL.nativeElement &&
          this.inputEL.nativeElement.value != '');
  }

  updateInputField() {
    let formattedValue = this.resolveFieldData(this.value);
    this.inputFieldValue = formattedValue;

    if (this.inputEL && this.inputEL.nativeElement) {
      this.inputEL.nativeElement.value = formattedValue;
    }

    this.updateFilledState();
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      const documentTarget: any = this.el
        ? this.el.nativeElement.ownerDocument
        : 'document';

      this.documentClickListener = this.renderer.listen(
        documentTarget,
        'click',
        (event) => {
          if (event.which === 3) {
            return;
          }

          if (!this.inputClick && !this.isDropdownClick(event)) {
            this.hide();
          }

          this.inputClick = false;
          this.cd.markForCheck();
        }
      );
    }
  }

  isDropdownClick(event: any) {
    if (this.dropdown) {
      let target = event.target;
      return (
        target === this.dropdownButton.nativeElement ||
        target.parentNode === this.dropdownButton.nativeElement
      );
    } else {
      return false;
    }
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  bindDocumentResizeListener() {
    this.documentResizeListener = this.onWindowResize.bind(this);
    window.addEventListener('resize', this.documentResizeListener);
  }

  unbindDocumentResizeListener() {
    if (this.documentResizeListener) {
      window.removeEventListener('resize', this.documentResizeListener);
      this.documentResizeListener = null;
    }
  }

  onWindowResize() {
    this.hide();
  }

  bindScrollListener() {
    if (!this.scrollHandler) {
      this.scrollHandler = new ConnectedOverlayScrollHandler(
        this.containerEL.nativeElement,
        () => {
          if (this.overlayVisible) {
            this.hide();
          }
        }
      );
    }

    this.scrollHandler.bindScrollListener();
  }

  unbindScrollListener() {
    if (this.scrollHandler) {
      this.scrollHandler.unbindScrollListener();
    }
  }

  onOverlayHide() {
    this.unbindDocumentClickListener();
    this.unbindDocumentResizeListener();
    this.unbindScrollListener();
    this.overlay = null;
    this.onHide.emit();
  }

  ngOnDestroy() {
    if (this.forceSelectionUpdateModelTimeout) {
      clearTimeout(this.forceSelectionUpdateModelTimeout);
      this.forceSelectionUpdateModelTimeout = null;
    }

    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }

    if (this.overlay) {
      ZIndexUtils.clear(this.overlay);
    }

    this.restoreOverlayAppend();
    this.onOverlayHide();
  }
}

@NgModule({
  imports: [CommonModule, ScrollingModule],
  exports: [AutoComplete],
  declarations: [AutoComplete],
})
export class AutoCompleteModule {}
