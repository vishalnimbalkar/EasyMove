import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.router.navigate(['/customer-dashboard/'])
  }
}
