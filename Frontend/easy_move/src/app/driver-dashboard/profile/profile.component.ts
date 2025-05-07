import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ProfileService } from 'src/app/services/profile.service';
declare var window: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user:any;
   updatedName!: string;
   updatedPassword!: string;
   email!:string;
   ngOnInit(): void {
     this.email = sessionStorage.getItem('email') || ""
     this.getUser(this.email)
   }
 
   constructor(private profileService : ProfileService,
    private toast: NgToastService
   ) { }
 
   getUser(email: string) {
     this.profileService.getUser(email).subscribe((response: any) => {
     this.user = response.user
     this.updatedName =  response.user.name;
     })
   }
 
   onEdit() {
     const modal = new window.bootstrap.Modal(
       document.getElementById('updateModal')
     );
     modal.show();
   }
 
   saveChanges() {
     const updatedUser = {
       user_id : sessionStorage.getItem('user_id'),
       name : this.updatedName,
       password : this.updatedPassword
     }
     this.profileService.updateUser(updatedUser).subscribe((response: any) => {
       if(response.success){
         this.getUser(this.email);
         this.toast.success({ detail: "SUCCESS", summary: 'Profile Updated Successfully!', duration: 5000, position: 'topRight' });
       }else{
        this.toast.error({ detail: "Error! please try again!", summary: 'Failed To Update Profile', duration: 5000, position: 'topRight' });
       }
       })
     const modal = window.bootstrap.Modal.getInstance(document.getElementById('updateModal'));
     modal.hide();
   }
}
