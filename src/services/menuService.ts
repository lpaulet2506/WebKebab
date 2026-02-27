import Papa from 'papaparse';
import { MenuItem, Promotion, KEBAB_CUSTOMIZATIONS, DRINK_CUSTOMIZATIONS } from '../data/menu';

const GOOGLE_SHEET_CSV_URL = 'REPLACE_WITH_YOUR_CSV_URL';

export const fetchMenuFromSheet = async (): Promise<{ menu: MenuItem[], promotions: Promotion[] }> => {
    try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        const csvContent = await response.text();

        return new Promise((resolve, reject) => {
            Papa.parse(csvContent, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const menu: MenuItem[] = [];
                    const promotions: Promotion[] = [];

                    results.data.forEach((row: any) => {
                        const isPromo = row.type === 'promo';

                        if (isPromo) {
                            promotions.push({
                                id: row.id,
                                title: row.name,
                                description: row.description,
                                price: parseFloat(row.price.replace(',', '.')),
                                tag: row.tag || '',
                                customizations: parseCustomizations(row.customization_type)
                            });
                        } else {
                            menu.push({
                                id: row.id,
                                name: row.name,
                                description: row.description,
                                ingredients: row.ingredients,
                                price: parseFloat(row.price.replace(',', '.')),
                                category: row.category as any,
                                image: row.image,
                                customizations: parseCustomizations(row.customization_type)
                            });
                        }
                    });

                    resolve({ menu, promotions });
                },
                error: (error: any) => reject(error)
            });
        });
    } catch (error) {
        console.error('Error fetching menu from sheet:', error);
        return { menu: [], promotions: [] };
    }
};

const parseCustomizations = (type: string) => {
    if (type === 'kebab') return KEBAB_CUSTOMIZATIONS;
    if (type === 'drink') return DRINK_CUSTOMIZATIONS;
    // Add more logic for specific promo customizations if needed
    return undefined;
};
