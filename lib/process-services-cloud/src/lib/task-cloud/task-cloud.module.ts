import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TaskFiltersCloudComponent } from './task-filters-cloud/task-filters-cloud.component';
import { MaterialModule } from '../material.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderService, LogService, StorageService } from '@alfresco/adf-core';
import { TaskFilterCloudService } from './services/task-filter-cloud.service';
import { HttpClientModule } from '@angular/common/http';
import { EditTaskFilterCloudComponent } from './task-filters-cloud/edit-task-filter-cloud.component';
@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        FlexLayoutModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: TranslateLoaderService
            }
        }),
        MaterialModule
    ],
    declarations: [TaskFiltersCloudComponent, EditTaskFilterCloudComponent],
    exports: [TaskFiltersCloudComponent, EditTaskFilterCloudComponent],
    providers: [TaskFilterCloudService, LogService, StorageService]
})
export class TaskCloudModule { }
