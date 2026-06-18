
export async function createPost(formData: FormData) {
    'use server'
    const session = await auth()
    if (!session?.user) {
        throw new Error('Unauthorized')
    }

    const title = formData.get('title')
    const content = formData.get('content')
}