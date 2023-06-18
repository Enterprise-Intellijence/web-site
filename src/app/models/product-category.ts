export class ProductCategory {

  /**
   * the parent category of this category
   * null if this is a primary category
   */
  readonly parentCategory: ProductCategory | null;

  /** display name for the end-user */
  readonly name: string;

  /** the raw name is the name as it appears in the database */
  readonly rawName: string;

  /**
   * id of the category in the database
   * defined only for leaf categories
  */
  readonly id: string | null;

  childCategories: ProductCategory[] = [];

  constructor(name: string, parentCategory?: ProductCategory, id?: string) {
    this.rawName = name;

    // remove everything after the first #
    // which is used to distinguish categories with the same name
    this.name = name.replace(/#.*/g, '');

    this.parentCategory = parentCategory ?? null;
    this.id = id ?? null;
  }

  addChildCategory(childCategory: ProductCategory): void {
    this.childCategories.push(childCategory);
  }

  getChildren(): ProductCategory[] {
    return this.childCategories;
  }

  addChildCategories(childCategories: ProductCategory[]): void {
    this.childCategories = [...this.childCategories, ...childCategories];
  }

  /**
   * @returns the path from the root category to this category
   */
  getCategoryPath(): ProductCategory[] {
    const path: ProductCategory[] = [];
    let currentCategory: ProductCategory | null = this;
    while (currentCategory) {
      path.push(currentCategory);
      currentCategory = currentCategory.parentCategory;
    }
    return path.reverse();
  }

  /**
   * @returns the depth of this category in the category tree (0 for primary categories)
   */
  getDepth(): number {
    let level = 0;
    let parent = this.parentCategory;
    while (parent) {
      level++;
      parent = parent.parentCategory;
    }
    return level;
  }

  isPrimary(): boolean {
    return this.parentCategory == null;
  }

  isLeaf(): boolean {
    return this.childCategories.length === 0;
  }



}
