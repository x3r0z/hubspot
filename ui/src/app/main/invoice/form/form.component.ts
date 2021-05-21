import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InvoiceService} from "../../shared/services/invoice.service";

@Component({
  selector: 'app-invoice-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class InvoiceFormComponent implements OnInit {
  invoiceId: string = '';
  // @ts-ignore
  globalError: string = '';
  // @ts-ignore
  invoiceForm: FormGroup;

  constructor(
    private readonly _router: Router,
    private readonly _activeRouter: ActivatedRoute,
    private readonly _formBuilder: FormBuilder,
    private readonly _invoiceService: InvoiceService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this._activeRouter.params.subscribe(
      (params) => {
        this.invoiceId = params.id ? params.id : null;
        if (this.invoiceId) {
          this.loadInvoice();
        } else {
          this.addItems({
            item: 1,
            description: 'Item 1',
            quantity: 1,
            price: 10
          });
        }
      }
    );
  }

  private buildForm(): void {
    this.invoiceForm = this._formBuilder.group({
      companyName: [null, Validators.required],
      fullName: [null, Validators.required],
      companyWebsite: [null, Validators.required],
      companyAddress: [null],
      companyCSZ: [null],
      companyCountry: [null],
      companyPhone: [null, Validators.required],
      companyEmail: [null, [Validators.required, Validators.email]],
      clientCompany: [null, Validators.required],
      clientName: [null, Validators.required],
      clientAddress: [null],
      clientCSZ: [null],
      clientCountry: [null],
      invoiceNo: [null, Validators.required],
      invoiceDate: [null, [Validators.required]],
      invoiceDueDate: [null],
      invoiceNotes: [null],
      invoiceSubtotal: [0, Validators.min(0)],
      invoiceTax: [0, Validators.min(0)],
      invoiceDiscount: [0, Validators.min(0)],
      invoiceTotal: [0, Validators.min(0)],
      items: new FormArray([])
    });
  }

  private loadInvoice(): void {
    if (this.invoiceId) {
      this._invoiceService.getOne(this.invoiceId).subscribe(
        (result) => {
          const items = result.items;
          delete result.items;
          this.invoiceForm.patchValue(result);
          items.forEach((i: any) => this.addItems(i));
        },
        () => {
          this._router.navigate(['/invoice/list']);
        }
      );
    }
  }

  get items() : FormArray {
    return this.invoiceForm.get("items") as FormArray
  }

  newItem(): void {
    const id = (this.items.length + 1).toString();
    this.addItems({
      item: id,
      description: 'Item ' + id,
      quantity: 1,
      price: 10
    });
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  private addItems(item?: any): void {
    const itemForm = this._formBuilder.group({
      item: [null],
      description: [null],
      quantity: [null],
      price: [null]
    });
    if (item) {
      itemForm.patchValue(item);
    }

    this.items.push(itemForm);
  }

  cancel(): void {
    this._router.navigate(['/invoice/list']);
  }

  save(): void {
    if (this.invoiceForm.valid) {
      const data = this.invoiceForm.getRawValue();
      this.globalError = '';
      if (this.invoiceId) {
        this._invoiceService.update(this.invoiceId, data).subscribe(
          () => {},
          (error) => {
            this.globalError = error.error.message;
          }
        );
      } else {
        this._invoiceService.create(data).subscribe(
          (result) => {
            this._router.navigate(['/invoice/edit', result._id]);
          },
          (error) => {
            this.globalError = error.error.message;
          }
        );
      }
    }
  }

}
