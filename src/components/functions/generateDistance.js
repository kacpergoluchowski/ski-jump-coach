export default function generateDistance(skill) {
    const finalSkill = `0.${skill}`;
    const heistation = Math.floor(Math.random() * 8) - 4;
    let distance = 90+(50*Number(finalSkill));

    if(heistation>0) 
        distance += heistation;
    else
        distance -= heistation;
    return distance;
}