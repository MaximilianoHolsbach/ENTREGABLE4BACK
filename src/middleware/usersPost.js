function usersPost(req, res, next){
    const {name, photo, email} = req.body
    if(!name || !photo || !email){
        return res.json({
            statusCode : 400,
            message : `${req.method} ${req.url} Todos los campos son requeridos`
        })
    }else{
        return next()
    }
}

export default usersPost