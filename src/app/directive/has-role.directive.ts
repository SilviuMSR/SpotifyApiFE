import { Directive, Input, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { UserService } from '../servicies/user.service';

@Directive({
  selector: '[appHasRole]' 
})
export class HasRoleDirective implements OnInit {

  @Input() appHasRole: string[];
  isVisible = false;

  /* Container to view teamplates
    * convert elements in ng-template */
  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private userService: UserService) { }

    ngOnInit() {
      const userRoles = this.userService.decodedToken.role as Array<string>;

      //if no roles clear viewContainerRef
      if(!userRoles) {
        this.viewContainerRef.clear();
      }

      //if user has role need then render he element
      if(this.userService.roleMatch(this.appHasRole)) {
        console.log(userRoles);
        if(!this.isVisible) {
          this.isVisible = true;
          /* this.teamplateRef represent element which we want to be displayed or not */
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
        else {
          this.isVisible = false;
          this.viewContainerRef.clear();
        }
      }
    }

}
