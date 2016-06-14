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

import { describe, it, expect } from '@angular/core/testing';

describe('Not Supported Format View', () => {
    it ('should be migrated to angular 2 rc.1', () => {
        expect(false).toBe(true);
    });
});


/*
import { describe, expect, it, injectAsync, TestComponentBuilder } from 'angular2/testing';
import { NotSupportedFormat } from './notSupportedFormat.component';

describe('Not Supported Format View', () => {

    describe('View', () => {
        it('Download button should be present', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb
                .createAsync(NotSupportedFormat)
                .then((fixture) => {
                    let element = fixture.nativeElement;

                    fixture.detectChanges();

                    expect(element.querySelector('#viewer-download-button')).not.toBeNull();
                });
        }));
        it('should display the name of the file', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb
                .createAsync(NotSupportedFormat)
                .then((fixture) => {
                    let element = fixture.nativeElement;
                    let component = fixture.componentInstance;
                    component.nameFile = 'Example Content.xls';

                    fixture.detectChanges();

                    expect(element.querySelector('h4 span').innerHTML).toEqual('Example Content.xls');
                });
        }));
    });

    describe('User Interaction', () => {
        it('Click on Download button should call download method', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb
                .createAsync(NotSupportedFormat)
                .then((fixture) => {
                    let element = fixture.nativeElement;
                    let component = fixture.componentInstance;

                    fixture.detectChanges();

                    spyOn(component, 'download');

                    let downloadButton = element.querySelector('#viewer-download-button');
                    downloadButton.click();

                    expect(component.download).toHaveBeenCalled();
                });
        }));
    });
});
*/
