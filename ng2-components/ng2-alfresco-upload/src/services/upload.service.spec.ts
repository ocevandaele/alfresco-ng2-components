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

import { it, describe, beforeEach, expect } from 'angular2/testing';
import { UploadService } from './upload.service';
import { FileModel } from './../models/file.model';

declare let jasmine: any;

let doneFn = jasmine.createSpy('success');
let errorFn = jasmine.createSpy('error');

class MockUploadService extends UploadService {

    createXMLHttpRequestInstance() {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === this.DONE && this.status === 200) {
                doneFn(this.responseText);
            } else if (this.readyState === this.DONE && this.status === 404) {
                errorFn(this.responseText);
            }
        };
        xhr.abort = jasmine.createSpy('abort');
        return xhr;
    }
}

describe('AlfrescoUploadService', () => {
    let service: MockUploadService,
        options: any;

    beforeEach(() => {
        jasmine.Ajax.install();

        options = {
            url: '/some/cool/url',
            withCredentials: true,
            authToken: btoa('fakeadmin:fakeadmin'),
            authTokenPrefix: 'Basic',
            fieldName: 'fakeFileData',
            formFields: {
                siteid: 'fakeSite',
                containerid: 'fakeFolder'
            }
        };
        service = new MockUploadService(options);
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    it('should return an empty queue if no elements are added', () => {
        expect(service.getQueue().length).toEqual(0);
    });

    it('should add an element in the queue and returns it', () => {
        let filesFake = [{name: 'fake-name', size: 10}];
        service.addToQueue(filesFake);
        expect(service.getQueue().length).toEqual(1);
    });

    it('should add two elements in the queue and returns them', () => {
        let filesFake = [{name: 'fake-name', size: 10}, {name: 'fake-name2', size: 20}];
        service.addToQueue(filesFake);
        expect(service.getQueue().length).toEqual(2);
    });

    it('should make XHR done request after the file is added in the queue', () => {
        let mockUploadSuccessResponses = {
            upload: {
                success: {
                    status: 200,
                    responseText: '{"nodeRef":"workspace://SpacesStore/fake","fileName": "fake-name.png","status":' +
                    '{"code": 200,"name": "OK","description": "fake file uploaded successfully"}}'
                }
            }
        };
        let filesFake = [{name: 'fake-name', size: 10}];
        service.addToQueue(filesFake);
        service.uploadFilesInTheQueue('', null);

        let request = jasmine.Ajax.requests.mostRecent();
        // request.respondWith(mockUploadSuccessResponses.upload.success);
        expect(request.url).toBe('/some/cool/url');
        expect(request.method).toBe('POST');
        // expect(request.data()).toEqual({fileName: 'fake-name.png'});

        expect(doneFn).not.toHaveBeenCalled();
        console.log(mockUploadSuccessResponses);
        jasmine.Ajax.requests.mostRecent().respondWith({
            'status': 200,
            contentType: 'text/plain',
            responseText: 'File uploaded'
        });
        expect(doneFn).toHaveBeenCalledWith('File uploaded');
    });

    it('should make XHR error request after an error occur', () => {
        let filesFake = [{name: 'fake-name', size: 10}];
        service.addToQueue(filesFake);
        service.uploadFilesInTheQueue('', null);
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/some/cool/url');
        jasmine.Ajax.requests.mostRecent().respondWith({
            'status': 404,
            contentType: 'text/plain',
            responseText: 'Error file uploaded'
        });
        expect(errorFn).toHaveBeenCalledWith('Error file uploaded');
    });

    it('should make XHR abort request after the xhr abort is called', () => {
        let filesFake = [{name: 'fake-name', size: 10}];
        service.addToQueue(filesFake);
        service.uploadFilesInTheQueue('', null);
        let file = service.getQueue();
        file[0].setAbort();
        expect(file[0]._xmlHttpRequest.abort).toHaveBeenCalled();
    });

    it('should make XHR done request after the file is upload', () => {
        let filesFake = {name: 'fake-name', size: 10};

        let uploadingFileModel = new FileModel(filesFake);
        service.uploadFile(uploadingFileModel, '', null);

        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/some/cool/url');
        jasmine.Ajax.requests.mostRecent().respondWith({
            'status': 200,
            contentType: 'text/plain',
            responseText: 'Single File uploaded'
        });
        expect(doneFn).toHaveBeenCalledWith('Single File uploaded');
    });

});
