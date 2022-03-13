import { PrismaClient } from "@prisma/client";
import { chownSync } from "fs";
const prisma = new PrismaClient();

export async function removeAll() {
    // @ts-expect-error -- Extract all model names
    const models = Object.keys(prisma._dmmf.mappingsMap)

    const promises = models.map((model) => {
        // Names formatted like `AccessRight`, we need `accessRight` for the orm call
        const name = model.charAt(0).toLowerCase() + model.slice(1)

        // @ts-expect-error
        return prisma[name].deleteMany()
    })

    await Promise.all(promises)
}

export async function initMocUp() {
    mentorCreate()
        .catch((e) => {
            console.log("error while creating mentor moc ups")
        })
    immigrantCreate()
        .catch((e) => {
            console.log("error while creating immigrant moc ups")
        })
    orgaCreate()
        .catch((e) => {
            console.log("error while creating orga moc ups")
        })

    eventCreate()
        .catch((e) => {
            console.log("error while creating event moc ups")
        })
    chatCreate()
        .catch((e) => {
            console.log("error while creating chat moc ups")
        })
}

async function mentorCreate() {
    await prisma.user.create({
        data: {
            email: "Horst@gmail.com",
            username: "Horsi",
            password: "1234",
            city: "Berlin",
            role: "MENTOR",
            mentor: {
                create: {
                    name: "Horst Lichter",
                    description: "Famous Berlin Spotter",
                    birthdate: new Date(Date.parse('2012-01-26T13:51:50.417-07:00')),
                    bio: "Love to write come from Germany",
                    arrival: new Date(Date.parse('2012-01-26T13:51:50.417-07:00')),
                    professional: true,
                    certifiedSkills: {
                        create: {},
                    },
                    skills: {
                        create: {},
                    }
                }
            }
        }
    })
}

async function immigrantCreate() {
    await prisma.user.create({
        data: {
            email: "LOL@gmail.com",
            username: "LEL",
            password: "1234",
            city: "Berlin",
            role: "IMMIGRANT",
            immigrant: {
                create: {
                    name: "Horst Lichter",
                    birthdate: new Date(Date.parse('2012-01-26T13:51:50.417-07:00')),
                    bio: "Come not from germany",
                }
            }
        }
    })
}

async function orgaCreate() {
    await prisma.user.create({
        data: {
            email: "org@gmail.com",
            username: "org1",
            password: "1234",
            city: "Berlin",
            role: "ORGANISATION",
            organisation: {
                create: {
                    name: "LichterOrg",
                    description: "Org from lichter",
                    locations: {
                        create: [
                            {
                                street: "Muster",
                                number: 69,
                                supplement: "AB",
                                city: "MusterStadt",
                                zip: 69420,
                                coordinates: {
                                    create: {
                                        latitude: 45.767,
                                        longitude: 4.833,
                                    }
                                }
                            }
                        ]
                    },
                }
            }
        }
    })
}

async function eventCreate() {
    await prisma.event.create({
        data: {
            name: "GetTogether",
            temporary: true,
            description: "Nice time for get together",
            start: new Date(Date.parse('2012-01-26T13:51:50.417-07:00')),
            end: new Date(Date.parse('2012-01-26T13:51:50.417-07:00')),
            location: {
                create: {
                    street: "Muster",
                    number: 420,
                    supplement: "AB",
                    city: "MusterStadt",
                    zip: 42069,
                    coordinates: {
                        create: {
                            latitude: 45.767,
                            longitude: 4.833,
                        }
                    }
                }
            }
        }
    })
}

async function chatCreate() {
    await prisma.chat.create({
        data: {
            user: {
                connect: [{ id: 1 }, { id: 2 }]
            },
            messages: {
                create:
                    [
                        { userId: 1, text: "message" },
                    ]
            }
        },
    })
}
