import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/users/user.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup!: FormGroup;

  private registerdUsers!: User[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { 
    
  }

  ngOnInit(): void {
    if (this.authService.getUserFromStorage()) {
      this.router.navigate(['/','offers'])
    }
    
    this.authService.getUsers$().subscribe({
      next: (res)=>{
        this.registerdUsers = res;
      }
    });

    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rePass: ['', [Validators.required]]
    });
  }

  onSubmit(): void{
    if(this.formGroup.value.password !== this.formGroup.value.rePass)
    {
      alert('Passwords do not match!')
      return;
    } 
    
    if (this.registerdUsers.find(u => u.email == this.formGroup.value.email)) {
      alert('User with that email already registered!')
      return;
    }

    delete this.formGroup.value.rePass;
  
    this.authService.register$(this.formGroup.value).subscribe({
      next: (res) =>{
        if (res) {
          this.authService.storeUserData(res);          
          this.router.navigate(['/']);     
          
          window.location.reload();     
        }
        else{
          alert('Incorrect data!')
        }
      }
    })
  }

}
