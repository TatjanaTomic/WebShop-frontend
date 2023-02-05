export class Category {
    id: number;
    name: string;
    idParentCategory: number;
    isDeleted: boolean;

    constructor(id: number, name: string, idParentCategory: number, deleted: boolean) {
        this.id = id;
        this.name = name;
        this.idParentCategory = idParentCategory;
        this.isDeleted = deleted;
    }
}