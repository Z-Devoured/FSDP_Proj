import { createContext } from 'react';

const UserContext = createContext({
    user: null,
    role: null,  
    points: 0,  
    discount: 0, 
    setUser: () => {},
    setRole: () => {}, 
    setPoints: () => {},  
    setDiscount: () => {} 
});

export default UserContext;