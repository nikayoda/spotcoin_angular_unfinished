import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  selector: 'app-invoice-print',
  templateUrl: './invoice-print.component.html',
  styleUrls: ['./invoice-print.component.scss']
})
export class InvoicePrintComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;

  constructor() {
  }

  ngOnInit() {
  }
}
