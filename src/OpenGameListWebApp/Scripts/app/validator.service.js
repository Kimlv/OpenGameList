System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ValidatorService;
    return {
        setters: [],
        execute: function () {
            ValidatorService = class ValidatorService {
                static email(control) {
                    return (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/))
                        ? null
                        : { 'invalidEmail': true };
                }
            };
            exports_1("ValidatorService", ValidatorService);
        }
    };
});
