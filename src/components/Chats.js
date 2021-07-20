import React, { useRef, useState, useEffect } from 'react';
import  { useHistory} from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    //console.log(user);

    const handleLogout = async () => {
        await auth.signOut();

        history.push('/');
    }
    
    useEffect(() => {
        if(!user) {
            history.push('/');

            return;
        }

        const getFile = async (url) => {
            const response = await fetch(url);
            const data = await response.blob();

            return new File([data], "userPhoto.jpg", { type: 'image/jpeg'})
        }
  
        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "6c057c4d-5d73-4f85-83ef-033c0d496f63 ",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name);

                    axios.post('https://api.chatengine.io/users/',
                        formdata,
                        { headers: { "private-key": " db661676-404f-4616-8a8f-97497d6e57ad" } }
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
                })
        })
    }, [user, history]);

    if(!user || loading) return 'Loading...';
    
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    CMS 
                </div>
                <div>
                    <a className="logout-tab" href="https://polar-retreat-09952.herokuapp.com/finance">DashBoard</a>
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="6c057c4d-5d73-4f85-83ef-033c0d496f63"
                userName={user.email}
                userSecret={user.uid}
                offset={6} 
            />
        </div>

    );
}

export default Chats;





// import React from 'react';
// import {useHistory} from 'react-router-dom';
// import { ChatEngine} from 'react-chat-engine';
// import {auth} from '../firebase';
// import {useAuth} from '../contexts/AuthContext';
// const Chats = () => {
//     const history = useHistory();
//     const {user} = useAuth();

//     console.log(user);

//     const handleLogout = async() => {
//         await auth.signOut();

//         history.push('/');
//     }

//     return(
//         <div className = "chats-page">
//             <div className = "nav-bar">
//                <div className="logo-tab">
//                 Unichat
//                 </div>  
//         <div onClick= {handleLogout}className="logout-tab">
//             Logout
//         </div>
//         </div>
        
//         <ChatEngine
//          height = "calc(100vh - 66px)"
//          projectId = "1c4ff783-f66b-4cfd-aca8-6f4dc89291de"
//          userName = "."
//          userSecret = "."
//         />
//         </div>
//     );
// }

// export default Chats;