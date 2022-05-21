import { Inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export default class ResourcesService {
    constructor(private http: HttpClient, @Inject('BASE_SERVER_URL') private serverUrl: string) {
    }

    getAddresses() {
        return this.http.post(`${this.serverUrl}`, {
            "action": "getAddress",
            "version": "1.0"
        })
    }
    testReousrce() {
        return this.http.post(`https://jsonplaceholder.typicode.com/posts`, {
            title: 'foo',
            body: 'bar',
            userId: 1,
        })
    }
}