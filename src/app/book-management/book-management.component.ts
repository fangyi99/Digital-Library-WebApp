import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.css']
})
export class BookManagementComponent implements OnInit {

  tempBook: any;
  bookList: any[];
  addBookForm: FormGroup;
  updateBookForm: FormGroup;

  constructor(private bookService: BookService, private formBuilder: FormBuilder) {
    bookService.getAllBooks().subscribe((data: any) => this.bookList = data);
   }

  ngOnInit(): void {
    this.addBookForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: [''],
      publisher: [''],
      isbn: [''],
      category: [''],
      language: [''],
      summary: [''],
    });

    this.updateBookForm = this.formBuilder.group({
      id:[''],
      title: ['', [Validators.required]],
      author: [''],
      publisher: [''],
      isbn: [''],
      category: [''],
      language: [''],
      summary: [''],
    });
  }

  addBook(selectedCategory){
    var data:any;
    data = {
      title: this.addBookForm.value.title,
      author: this.addBookForm.value.author,
      publisher: this.addBookForm.value.publisher,
      isbn: this.addBookForm.value.isbn,
      category: selectedCategory,
      language: this.addBookForm.value.language,
      summary: this.addBookForm.value.summary
    }

    this.bookService.addBook(data).subscribe(results => {
    location.reload();
    alert("Item added successfully.")
    });
    }

  updateBook(selectedCategory) {
    var data:any;
    data = {
      title: this.updateBookForm.value.title,
      author: this.updateBookForm.value.author,
      publisher: this.updateBookForm.value.publisher,
      isbn: this.updateBookForm.value.isbn,
      category: selectedCategory,
      language: this.updateBookForm.value.language,
      summary: this.updateBookForm.value.summary
    }

    this.bookService.updateBook(this.updateBookForm.value.id, data).subscribe(res => {
      location.reload();
      alert("Item updated successfully.")
    })
  }

  onUpdateModal(book){
    this.updateBookForm.patchValue({
      id: book._id,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      isbn: book.isbn,
      category: book.category,
      language: book.language,
      summary: book.summary,
    });
  }

  onDeleteModal(book){
    this.tempBook = book;
  }

  deleteBook(){
    this.bookService.deleteBook(this.tempBook._id).subscribe(results => {
      location.reload();
      alert("Item deleted successfully.")
    });
  }

}
