import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { UserRoleEnum } from "@shared/enum";
import { GameStatsModel, LoginResponseModel, ScoreApiModel, ScoreTableData } from "@shared/models";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = 'https://localhost:7296';

    constructor(private http: HttpClient) {}

    login(idToken: string): Observable<LoginResponseModel> {
        return this.http.post<LoginResponseModel>(`${this.apiUrl}/Account/Login`, { idToken });
    }

    getUserRole(): Observable<{role: string | null}> {
        return this.http.get<{role: string | null}>(`${this.apiUrl}/Account/Role`);
    }

    getUserInfo(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/Account/UserInfo`);
    }

    getUserScores(pageIndex: number, pageSize: number, sort: Sort): Observable<ScoreTableData> {
        let params: HttpParams = new HttpParams();
        params = params.append('pageIndex', pageIndex.toString());
        params = params.append('pageSize', pageSize.toString());
        if(sort.active !== '' && sort.direction !== '') {
            params = params.append('sortBy', sort.active);
        }
        if(sort.direction !== '') {
            params = params.append('sortDir', sort.direction);
        }
        return this.http.get<ScoreTableData>(`${this.apiUrl}/Account/UserScores`, {params});
    }

    deleteUserScores() {
        return this.http.delete<ScoreTableData>(`${this.apiUrl}/Account/UserScores`);
    }

    deleteUserAccount() {
        return this.http.delete<ScoreTableData>(`${this.apiUrl}/Account/User`);
    }

    saveScore(gameStats: GameStatsModel): Observable<ScoreApiModel> {
        const scoreRequest: ScoreApiModel = {
            guessedCountries: gameStats.guessedCountries,
            gameTime: gameStats.time,
            gameDate: gameStats.gameDate?.toISOString(),
        };

        return this.http.post<ScoreApiModel>(`${this.apiUrl}/Account/SaveScore`, scoreRequest);
    }

    getUserToken(): string | null {
        return sessionStorage.getItem('userToken');
    }

    getToken(): string | null {
        return sessionStorage.getItem('authToken');
    }

    setUserToken(userToken: string): void {
        sessionStorage.setItem('userToken', userToken);
    }

    setToken(token: string): void {
        sessionStorage.setItem('authToken', token);
    }

    removeStorage(): void {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userToken');
    }
}