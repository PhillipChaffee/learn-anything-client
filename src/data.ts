export class Category {
    name!: string;
    resources!: Array<Resource>;
    subcategories!: Array<Category>;
}

export class Resource {
    name!: string;
    link!: string;
}

export const data: Category[] = [
    {
        name: "Programming/Computer Science",
        resources:
            [
                {
                    "name": "Teach Yourself CS",
                    "link": "https://teachyourselfcs.com/"
                }
            ],
        subcategories: []
    }
]