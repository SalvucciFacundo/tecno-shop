import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private mockProducts: Product[] = [
    {
      id: '1',
      name: 'RTX 5090 Ti Cyber-Edition',
      category: 'GPU',
      price: 2499.99,
      stock: 5,
      image: 'https://picsum.photos/id/1/300/200',
      specs: {
        'CUDA Cores': '16384',
        VRAM: '32GB GDDR7',
        'Clock Speed': '2.9 GHz',
        Interface: 'PCIe 5.0',
      },
    },
    {
      id: '2',
      name: 'Neural Link Processor X1',
      category: 'CPU',
      price: 899.5,
      stock: 12,
      image: 'https://picsum.photos/id/2/300/200',
      specs: {
        Cores: '32 P-Cores / 16 E-Cores',
        Threads: '64',
        Boost: '6.2 GHz',
        Cache: '128MB L3',
      },
    },
    {
      id: '3',
      name: 'Quantum RAM 64GB Neon-DDR6',
      category: 'RAM',
      price: 450.0,
      stock: 20,
      image: 'https://picsum.photos/id/3/300/200',
      specs: {
        Capacity: '64GB (2x32GB)',
        Speed: '9600 MT/s',
        Latency: 'CL32',
        RGB: 'Cyber-Sync Reactive',
      },
    },
    {
      id: '4',
      name: 'Void-Drive NVMe 4TB',
      category: 'Storage',
      price: 599.99,
      stock: 8,
      image: 'https://picsum.photos/id/4/300/200',
      specs: {
        Capacity: '4TB',
        'Read Speed': '14,000 MB/s',
        'Write Speed': '12,500 MB/s',
        Controller: 'Phison E26',
      },
    },
  ];

  getProducts(): Observable<Product[]> {
    // Retorna un observable para simular una llamada a Firebase en el futuro
    return of(this.mockProducts);
  }

  getProductById(id: string): Observable<Product | undefined> {
    const product = this.mockProducts.find((p) => p.id === id);
    return of(product);
  }
}
