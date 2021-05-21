import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class LoadingService {
    public isLoading: BehaviorSubject<boolean>;

    public constructor() {
        this.isLoading = new BehaviorSubject<boolean>(false);
    }

    public display(status = true) {
        this.isLoading.next(status);
    }
}
