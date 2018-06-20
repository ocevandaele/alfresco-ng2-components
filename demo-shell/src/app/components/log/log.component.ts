/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
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

import { Component, HostListener } from '@angular/core';
import { LogService, ObjectDataTableAdapter } from '@alfresco/adf-core';

@Component({
    selector: 'app-log',
    templateUrl: './log.component.html',
    styleUrls: ['./log.component.css']
})
export class LogComponent {
    logs: any[] = [];
    show = false;
    ctrlLKey = 12;
    logsData: ObjectDataTableAdapter;

    constructor(public logService: LogService) {

        logService.onMessage.subscribe((message) => {

            this.logs.push({ type: message.type, text: JSON.stringify(message.text) });
            this.logsData = new ObjectDataTableAdapter(this.logs, [
                { type: 'text', key: 'type', title: 'Log level', sortable: true },
                { type: 'text', key: 'text', title: 'Message', sortable: false }
            ]);

        });
    }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        const key = event.keyCode;

        if (key === this.ctrlLKey) {
            this.show = !this.show;
        }

    }
}
