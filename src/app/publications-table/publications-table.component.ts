import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PublicationsTableDataSource, PublicationsTableItem } from './publications-table-datasource';

@Component({
  selector: 'app-publications-table',
  templateUrl: './publications-table.component.html',
  styleUrls: ['./publications-table.component.scss']
})
export class PublicationsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PublicationsTableItem>;
  dataSource: PublicationsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'publicationType',
    'termType',
    'reportGroup',
    'reportState',
    'reportFormat',
    'outputDate',
    'outputNumber'
  ];

  ngOnInit() {
    this.dataSource = new PublicationsTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
