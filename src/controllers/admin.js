const { admin,category,item,location,ownership } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


exports.login = async (req,res) =>{
    try{
        const body = req.body

        const schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().min(8).required()
        })

        const { error } = schema.validate(body)

        if(error){
            console.log(error)
            return res.status(400).send({
                message: error.details[0].message
            })
        }

        let dataLogin = await admin.findOne({
            where: {
                email: req.body.email
            }
        })

        if(!dataLogin){
            return res.status(400).send({
                message: 'Email doesnt match'
            })
        }
        const match = await bcrypt.compare(req.body.password, dataLogin.password)
        if(!match){
            return res.status(400).send({
                message: ' password doesnt match'
            })
        }

        let dataloginid = await admin.findOne({
            where: {
                email: req.body.email
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"]
            }
        })

        const accessToken = jwt.sign(
            {id: dataloginid.id},
        process.env.ACCESS_TOKEN_SECRET
        )

        res.status(200).send({
            message: 'berhasil login', 
            data: dataloginid,
            token: accessToken
        })
    }catch (err){
        console.error(err)
    }
}

exports.Register = async(req, res) => {
    try {

        const data = req.body
        const schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().min(8).required(),
          
        })
       
        const {error} = schema.validate(data)
       
        
        if(error){
            
            console.log(error.details)
            return res.status(400).send({
                message: error.details[0].message
            })
        }
        
        const hash = await bcrypt.hash(req.body.password, 10)

        const email = await admin.findOne({
            where: {
                email:req.body.email 
            }
        })

        if(email) {
            return res.status(400).send({
                message: `email sudah di pakai`
            })
        }
        
        const save = await admin.create({
           
            email: req.body.email,
            password: hash,
            
        })
        

        const simpan = await admin.findOne({
            where : {id:save.id},
            attributes: {
                exclude : ["password"]
            }
        })
        console.log(simpan);
      
        res.send({
            status: 200,
            message: 'berhasil simpan',
            data: simpan
        })
    } catch (err) {
        console.error(err);
    }
}

exports.getAllItems = async (req, res) => {
  try {
    const datas = await item.findAll({
      include: [
        {
          model: category,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: location,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
            model: ownership,
            attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    
    return res.json({ item: datas});

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error",
    });
  }
};

exports.getItemById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = [];
    
        if (data[0] == null) {
          const userData = await item.findOne({
            where: {
              id,
            },
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
                {
                  model: category,
                  attributes: {
                    exclude: ["createdAt", "updatedAt"],
                  },
                },
                {
                  model: location,
                  attributes: {
                    exclude: ["createdAt", "updatedAt"],
                  },
                },
                {
                    model: ownership,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                      },
                },
              ],
          });
    
          if (userData == undefined || userData == null) {
            return res.status(400).send({
              message: `id item ${id} not Found`,
            });
          }
    
          console.log("USER DATA: ", userData);
      return res.status(200).send({
            message: `data item ${id}`,
            data: userData,
          });
        }
      } catch (error) {
        
        console.log(error);
        return res.send({
          status: 500,
          message: "Internal server error!",
        });
      }
    };

    exports.AddItem = async (req, res) => {
        try {
          const body = req.body;

          const schema = joi.object({
            itemId: joi.string().min(4).required(),
            itemName: joi.string().min(3).required(),
            categoryId: joi.number().min(1).required(),
            ownershipId: joi.number().min(1).required(),
            locationId: joi.number().min(1).required(),
            qty: joi.number().min(1).required(),
            status: joi.number().min(1).required(),
            purchaseDate: joi.date().required()
          });
      
          const { error } = schema.validate(body);
      
          if (error) {
            return res.status(400).send({
              message: error.details[0].message,
            });
          }
          
        
          const itemId = await item.findOne({
            where: {
                itemId:body.itemId
            }
        })

        if(itemId) {
            return res.status(400).send({
                message: `Item Id sudah ada`
            })
        }

         

          const requestItem = {
            itemId: body.itemId,
            itemName: body.itemName,
            categoryId: body.categoryId,
            ownershipId: body.ownershipId,
            locationId: body.locationId,
            qty: body.qty,
            status: body.status,
            purchaseDate: body.purchaseDate,
          };
      
          const data = await item.create(requestItem);
      
        res.json({item:data})
        } catch (error) {
          console.log(error);
          return res.status(500).send({
            message: "Internal server error!",
          });
        }
      };

      exports.getCategory = async (req, res) => {
        try {
          const datas = await category.findAll({
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          });
      
          
          return res.json({ item: datas});
      
        } catch (error) {
          console.log(error);
          return res.status(500).send({
            message: "Internal server error",
          });
        }
      };


      exports.getOwnership = async (req, res) => {
        try {
          const datas = await ownership.findAll({
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          });
      
          
          return res.json({ item: datas});
      
        } catch (error) {
          console.log(error);
          return res.status(500).send({
            message: "Internal server error",
          });
        }
      };

      exports.getLocation = async (req, res) => {
        try {
          const datas = await location.findAll({
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          });
      
          
          return res.json({ item: datas});
      
        } catch (error) {
          console.log(error);
          return res.status(500).send({
            message: "Internal server error",
          });
        }
      };


      exports.editItem = async (req, res) => {
        try {
        const id = req.params.id;
          const body = req.body;

          const schema = joi.object({
            itemId: joi.string().min(4).required(),
            itemName: joi.string().min(3).required(),
            categoryId: joi.number().min(1).required(),
            ownershipId: joi.number().min(1).required(),
            locationId: joi.number().min(1).required(),
            qty: joi.number().min(1).required(),
            status: joi.number().min(1).required(),
            purchaseDate: joi.date().required()
          });
      
          const { error } = schema.validate(body);
      
          if (error) {
            return res.status(400).send({
              message: error.details[0].message,
            });
          }
          const findItem = await item.findOne({
            where: {
                id : id
            }
          })

          if(!findItem){
            return res.status(404).send({
                message: 'data tidak ditemukan'
            })
        }

        // const findOwnershipCode = ownership.findOne({
        //   where: {body.}
        // })

          const requestItem = {
            itemId: body.itemId,
            itemName: body.itemName,
            categoryId: body.categoryId,
            ownershipId: body.ownershipId,
            locationId: body.locationId,
            qty: body.qty,
            status: body.status,
            purchaseDate: body.purchaseDate,
          };
      
          await findItem.update(requestItem,{
            where : {
                id
            }
          });
        
      
        return res.status(200).send({
          message:"Data Updated",
          item:findItem
        })
        
        } catch (error) {
          console.log(error);
          return res.status(500).send({
            message: "Internal server error!",
          });
        }
      };

exports.deleteItem = async (req, res) => {
    try {
      const id = req.params.id;

      await item.destroy({
        where: {
          id,
        },
      });
  
      return res.status(200).send({
        message: "OK",
      });
  
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Internal server error!",
      });
    }
  };