import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, EntityService } from '../_services';

@Component({templateUrl: 'entity.component.html'})
export class EntityComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private entityService: EntityService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            entityType: ['', Validators.required],
            entityName: ['', Validators.required],
            uniqueIdentifier: ['', Validators.required],
            address: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.entityService.create(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    localStorage.setItem('entityId', JSON.stringify(data['_id']));
                    this.alertService.success('Entity added successfully', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
