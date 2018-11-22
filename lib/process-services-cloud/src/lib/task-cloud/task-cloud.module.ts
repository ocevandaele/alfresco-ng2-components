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
import { EditTaskFiltersCloudComponent } from './task-filters-cloud/edit-task-filters-cloud.component';
import { TaskFilterDialogCloudComponent } from './task-filters-cloud/task-filter-dialog/task-filter-dialog-cloud.component';
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
    declarations: [TaskFiltersCloudComponent, EditTaskFiltersCloudComponent, TaskFilterDialogCloudComponent],
    entryComponents: [TaskFilterDialogCloudComponent],
    exports: [TaskFiltersCloudComponent, EditTaskFiltersCloudComponent, TaskFilterDialogCloudComponent],
    providers: [TaskFilterCloudService, LogService, StorageService]
})
export class TaskCloudModule { }
