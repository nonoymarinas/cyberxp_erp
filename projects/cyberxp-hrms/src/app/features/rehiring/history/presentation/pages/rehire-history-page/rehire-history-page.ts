
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

// ========================================
// CyberXP UI Components
// ========================================

import {
  CxpButton,
  CxpInputSearch,
  CxpInputSelect,
} from 'cyberxp-ui';

import type {
  CxpSelectOption,
  CxpSelectValue,
} from 'cyberxp-ui';

// ========================================
// Types
// ========================================

type RehireRequestStatus =
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'REJECTED'
  | 'OFFER_SENT'
  | 'OFFER_ACCEPTED'
  | 'COMPLETED';

interface RehireHistoryRecord {
  requestNumber: string;
  employeeNumber: string;
  employeeName: string;
  previousPosition: string;
  proposedPosition: string;
  requestDate: string;
  requestedBy: string;
  status: RehireRequestStatus;
}

// ========================================
// Rehire History Page
// ========================================

@Component({
  selector: 'cxp-rehire-history-page',
  standalone: true,

  imports: [
    CxpButton,
    CxpInputSearch,
    CxpInputSelect,
  ],

  templateUrl: './rehire-history-page.html',
  styleUrl: './rehire-history-page.css',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RehireHistoryPageComponent {

  // ========================================
  // Search and Filter State
  // ========================================

  readonly searchTerm = signal('');

  readonly selectedStatus = signal<CxpSelectValue>('ALL');

  // ========================================
  // Status Options
  // ========================================

  readonly statusOptions: CxpSelectOption[] = [
    {
      value: 'ALL',
      label: 'All Statuses',
    },
    {
      value: 'PENDING_APPROVAL',
      label: 'Pending Approval',
    },
    {
      value: 'APPROVED',
      label: 'Approved',
    },
    {
      value: 'REJECTED',
      label: 'Rejected',
    },
    {
      value: 'OFFER_SENT',
      label: 'Offer Sent',
    },
    {
      value: 'OFFER_ACCEPTED',
      label: 'Offer Accepted',
    },
    {
      value: 'COMPLETED',
      label: 'Completed',
    },
  ];

  // ========================================
  // Mock History Records
  // ========================================

  readonly records = signal<RehireHistoryRecord[]>([
    {
      requestNumber: 'RHR-2026-00024',
      employeeNumber: 'EMP000001',
      employeeName: 'Juan Dela Cruz',
      previousPosition: 'Operations Supervisor',
      proposedPosition: 'Operations Manager',
      requestDate: '2026-11-14',
      requestedBy: 'HR Administrator',
      status: 'PENDING_APPROVAL',
    },
    {
      requestNumber: 'RHR-2026-00023',
      employeeNumber: 'EMP000002',
      employeeName: 'Maria Santos',
      previousPosition: 'HR Assistant',
      proposedPosition: 'HR Officer',
      requestDate: '2026-11-12',
      requestedBy: 'HR Administrator',
      status: 'APPROVED',
    },
    {
      requestNumber: 'RHR-2026-00022',
      employeeNumber: 'EMP000003',
      employeeName: 'Pedro Reyes',
      previousPosition: 'Warehouse Supervisor',
      proposedPosition: 'Warehouse Manager',
      requestDate: '2026-11-10',
      requestedBy: 'HR Manager',
      status: 'COMPLETED',
    },
    {
      requestNumber: 'RHR-2026-00021',
      employeeNumber: 'EMP000004',
      employeeName: 'Ana Garcia',
      previousPosition: 'Accounting Clerk',
      proposedPosition: 'Accountant',
      requestDate: '2026-11-08',
      requestedBy: 'HR Administrator',
      status: 'REJECTED',
    },
    {
      requestNumber: 'RHR-2026-00020',
      employeeNumber: 'EMP000005',
      employeeName: 'Carlos Mendoza',
      previousPosition: 'Project Engineer',
      proposedPosition: 'Project Engineer',
      requestDate: '2026-11-06',
      requestedBy: 'HR Manager',
      status: 'OFFER_SENT',
    },
    {
      requestNumber: 'RHR-2026-00019',
      employeeNumber: 'EMP000006',
      employeeName: 'Elena Cruz',
      previousPosition: 'Administrative Assistant',
      proposedPosition: 'Administrative Officer',
      requestDate: '2026-11-04',
      requestedBy: 'HR Administrator',
      status: 'OFFER_ACCEPTED',
    },
  ]);

  // ========================================
  // Filtered Records
  // ========================================

  readonly filteredRecords = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const status = this.selectedStatus();

    return this.records().filter(record => {

      // Search matching
      const matchesSearch =
        !search ||
        record.requestNumber.toLowerCase().includes(search) ||
        record.employeeNumber.toLowerCase().includes(search) ||
        record.employeeName.toLowerCase().includes(search) ||
        record.previousPosition.toLowerCase().includes(search) ||
        record.proposedPosition.toLowerCase().includes(search) ||
        record.requestedBy.toLowerCase().includes(search);

      // Status matching
      const matchesStatus =
        status === null ||
        status === 'ALL' ||
        record.status === status;

      return matchesSearch && matchesStatus;
    });
  });

  // ========================================
  // Summary Counts
  // ========================================

  readonly totalRequests = computed(
    () => this.records().length
  );

  readonly pendingRequests = computed(
    () => this.records().filter(
      record => record.status === 'PENDING_APPROVAL'
    ).length
  );

  readonly completedRequests = computed(
    () => this.records().filter(
      record => record.status === 'COMPLETED'
    ).length
  );

  // ========================================
  // Filtered Record Count
  // ========================================

  readonly filteredCount = computed(
    () => this.filteredRecords().length
  );

  // ========================================
  // Status Label
  // ========================================

  getStatusLabel(status: RehireRequestStatus): string {
    return this.statusOptions.find(
      option => option.value === status
    )?.label ?? status;
  }

  // ========================================
  // Search Change
  // ========================================

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  // ========================================
  // Status Change
  // ========================================

  onStatusChange(value: CxpSelectValue): void {
    this.selectedStatus.set(value);
  }

  // ========================================
  // Clear Filters
  // ========================================

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedStatus.set('ALL');
  }

  // ========================================
  // View Request Details
  // ========================================

  viewDetails(requestNumber: string): void {
    // Mock implementation.
    // Replace with Router navigation when
    // Rehire Request Details page is ready.

    console.log(
      'View rehire request:',
      requestNumber
    );
  }
}
