import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { Tipo } from 'src/app/models/Tipo';
import { CategorysService } from 'src/app/services/categorys.service';
import { TypesService } from 'src/app/services/types.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['../list-categorys/list-categorys.component.css']
})
export class EditComponent implements OnInit {
nameCategory : string | undefined
category : Observable<Category> | undefined
tipos : Tipo[] | undefined
form: any
id!: number;

  constructor(private router : Router,
    private route : ActivatedRoute,
    private categoryService : CategorysService,
    private typesService : TypesService) { }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];
    this.typesService.GetAll().subscribe(result => {this.tipos = result});
    this.categoryService.GetCategoryID(this.id).subscribe(result => {
      this.nameCategory = result.name;
      this.form = new FormGroup({
      Id : new FormControl(result.id),
      name : new FormControl(result.name),
      icone : new FormControl(result.icone),
      typeId : new FormControl(result.typeId)
    });
  });
  }

  get propriedade(){
    return this.form.controls;
  }

  UpdateCategory() : void {
    const categoria = this.form.value;

    this.categoryService.PutCategory(this.id, categoria).subscribe(result => {
      this.router.navigate(['categorys/list'])
    })
  }

  BackList() : void {
    this.router.navigate(['categorys/list'])
  }
}
