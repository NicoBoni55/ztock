"use server"

import { Type } from '@/app/generated/prisma/client';
import { prisma } from '@/app/lib/db';
import { UUID } from 'crypto';
import type { PrismaClient } from '@/app/generated/prisma/client';

type transactionItem = {
    product_Id: string,
    quantity: number,
}

export async function createTransaction(store_Id: UUID, type: Type, items: transactionItem[], send_date: Date = new Date()) {
    await prisma.$transaction(async (tx) => {

        const transaction = await tx.stockTransaction.create({
            data: {
                store_Id,
                type,
                send_date,
        },
    });

    if (items.length > 0) {
        await tx.transactionItem.createMany({
            data: items.map((item) => ({
                product_id: item.product_Id,
                quantity: item.quantity,
                transaction_id: transaction.id
            }))
        })
    }
    
    return transaction;
})
}



export async function getTransactionsByStore(store_Id: UUID) {
    const transaction = await prisma.stockTransaction.findMany({
        where: {store_Id: store_Id}
    });

    return transaction;
}

export async function getTransactionsById(transaction_id: UUID) {
    const transaction = await prisma.stockTransaction.findUnique({
        where: {id: transaction_id}
    });

    return transaction;
}