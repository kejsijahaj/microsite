import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface ApiResponse {
  nuis: string;
  businessName: string;
  logo: string;
  categories: any[];
}

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private apiUrl = 'https://test.dev.al/test/';

  constructor(private http: HttpClient) {}

  async getData(): Promise<ApiResponse> {
    const request$ = this.http.get<ApiResponse>(this.apiUrl);
    const data = await lastValueFrom(request$);
    return data;
  }
}