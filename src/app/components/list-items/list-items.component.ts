import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { Item } from '../../interfaces/item';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [CommonModule, RouterLink, ProgressBarComponent],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css',
})
export class ListItemsComponent implements OnInit {
  listItem: Item[] = [];
  loading: boolean = false;
  constructor(
    private _itemService: ItemService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getListItem();
  }

  getListItem() {
    this.loading = true;
    setTimeout(() => {
      this._itemService.getListItem().subscribe((data) => {
        this.listItem = data;
        this.loading = false;
        console.log(data);
      });
    }, 150);
  }

  deleteItem(id: number) {
    this.loading = true;

    this._itemService.deleteItem(id).subscribe(() => {
      this.getListItem();
      this.toastr.warning('El item se elimino con exito', 'Item Eliminado');
    });
  }
}
