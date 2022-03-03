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
  }

  onSubmit(): void{
    this.authService.login$(this.formGroup.value).subscribe({
      next: (res) =>{
        if (res) {

          console.log(res);
          
          this.authService.storeUserData(res);
          console.log(22);
          
          this.router.navigate(['']);
          console.log(33);
          
        }
        else{
          alert('Incorrect password or username')
        }
      }
    })
  }

}
