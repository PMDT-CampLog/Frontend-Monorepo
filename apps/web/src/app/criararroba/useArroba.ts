'use client'

import { useState } from 'react'
import { checkArrobaAvailability, saveArroba } from '@camplog/api'

type Arroba = {
    arroba: string
}

export function useArroba() {
    const [Arroba, setArroba] = useState<Arroba>({
        arroba: ''
    });

    const [erro, setErro] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function verificarArroba() : Promise<boolean> {
        if(!Arroba.arroba.startsWith('@')){
            setErro("O arroba deve começar com @")
            return false
        }

        setLoading(true)
        try{
            const available = await checkArrobaAvailability(Arroba.arroba)
            if(!available){
                setErro("Arroba não disponivel")
                return false
            }
            
            await saveArroba(Arroba.arroba)
            return true
        }catch{
            setErro("Erro ao verificar o arroba")
            return false
        }finally{
            setLoading(false)
        }
    }

    return {
       Arroba,
       setArroba,
       verificarArroba,
       loading,
       erro
    }
}