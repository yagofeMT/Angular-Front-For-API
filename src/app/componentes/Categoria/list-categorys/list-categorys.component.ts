import { Component, OnInit,Inject} from '@angular/core';
import { CategorysService } from 'src/app/services/categorys.service';
import { MatTableDataSource } from '@angular/material/table';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { Category } from 'src/app/models/Category';
import { Tipo } from 'src/app/models/Tipo';
import { TypesService } from 'src/app/services/types.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-categorys',
  templateUrl: './list-categorys.component.html',
  styleUrls: ['./list-categorys.component.css']
})
export class ListCategorysComponent implements OnInit {

  categorys = new MatTableDataSource<any>();
  displayedColumns!: string[] | undefined;
  CategoryName : string | undefined 
  CategoryId : number | undefined 



  constructor(private CategorysService : CategorysService, private dialog : MatDialog) { }

  ngOnInit(): void {
    this.CategorysService.GetAll().subscribe(result => {this.categorys.data = result;});

    this.displayedColumns = this.ShowColumns();
  }

  ShowColumns(): string[]{
    return ['name', 'icone', 'tipo', 'acoes']
  }

  ShowDialog(id : number, name : string) : void{
    this.dialog.open(DialogDeleteCategorysComponent, {
      data: {
        id : id,
        name: name
      }
    }).afterClosed().subscribe(result => {
      if(result === true){
        this.CategorysService.GetAll().subscribe(dados => {
          this.categorys.data = dados;
        })
      }
    });
  }
}

@Component({
  selector: 'app-dialog-delete-categorys',
  templateUrl: 'dialog-delete-categorys.html',
})

export class DialogDeleteCategorysComponent{
  constructor(@Inject (MAT_DIALOG_DATA) public data : any, private categorysService : CategorysService){}

  DeleteCategory(id : number) : void {
    this.categorysService.DeleteCategory(id).subscribe(result => {
    });
  }
}

