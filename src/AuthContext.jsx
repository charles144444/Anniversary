// AuthContext removed as authentication is no longer needed
export function AuthProvider({ children }) {
  return children;
}

export function useAuth() {
  return {};
}
