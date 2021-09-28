import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getUser, updateUserState } from "./redux/slice/userSlice";


const Auth = ({ children }: any) => {
    const dispatch = useDispatch();
    const user = useSelector(getUser).user;
    const history = useHistory()


    useEffect(() => {
        if (!user.id /*reduxのStateがfalseならば */) {
            updateUserState(user);
            history.push('/signin')
        }
        // reduxのstateがリロードされてfalseになったのをもとに戻す。
    }, [user]);

    return children;
};
export default Auth;
