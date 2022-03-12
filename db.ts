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

export async function getInfo() {
    // TODO
}

export async function createMentor(user: any) {
    await prisma.user.create({
        data: {
            email: user.email,
            username: user.username,
            password: user.password,
            city: user.city,
            role: "MENTOR",
            mentor: {
                create: {
                    name: user.name,
                    birthdate: user.birthdate,
                    bio: user.bio,
                    arrival: user.arrival,
                    professional: user.professional,
                    certifiedSkills: { create: {} },
                    skills: { create: {} },
                },
            },
        },
    })
}

// ----- create user ----- //

export async function createImmigrant(user: any) {
    await prisma.user.create({
        data: {
            email: user.email,
            username: user.username,
            password: user.password,
            city: user.city,
            role: "IMMIGRANT",
            immigrant: {
                create: checkFieldsImmigrant(user)
            },
        },
    })
}

function checkFieldsImmigrant(user: any): any {
    let res = { name: "", birthdate: "", bio: "" }
    if ("name" in user) { res.name = user.name }
    if ("birthdate" in user) { res.birthdate = user.birthdate }
    if ("bio" in user) { res.bio = user.bio }
    return res
}

export async function createOrga(user: any) {
    await prisma.user.create({
        data: {
            email: user.email,
            username: user.username,
            password: user.password,
            city: user.city,
            role: "ORGANISATION",
            organisation: {
                create: {
                    name: user.name,
                    description: user.description,
                    locations: {
                        create: [
                            checkFieldsLocation(user.location),
                        ]
                    },
                },
            },
        },
    })
}

function checkFieldsLocation(address: any): any {
    let res = {
        supplement: "",
        description: "",
        note: "",
        street: address.street,
        city: address.city,
        zip: address.city,
    }
    if ("supplement" in address) { res.supplement = address.supplement }
    if ("description" in address) { res.description = address.description }
    if ("note" in address) { res.note = address.note }
    return res
}

// ----- end create user ----- //