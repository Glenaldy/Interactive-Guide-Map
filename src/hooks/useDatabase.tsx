import {useEffect, useState} from "react";

function useDatabase<T>(source: string, type: new (...args: any[]) => T): [Array<T>, boolean] {
    const fetchData = async () =>
        await fetch(source)
            .then(res => res.json())
            .then(data => {
                return data
            })

    const [database, setDatabase] = useState(Array<T>());
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchData().then(r => {
            setDatabase(r);
            setIsLoading(false);
        })
    }, [source]);

    return [database, isLoading]
}

export default useDatabase;