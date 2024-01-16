function propsProducts(req, res, next){
    const {title , photo , price} = req.body;
    if(!title || !photo || !price){
        return res.json({
            statusCode : 400,
            message : `${req.method} ${req.url} Todos los campos son requeridos`
        })
    }else{
        return next()
    }
}

export default propsProducts