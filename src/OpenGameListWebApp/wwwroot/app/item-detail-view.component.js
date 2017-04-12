System.register(["@angular/core", "@angular/router", "./auth.service", "./item.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, auth_service_1, item_service_1;
    var ItemDetailViewComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            }],
        execute: function() {
            let ItemDetailViewComponent = class ItemDetailViewComponent {
                constructor(authService, itemService, router, activatedRoute) {
                    this.authService = authService;
                    this.itemService = itemService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                }
                ngOnInit() {
                    var id = +this.activatedRoute.snapshot.params["id"];
                    if (id) {
                        this.itemService.get(id).subscribe(item => this.item = item);
                    }
                    else if (id === 0) {
                        console.log("id is 0: switching to edit mode...");
                        this.router.navigate(["item/edit", 0]);
                    }
                    else {
                        console.log("Invalid id: routing back to home...");
                        this.router.navigate([""]);
                    }
                }
                onItemDetailEdit(item) {
                    this.router.navigate(["item/edit", item.Id]);
                    return false;
                }
                onBack() {
                    this.router.navigate(['']);
                }
            };
            ItemDetailViewComponent = __decorate([
                core_1.Component({
                    selector: "item-detail-view",
                    template: `
<div *ngIf="item">
    <h2>
        <a href="javascript:void(0)" (click)="onBack()">&laquo; Back to Home</a>
    </h2>
    <div class="item-container">
        <ul class="nav nav-tabs">
            <li *ngIf="authService.isLoggedIn()" role="presentation">
                <a href="javascript:void(0)" (click)="onItemDetailEdit(item)">Edit</a>
            </li>
            <li role="presentation" class="active">
                <a href="javascript:void(0)">View</a>
            </li>
        </ul>
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="item-image-panel">
                    <img src="/img/item-image-sample.png" alt="{{item.Title}}" />
                    <div class="caption">Sample image with caption.</div>
                </div>
                <h3>{{item.Title}}</h3>
                <p>{{item.Description}}</p>
                <p>{{item.Text}}</p>
            </div>
        </div>
    </div>
</div>
    `,
                    styles: []
                }), 
                __metadata('design:paramtypes', [auth_service_1.AuthService, item_service_1.ItemService, router_1.Router, router_1.ActivatedRoute])
            ], ItemDetailViewComponent);
            exports_1("ItemDetailViewComponent", ItemDetailViewComponent);
        }
    }
});

//# sourceMappingURL=item-detail-view.component.js.map
