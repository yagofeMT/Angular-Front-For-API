import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CategorysService } from 'src/app/services/categorys.service';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-categorys',
  templateUrl: './list-categorys.component.html',
  styleUrls: ['./list-categorys.component.css']
})
export class ListCategorysComponent implements OnInit {

  categorys = new MatTableDataSource<any>();
  displayedColumns!: string[] | undefined;
  autoCompleteInput = new FormControl();
  optionsCategorys: string[] = [];
  NamesCategorys: Observable<string[]> | undefined;
  isAdm : boolean | undefined;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort, {static: true} )
  sort! : MatSort



  constructor(private CategorysService: CategorysService, private dialog: MatDialog, private authGuard : AuthGuardService, private router : Router) { }

  ngOnInit(): void {

    if(localStorage.getItem("tokenUserSignIn") == null){
      this.router.navigate(["login"])
    }

    this.isAdm = this.authGuard.CheckAdm();


    this.CategorysService.GetAll().subscribe((result) => {
      result.forEach((categorias) => {
        this.optionsCategorys.push(categorias.name as string);
      });

      this.categorys.data = result;
      this.categorys.paginator = this.paginator
      this.categorys.sort = this.sort;
    });

    this.displayedColumns = this.ShowColumns();

    this.NamesCategorys = this.autoCompleteInput.valueChanges.pipe(startWith(''), map(name => this.FilterNames(name)));
  }

  ShowColumns(): string[] {
    return ['name', 'icone', 'tipo', 'acoes']
  }

  ShowDialog(id: number, name: string): void {
    this.dialog.open(DialogDeleteCategorysComponent, {
      data: {
        id: id,
        name: name
      }
    }).afterClosed().subscribe(result => {
      if (result === true) {
        this.CategorysService.GetAll().subscribe(dados => {
          this.categorys.data = dados;
        })
      }
    });
  }


  FilterNames(name: string): string[] {
    if (name.trim().length >= 3) {
      this.CategorysService.FilterCategorys(name.toLowerCase()).subscribe(result => {
        this.categorys.data = result;
      });
    }
    else {
      if (name === '') {
        this.CategorysService.GetAll().subscribe(result => {
          this.categorys.data = result;
        });
      }
    }

    return this.optionsCategorys.filter(categoria =>
      categoria.toLowerCase().includes(name.toLowerCase()));
  }
}


@Component({
  selector: 'app-dialog-delete-categorys',
  templateUrl: 'dialog-delete-categorys.html',
})

export class DialogDeleteCategorysComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private categorysService: CategorysService, private SnackBar : MatSnackBar) { }

  DeleteCategory(id: number): void {
    this.categorysService.DeleteCategory(id).subscribe(result => {
      this.SnackBar.open(result.message, null!, {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    });
  }
}


