import { Component, OnInit, Inject} from '@angular/core';
import { CategorysService } from 'src/app/services/categorys.service';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['../../Categoria/list-categorys/list-categorys.component.css']
})
export class RegisterUserComponent implements OnInit {

form : any

  constructor(private userService : UsersService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      Username : new FormControl(null,[Validators.required,Validators.minLength(2), Validators.maxLength(80)]),
      Password : new FormControl(null, [Validators.minLength(5), Validators.maxLength(17)]),
      Email : new FormControl(null, [Validators.maxLength(100), Validators.minLength(8)]),
      Profissao : new FormControl(null, [Validators.minLength(2), Validators.maxLength(30)]),
      CPF : new FormControl(null, [Validators.minLength(14), Validators.maxLength(14)])
    })
  }

  PostUser() : void
  {

  }

}
