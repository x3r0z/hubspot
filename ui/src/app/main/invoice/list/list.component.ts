import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {InvoiceService} from "../../shared/services/invoice.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-invoice-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class InvoiceListComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns: string[] = ['invoice', 'customer', 'date', 'dueDate', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator = MatPaginator;

  constructor(
    private readonly _invoiceService: InvoiceService,
    private readonly _router: Router,
  ) { }

  ngOnInit(): void {
    this.dataSource.data = [];
    this.loadInvoices();
  }

  ngOnDestroy() {
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

  private loadInvoices(): void {
    this._invoiceService.getAllFromUser().subscribe(
      (response) => {
        this.dataSource.data = response;
      },
      () => {
        this.dataSource.data = [];
      }
    )
  }

  newInvoice(): void {
    this._router.navigate(['/invoice/add']);
  }

  editInvoice(id: string): void {
    if (id) {
      this._router.navigate(['/invoice/edit', id]);
    }
  }

  deleteInvoice(id: string): void {
    if (id) {
      this._invoiceService.delete(id).subscribe(
        () => {},
        () => {},
        () => {
          this.loadInvoices();
        }
      );
    }
  }

}
