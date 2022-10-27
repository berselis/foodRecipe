//? Middleware para proteger rutas

//* 1- Revisar si existe un token
//* 2- Verificar si el token pertenece a un usuario valido
//* 3- Modificar el req y agregar req.user con la informacion desencriptada del token

//? estrategia: Diferentes maneras de hacer un login(Con facebook, google, JWT, Github...)

const { jwtSecret } = require('../../config');
const { getUserById } = require('../controller/users.controller');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//! Exportando la función anónima
module.exports = (passport) => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: jwtSecret
    };
    passport.use(
        new JwtStrategy(options, async (decode, done) => {
            try {
                const response = await getUserById(decode.id);
                if (!response) return done(null, false);
                console.log('decode JWT', decode);
                return done(null, decode)
            } catch (error) {
                return done(error, false);
            }
        })
    )
};

