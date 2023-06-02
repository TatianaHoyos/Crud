//para poder usar el faker
const { faker } = require('@faker-js/faker');
//para usar el mongo Cliente
const { MongoClient } = require('mongodb');
//Conecta a mongo por medio de la uri
const uri = "mongodb+srv://edbravo:Sena1234@cluster0.ushwfet.mongodb.net/"
//Funcion para crear la base de datos con una collection


//pedido ventaBarra
async function crearPedidoVentaBarra() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const result = await cliente.db('Soft_Imperio').createCollection("PedidoVentaBarra", {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    title: "SchemaUsuarios",
                    required: [
                        "_id_PedidoBarra",
                        "FechaPedido",
                        "TotalPedidoBarra"
                    ],
                    properties: {
                        "_id_PedidoBarra": {
                            "bsonType": "int"
                        },
                        "FechaPedido": {
                            "bsonType": "string"
                        },
                        "TotalPedidoBarra": {
                            "bsonType": "string"
                        }
                    }
                }
            }
        })
        if (result) {
            console.log("Se creo la collection correctamente");
        } else {
            console.log("Error al crear la collection");
        }
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}
// crearPedidoVentaBarra();


//insertarpedidoVentabarra


async function insertarPedidoVentaBarra() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const datosFaker = [];
        var _id_PedidoBarraB= [];
        for (let i = 0; i < 2000; i++) {
            do{
                var _id_PedidoB = faker.number.int({ min: 1, max: 2000 });
            }while(_id_PedidoBarraB.includes(_id_PedidoB));
            _id_PedidoBarraB.push(_id_PedidoB);       
  
            const fecha=faker.date.recent()
            const fechas=fecha.toString()
            const TotalPedidoB=Math.floor(Math.random() * (19999 - 10000 + 1)) + 10000;
            const precio= TotalPedidoB.toString()
  
            const datosAInsertar = {
                _id_PedidoBarra:_id_PedidoB,
                FechaPedido:fechas,
                TotalPedidoBarra:precio
            };
  
            datosFaker.push(datosAInsertar);
            console.log(`Se ha agregado ${i + 1} registro(s)`);
  
        }
        console.log('Estos son los valores generados por Faker:');
        console.log(datosFaker);
        const result = await cliente.db('Soft_Imperio').collection('PedidoVentaBarra').insertMany(datosFaker);
        if (result) {
            console.log('se ha ingresado el registro')
        } else {
            console.log('ha fallado')
        }
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
  }
  
  //insertarPedidoVentaBarra()
  


//ver un pedidoVentaBarra
async function verPedidoVentaBarra() {
    const cliente = new MongoClient(uri);


    try {
        await cliente.connect();
        const resultado = await cliente.db('Soft_Imperio').collection('PedidoVentaBarra').findOne(
            {"_id_PedidoBarra": 1 }
        );
        console.log(resultado);
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}


// verPedidoVentaBarra();


//ver todos los pedidos venta barra
async function verTPedidoVentaBarra() {
    const cliente = new MongoClient(uri);


    try {
        await cliente.connect();
        const resultado = await cliente.db('Soft_Imperio').collection('PedidoVentaBarra').find(
            {}, { limit: 2000 }
        ).toArray();
        console.log(resultado);
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}

// verTPedidoVentaBarra();


 // eliminar Pedido ventaBarra
 async function eliminarPedidoVentaBarra() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('PedidoVentaBarra').deleteOne({ "_id_PedidoBarra": 1 });
      console.log('Registro eliminado de PedidoVentaBarra');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  
// eliminarPedidoVentaBarra();


// eliminar todos los Pedidos venta barra
async function eliminarTPedidoVentaBarra() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('PedidoVentaBarra').deleteMany();
      console.log('Registros eliminados de PedidoVentaBarra');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  
//   eliminarTPedidoVentaBarra();


  //modificar PedidoVentaBarra
  async function modificarPedidoVentaBarra() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('PedidoVentaBarra').updateOne({ "_id_PedidoBarra": 1 },
        { $set: { TotalPedidoBarra: '20000', FechaPedido: "20/07/2023" } }
      );
      console.log('Registro modificado');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  //modificarPedidoVentaBarra();


  //modificar todos los PedidoVentaBarra
  async function modificarTPedidoVentaBarra() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('PedidoVentaBarra').updateMany({},
        { $set: { TotalPedidoBarra: '20000', FechaPedido: "20/07/2023" } }
      );
      console.log('Registro modificado');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  //modificarTPedidoVentaBarra();


   // ordenar los PedidoVentaBarra
async function ordenarPedidoVentaBarra() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('PedidoVentaBarra').find().sort({ _id_PedidoBarra: 1 }).toArray();
      console.log('Registros ordenados de menor a mayor:');
      console.log(resultado);
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  //ordenarPedidoVentaBarra();


  //2coleccion
  //pedido PedidoVentaMesa
async function crearPedidoVentaMesa() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const result = await cliente.db('Soft_Imperio').createCollection("PedidoVentaMesa", {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    title: "SchemaUsuarios",
                    required: [
                        "_id_PedidoMesa",
                        "FechaPedido",
                        "TotalPedidoMesa"
                    ],
                    properties: {
                        "_id_PedidoMesa": {
                            "bsonType": "int"
                        },
                        "FechaPedido": {
                            "bsonType": "string"
                        },
                        "TotalPedidoMesa": {
                            "bsonType": "string"
                        }
                    }
                }
            }
        })
        if (result) {
            console.log("Se creo la collection correctamente");
        } else {
            console.log("Error al crear la collection");
        }
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}
//  crearPedidoVentaMesa();



