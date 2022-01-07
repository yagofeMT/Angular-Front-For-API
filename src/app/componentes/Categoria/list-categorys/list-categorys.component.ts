import { Component, OnInit} from '@angular/core';
import { CategorysService } from 'src/app/services/categorys.service';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-list-categorys',
  templateUrl: './list-categorys.component.html',
  styleUrls: ['./list-categorys.component.css']
})
export class ListCategorysComponent implements OnInit {

  categorys = new MatTableDataSource<any>();
  displayedColumns!: string[] | undefined;


  constructor(private CategorysService : CategorysService) { }

  ngOnInit(): void {
    this.CategorysService.GetAll().subscribe(result => {this.categorys.data = result;});

    this.displayedColumns = this.ShowColumns();
  }

  ShowColumns(): string[]{
    return ['name', 'icone', 'tipo', 'acoes']
  }

}
