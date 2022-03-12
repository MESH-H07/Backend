import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function initMocUp() {
    await prisma.user.create({
        data: {
            email: "Horst",
            username: "Horsi",
            password: "1234",
            city: "Berlin",
            events: {
                create: [
                    { name: "TestEvent" },
                ],
            },
        },
        include: {
            events: true,
        },
    })
    const allEvents = await prisma.event.findMany({})
    console.dir(allEvents, { depth: null })
}

export async function getEvents() { return await prisma.event.findMany(); }

export async function getMentors() {
    return await prisma.mentorExtension.findMany(); // TODO
}
export async function getChats() {
    // TODO
}

export async function getMentorsByFilter() {
    return prisma.mentorExtension.findMany(); // TODO
}