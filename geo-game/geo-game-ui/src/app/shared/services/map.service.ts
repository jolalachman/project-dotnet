import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class MapService {

    constructor(private http: HttpClient) {}

    getMap(): Observable<any> {
        return this.http.get('assets/countries.geo.json');
    }
}