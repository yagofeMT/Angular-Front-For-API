import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CategorysService } from 'src/app/services/categorys.service';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { observable, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';
import { FunctionService } from 'src/app/services/function.service';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';


@Component({
  selector: 'app-list-function',
  templateUrl: './list-function.component.html',
  styleUrls: ['../../Categoria/list-categorys/list-categorys.component.css']
})
export class ListFunctionComponent implements OnInit{

  functions = new MatTableDataSource<any>();
  displayedColumns!: string[] | undefined;
  autoCompleteInput = new FormControl();
  optionsFunction: string[] = [];
  NamesFunctions: Observable<string[]> | undefined;
  isAdm : boolean | undefined;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort, {static: true} )
  sort! : MatSort

  constructor(private FunctionService: FunctionService, private dialog: MatDialog, private router: Router, private authGuard : AuthGuardService) { }

  ngOnInit(): void {

    this.isAdm = this.authGuard.CheckAdm();

    this.FunctionService.GetAll().subscribe((result) => {
      result.forEach((func) => {
        this.optionsFunction.push(func.name as string);
      });

      this.functions.data = result;
      this.functions.paginator = this.paginator
      this.functions.sort = this.sort;
    });

    this.displayedColumns = this.ShowColumns();

    this.NamesFunctions = this.autoCompleteInput.valueChanges.pipe(startWith(''), map(name => this.FilterNames(name)));
  }

  ShowColumns(): string[] {
    return ['description', 'name', 'normalizedName', 'acoes']
  }

  ShowDialog(id: number, name: string): void {
    this.dialog.open(DialogDeleteFunctionComponent, {
      data: {
        id: id,
        name: name
      }
    }).afterClosed().subscribe(result => {
      if (result === true) {
        this.FunctionService.GetAll().subscribe(dados => {
          this.functions.data = dados;
        })
      }
    });
  }

  FilterNames(name: string): string[] {
    if (name.trim().length >= 3) {
      this.FunctionService.FilterFunctions(name.toLowerCase()).subscribe(result => {
        this.functions.data = result;
      });
    }
    else {
      if (name === '') {
        this.FunctionService.GetAll().subscribe(result => {
          this.functions.data = result;
        });
      }
    }

    return this.optionsFunction.filter(func =>
      func.toLowerCase().includes(name.toLowerCase()));
  }
}


@Component({
  selector: 'app-dialog-delete-categorys',
  templateUrl: 'dialog-delete-function.html',
})

export class DialogDeleteFunctionComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private FunctionService: FunctionService, private SnackBar : MatSnackBar) { }

  DeleteCategory(id: string): void {
    this.FunctionService.DeleteFunction(id).subscribe(result => {
      this.SnackBar.open(result.message, null!, {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    });
  }
}

