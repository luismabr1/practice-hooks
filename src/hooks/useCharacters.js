import {useState, useEffect} from 'react';

const useCharacters = (url) => {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    
    useEffect(() => {
        setIsLoading(true);
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setCharacters(data.results);
            setIsLoading(false);
        })
        .catch((error) => {
            setHasError(true);
            setIsLoading(false);
        });
    }, [url]);
    
    return {characters, isLoading, hasError};
}

export default useCharacters;