import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Entity } from '../_models';

@Injectable()
export class EntityService {
    constructor(private http: HttpClient) { }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/api/v1/entity/` + id);
    }

    create(entity: Entity) {
        return this.http.post(`${environment.apiUrl}/api/v1/entity`, entity);
    }

    update(entity: Entity) {
        return this.http.put(`${environment.apiUrl}/api/v1/entity/` + entity.id, entity);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/` + id);
    }
}