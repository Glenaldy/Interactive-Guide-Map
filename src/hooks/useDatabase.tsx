import {useEffect, useState} from "react";

function useDatabase<T>(source: string, type: new (...args: any[]) => T): [Array<T>, boolean] {
    const fetchData = async () => {
        try {
            const res = await fetch(source);
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return await res.json();
        } catch (error) {
            throw new Error("Error fetching data");
        }
    };

    const [database, setDatabase] = useState<Array<T>>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData()
            .then((r) => {
                setDatabase(r);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }, [source, fetchData]);

    return [database, isLoading];
}

export default useDatabase;