import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PublicationsTableItem {
  publicationType: string,
  termType: string,
  reportGroup: string,
  reportState: string,
  reportFormat: string,
  outputDate: string,
  outputNumber: string,
}

@Component({
  selector: 'app-publications-table',
  templateUrl: './publications-table.component.html',
  styleUrls: ['./publications-table.component.scss']
})
export class PublicationsTableComponent implements AfterViewInit, OnInit {
  @Input() publications: PublicationsTableItem[];
  dataSource;

  publicationTypes: string[] = [];
  termTypes: string[] = [];
  reportGroups: string[] = [];
  reportStates: string[] = [];
  reportFormats: string[] = [];

  displayedColumns :string[] = [
    'publicationType',
    'termType',
    'reportGroup',
    'reportState',
    'reportFormat',
    'outputDate',
    'outputNumber',
    'delete'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public searchForm: FormGroup;
  public outputNumber = '';
  public selectedTermTypes = '';
  public seledtedTypes = '';
  public selectedReportGroups = '';
  public selectedDate = '';
  public selectedReportStates = '';
  public selectedReportFormats = '';

  ngOnInit() {
    this.dataSource = new MatTableDataSource<PublicationsTableItem>(this.publications);
    this.dataSource.paginator = this.paginator;

    this.searchFormInit();
    this.dataSource.filterPredicate = this.getFilterPredicate();

    this.getPublicationsData();
  }

  ngAfterViewInit() {
  }

  searchFormInit() {
    this.searchForm = new FormGroup({
      selectedTypes: new FormControl(),
      selectedTermTypes: new FormControl(),
      selectedReportGroups: new FormControl(),
      selectedReportStates: new FormControl(),
      selectedReportFormats: new FormControl(),
      selectedDate: new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
      }),
      outputNumber: new FormControl(),
    })
  }

  getFilterPredicate() {
    return (row: PublicationsTableItem, filters: string) => {
      const filterArray = filters.split('$');
      const publicationType = filterArray[0];
      const termType = filterArray[1];
      const reportGroup = filterArray[2];
      const reportState = filterArray[3];
      const reportFormat = filterArray[4]
      const selectedDate = filterArray[5].split('|');
      const outputNumber = filterArray[6];

      const matchFilter = [];

      const columnOutputNumber = row.outputNumber;
      const columnTermTypes = row.termType;
      const columnPublicaionType = row.publicationType;
      const columnReportGroup = row.reportGroup;
      const columnOutputDate = row.outputDate;
      const columnReportState = row.reportState;
      const columnReportFormat = row.reportFormat;

      const customFilterOutputNumber = columnOutputNumber
        .toLowerCase().includes(outputNumber.toLowerCase());

      if(termType.length) {
        const customFilterTermTypes = termType
          .toLowerCase().includes(columnTermTypes.toLowerCase());

        matchFilter.push(customFilterTermTypes);
      }

      if(publicationType.length) {
        const customFilterPublicationType = publicationType
          .toLowerCase().includes(columnPublicaionType.toLowerCase());

        matchFilter.push(customFilterPublicationType);
      }

      if(reportGroup.length) {
        const customFilterReportGroup = reportGroup
          .toLowerCase().includes(columnReportGroup.toLowerCase());

        matchFilter.push(customFilterReportGroup);
      }

      if(reportState.length) {
        const customFilterReportState = reportState
          .toLowerCase().includes(columnReportState.toLowerCase());

        matchFilter.push(customFilterReportState);
      }

      if(reportFormat.length) {
        const customFilterReportFormat = reportFormat
          .toLowerCase().includes(columnReportFormat.toLowerCase());

        matchFilter.push(customFilterReportFormat);
      }

      const customFilterOutputDate = this.checkDate(
        selectedDate[0],
        selectedDate[1],
        columnOutputDate
      )

      matchFilter.push(customFilterOutputDate);
      matchFilter.push(customFilterOutputNumber);

      return matchFilter.every(Boolean);
    }
  }

  checkDate(start: string, end: string, current: string) {
    if (start === 'null' || end === 'null') {
      return true;
    }
    const startDate = new Date(start);
    const endDate = new Date(end);
    const currentDate = new Date(current);

    return (currentDate >= startDate && currentDate <= endDate)
  }

  applyFilter() {
    const outputNumber = this.searchForm.get('outputNumber').value;
    const termTypes = this.searchForm.get('selectedTermTypes').value;
    const publcationTypes = this.searchForm.get('selectedTypes').value;
    const reportGroups = this.searchForm.get('selectedReportGroups').value;
    const outputDate = this.searchForm.get('selectedDate').value;
    const reportState = this.searchForm.get('selectedReportStates').value;
    const reportFormat = this.searchForm.get('selectedReportFormats').value;

    this.outputNumber = outputNumber === null ? '' : outputNumber;
    this.selectedTermTypes = termTypes === null ? '' : termTypes;
    this.seledtedTypes = publcationTypes === null ? '' :publcationTypes;
    this.selectedReportGroups = reportGroups === null ? '' :reportGroups;
    this.selectedDate = `${outputDate.start}|${outputDate.end}`;
    this.selectedReportStates = reportState === null ? '' :reportState;
    this.selectedReportFormats = reportFormat === null ? '' :reportFormat;

    const filterValue =
      this.seledtedTypes + '$' +
      this.selectedTermTypes + '$' +
      this.selectedReportGroups + '$' +
      this.selectedReportStates + '$' +
      this.selectedReportFormats + '$' +
      this.selectedDate + '$' +
      this.outputNumber;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  resetFilters() {
    this.dataSource.filter = undefined;
    this.searchForm.reset();
  }

  getPublicationsData() {
    this.dataSource.data = this.publications;

    for(let publication of this.publications) {
      if(!this.publicationTypes.includes(publication.publicationType)) {
        this.publicationTypes.push(publication.publicationType);
      }

      if(!this.termTypes.includes(publication.termType)) {
        this.termTypes.push(publication.termType)
      }

      if(!this.reportGroups.includes(publication.reportGroup)) {
        this.reportGroups.push(publication.reportGroup)
      }

      if(!this.reportStates.includes(publication.reportState)) {
        this.reportStates.push(publication.reportState)
      }

      if(!this.reportFormats.includes(publication.reportFormat)) {
        this.reportFormats.push(publication.reportFormat);
      }
    }
  }
}
