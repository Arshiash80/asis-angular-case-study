import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  imports: [CommonModule]
})
export class UserDetailComponent implements OnInit {
  userId: string | null = null;
  user: User | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.loadUser();
  }

  private loadUser(): void {
    if (!this.userId) {
      this.router.navigate(['/users']);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      this.user = {
        id: parseInt(this.userId!),
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        website: 'johndoe.com',
        company: {
          name: 'Acme Corp',
          catchPhrase: 'Making the world a better place'
        },
        address: {
          street: '123 Main St',
          city: 'New York',
          zipcode: '10001'
        }
      };
      this.loading = false;
    }, 1000);
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }

}
