import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Item } from '../../interfaces/item';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-edit-items',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    ProgressBarComponent,
  ],
  templateUrl: './add-edit-items.component.html',
  styleUrl: './add-edit-items.component.css',
})
export class AddEditItemsComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';
  constructor(
    private fb: FormBuilder,
    private _itemService: ItemService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nameProduct: ['', [Validators.required, Validators.maxLength(100)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });

    this.id = Number(aRoute.snapshot.paramMap.get('id'));
    console.log(this.id);
  }
  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar ';
      this.getItemId(this.id);
    }
  }

  additems() {
    const item: Item = {
      nameProduct: this.form.value.nameProduct,
      price: this.form.value.price,
    };
    this.loading = true;
    if (this.id !== 0) {
      item.id = this.id;
      this._itemService.updateItem(this.id, item).subscribe(() => {
        this.loading = false;
        this.toastr.info('Item actualizado correctamete', 'Item actualizado');
        this.router.navigate(['/']);
      });
    } else {
      this._itemService.saveItems(item).subscribe(() => {
        this.loading = false;
        this.toastr.success('Item agregado correctamete', 'Item agregado');

        this.router.navigate(['/']);
      });
    }
  }

  getItemId(id: number) {
    this.loading = true;
    this._itemService.getListItemId(id).subscribe((data: Item) => {
      console.log(data);
      this.loading = false;
      this.form.setValue({
        nameProduct: data.nameProduct,
        price: data.price,
      });
    });
  }

  clearForm() {
    this.form.reset();
  }
}
