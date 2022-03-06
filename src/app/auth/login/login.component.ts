import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { 
    
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    if (this.authService.getUserFromStorage()) {
      this.router.navigate(['/','offers'])
    }
  }

  onSubmit(): void{
    this.authService.login$(this.formGroup.value).subscribe({
      next: (res) =>{
        if (res) {
          this.authService.storeUserData(res);          
          this.router.navigate(['/']);     
          
    window.location.reload();     
        }
        else{
          alert('Incorrect password or username')
        }
      }
    })
  }

}
