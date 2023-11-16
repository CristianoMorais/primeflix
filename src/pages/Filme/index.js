import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

import api from '../../services/api';

import './filme-info.css';

import {toast} from 'react-toastify';

function Filme(){
    const {id} = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "bbceabd3a5bac2696cc4eb748addc44d",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch( () => {
                console.log("Filme não encontrado")
                navigate("/", {replace: true})
                return;
            })
        }
        loadFilme();

        return() => {
            console.log("Componente foi desmontado")            
        }
    }, [navigate, id])

    //Salvar filmes no localStorage
    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        //verifica se esse item já está na lista utilizando como parametro de comparação o ID
        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id);
        //Se o filme já está na lista
        if(hasFilme){
            toast.warn("Esse filme já está na lista");
            return;
        }
        //Se não estiver na lista
        //Adiciona no LocalStorage
        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!")
    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes ...</h1>
            </div>
        )
    }
    
    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} /10</strong>
        <div className='area-buttons'>
            <button onClick={salvarFilme}>Salvar</button>
            <button>
                <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                    Trailer
                </a>
            </button>
        </div>

        </div>
    )
}

export default Filme;