import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './favoritos.css';

//Biblioteca para personalizar alertas
import {toast} from 'react-toastify';

function Favoritos(){
    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || [] )
    }, [])

    //Função para excluir filmes da lista
    function excluirFilme(id){
        let filtroFilmes = filmes.filter( (item) => {
            return(item.id !== id)
        })
        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes) )
        toast.success("Filme removido com sucesso")
    }

    return(
        <div className='meus-favoritos'>
           <h1>Meus Filmes Favoritos</h1>

           {filmes.length === 0 && <span>Você ainda não tem filmes salvos :( </span>} 

           <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={ () => excluirFilme(item.id) }>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>  
        </div>
    )
}

export default Favoritos;