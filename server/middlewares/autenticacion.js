const jwt = require('jsonwebtoken');

// ====================================
// Verificar Token
// ====================================

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;

        next();

    });
}

// ====================================
// Verificar AdminRole
// ====================================

let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario;
    console.log(usuario.role);

    if (usuario.role === 'ADMIN_ROLE') {

        next();
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }

}


// ====================================
// Verificar token para img
// ====================================

let verificaTokenImg = (req, res, next) => {

    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;

        next();

    });

}

module.exports = {
    verificaToken,
    verificaAdminRole,
    verificaTokenImg
}