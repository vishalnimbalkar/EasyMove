import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
declare var window: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  email!: string;
  name!: string;

  updatedEmail!: string;
  updatedName!: string;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email') || '';
    this.name = sessionStorage.getItem('name') || '';

    this.updatedEmail = this.email;
    this.updatedName = this.name;
  }

  onEdit() {
    const modal = new window.bootstrap.Modal(
      document.getElementById('updateModal')
    );
    modal.show();
  }

  saveChanges() {
    // Example: Update session and display updated values
    this.email = this.updatedEmail;
    this.name = this.updatedName;

    sessionStorage.setItem('email', this.updatedEmail);
    sessionStorage.setItem('name', this.updatedName);

    const modal = window.bootstrap.Modal.getInstance(document.getElementById('updateModal'));
    modal.hide();
  }
}
