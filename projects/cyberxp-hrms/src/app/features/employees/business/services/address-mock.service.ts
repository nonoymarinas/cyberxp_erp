// import { Injectable, inject, signal } from '@angular/core';
// import { map, Observable, tap } from 'rxjs';

// import { AddressDataAccess } from '../../data/data-access/address.data-access';

// import {
//   EmployeeAddress,
//   SaveAddressRequest,
// } from '../../models/domain/address.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class AddressService {
//   // ========================================
//   // Dependencies
//   // ========================================

//   private readonly dataAccess =
//     inject(AddressDataAccess);

//   // ========================================
//   // Address State
//   // ========================================

//   private readonly _addresses =
//     signal<EmployeeAddress[]>([]);

//   readonly addresses =
//     this._addresses.asReadonly();

//   // ========================================
//   // Get Addresses
//   // ========================================

//   getAddresses(
//     employeeGuid: string,
//   ): Observable<EmployeeAddress[]> {
//     return this.dataAccess
//       .getAddresses(employeeGuid)
//       .pipe(
//         map((response) => {
//           if (!response.success) {
//             throw new Error(
//               response.message ??
//                 'Unable to retrieve addresses.',
//             );
//           }

//           return response.data;
//         }),

//         tap((addresses) => {
//           this.setAddresses(addresses);
//         }),
//       );
//   }

//   // ========================================
//   // Save Address
//   // ========================================

//   saveAddress(
//     request: SaveAddressRequest,
//   ): Observable<EmployeeAddress[]> {
//     return this.dataAccess
//       .saveAddress(request)
//       .pipe(
//         map((response) => {
//           if (!response.success) {
//             throw new Error(
//               response.message ??
//                 'Unable to save address.',
//             );
//           }

//           return response.data;
//         }),

//         tap((addresses) => {
//           this.setAddresses(addresses);
//         }),
//       );
//   }

//   // ========================================
//   // Delete Address
//   // ========================================

//   deleteAddress(
//     employeeGuid: string,
//     addressId: string,
//   ): Observable<EmployeeAddress[]> {
//     return this.dataAccess
//       .deleteAddress(
//         employeeGuid,
//         addressId,
//       )
//       .pipe(
//         map((response) => {
//           if (!response.success) {
//             throw new Error(
//               response.message ??
//                 'Unable to delete address.',
//             );
//           }

//           return response.data;
//         }),

//         tap((addresses) => {
//           this.setAddresses(addresses);
//         }),
//       );
//   }

//   // ========================================
//   // Set Addresses
//   // ========================================

//   private setAddresses(
//     addresses: EmployeeAddress[],
//   ): void {
//     this._addresses.set(addresses);
//   }

//   // ========================================
//   // Get Cached Addresses
//   // ========================================

//   getCachedAddresses(): EmployeeAddress[] {
//     return this._addresses();
//   }

//   // ========================================
//   // Get Address By ID
//   // ========================================

//   getAddressById(
//     addressId: string,
//   ): EmployeeAddress | null {
//     return (
//       this._addresses().find(
//         (address) =>
//           address.addressId === addressId,
//       ) ?? null
//     );
//   }

//   // ========================================
//   // Has Addresses
//   // ========================================

//   hasAddresses(): boolean {
//     return this._addresses().length > 0;
//   }

//   // ========================================
//   // Get Present Address
//   // ========================================

//   getPresentAddress():
//     EmployeeAddress | null {
//     return (
//       this._addresses().find(
//         (address) =>
//           address.isPresent === true,
//       ) ?? null
//     );
//   }

//   // ========================================
//   // Clear Addresses
//   // ========================================

//   clearAddresses(): void {
//     this._addresses.set([]);
//   }
// }