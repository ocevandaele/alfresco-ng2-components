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
    TaskFilterCloudRepresentationModel,
} from '@alfresco/adf-process-services-cloud';
import { UserPreferencesService, TranslationService } from '@alfresco/adf-core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

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
    filterName: string = '';

    currentFilter: TaskFilterCloudRepresentationModel;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private translateService: TranslationService,
        private userPreference: UserPreferencesService,
        public dialog: MatDialog
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

    onFilterChange(query: any) {
        this.status = query.state;
        this.sortArray = [
            {
                orderBy: query.sort,
                direction: query.order
            }
        ];
    }

    onSuccess(filter: TaskFilterCloudRepresentationModel) {
        const queryParams = this.createQueryParams(filter);
        this.createFilterRepresentationModel(filter);
        this.router.navigate([`/cloud/${this.applicationName}/tasks/`], {
            queryParams: queryParams
        });
    }

    createFilterRepresentationModel(filter) {
        this.currentFilter = new TaskFilterCloudRepresentationModel(filter);
    }

    createQueryParams(filter) {
        return {
            id: filter.id,
            filterName: filter.name,
            status: filter.query.state,
            assignee: filter.query.assignment,
            sort: filter.query.sort,
            order: filter.query.order
        };
    }

    onChangePageSize(event) {
        this.userPreference.paginationSize = event.maxItems;
    }

    onRowClick($event) {
        this.clickedRow = $event;
    }

    onEditActions(event: any) {
        if (event.actionType === 'SAVE') {
            console.log('SAVE');
        } else if (event.actionType === 'SAVE_AS') {
            console.log('SAVE_AD');
        } else if(event.actionType === 'DELETE') {
            console.log('DELETE');
        }
    }

    saveAs() {
        // this.translateFilterName();
        // const dialogRef = this.dialog.open(TaskFilterDialogCloudComponent, {
        //     data: {
        //         name: this.filterName
        //     },
        //     height: 'auto',
        //     minWidth: '30%'
        // });
        // dialogRef.afterClosed().subscribe(result => {
            // if (result && result.action === TaskFilterDialogCloudComponent.ACTION_SAVE) {
            //     this.editedTaskFilter.name = result.name;
            //     this.editedTaskFilter.icon = result.icon;
            //     this.editedTaskFilter.id = Math.random().toString(36).substr(2, 9),
            //     this.saveFilter(this.editedTaskFilter);
            // }
        // });
    }

    translateFilterName() {
        this.translateService.get(this.currentFilter.name).subscribe((message) => {
            this.filterName = message;
        });
    }
}
