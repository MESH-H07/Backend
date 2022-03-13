import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getEvents() {
    return await prisma.event.findMany({
        include: {
            organizer: true,
            location: true,
        }
    });
}
export async function getMentors() {
    return await prisma.mentorExtension.findMany({
        include: {
            certifiedSkills: true,
            skills: true,
        }
    });
}
export async function getChatFromUser(userid: number) {
    return await prisma.user.findMany({
        where: {
            id: userid
        },
        include: {
            chat: {
                include: {
                    messages: true,
                }
            },
        },
    })
}
export async function getInfo() { }

export async function getLocationById(locationid: number) {
    console.log(locationid)
    return await prisma.location.findFirst({
        where: {
            id: locationid,
        },
    })
}

export async function getLocationsOfOrgas() {
    return await prisma.location.findMany({
        where: {
            NOT: {
                organisationExtensionId: null,
            },
        },
        include: {
            OrganisationExtension: {
                include: {
                    User: true,
                }
            }
        },
    })
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
                    description: user.description,
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

// ----- event ----- //
export async function createEvent(event: any, userId: any) {
    await prisma.event.create({
        data: {
            name: event.name,
            temporary: event.temporary,
            description: event.description,
            start: event.start,
            end: event.end,
            organizerId: userId,
            location: {
                create: checkFieldsLocation(event.address)
            },
        },
    })
}

export async function updateEvent(event: any) {

}

export async function deleteEvent(event: any) {

}
// ----- end event ----- // 