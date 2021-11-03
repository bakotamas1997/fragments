import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { authLogout } from "../../../store/actions";

export const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authLogout());
  }, [dispatch]);

  return <Redirect to="/login" />;
};
