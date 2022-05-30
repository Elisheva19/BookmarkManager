import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';

const BookmarkContext = createContext();

const BookmarkContextComponent = ({children}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get('/api/account/getcurrentuser');
            setUser(data);
        }

        getUser();
    }, []);


    return <BookmarkContext.Provider value={{user, setUser}}>
            {children}
        </BookmarkContext.Provider>

}

const useBookmarkContext = () => useContext(BookmarkContext);


export { BookmarkContextComponent, useBookmarkContext};