import { useState } from "react";

function useAuth() {
  const [ authData, setAuthData] = useState({
    domain: ''
  })

  return {
    authData,
    setAuthData
  }
}

export default useAuth