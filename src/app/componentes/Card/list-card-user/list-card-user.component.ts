import { Component, OnInit, Inject, ViewChild } from '@angular/core';
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
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-list-card-user',
  templateUrl: './list-card-user.component.html',
  styleUrls: ['../../Categoria/list-categorys/list-categorys.component.css']
})
export class ListCardUserComponent implements OnInit {

userid = localStorage.getItem("userId");
cards = new MatTableDataSource<any>();
displayedColumns!: string[] | undefined;
autoCompleteInput = new FormControl();
optionsCards: string[] = [];
NamesCards: Observable<string[]> | undefined;
isAdm : boolean | undefined;

@ViewChild(MatPaginator, { static: true })
paginator!: MatPaginator;

@ViewChild(MatSort, {static: true} )
sort! : MatSort

  constructor(private cardService : CardService ,private dialog: MatDialog, private authGuard : AuthGuardService, private router : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("tokenUserSignIn") == null){
      this.router.navigate(["login"])
    }

    this.isAdm = this.authGuard.CheckAdm();

    this.cardService.GetCardUser(this.userid).subscribe(result => {
      result.forEach((cards) => {
        this.optionsCards.push(cards.Name as string)
      })

      this.cards.data = result;
      this.cards.paginator = this.paginator;
      this.cards.sort = this.sort;
    })

    this.displayedColumns = this.ShowColumns();
    this.NamesCards = this.autoCompleteInput.valueChanges.pipe(startWith(''), map(name => this.FilterNames(name)));
  }

  FilterNames(name: string): string[] {
    if(name.trim().length >= 3){
      this.cardService.FilterCard(name.toLowerCase(), this.userid!).subscribe(result => {
        this.cards.data = result
      })
    }
    else
    {
      if (name === '') {
        this.cardService.GetCardUser(this.userid).subscribe(result => {
          this.cards.data = result;
        });
      }
    }

    return this.optionsCards.filter(cards =>
      cards.toLowerCase().includes(name.toLowerCase()));
  }

  ShowColumns(): string[] | undefined {
    return ['Name','Number','Limite', 'Acoes']
  }

}
