/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, ViewChild, OnInit } from '@angular/core';
import {
    TaskListCloudComponent,
    TaskListCloudSortingModel,
    FilterRepresentationModel,
    QueryModel
} from '@alfresco/adf-process-services-cloud';
import { UserPreferencesService } from '@alfresco/adf-core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-task-list-cloud-demo',
    templateUrl: 'task-list-cloud-demo.component.html',
    styleUrls: ['task-list-cloud-demo.component.scss']
})
export class TaskListCloudDemoComponent implements OnInit {
    @ViewChild('taskCloud')
    taskCloud: TaskListCloudComponent;

    appDefinitionList: Observable<any>;
    applicationName: string = '';
    status: string = '';
    isFilterLoaded = false;
    clickedRow: string = '';
    selectTask: string = '';
    sortArray: TaskListCloudSortingModel[];

    currentFilter: FilterRepresentationModel;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userPreference: UserPreferencesService
    ) {}

    ngOnInit() {
        this.isFilterLoaded = false;
        this.route.params.subscribe(params => {
            this.applicationName = params.applicationName;
        });

        this.route.queryParams.subscribe(params => {
            if (params.status) {
                this.isFilterLoaded = true;
            }
        });
    }

    onFilterSelected(filter) {
        const queryParams = this.createQueryParams(filter);
        this.createFilterRepresentationModel(filter);
        this.router.navigate([`/cloud/${this.applicationName}/tasks/`], {
            queryParams: queryParams
        });
    }

    createFilterRepresentationModel(filter) {
        const currentFilter = {
            name: filter.name,
            query: new QueryModel({
                state: filter.query.state,
                sort: filter.query.sort,
                assignment: '',
                order: filter.query.order,
                appName: filter.query.appName
            })
        };
        this.currentFilter = new FilterRepresentationModel(currentFilter);
    }

    onFilterSelected(filter) {
        const queryParams = {
            id: filter.id,
            filterName: filter.name,
            status: filter.query.state,
            assignee: filter.query.assignment,
            sort: filter.query.sort,
            order: filter.query.order
        };
    }

    onSuccess(filter: FilterRepresentationModel) {
        const queryParams = this.createQueryParams(filter);
        this.currentFilter = filter;
        this.router.navigate([`/cloud/${this.applicationName}/tasks/`], {
            queryParams: queryParams
        });
    }

    onFilterChange(filter: FilterRepresentationModel) {
        this.status = filter.query.state;
        this.sortArray = [
            {
                orderBy: filter.query.sort,
                direction: filter.query.order
            }
        ];
    }

    onChangePageSize(event) {
        this.userPreference.paginationSize = event.maxItems;
    }

    onRowClick($event) {
        this.clickedRow = $event;
    }
}
