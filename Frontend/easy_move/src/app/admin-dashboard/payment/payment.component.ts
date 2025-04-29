import { Component } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  constructor(private paymentServices: PaymentService) {}
  payments!: any;
  ngOnInit(): void {
    this.getAllPayments();
  }

  getAllPayments() {
    this.paymentServices.getAllPayments().subscribe((response: any) => {
      if (response.success) {
        this.payments = response.payments.sort((a: any, b: any) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        });
        console.log(response);
      } else {
        console.log(response);
      }
    });
  }
}
