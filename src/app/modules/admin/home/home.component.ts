import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector     : 'example',
    standalone   : true,
    templateUrl  : './home.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit
{
    /**
     * Constructor
     */
    constructor(private _userService: UserService)
    {
    }

    ngOnInit(): void {
        
    }
}
