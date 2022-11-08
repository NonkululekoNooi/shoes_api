module.exports = function sneakers(db){

async function Alltakkie(shoes){
    let sneaker = await db.oneOrNone("SELECT * FROM takkies WHERE id = $1",
    [shoes]);

    return sneaker
}

async function getAllSneakers(brand,color,size){
let sneakers = await db.manyOrNone(`SELECT * FROM takkies WHERE size = $1 
AND brand = $2 AND color = $3`,[size,brand,color]);

return sneakers

}

async function getTakkiesColor(color) {
    let Colors = await db.manyOrNone(`SELECT * FROM takkies WHERE color = $1`,[color]);

    return Colors
}

async function getTakkiesSize(size) {
    let Sizes = await db.manyOrNone(`SELECT * FROM takkies WHERE size = $1`,[size]);

    return Sizes
}

async function getTakkiesBrand(brand) {
    let Brands = await db.manyOrNone(`SELECT * FROM takkies WHERE size = $1`,[brand]);

    return Brands
}


//customers login
async function Details(names,mail) {
    let namesDetails = await db.oneOrNone("SELECT named,code FROM customers where named=$1 AND e_mail=$2",
    [names,mail]);
    
    return namesDetails;
  }

async function customerDetails(naming,codes,e_mail) {
   

    let checkedName = await Details(naming);

    if (checkedName == null) {
      await db.none("INSERT INTO customers(named,code,e_mail) VALUES ($1,$2,$3)", 
      [naming,codes,e_mail]);
     
    }
  
}
    return{
        Alltakkie,
        getAllSneakers,
        getTakkiesColor,
        getTakkiesSize,
        getTakkiesBrand,
        Details,
        customerDetails

    }
}