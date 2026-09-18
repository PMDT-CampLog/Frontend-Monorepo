'use client'

import bg1 from '../../assets/bg-1.png'
import bg2 from '../../assets/bg-2.png'
import NoScroll from '@/components/NoScroll'
import { LogoIcon } from '@camplog/ui'
import { useArroba } from './useArroba'
import { useRouter } from 'next/navigation'

export default function CriarArroba(){
    const router = useRouter()

    const {
        Arroba,
        setArroba,
        verificarArroba,
        loading,
        erro
    } = useArroba()

    const bg1Url = bg1.src
    const bg2Url = bg2.src

    return(
        <>
        <NoScroll/>
            <div
            className="custom-bg"
            aria-hidden="true"
            style={{ backgroundImage: `url('${bg1Url}'), url('${bg2Url}')` }}
            />

            <header>
                <nav className="navbar" role="navigation" aria-label="Navegação principal">
                    <a href="/criararroba" className="logo" aria-label="CampLog — página inicial">
                        <span className="logo-icon" aria-hidden="true">
                        <LogoIcon />
                        </span>
                        CampLog
                    </a>
                </nav>
            </header>

            <main className="relative z-10 min-h-[100dvh] flex items-center justify-center">
                <div className="flex flex-col items-center w-full gap-3.5 p-8">
                    <input 
                        type='text' 
                        name='text' 
                        placeholder='Digite seu arroba'
                        value={Arroba.arroba}
                        onChange={(e) => setArroba({arroba: e.target.value})}
                        onKeyDown={async (e) =>{
                            if(e.key === 'Enter'){
                                const success = await verificarArroba()
                                if(success){
                                    router.push('/tipocriador')
                                }
                            }
                        }}
                        className="w-80 max-w-[90vw] px-5 py-3.5 text-base font-[family-name:var(--font-dm-sans)]
                                text-purple-50 bg-purple-950/50 backdrop-blur-md
                                border-2 border-purple-500 rounded-2xl outline-none
                                placeholder:text-purple-100/50
                                shadow-[0_0_0_1px_rgba(168,85,247,0.25),0_0_20px_rgba(168,85,247,0.35)]
                                transition-all duration-300
                                hover:border-purple-400 hover:bg-purple-900/60
                                hover:shadow-[0_0_0_1px_rgba(192,132,252,0.4),0_0_26px_rgba(192,132,252,0.55)]"
                    />

                    {erro && <p className="text-red-400 text-sm">{erro}</p>}
                    {loading && <p className="text-sm" style={{ color: 'var(--heading-sm)' }}>Verificando...</p>}

                </div>
            </main>

            <footer className="page-footer">
                <p>
                Precisa de Ajuda? <a href="/contato">Contacte-nos</a>
                </p>
            </footer>
        </>
    )

}