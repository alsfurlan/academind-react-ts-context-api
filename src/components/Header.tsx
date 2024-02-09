import { FC } from "react";
import Button from "./UI/Button";

export const Header: FC = () => {
    return (
        <header>
            <h1>ReactTimer</h1>
            <Button>Stop Timers</Button>
        </header>
    )
};