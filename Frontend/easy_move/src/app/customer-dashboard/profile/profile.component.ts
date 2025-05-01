import { Component } from '@angular/core';
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

  constructor(private profileService : ProfileService) { }

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
    console.log(updatedUser);
    
    this.profileService.updateUser(updatedUser).subscribe((response: any) => {
      if(response.success){
        this.getUser(this.email);
      }
      })
    const modal = window.bootstrap.Modal.getInstance(document.getElementById('updateModal'));
    modal.hide();
  }
}
