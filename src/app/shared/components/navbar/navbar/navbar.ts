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
export class Navbar implements OnInit {
  mainCategories: any[] = [];
 subCategories: any[] = [];
  menChildCategories: any[] = [];
  childCategories: any[] = [];
  showDropdown = false;
  mobileMenu = false;
  activeDropdown: string | null = null;
  isLoading = false;
  constructor(
    private categoryService: Category,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadMainCategories();
  }

  loadMainCategories() {
    this.categoryService.getMainCategories().subscribe((res) => {
      this.mainCategories = res.data.filter((c: any) => c.showInMenu);
      this.cd.detectChanges();
    });
  }


  openDropdown(category: any) {
    this.activeDropdown = category.urlKey;
    this.isLoading = true;
    this.subCategories = [];
    this.childCategories = [];
    this.categoryService.getCategoryTree(category.urlKey).subscribe({
      next: (res) => {
        this.subCategories = res.data.subCategory || [];
        this.childCategories = res.data.childCategory || [];
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: () => (this.isLoading = false),
    });
  }

  closeDropdown() {
    this.activeDropdown = null;
    this.subCategories = [];
    this.childCategories = [];
  }
  getChildren(subId: number) {
    return this.childCategories.filter((child) => child.parentId === subId);
  }

  get validSubCategories() {
    return this.subCategories.filter((sub) => this.getChildren(sub.id)?.length > 0);
  }
}
