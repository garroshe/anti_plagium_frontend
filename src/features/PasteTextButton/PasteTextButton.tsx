import {StyledPasteButton} from "./styled.tsx";
import { ClipboardPaste } from "lucide-react";


type PasteTextButtonPropsType = {
    disabled?: boolean;
    onClick?: () => void;
}

export const PasteTextButton = ({ onClick}: PasteTextButtonPropsType) => {
    return (
        <StyledPasteButton onClick={onClick}><ClipboardPaste size={18}/> Втавити текст</StyledPasteButton>
    )
}