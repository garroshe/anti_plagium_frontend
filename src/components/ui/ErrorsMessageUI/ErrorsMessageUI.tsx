import {StyledErrorMessage} from "./styled.tsx";

type ErrorsMessageProps = {
    error: string;
}

export const ErrorsMessageUI = ({ error }: ErrorsMessageProps) => {
    return <StyledErrorMessage>{error}</StyledErrorMessage>;
};