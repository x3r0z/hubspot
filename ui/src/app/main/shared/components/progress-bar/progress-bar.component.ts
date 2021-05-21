import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {LoadingService} from "../../services/loading.service";

@Component({
    selector     : 'progress-bar',
    templateUrl  : './progress-bar.component.html',
    styleUrls    : ['./progress-bar.component.sass'],
})
export class ProgressBarComponent implements OnInit, OnDestroy
{
    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        readonly _loadingService: LoadingService
    )
    {
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {}

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

}
