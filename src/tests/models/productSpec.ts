import { Product, ProductStore } from "../../database/models/Product";

describe("Test Product model", () => {
  let product: Product;

  it("Should create a product", async () => {
    const productData: Product = { name: "Gaming PC", price: 9999999 };

    product = await ProductStore.create(productData);

    expect(product.id).toBeDefined();
    expect(product.name).toBe(productData.name);
    expect(product.price).toBe(productData.price);
  });

  it("Should find product by id", async () => {
    expect(await ProductStore.find(product.id as number)).toEqual(product);
  });

  it("Should return all saved products", async () => {
    const products = await ProductStore.index();

    expect(products !== undefined).toBeTrue();
    if (products === undefined) return;

    expect(products).toBeInstanceOf(Array);

    expect(products.length).toBeGreaterThan(0);

    const foundProduct = products.find((p) => p.id === product.id);

    expect(foundProduct).toEqual(product);
  });
});
