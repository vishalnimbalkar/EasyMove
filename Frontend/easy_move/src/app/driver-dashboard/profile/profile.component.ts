import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user:any;
  ngOnInit(): void {
    const email = sessionStorage.getItem('email') || ""
    this.getUser(email)
  }

  constructor(private profileService : ProfileService) { }

  getUser(email: string) {
    this.profileService.getUser(email).subscribe((response: any) => {
    this.user = response.user
    })
  }
}