//insertarpedidoVentaMesa
async function insertarPedidoVentaMesa() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const datosFaker = [];
        var _id_PedidoMesaM= [];
        for (let i = 0; i < 2000; i++) {
            do{
                var _id_PedidoM = faker.number.int({ min: 1, max: 2000 });
            }while(_id_PedidoMesaM.includes(_id_PedidoM));
            _id_PedidoMesaM.push(_id_PedidoM);       
  
            const fecha=faker.date.recent()
            const fechas=fecha.toString()
            const TotalPedidoM=Math.floor(Math.random() * (19999 - 10000 + 1)) + 10000;
            const precio= TotalPedidoM.toString()
  
            const datosAInsertar = {
                _id_PedidoMesa:_id_PedidoM,
                FechaPedido:fechas,
                TotalPedidoMesa:precio
            };
  
            datosFaker.push(datosAInsertar);
            console.log(`Se ha agregado ${i + 1} registro(s)`);
  
        }
        console.log('Estos son los valores generados por Faker:');
        console.log(datosFaker);
        const result = await cliente.db('Soft_Imperio').collection('PedidoVentaMesa').insertMany(datosFaker);
        if (result) {
            console.log('se ha ingresado el registro')
        } else {
            console.log('ha fallado')
        }
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
  }
  
//insertarPedidoVentaMesa();
  


//ver un pedidoVentaMesa
async function verPedidoVentaMesa() {
    const cliente = new MongoClient(uri);


    try {
        await cliente.connect();
        const resultado = await cliente.db('Soft_Imperio').collection('PedidoVentaMesa').findOne(
            {"_id_PedidoMesa": 1 }
        );
        console.log(resultado);
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}


// verPedidoVentaMesa();


//ver todos los pedidos venta Mesa
async function verTPedidoVentaMesa() {
    const cliente = new MongoClient(uri);


    try {
        await cliente.connect();
        const resultado = await cliente.db('Soft_Imperio').collection('PedidoVentaMesa').find(
            {}, { limit: 2000 }
        ).toArray();
        console.log(resultado);
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}

// verTPedidoVentaMesa();


 // eliminar Pedido ventaMesa
 async function eliminarPedidoVentaMesa() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('PedidoVentaMesa').deleteOne({ "_id_PedidoMesa": 1 });
      console.log('Registro eliminado de PedidoVentaMesa');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  
// eliminarPedidoVentaMesa();


// eliminar todos los Pedidos ventaMesa
async function eliminarTPedidoVentaMesa() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('PedidoVentaMesa').deleteMany();
      console.log('Registros eliminados de PedidoVentaMesa');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  
//   eliminarTPedidoVentaMesa();


  //modificar PedidoVentaMesa
  async function modificarPedidoVentaMesa() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('PedidoVentaMesa').updateOne({ "_id_PedidoMesa": 1 },
        { $set: { TotalPedidoMesa: '20000', FechaPedido: "20/07/2023" } }
      );
      console.log('Registro modificado');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  //modificarPedidoVentaMesa();


  //modificar todos los PedidoVentaMesa
  async function modificarTPedidoVentaMesa() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('PedidoVentaMesa').updateMany({},
        { $set: { TotalPedidoMesa: '20000', FechaPedido: "20/07/2023" } }
      );
      console.log('Registro modificado');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  //modificarTPedidoVentaMesa();


   // ordenar los PedidoVentaMesa
async function ordenarPedidoVentaMesa() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('PedidoVentaMesa').find().sort({ _id_PedidoMesa: 1 }).toArray();
      console.log('Registros ordenados de menor a mayor:');
      console.log(resultado);
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  //ordenarPedidoVentaMesa();


  //3 coleccion
   //pedido PuntoDeVentaMesa
async function crearPuntoDeVentaMesa() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const result = await cliente.db('Soft_Imperio').createCollection("PuntoDeVentaMesa", {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    title: "SchemaUsuarios",
                    required: [
                        "_id_VentaMesas",
                        "_id_PedidoMesa",
                        "IdExistencias",
                        "CantidadProducto",
                        "SubTotalAPagar",
                        "EstadoConfirmarPedidoMesa"

                    ],
                    properties: {
                        "_id_VentaMesas": {
                            "bsonType": "int"
                        },
                        "_id_PedidoMesa": {
                            "bsonType": "int"
                        },
                        "IdExistencias": {
                            "bsonType": "int"

                        },
                        "CantidadProducto": {
                            "bsonType": "int"
                        },
                        "SubTotalAPagar": {
                            "bsonType": "string"
                        },
                        "EstadoConfirmarPedidoMesa": {
                            "bsonType": "string"
                        },
                    }
                }
            }
        })
        if (result) {
            console.log("Se creo la collection correctamente");
        } else {
            console.log("Error al crear la collection");
        }
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}
//crearPuntoDeVentaMesa();



