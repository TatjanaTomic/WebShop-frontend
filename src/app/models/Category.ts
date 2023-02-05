export class Category {
    id: number;
    name: string;
    parentCategory: Category|null;
    isDeleted: boolean;

    constructor(id: number, name: string, parentCategory: Category|null, deleted: boolean) {
        this.id = id;
        this.name = name;
        this.parentCategory = parentCategory;
        this.isDeleted = deleted;
    }
}