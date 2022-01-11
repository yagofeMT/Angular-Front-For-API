import { Component, OnInit } from '@angular/core';
import { Tipo } from 'src/app/models/Tipo';
import { TypesService } from 'src/app/services/types.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CategorysService } from 'src/app/services/categorys.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['../list-categorys/list-categorys.component.css'],
})
export class NewCategoryComponent implements OnInit {

form : any;
tipos : Tipo[] | undefined;

  constructor(private typesService : TypesService, private categoryService : CategorysService, private router : Router) { }

  ngOnInit(): void {

    this.typesService.GetAll().subscribe(result => {
      this.tipos = result;
    })

    this.form = new FormGroup({
      name : new FormControl(null),
      icone : new FormControl(null),
      typeId : new FormControl(null),
    });
  
  }

  get propriedade(){
    return this.form.controls;
  }
  
  PostForm() : void {
    const categoria = this.form.value;

    this.categoryService.PostCategory(categoria).subscribe(result => {
      this.router.navigate(['categorys/list']);
    })
  };

  BackList() : void {
    this.router.navigate(['categorys/list'])
  }

}
