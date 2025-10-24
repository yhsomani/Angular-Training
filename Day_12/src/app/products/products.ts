import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductDetailsComponent } from '../product-details/product-details';
import { Product } from '../product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductDetailsComponent],
  template: `
    <div class="parent-box" style="border-color: #dc3545;">
      <h3>Full Lifecycle Demo</h3>
      <p>Open the console to see the hook logs.</p>
      <button class="btn" (click)="updateFirstProduct()">Change Input</button>
      <button class="btn btn-warn" (click)="toggleProducts()">Toggle Visibility (Destroy)</button>

      @if (showProducts) {
        <h4 style="margin-top: 1rem;">Geeks Product List</h4>
        <div class="table-responsive">
          <table class="data-table">
            <thead class="thead-dark">
              <tr>
                <th>Product Name</th>
                <th>Available Qty</th>
                <th>Sales Rating</th>
              </tr>
            </thead>
            <tbody>
              @for (product of products; track product.ProductID) {
              <tr>
                <td>{{ product.ProductName }}</td>
                <td>{{ product.AvailableQty }}</td>
                <td>
                  <app-product-details
                    [SalesRating]="product.SalesRating"
                    (GetLocalSales)="onGetLocalSalesReport($event)"
                  >
                  </app-product-details>
                </td>
              </tr>
              }
            </tbody>
          </table>
        </div>
        <p class="feedback-message">
          <strong>Report:</strong> {{ messageFromNestedComponent }}
        </p>
      }
    </div>
  `,
  styles: [
    `.table-responsive { overflow-x: auto; }`,
    `.data-table th { background-color: #343a40; color: white; }`,
    `.feedback-message { margin-top: 1rem; font-style: italic; }`,
    `button { margin: 0 5px 5px 0; }`
  ]
})
export class ProductsComponent {
  messageFromNestedComponent = 'No report yet.';
  showProducts = true;

  products: Product[] = [
    { ProductID: 1, ProductName: "Solid State Drive", AvailableQty: 50, SalesRating: 4.5 },
    { ProductID: 2, ProductName: "Monitor", AvailableQty: 20, SalesRating: 4.0 },
    { ProductID: 3, ProductName: "LED Display", AvailableQty: 5, SalesRating: 3.5 },
  ];

  onGetLocalSalesReport(message: string): void {
    this.messageFromNestedComponent = 'Product Details Report: ' + message;
  }

  updateFirstProduct(): void {
    this.products = this.products.map((p: Product, index: number) => {
      if (index === 0) {
        return { ...p, SalesRating: 3.5 };
      }
      return p;
    });
    console.log('--- PARENT: Changed first product rating to 3.5 ---');
  }

  toggleProducts(): void {
    this.showProducts = !this.showProducts;
    console.log(`--- PARENT: Toggled products. Show: ${this.showProducts} ---`);
  }
}

