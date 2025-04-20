import { Component } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  paymentDetails: any = []

  constructor(private paymentService: PaymentService) { 

  }
  customer_id = Number(sessionStorage.getItem('user_id'));
  ngOnInit(): void {
    this.paymentService.getPaymentDetails(this.customer_id).subscribe((response: any) => {
      if (response.success) {
        this.paymentDetails = response.payments;
        console.log(response);
      } else {
        console.log(response);
      }
    });
  }

}
