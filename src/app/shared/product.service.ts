import {Injectable, EventEmitter} from '@angular/core';
import { Observable } from "rxjs";
import {Http, URLSearchParams} from "@angular/http";
import "rxjs/Rx"

@Injectable()
export class ProductService {

  /**
  private products: Product[] = [
    new Product(1, "first product", 2.99, 3.5, "This is my first product", ["apple", "amazon"]),
    new Product(2, "second product", 3.99, 1.5, "This is my second product", ["amd", "intel"]),
    new Product(3, "third product", 4.99, 2.5, "This is my third product", ["apple", "amd"]),
    new Product(4, "fourth product", 5.99, 3.0, "This is my fourth product", ["ms", "linkedin"]),
    new Product(5, "fifth product", 6.99, 4.5, "This is my fifth product", ["facebook", "amazon"]),
    new Product(6, "sixth product", 7.99, 5.0, "This is my sixth product", ["apple", "expedia"])
  ];*/

  /**
  private comments: Comment[] = [
    new Comment(1, 1, "2017-02-02 22:22:22", "Tmac", 3, "Good to know"),
    new Comment(2, 1, "2017-03-02 23:22:22", "Kobe", 4, "Good to know"),
    new Comment(3, 1, "2017-04-02 21:22:22", "Iversion", 5, "Good to know"),
    new Comment(4, 2, "2017-05-02 20:22:22", "Ray", 1, "Sad to know"),
  ];*/

  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

  constructor(private http:Http) { }

  getProducts(): Observable<Product[]> {
    return this.http.get("/api/products").map(res => res.json());
  }

  getAllCategories(): string[] {
    return ["apple", "amazon", "amd", "intel", "ms", "linkedin", "facebook", "expedia"];
  }

  /**
  getProduct(id:number): Product {
    return this.products.find((product) => product.id == id);
  }*/

  getProduct(id:number): Observable<Product> {
    return this.http.get("/api/product/" + id).map(res => res.json());
  }

  /**
  getCommentsForProductId(id:number): Comment[] {
    return this.comments.filter((comment: Comment) => comment.productId == id);
  }*/

  getCommentsForProductId(id:number): Observable<Comment[]> {
    return this.http.get("/api/product/" + id + "/comments").map(res => res.json());
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get("/api/products", { search: this.encodeParams(params) }).map(res => res.json());
  }

  private encodeParams(params: ProductSearchParams) {
    return Object.keys(params)
      .filter(key => params[key])
      .reduce((sum: URLSearchParams, key: string) => {
        sum.append(key, params[key]);
        return sum;
      }, new URLSearchParams());
  }

}

export class ProductSearchParams {
  constructor(
    public title: string,
    public price: number,
    public category: string
  ){}
}

export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ){}
}

export class Comment {
  constructor(
    public id:number,
    public productId:number,
    public timestamp:string,
    public user: string,
    public rating: number,
    public content: string
  ){}
}
