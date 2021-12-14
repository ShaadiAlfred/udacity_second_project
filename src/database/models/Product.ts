import { runQuery } from "..";

export type Product = {
  id?: number;
  name: string;
  // Price in cents
  price: number;
};

export class ProductStore {
  static async create(product: Product): Promise<Product> {
    const result = await runQuery(
      `INSERT INTO "products" (name, price)
      VALUES ($1, $2)
      RETURNING *`,
      [product.name, product.price],
    );

    return result.rows[0];
  }

  static async find(id: number): Promise<Product | null> {
    try {
      const result = await runQuery(`SELECT * from "products" WHERE "id" = $1`, [id]);

      if (result.rowCount !== 0) {
        return result.rows[0];
      }
    } catch (err) {
      console.log(err);
    }

    return null;
  }

  static async index(): Promise<Product[]> {
    const result = await runQuery(`SELECT * from "products"`);

    if (result.rowCount === 0) {
      return [];
    }

    return result.rows;
  }
}
