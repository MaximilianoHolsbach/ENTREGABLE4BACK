function carritoPost(req, res, next){
    const {pid, uid, quantity, state} = req.body
    if(!pid || !uid || !quantity || !state){
        return res.json({
            statusCode : 400,
            message : `${req.method} ${req.url} Todos los campos son requeridos`
        })
    }else{
        return next()
    }
}

export default carritoPost