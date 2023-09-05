import generateDistance from "./generateDistance";

export default function generateExperience(skill) {
    let experience = 0;
    for(let i = 0; i < 21; i++) 
        experience += generateDistance(skill);
    return experience;
}