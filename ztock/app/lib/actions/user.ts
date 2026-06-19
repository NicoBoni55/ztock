"use server"

import {prisma} from '@/app/lib/db';
import { UUID } from 'crypto';

export async function createProduct(name: string, description: string, store_Id: UUID) {
    const product = await prisma.product.create({
        data : {
            product_name: name,
            product_description: description,
            store_Id : store_Id
        }
    });
    return product;
}

export async function getProduct(product_name: string) {
    const product = await prisma.product.findMany({
        where: {product_name: product_name}
    });

    return product;
}

export async function getProductsByStore(store_Id: UUID) {
    const product = await prisma.product.findMany({
        where: {store_Id: store_Id}
    });

    return product;
}

export async function updateProduct(product_Id: UUID, product_name: string, description: string) {
    const product = await prisma.product.update({
        where: {id: product_Id},
        data: {product_name: product_name,
            product_description: description,
        }
    });

    return product;
}

export async function deleteProduct(product_Id: UUID) {
    const product = await prisma.product.delete({
        where: {id: product_Id}
    });

    return product;
}