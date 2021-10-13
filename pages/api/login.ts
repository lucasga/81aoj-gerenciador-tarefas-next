import type {NextApiRequest, NextApiResponse} from 'next';

type DefaultReturn = {
    error? : string
    message? : string
}

type LoginRequest = {
    login : string
    password : string
}

export default function handler( req : NextApiRequest, res : NextApiResponse<DefaultReturn>){
    try{
        if(req.method !== 'POST' || !req.body){
            return res.status(400).json({ error: 'Metodo informado nao esta disponivel.'});
        }

        const obj : LoginRequest = req.body;
        if(obj.login === 'admin@admin.com' && obj.password === 'Admin@123'){
            return res.status(200).json({ message: 'Usuario autenticado com sucesso.'});
        }

        return res.status(400).json({ error: 'Parametros de entrada invalido.'});
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Ocorreu erro ao efetuar login, tente novamente.'});
    }
} 