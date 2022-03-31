import React, { useEffect, useState } from "react";
import API from "../../api";

const Elements = () => {

    const [search, setSearch] = useState('');
    const [elements, setElements] = useState(['A', 'B', 'C', 'D', 'E']);
    const [songs, setSongs] = useState([]);

    const rotate = (arr, elem) => [...arr.slice(1), elem || arr[0]];

    useEffect(() => {
        const interval = setInterval(() => {
            setElements(rotate(elements, songs.shift()));
        }, 1000);

        return () => {
            clearInterval(interval);
        };

    }, [songs, elements]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (search.length !== 0 && search !== '') {
            const response = await API.get(`${search}`);
            setSongs(sortingArray(response.data.results));
        };
        setSearch('');
    };

    const sortingArray = (arr) => {
        return arr.sort((a, b) => a.collectionName?.localeCompare(b.collectionName))
            .filter((item, i) => arr[i + 1]?.collectionName !== item?.collectionName)
            .slice(0, 5).map(item => item.collectionName);
    };


    return (
        <div className="wrapper">
            <div className="inner-wrapper">
                <div className="search-wrapper">
                    <div className="search">
                        <form onSubmit={handleSearch}>
                            <input className="search-input" type="text" value={search} placeholder="Search Band" onChange={(e) => setSearch(e.target.value.toLowerCase())} />
                        </form>
                    </div>
                </div>
                <div className="list-wrapper">
                    <div className="list-inner">
                        {elements.map((element, id) => {
                            return <div className="list-element" key={id}>{element}</div>
                        })

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Elements;