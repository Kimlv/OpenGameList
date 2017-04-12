System.register(["@angular/core", "@angular/forms", "@angular/router", "./auth.service", "./user"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, forms_1, router_1, auth_service_1, user_1, UserEditComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }
        ],
        execute: function () {
            UserEditComponent = class UserEditComponent {
                constructor(fb, router, activatedRoute, authService) {
                    this.fb = fb;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.authService = authService;
                    this.title = "New User Registration";
                    this.errorMessage = null;
                    // determine behaviour by fetching the active route
                    this.isRegister = (activatedRoute.snapshot.url[0].path === "register");
                    if ((this.isRegister && this.authService.isLoggedIn())
                        || (!this.isRegister && !this.authService.isLoggedIn())) {
                        this.router.navigate([""]);
                    }
                    if (!this.isRegister) {
                        this.title = "Edit Account";
                    }
                }
                ngOnInit() {
                    this.userForm = this.fb.group({
                        username: ["", [
                                forms_1.Validators.required,
                                forms_1.Validators.pattern("[a-zA-Z0-9]+")
                            ]],
                        email: ["", [
                                forms_1.Validators.required,
                                forms_1.Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                            ]],
                        password: ["", [
                                forms_1.Validators.required,
                                forms_1.Validators.minLength(6)
                            ]],
                        passwordConfirm: ["", [
                                forms_1.Validators.required,
                                forms_1.Validators.minLength(6)
                            ]],
                        displayName: ["", null]
                    }, {
                        validator: this.compareValidator('password', 'passwordConfirm')
                    });
                    if (!this.isRegister) {
                        this.userForm.addControl("passwordCurrent", new forms_1.FormControl("", forms_1.Validators.required));
                        var password = this.userForm.get("password");
                        password.clearValidators();
                        password.setValidators(forms_1.Validators.minLength(6));
                        var passwordConfirm = this.userForm.get("passwordConfirm");
                        passwordConfirm.clearValidators();
                        passwordConfirm.setValidators(forms_1.Validators.minLength(6));
                        this.authService.get().subscribe(user => {
                            this.userForm.get("username")
                                .setValue(user.UserName);
                            this.userForm.get("email")
                                .setValue(user.Email);
                            this.userForm.get("displayName")
                                .setValue(user.DisplayName);
                        });
                    }
                }
                compareValidator(fc1, fc2) {
                    return (group) => {
                        let password = group.controls[fc1];
                        let passwordConfirm = group.controls[fc2];
                        if (password.value === passwordConfirm.value) {
                            return null;
                        }
                        return { compareFailed: true };
                    };
                }
                onSubmit() {
                    if (this.isRegister) {
                        this.authService.add(this.userForm.value)
                            .subscribe((data) => {
                            if (data.error == null) {
                                // registration successful
                                this.errorMessage = null;
                                this.authService.login(this.userForm.value.username, this.userForm.value.password)
                                    .subscribe((data) => {
                                    // login successful
                                    this.errorMessage = null;
                                    this.router.navigate([""]);
                                }, (err) => {
                                    console.log(err);
                                    // login failure
                                    this.errorMessage =
                                        "Warning: Username or Password mismatch";
                                });
                            }
                            else {
                                // registration failure
                                this.errorMessage = data.error;
                            }
                        }, (err) => {
                            // server/connection error
                            this.errorMessage = err;
                        });
                    }
                    else {
                        let user = new user_1.User(this.userForm.value.username, this.userForm.value.password, this.userForm.value.passwordNew, this.userForm.value.email, this.userForm.value.displayName);
                        this.authService.update(user)
                            .subscribe((data) => {
                            if (data.error == null) {
                                // update successful
                                this.errorMessage = null;
                                this.router.navigate([""]);
                            }
                            else {
                                // update failure
                                this.errorMessage = data.error;
                            }
                        }, (err) => {
                            // server/connection error
                            this.errorMessage = err;
                        });
                    }
                }
            };
            UserEditComponent = __decorate([
                core_1.Component({
                    selector: "user-edit",
                    template: `
<div class="user-container">
    <form class="form-user" [formGroup]="userForm" (submit)="onSubmit()">
        <h2 class="form-user-heading">{{title}}</h2>
        <div class="form-group">
            <input [disabled]="!this.isRegister" formControlName="username" type="text" class="form-control" placeholder="Choose an Username" autofocus />
            <span class="validator-label valid" *ngIf="this.userForm.controls.username.valid">
                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                valid!
            </span>
            <span class="validator-label invalid" *ngIf="!this.userForm.controls.username.valid && !this.userForm.controls.username.pristine">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                invalid
            </span>
        </div>
        <div class="form-group">
            <input formControlName="email" type="text" class="form-control" placeholder="Type your e-mail address" />
            <span class="validator-label valid" *ngIf="this.userForm.controls.email.valid">
                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                valid!
            </span>
            <span class="validator-label invalid" *ngIf="!this.userForm.controls.email.valid && !this.userForm.controls.email.pristine">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                invalid
            </span>
        </div>
        <div *ngIf="!this.isRegister" class="form-group">
            <input formControlName="passwordCurrent" type="password" class="form-control" placeholder="Current Password" />
            <span class="validator-label invalid" *ngIf="!this.userForm.controls.passwordCurrent.valid">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                required
            </span>
        </div>
        <div class="form-group">
            <input formControlName="password" type="password" class="form-control" placeholder="Choose a Password" />
            <span class="validator-label valid" *ngIf="this.userForm.controls.password.valid && !this.userForm.controls.password.pristine">
                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                valid!
            </span>
            <span class="validator-label invalid" *ngIf="!this.userForm.controls.password.valid && !this.userForm.controls.password.pristine">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                invalid
            </span>
        </div>
        <div class="form-group">
            <input formControlName="passwordConfirm" type="password" class="form-control" placeholder="Confirm your Password" />
            <span class="validator-label valid" *ngIf="this.userForm.controls.passwordConfirm.valid && !this.userForm.controls.password.pristine && !this.userForm.hasError('compareFailed')">
                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                valid!
            </span>
            <span class="validator-label invalid" *ngIf="(!this.userForm.controls.passwordConfirm.valid && !this.userForm.controls.passwordConfirm.pristine) || this.userForm.hasError('compareFailed')">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                invalid
            </span>
        </div>
        <div class="form-group">
            <input formControlName="displayName" type="text" class="form-control" placeholder="Choose a Display Name" />
        </div>
        <div class="form-group">
            <input type="submit" class="btn btn-primary btn-block" [disabled]="!userForm.valid" value="{{this.isRegister ? 'Register' : 'Save'}}" />
        </div>
    </form>
</div>
    `
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    router_1.Router,
                    router_1.ActivatedRoute,
                    auth_service_1.AuthService])
            ], UserEditComponent);
            exports_1("UserEditComponent", UserEditComponent);
        }
    };
});
