"use server"

import {prisma} from '@/app/lib/db';
import { UUID } from 'crypto';

export async function createStore(store_name: string, user_Id: UUID) {
    const store = await prisma.store.create({
        data : {
            store_name: store_name,
            userId: user_Id,
        }
    });
    return store;
}

export async function getStoreByUser(user_Id: UUID) {
    const store = await prisma.store.findUnique({
        where: {userId: user_Id}
    });

    return store;
}