async function traerIdPedidoMesa(){
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();

        const result = await cliente.db('Soft_Imperio').collection('PedidoVentaMesa').find({}).project({_id:0,_id_PedidoMesa:1}).toArray()
        return result;
        
    } catch (e) {
        console.log(e);
    }finally{
        console.log('se han enviado los id Pedido Mesa')
        await cliente.close();
    }

}



//insertarPuntoDeVentaMesa
async function insertarPuntoDeVentaMesa() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const datosFaker = [];
        var _id_PuntoVentaMesas= [];
        var IdExistencia=[];
        const _id_PedidoMesas= await traerIdPedidoMesa();
        for (let i = 0; i < 2000; i++) {
            do{
                var _id_PuntoVentaM = faker.number.int({ min: 1, max: 2000 });
            }while( _id_PuntoVentaMesas.includes(_id_PuntoVentaM));
            _id_PuntoVentaMesas.push(_id_PuntoVentaM);       
  
            do{
                var IdExis = faker.number.int({ min: 1, max: 2000 });
            }while( IdExistencia.includes(IdExis));
            IdExistencia.push(IdExis);       
            const _id_PedidoM=_id_PedidoMesas[i]._id_PedidoMesa;
            const subtotal=Math.floor(Math.random() * (19999 - 10000 + 1)) + 10000;
            const precio= subtotal.toString()
            const cantidad = faker.number.int({ min: 1, max: 100 });
  
            const datosAInsertar = {
                _id_VentaMesas:_id_PuntoVentaM,
                _id_PedidoMesa:_id_PedidoM,
                IdExistencias:IdExis,
                CantidadProducto:cantidad,
                SubTotalAPagar:precio,
                EstadoConfirmarPedidoMesa:faker.helpers.arrayElement(['Confirmar', 'Cancelar'])
            };
  
            datosFaker.push(datosAInsertar);
            console.log(`Se ha agregado ${i} registro(s)`);
  
        }
        console.log('Estos son los valores generados por Faker:');
        console.log(datosFaker);
        const result = await cliente.db('Soft_Imperio').collection('PuntoDeVentaMesa').insertMany(datosFaker);
        if (result) {
            console.log('se ha ingresado el registro')
        } else {
            console.log('ha fallado')
        }
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
  }
  
 // insertarPuntoDeVentaMesa();
  

 
//ver unPuntoDeVentaMesa
async function verPuntoDeVentaMesa() {
    const cliente = new MongoClient(uri);


    try {
        await cliente.connect();
        const resultado = await cliente.db('Soft_Imperio').collection('PuntoDeVentaMesa').findOne(
            {"_id_VentaMesas": 1 }
        );
        console.log(resultado);
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}


// verPuntoDeVentaMesa()();


//ver todos los pedidos venta Mesa
async function verTverPuntoDeVentaMesa() {
    const cliente = new MongoClient(uri);


    try {
        await cliente.connect();
        const resultado = await cliente.db('Soft_Imperio').collection('verPuntoDeVentaMesa()').find(
            {}, { limit: 2000 }
        ).toArray();
        console.log(resultado);
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}

// verTverPuntoDeVentaMesa();


 // eliminar PuntoDeVentaMesa
 async function eliminarPuntoDeVentaMesa() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('PuntoDeVentaMesa').deleteOne({ "_id_VentaMesas": 1 });
      console.log('Registro eliminado de PedidoVentaMesa');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  
// eliminarPuntoDeVentaMesa();


// eliminar todos los PuntoDeVentaMesa
async function eliminarTPuntoDeVentaMesa() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('PuntoDeVentaMesa').deleteMany();
      console.log('Registros eliminados de PuntoDeVentaMesa');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  
//   eliminarTPuntoDeVentaMesa();


  //modificar PuntoDeVentaMesa
  async function modificarPuntoDeVentaMesa() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('PuntoDeVentaMesa').updateOne({ "_id_VentaMesas": 1 },
        { $set: { SubTotalAPagar: '20000', EstadoConfirmarPedidoMesa: "Inactivo" } }
      );
      console.log('Registro modificado');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  //modificarPuntoDeVentaMesa();


  //modificar todos los PuntoDeVentaMesa
  async function modificarTPuntoDeVentaMesa() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('PuntoDeVentaMesa').updateMany({},
        { $set: { SubTotalAPagar: '20000', EstadoConfirmarPedidoMesa: "Inactivo" } }
      );
      console.log('Registro modificado');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  //modificarTPuntoDeVentaMesa();


   // ordenar losPuntoDeVentaMesa
async function ordenarPuntoDeVentaMesa() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('PuntoDeVentaMesa').find().sort({ _id_VentaMesas: 1 }).toArray();
      console.log('Registros ordenados de menor a mayor:');
      console.log(resultado);
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  //ordenarPuntoDeVentaMesa();



