import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { parsedPublications } from '../../api/api.js';

// TODO: Replace this with your own data model type
export interface PublicationsTableItem {
  publicationType: string,
  termType: string,
  reportGroup: string,
  reportState: string,
  reportFormat: string,
  outputDate: string,
  outputNumber: string,
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: PublicationsTableItem[] = parsedPublications;

/**
 * Data source for the PublicationsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PublicationsTableDataSource extends DataSource<PublicationsTableItem> {
  data: PublicationsTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<PublicationsTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: PublicationsTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: PublicationsTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'publicationType': return compare(a.publicationType, b.publicationType, isAsc);
        case 'termType': return compare(a.termType, b.termType, isAsc);
        case 'reportGroup': return compare(a.reportGroup, b.reportGroup, isAsc);
        case 'reportState': return compare(a.reportState, b.reportState, isAsc);
        case 'reportFormat': return compare(a.reportFormat, b.reportFormat, isAsc);
        case 'outputDate': return compare(a.outputDate, b.outputDate, isAsc);
        case 'outputNumber': return compare(a.outputNumber, b.outputNumber, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
