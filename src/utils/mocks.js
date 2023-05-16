import { faker } from "@faker-js/faker";

export const generateProducts = () => {
    const product = {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(100, 200, 0, '$'),
        thumbnail: faker.image.image(),
        stock: faker.random.numeric(3),
        category: faker.commerce.department(),
        status: faker.datatype.boolean()
    }
    return product;
}