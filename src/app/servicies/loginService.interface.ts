export interface ILoginService {
    login(): void;
    setToken(token): void;
    isAuthenticated(): boolean;
    logout(): void;
}
