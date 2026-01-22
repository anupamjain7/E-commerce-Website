import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Category } from '../../../../services/category';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit{
mainCategories: any[] = [];
  menCategories: any[] = [];
showDropdown = false;
  mobileMenu = false;
  constructor(private categoryService: Category,  private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadMainCategories();
    this.loadMenCategories();
  }
  
loadMainCategories() {
  this.categoryService.getMainCategories().subscribe(res => {
    this.mainCategories = res;
    this.cd.detectChanges(); 
  });
      this.cd.detectChanges();
    
  }

  loadMenCategories() {
    this.categoryService.getMenCategories()
      .subscribe(res => {
        this.menCategories = res;
      });
  }
  

}
